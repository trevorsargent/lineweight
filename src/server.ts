import * as express from 'express'
import {
  discoverGateway,
  TradfriClient,
  Accessory,
  AccessoryTypes,
} from 'node-tradfri-client'
import { identity, psk } from '../config/gatewayCredentials'

const app = express()

const context: ServerContext = {
  client: {} as TradfriClient,
  devices: new Map<number, Accessory>(),
}

const devicesByType = (type: AccessoryTypes) =>
  Array.from(context.devices.values()).filter((d) => d.type === type)

const lightbulbs = devicesByType(AccessoryTypes.lightbulb)

interface ServerContext {
  client: TradfriClient
  devices: Map<number, Accessory>
}

import { Client, Server } from 'node-osc'

const client = new Client('127.0.0.1', 3333)
var server = new Server(3333, '0.0.0.0')

server.on('message', function (msg) {
  console.log(`Message: ${msg}`)
  server.close()
})

client.send('/hello', 'world', (err) => {
  if (err) console.error(err)
  client.close()
})

app.get('/gateway', async (req, res) => {
  res.send(await discoverGateway())
})

app.get('/brightness/:brightness/:time', (req, res) => {
  const poang = devicesByType(AccessoryTypes.lightbulb).find(
    (l) => l.instanceId === 65537
  ).lightList[0]

  const { brightness, time } = req.params
  poang.setBrightness(brightness, time)
  res.send()
})

app.get('/temp/:temp/:time', async (req, res) => {
  const poang = devicesByType(AccessoryTypes.lightbulb).find(
    (l) => l.instanceId === 65537
  ).lightList[0]
  const { temp, time } = req.params
  poang.turnOn()
  poang.setColorTemperature(temp, time)

  res.send('Fading temperature')
})

app.get('/reset', (req, res) => {
  const poang = devicesByType(AccessoryTypes.lightbulb).find(
    (l) => l.instanceId === 65537
  ).lightList[0]

  poang.turnOn()
  poang.setColorTemperature(0, 0)
  poang.setBrightness(100, 0)
  res.send('Reset')
})

const deviceUpdated = (device: Accessory) => {
  context.devices.set(device.instanceId, device)
  console.log(
    `${device.name} updated! - ${device.instanceId} - ${
      (device.lightList ?? [{}])[0].dimmer
    }%`
  )
}

const deviceRemoved = (deviceId: number) => {
  console.log(`${context.devices.get(deviceId).name} removed!`)
  context.devices.delete(deviceId)
}

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  // Server Startup
  const gateway = await discoverGateway()

  context.client = new TradfriClient(gateway.addresses[0])

  const success = await context.client.connect(identity, psk)

  if (!success) {
    console.log('Could not successfilly connect to gateway')
    console.log('Gateway Information:\n', gateway)
  }

  context.client
    .on('device updated', deviceUpdated)
    .on('device removed', deviceRemoved)
    .observeDevices()

  console.log(`Server is running in http://localhost:${PORT}\n`)
})
