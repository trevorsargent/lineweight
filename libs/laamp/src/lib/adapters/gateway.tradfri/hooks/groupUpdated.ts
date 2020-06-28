import {
  LaampGatewayEventSubject,
  LaampGatewayConfiguration,
} from '../../../types'
import { GroupUpdatedCallback, Group } from 'node-tradfri-client'
import { LaampGatewayEvent } from '../../gateway.types'

export const groupUpdated = (
  groupUpdated$: LaampGatewayEventSubject,
): GroupUpdatedCallback => (g: Group) => {
  const event: LaampGatewayEvent = {
    type: 'groupUpdated',
    group: {
      deviceIds: g.deviceIDs.map((x) => x.toString()),
      id: g.instanceId.toString(),
      name: g.name,
    },
  }
  groupUpdated$.next(event)
}
