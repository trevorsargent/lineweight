import { LaampGatewayEventSubject } from '@lineweight/laamp'
import { GroupRemovedCallback } from 'node-tradfri-client'

export const groupRemoved = (
  groupRemoved$: LaampGatewayEventSubject,
): GroupRemovedCallback => (groupId) => {
  groupRemoved$.next({
    type: 'groupRemoved',
    groupId: groupId.toString(),
  })
}
