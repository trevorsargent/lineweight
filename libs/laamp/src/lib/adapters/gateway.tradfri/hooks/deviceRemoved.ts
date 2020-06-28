import { LaampGatewayEventSubject } from '@lineweight/laamp'

export const deviceRemoved = (deviceRemoved$: LaampGatewayEventSubject) => (
  deviceId: number,
) => {
  deviceRemoved$.next({
    type: 'deviceRemoved',
    deviceId: deviceId.toString(),
  })
}
