import { Subject } from 'rxjs'

import { LaampEvent } from '../../types'
import { startGatewayEventListeners } from './gateway.events/startGatewayEventListener'
import { startEventListeners } from '../../events/startEventListener'

export const connect = (auth: { identity; psk }): boolean => {
  const events$ = new Subject<LaampEvent>()

  startEventListeners(auth)

  return true
}
