import { LaampEventSubject } from '@lineweight/laamp'

export const deviceRemoved = (deviceRemoved$: LaampEventSubject) => (
  deviceId: number
) => {
  deviceRemoved$.next({
    deviceRemoved: true,
    deviceId: deviceId.toString(),
  })
}
