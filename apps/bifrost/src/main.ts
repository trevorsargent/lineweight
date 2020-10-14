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


import { eventStream } from '@lineweight/rx-osc'
import * as OBSWebSocket from 'obs-websocket-js'
import { filter, tap } from 'rxjs/operators'

const obs = new OBSWebSocket()

obs
  .connect({ address: '0.0.0.0:7850', password: 'obs', secure: false })
  .catch((e) => console.error('Could not connect to OBS', e))

obs.on('ConnectionOpened', () => {
  console.log('Connected to OBS!')
})

obs.on('SwitchScenes', (data => console.log(data)))

const events = eventStream({ bindingAddress: '0.0.0.0', port: 7840 })

events
  .pipe(
    filter((msg) => msg.address.slice(0, 1).pop() === 'scene'),
    tap((msg) => obs.send('SetCurrentScene', { 'scene-name': msg.args[0] })),
  )
  .subscribe()

events.pipe(
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
