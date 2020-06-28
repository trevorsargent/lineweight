import { gatewayEvents$ } from '../../gateway.tradfri'
import { LaampEvent, LaampGatewayEventStream } from '../../../types'
import { LaampGatewayEvent } from '../../gateway.types'
import { map } from 'rxjs/operators'
import { Subject, Observable } from 'rxjs'
import { app } from '../../../application'
import { context } from '../../../context'

export const startGatewayEventListeners = (
  events$: Subject<LaampEvent>,
  gatewayEventStreams: LaampGatewayEventStream[],
) => {
  gatewayEventStreams.forEach((stream) => {
    stream.pipe(map(handleEvents(events$))).subscribe()
  })
}

export const handleEvents = (events$: Subject<LaampEvent>) => (
  event: LaampGatewayEvent,
) => {
  switch (event.type) {
    case 'deviceUpdated':
      if (app.devices.query.device(event.device.id, context)) {
        app.devices.mutation.updateDevices([event.device], context)
      } else {
        app.devices.mutation.createDevices([event.device], context)
      }
      break

    case 'deviceRemoved':
      events$.next({
        type: 'deviceRemoved',
        device: app.devices.query.device(event.deviceId, context),
      })

    // if we have the device, update event.
    // else, device created
  }
}
