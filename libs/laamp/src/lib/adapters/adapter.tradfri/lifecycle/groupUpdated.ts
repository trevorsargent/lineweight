import { LaampAdapterSubject } from '../../../types'
import { GroupUpdatedCallback, Group } from 'node-tradfri-client'
import { LaampGroupUpdatedEvent } from '../../adapter/adapter.types'

export const groupUpdated = (
  groupUpdated$: LaampAdapterSubject
): GroupUpdatedCallback => (g: Group) => {
  const event: LaampGroupUpdatedEvent = {
    groupUpdated: true,
    groupId: g.instanceId.toString(),
    deviceIds: g.deviceIDs.map((id) => id.toString()),
    name: g.name,
  }
  groupUpdated$.next(event)
}
