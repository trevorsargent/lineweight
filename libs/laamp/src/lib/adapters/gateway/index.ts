import { Observable, of, combineLatest } from 'rxjs'
import { scan, map } from 'rxjs/operators'
import {
  LaampGatewayEvent,
  LaampDeviceUpdatedEvent,
  LaampGroupUpdatedEvent,
} from '../gateway.types'
import {
  LaampGatewayConfiguration,
  Laamp,
  LaampDevice,
  LaampChannel,
} from '../../types'
import { gatewayEvents$ } from '../gateway.tradfri'
import { onDeviceUpdated } from './events/onDeviceUpdated'
import { onGroupUpdated } from './events/onGroupUpdated'

export const connect = ({ identity, psk }): Observable<Laamp> => {
  return config$({ identity, psk }).pipe(
    map<LaampGatewayConfiguration, Laamp>(
      (config: LaampGatewayConfiguration) => ({
        gateways: [],
        channels: config.devices.map<LaampChannel>((d: LaampDevice) => ({
          id: d.id,
          devices: [d],
        })),
      })
    )
  )
}

export const config$ = ({
  identity,
  psk,
}): Observable<LaampGatewayConfiguration> => {
  return gatewayEvents$({ identity, psk }).pipe(
    scan(scanForConfig, { devices: [], groups: [] })
  )
}

const scanForConfig = (
  adapter: LaampGatewayConfiguration,
  event: LaampGatewayEvent
) => {
  // DEVICE UPDATED
  if ((event as LaampDeviceUpdatedEvent).deviceUpdated) {
    return onDeviceUpdated(adapter, event as LaampDeviceUpdatedEvent)
  }
  // GROUP UPDATED
  if ((event as LaampGroupUpdatedEvent).groupUpdated) {
    return onGroupUpdated(adapter, event as LaampGroupUpdatedEvent)
  }
}
