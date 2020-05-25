import { LaampEventSubject } from '@lineweight/laamp'
import { GroupRemovedCallback } from 'node-tradfri-client'

export const groupRemoved = (
  groupRemoved$: LaampEventSubject
): GroupRemovedCallback => (groupId) => {
  groupRemoved$.next({
    groupRemoved: true,
    groupId: groupId.toString(),
  })
}
