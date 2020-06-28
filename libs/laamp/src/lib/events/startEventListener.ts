import { gatewayEvents$ as tradfriGatewayEvents$ } from '../adapters/gateway.tradfri'
import { startGatewayEventListeners } from '../adapters/gateway/gateway.events/startGatewayEventListener'
import { events$ } from './index'
import { map } from 'rxjs/operators'
import { LaampEvent } from '../types'

export const startEventListeners = (auth: {
  identity: string
  psk: string
}) => {
  console.log('Starting Laamp Event Listeners')
  const gatewayEventStreams = [tradfriGatewayEvents$(auth)]
  startGatewayEventListeners(events$, gatewayEventStreams)

  events$.pipe(map(handleEvents)).subscribe()
}

export const handleEvents = (event: LaampEvent) => {
  switch (event.type) {
    case 'deviceCreated':
      console.log('Device Created!', event.device)
      break

    case 'deviceUpdated':
      console.log('Device Updated!', event.device)
  }
}
