import { gatewayEvents$ as tradfriGatewayEvents$ } from '../adapters/gateway.tradfri'
import { startGatewayEventListeners } from '../adapters/gateway/gateway.events/startGatewayEventListener'
import { events$ } from './index'
import { map } from 'rxjs/operators'
import { LaampEvent } from '../types'
import { app } from '../application'
import { ObjectUnsubscribedError } from 'rxjs'
import * as uuid from 'uuid'
import { context } from '../context'

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
      app.channels.mutation.createChannel(
        {
          devices: [event.device],
          id: uuid.v4(),
        },
        context,
      )
      break

    case 'deviceUpdated':
      console.log('Device Updated!', event.device)
      break
    case 'channelCreated':
      console.log('Channel Created!', event.channel)
      break
  }
}
