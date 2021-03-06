console.log(`
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||                                                                   ||
||    ||   ||   |||||   ||     ||     |||||||   ||                   ||
||    ||   ||   ||      ||     ||     ||   ||   ||    |\\__/,|   ('\\  ||
||    |||||||   |||     ||     ||     ||   ||   ||  _.|o o  |_   ) ) ||
||    ||   ||   ||      ||     ||     ||   ||     -(((---(((---------||
||    ||   ||   |||||   |||||  |||||  |||||||   ||                   ||
||                                                                   ||
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
`)

import * as SerialPort from 'serialport'
import * as Readline from '@serialport/parser-readline'
import { eventStream } from '@lineweight/rx-osc'
import * as OBSWebSocket from 'obs-websocket-js'
import { filter, tap } from 'rxjs/operators'
import { connections, makeConnection } from './connections'
import { switchers } from './switcher'

const obs = new OBSWebSocket()

const switcherAddresses = [
  '/dev/tty.usbserial-30',
  '/dev/tty.usbserial-40',
  '/dev/tty.usbserial-20',
]

const switcherPorts = switcherAddresses.map(
  (addr) => new SerialPort(addr, { baudRate: 4800 }),
)

switcherPorts.forEach((port) => {
  const parser = new Readline()
  parser.on('data', (data) => console.log(data))
  port.pipe(parser)
})

obs
  .connect({ address: '192.168.2.3:4444', secure: false })
  .catch((e) => console.error('Could not connect to OBS', e))

obs.on('ConnectionOpened', () => {
  console.log('Connected to OBS!')
})

const events = eventStream({ bindingAddress: '0.0.0.0', port: 7840 })

events.pipe(tap(x => console.log(x)))

events
  .pipe(
    filter((msg) => msg.address.slice(0, 1).pop() === 'obs'),
    filter((msg) => msg.address.slice(1, 2).pop() === 'scene'),
    tap((msg) => obs.send('SetCurrentScene', { 'scene-name': msg.args[0].toString() }).catch(e => console.error(e))),
  )
  .subscribe()

events
  .pipe(
    filter((msg) => msg.address.slice(0, 1).pop() === 'obs'),
    filter((msg) => msg.address.slice(1, 2).pop() === 'trx'),
    tap((msg) => {
      obs.send('SetCurrentTransition', { 'transition-name': msg.args[0] })

      if (msg.args.length > 1) {
        obs.send('SetTransitionDuration', {
          duration: Number.parseFloat(msg.args[1]) * 1000,
        })
      }
    }),
  )
  .subscribe()

events
  .pipe(
    filter((msg) => msg.address.slice(0, 1).pop() === 'stream'),
    tap((msg) => {
      const command = msg.address.slice(1, 2).pop()
      if (command === 'start') {
        obs.send('StartStreaming', {})
      } else if (command === 'stop') {
        obs.send('StopStreaming')
      }
    }),
  )
  .subscribe()
events
  .pipe(
    filter((msg) => msg.address.slice(0, 1).pop() === 'route'),
    tap((msg) => {

      if(msg.address.slice(1, 2).pop() === "clear"){
        const switcherId = Number.parseInt(msg.args[0])
        switchers[switcherId-1].clearState()
        return
      }
      console.log(msg)
      const cam = Number.parseInt(msg.args[0])
      const downstreamOutput = Number.parseInt(msg.args[1])

      const upstreamId = cam <= 8 ? 1 : 2
      const downstreamId = 3

      const upstreamInput = cam > 8 ? cam - 8 : cam

      const cmds = makeConnection(
        switchers,
        connections,
        upstreamId,
        upstreamInput,
        downstreamId,
        downstreamOutput,
      )

      cmds.forEach((cmd) => {
        switcherPorts[cmd.sid - 1].write(`${cmd.cmd}\r`)
      })
    }),
  )
  .subscribe()