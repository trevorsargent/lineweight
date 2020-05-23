import { LaampAdapterSubject } from '@lineweight/laamp'

export const deviceRemoved = (deviceRemoved$: LaampAdapterSubject) => (
  deviceId: number
) => {
  deviceRemoved$.next({
    deviceRemoved: true,
    deviceId: deviceId.toString(),
  })
}
