import { LaampAdapterSubject } from '@lineweight/laamp'
import { GroupRemovedCallback } from 'node-tradfri-client'

export const groupRemoved = (
  groupRemoved$: LaampAdapterSubject
): GroupRemovedCallback => (groupId) => {
  groupRemoved$.next({
    groupRemoved: true,
    groupId: groupId.toString(),
  })
}
