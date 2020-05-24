import { ID } from '@lineweight/types'
import {
  LaampGroup,
  LaampAdapterConfiguration,
  LaampGroupUpdatedEvent,
} from '@lineweight/laamp'

export const onGroupUpdated = (
  adapter: LaampAdapterConfiguration,
  event: LaampGroupUpdatedEvent
): LaampAdapterConfiguration => {
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

  return <LaampAdapterConfiguration>{
    ...adapter,
    groups: Array.from(deviceMap.values()),
  }
}
