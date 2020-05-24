import { eventStream } from '@lineweight/rx-osc'
import { connect } from '@lineweight/laamp'
import { identity, psk } from '../src/basestation.config/tradfri'
import { start } from '@lineweight/laamp-ql'

const osc = eventStream({ bindingAddress: '0.0.0.0', port: 3031 })

start()

// connect({ identity, psk }).subscribe((laamp) =>
//   console.log(JSON.stringify(laamp, null, 2))
// )
