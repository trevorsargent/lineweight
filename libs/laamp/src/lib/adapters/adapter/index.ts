import { Observable } from 'rxjs'
import { scan } from 'rxjs/operators'
import {
  LaampGatewayEvent,
  LaampDeviceUpdatedEvent,
  LaampGroupUpdatedEvent,
} from './adapter.types'
import { LaampAdapterConfiguration } from '../../types'
import { adapterEvents$ } from '../adapter.tradfri'
import { onDeviceUpdated } from './lifecycle/onDeviceUpdated'
import { onGroupUpdated } from './lifecycle/onGroupUpdated'

export const config$ = ({
  identity,
  psk,
}): Observable<LaampAdapterConfiguration> => {
  return adapterEvents$({ identity, psk }).pipe(
    scan(scanForConfig, { devices: [], groups: [] })
  )
}

const scanForConfig = (
  adapter: LaampAdapterConfiguration,
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
