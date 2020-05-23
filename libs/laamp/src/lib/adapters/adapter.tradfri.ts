import type { LaampAdapterConfiguration, LaampAdapterSubject } from '../types'

import type { ID } from '@lineweight/types'

import {
  LaampAdapter,
  LaampAdapterEvent,
  LaampDeviceUpdatedEvent,
  LaampDeviceRemovedEvent,
  LaampConnectionAliveEvent,
  LaampConnectionFailedEvent,
  LaampConnectionLostEvent,
  LaampErrorEvent,
} from './adapter.types'

import {
  discoverGateway,
  TradfriClient,
  Accessory,
  DeviceUpdatedCallback,
  DeviceRemovedCallback,
  ErrorCallback,
  ConnectionFailedCallback,
} from 'node-tradfri-client'
import { Subject, Observable, from, merge } from 'rxjs'
import { map, switchMap, scan } from 'rxjs/operators'

import { LaampLamp } from '../devices/device.lamp'
import { LaampDevice } from '../devices/device.types'
import { eventNames } from 'cluster'

const TRADFRI_ID = 'tradfri'

const gateway$ = () => from(discoverGateway(1000))
// switchMap((gateway) => {
//   if (!gateway) {
//     return from(discoverGateway(1000)).pipe(
//       tap((_) => console.log('trying again'))
//     )
//   }
//   return of(gateway)
// }),
// catchError((_) => of('Error Connecting, Retrying'))

export const adapterEvents$ = ({ identity, psk }) => {
  return gateway$().pipe(
    map((gateway) => new TradfriClient(gateway.addresses[0])),
    switchMap<TradfriClient, Observable<LaampAdapterEvent>>((client) => {
      return from(client.connect(identity, psk)).pipe(
        switchMap<boolean, Observable<LaampAdapterEvent>>((success) => {
          if (!success) {
            throw 1
          }

          const connectionAlive$ = new Subject<LaampConnectionAliveEvent>()
          const connectionFailed$ = new Subject<LaampConnectionFailedEvent>()
          const connectionLost$ = new Subject<LaampConnectionLostEvent>()

          const error$ = new Subject<LaampErrorEvent>()

          const deviceUpdated$ = new Subject<LaampDeviceUpdatedEvent>()
          const deviceRemoved$ = new Subject<LaampDeviceRemovedEvent>()

          client
            .on('connection alive', connectionAlive(connectionAlive$))
            .on('connection failed', connectionFailed(connectionFailed$))
            .on('connection lost', connectionLost(connectionLost$))
            .on('device updated', deviceUpdated(deviceUpdated$))
            .on('device removed', deviceRemoved(deviceRemoved$))
            .on('error', error(error$))
            .observeDevices()

          return merge(deviceUpdated$, deviceRemoved$)
        })
      )
    })
  )
}

const onDeviceUpdated = (
  adapter: LaampAdapterConfiguration,
  event: LaampDeviceUpdatedEvent
) => {
  const { device } = event

  const deviceMap = adapter.devices.reduce((m, dev) => {
    m.set(dev.id, dev)
    return m
  }, new Map<ID, LaampDevice>())

  deviceMap.set(device.id, device)

  return <LaampAdapterConfiguration>{
    ...adapter,
    devices: Array.from(deviceMap.values()),
  }
}

const scanForConfig = (
  adapter: LaampAdapterConfiguration,
  event: LaampAdapterEvent
) => {
  // DEVICE UPDATED
  if ((event as LaampDeviceUpdatedEvent).deviceUpdated) {
    return onDeviceUpdated(adapter, event as LaampDeviceUpdatedEvent)
  }
}

export const config$ = ({
  identity,
  psk,
}): Observable<LaampAdapterConfiguration> => {
  return adapterEvents$({ identity, psk }).pipe(
    scan(scanForConfig, { devices: [] })
  )
}

const connectionAlive = (connectionAlive$: LaampAdapterSubject) => () => {
  connectionAlive$.next({
    connectionAlive: true,
  })
}

const connectionFailed = (
  connecitonFailed$: LaampAdapterSubject
): ConnectionFailedCallback => () => {
  connecitonFailed$.next({
    connectionFailed: true,
  })
}

const connectionLost = (connectionLost$: LaampAdapterSubject) => () => {
  connectionLost$.next({
    connectionLost: true,
  })
}

const deviceUpdated = (deviceUpdated$: LaampAdapterSubject) => (
  d: Accessory
): DeviceUpdatedCallback => {
  const device: LaampLamp = {
    id: `${d.instanceId}`,
    color: d.lightList[0].color,
  }
  deviceUpdated$.next({
    deviceUpdated: true,
    device,
  })
  return
}

const deviceRemoved = (
  deviceRemoved$: LaampAdapterSubject
): DeviceRemovedCallback => (deviceId: number) => {
  deviceRemoved$.next({
    deviceRemoved: true,
    deviceId: deviceId.toString(),
  })
}

const error = (error$): ErrorCallback => (e) => {
  console.log(e)
  error$.next({
    error: true,
  })
}
