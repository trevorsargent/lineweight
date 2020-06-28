import { gatewayEvents$ } from '../../gateway.tradfri'
import { LaampEvent, LaampGatewayEventStream } from '../../../types'
import { LaampGatewayEvent } from '../../gateway.types'
import { map } from 'rxjs/operators'
import { Subject, Observable } from 'rxjs'
import { app } from '../../../application'

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
      if (app.devices.query.device(event.device.id)) {
        events$.next({ type: 'deviceUpdated', device: event.device })
      } else {
        events$.next({ type: 'deviceCreated', device: event.device })
      }
      break

    case 'deviceRemoved':
      events$.next({
        type: 'deviceRemoved',
        device: app.devices.query.device(event.deviceId),
      })

    // if we have the device, update event.
    // else, device created
  }
}
