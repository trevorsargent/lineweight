// export const run = () => {
// const app = express()
// const devicesByType = (type: AccessoryTypes) =>
//   Array.from(context.devices.values()).filter((d) => d.type === type)
// const server = new Server(3031, '0.0.0.0')
// server.on('message', function (msg: string[]) {
//   const address = msg[0].split('/').filter((x) => !!x)
//   const args = msg.slice(1)
//   console.log(address)
//   console.log(args)
//   if (address[0] === 'lamp') {
//     const poang = devicesByType(AccessoryTypes.lightbulb).find(
//       (l) => l.instanceId === 65537
//     ).lightList[0]
//     switch (address[1]) {
//       case 'at':
//         poang.setBrightness(
//           Number.parseFloat(args[0]),
//           Number.parseFloat(args[1])
//         )
//         break
//       case 'temp':
//         poang.setColorTemperature(
//           Number.parseFloat(args[0]),
//           Number.parseFloat(args[1])
//         )
//         break
//     }
//   }
// })
// app.get('/brightness/:brightness/:time', (req, res) => {
//   const poang = devicesByType(AccessoryTypes.lightbulb).find(
//     (l) => l.instanceId === 65537
//   ).lightList[0]
//   const { brightness, time } = req.params
//   poang.setBrightness(brightness, time)
//   res.send()
// })
// app.get('/temp/:temp/:time', async (req, res) => {
//   const poang = devicesByType(AccessoryTypes.lightbulb).find(
//     (l) => l.instanceId === 65537
//   ).lightList[0]
//   const { temp, time } = req.params
//   poang.turnOn()
//   poang.setColorTemperature(temp, time)
//   res.send('Fading temperature')
// })
// app.get('/reset', (req, res) => {
//   const poang = devicesByType(AccessoryTypes.lightbulb).find(
//     (l) => l.instanceId === 65537
//   ).lightList[0]
//   poang.turnOn()
//   poang.setColorTemperature(0, 0)
//   poang.setBrightness(100, 0)
//   res.send('Reset')
// })
// const PORT = process.env.PORT || 3000
// app.listen(PORT, async () => {
//   // Server Startup
// })
// }
