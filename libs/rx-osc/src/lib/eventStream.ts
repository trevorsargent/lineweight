import { Server } from 'node-osc'
import { processMessage } from './processMessage'

import { Observable, Subject } from 'rxjs'
import { OscEvent, ServerInfo } from './types'

export const eventStream = (config: ServerInfo): Observable<OscEvent> => {
  const { port, bindingAddress } = config
  const server = new Server(port, bindingAddress)

  const stream = new Subject<OscEvent>()

  server.on('message', processMessage(stream))

  server.on('listening', () => {
    console.log(`OSC Server is listening on ${bindingAddress}:${port}`)
  })

  return stream.asObservable()
}
