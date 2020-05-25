import { ID } from '@lineweight/types'
import {
  LaampGroup,
  LaampGatewayConfiguration,
  LaampGroupUpdatedEvent,
} from '@lineweight/laamp'

export const onGroupUpdated = (
  adapter: LaampGatewayConfiguration,
  event: LaampGroupUpdatedEvent
): LaampGatewayConfiguration => {
  const { groupId, deviceIds, name } = event

  const group: LaampGroup = {
    groupId,
    name,
    deviceIds,
  }

  const deviceMap = adapter.groups.reduce((m, g) => {
    m.set(g.groupId, g)
    return m
  }, new Map<ID, LaampGroup>())

  deviceMap.set(groupId, group)

  return <LaampGatewayConfiguration>{
    ...adapter,
    groups: Array.from(deviceMap.values()),
  }
}
