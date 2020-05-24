import { Observable, of, combineLatest } from 'rxjs'
import { scan, map } from 'rxjs/operators'
import {
  LaampGatewayEvent,
  LaampDeviceUpdatedEvent,
  LaampGroupUpdatedEvent,
} from '../adapter.types'
import {
  LaampAdapterConfiguration,
  Laamp,
  LaampDevice,
  LaampChannel,
} from '../../types'
import { adapterEvents$ } from '../adapter.tradfri'
import { onDeviceUpdated } from './lifecycle/onDeviceUpdated'
import { onGroupUpdated } from './lifecycle/onGroupUpdated'

export const connect = ({ identity, psk }): Observable<Laamp> => {
  return config$({ identity, psk }).pipe(
    map<LaampAdapterConfiguration, Laamp>(
      (config: LaampAdapterConfiguration) => ({
        gateways: [],
        channels: config.devices.map<LaampChannel>((d: LaampDevice) => ({
          id: d.id,
          devices: [d],
        })),
      })
    )
  )
}

export const config$ = ({
  identity,
  psk,
}): Observable<LaampAdapterConfiguration> => {
  return adapterEvents$({ identity, psk }).pipe(
    scan(scanForConfig, { devices: [], groups: [] })
  )
}

const scanForConfig = (
  adapter: LaampAdapterConfiguration,
  event: LaampGatewayEvent
) => {
  // DEVICE UPDATED
  if ((event as LaampDeviceUpdatedEvent).deviceUpdated) {
    return onDeviceUpdated(adapter, event as LaampDeviceUpdatedEvent)
  }
  // GROUP UPDATED
  if ((event as LaampGroupUpdatedEvent).groupUpdated) {
    return onGroupUpdated(adapter, event as LaampGroupUpdatedEvent)
  }
}
