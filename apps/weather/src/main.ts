import { eventStream } from '@lineweight/rx-osc'
import { Accessory, discoverGateway, TradfriClient } from 'node-tradfri-client'
import { identity, psk } from './basestation.config/tradfri'
const devices = new Map<number, Accessory>()

const osc = eventStream({ bindingAddress: '0.0.0.0', port: 3031 })

discoverGateway().then((x) => console.log(x))
const cc = new TradfriClient('TRADFRI-Gateway-dcefcabd2b2d.local')
// cc.authenticate('6kwJw6LM4ieh8ixE').then((x) => {
//   console.log(x)
// })

cc.connect(identity, psk).then((x) => {
  cc.observeDevices()

  cc.on('device updated', (device: Accessory) => {
    console.log(device)
    devices.set(device.instanceId, device)
  })
})

osc.subscribe((x) => {
  console.log(x)

  const deviceArray = Array.from(devices.values())

  // console.log(deviceArray)

  const blind = deviceArray.find((y) => y.instanceId === 65547)
})

// startGraphQLServer()

// export const run = () => {
//   const app = express()
//   const devicesByType = (type: AccessoryTypes) =>
//     Array.from(context.devices.values()).filter((d) => d.type === type)

//   const server = new Server(3031, '0.0.0.0')

//   server.on('message', function (msg: string[]) {
//     const address = msg[0].split('/').filter((x) => !!x)
//     const args = msg.slice(1)
//     console.log(address)
//     console.log(args)

//     if (address[0] === 'lamp') {
//       const poang = devicesByType(AccessoryTypes.lightbulb).find(
//         (l) => l.instanceId === 65537,
//       ).lightList[0]
//       switch (address[1]) {
//         case 'at':
//           poang.setBrightness(
//             Number.parseFloat(args[0]),
//             Number.parseFloat(args[1]),
//           )
//           break
//         case 'temp':
//           poang.setColorTemperature(
//             Number.parseFloat(args[0]),
//             Number.parseFloat(args[1]),
//           )
//           break
//       }
//     }
//   })
//   app.get('/brightness/:brightness/:time', (req, res) => {
//     const poang = devicesByType(AccessoryTypes.lightbulb).find(
//       (l) => l.instanceId === 65537,
//     ).lightList[0]
//     const { brightness, time } = req.params
//     poang.setBrightness(brightness, time)
//     res.send()
//   })
//   app.get('/temp/:temp/:time', async (req, res) => {
//     const poang = devicesByType(AccessoryTypes.lightbulb).find(
//       (l) => l.instanceId === 65537,
//     ).lightList[0]
//     const { temp, time } = req.params
//     poang.turnOn()
//     poang.setColorTemperature(temp, time)
//     res.send('Fading temperature')
//   })
//   app.get('/reset', (req, res) => {
//     const poang = devicesByType(AccessoryTypes.lightbulb).find(
//       (l) => l.instanceId === 65537,
//     ).lightList[0]
//     poang.turnOn()
//     poang.setColorTemperature(0, 0)
//     poang.setBrightness(100, 0)
//     res.send('Reset')
//   })
//   const PORT = process.env.PORT || 3000
//   app.listen(PORT, async () => {
//     // Server Startup
//   })
// }
