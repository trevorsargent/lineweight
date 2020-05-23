import { eventStream } from '@lineweight/rx-osc'
import { config$ } from '@lineweight/laamp'
import { identity, psk } from '../src/basestation.config/tradfri'

const osc = eventStream({ bindingAddress: '0.0.0.0', port: 3031 })

config$({ identity, psk }).subscribe((config) =>
  console.log(JSON.stringify(config, null, 2))
)
