import { eventStream } from '@lineweight/rx-osc'

eventStream({ bindingAddress: '0.0.0.0', port: 3031 }).subscribe((x) =>
  console.log(x)
)
