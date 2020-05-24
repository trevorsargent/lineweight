import { discoverGateway, TradfriClient } from 'node-tradfri-client'
import { from, Observable, Subject, merge } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import {
  LaampErrorEvent,
  LaampDeviceUpdatedEvent,
  LaampDeviceRemovedEvent,
  LaampGroupUpdatedEvent,
  LaampGroupRemovedEvent,
  LaampGatewayEvent,
} from '../adapter.types'
import { deviceUpdated } from './lifecycle/deviceUpdated'
import { deviceRemoved } from './lifecycle/deviceRemoved'
import { error } from './lifecycle/error'
import { groupUpdated } from './lifecycle/groupUpdated'
import { groupRemoved } from './lifecycle/groupRemoved'

const TRADFRI_ID = 'tradfri'

const gateway$ = () => from(discoverGateway(1000))
// Maybe This?
//
// switchMap((gateway) => {
//   if (!gateway) {
//     return from(discoverGateway(1000)).pipe(
//       tap((_) => console.log('trying again'))
//     )
//   }
//   return of(gateway)
// }),
// catchError((_) => of('Error Connecting, Retrying'))
//
// ALSO MAYBE THIS ?
//
// try {
//     await tradfri.connect(identity, psk);
// } catch (e: TradfriError) {
//     // handle error
//     switch (e.code) {
//         case TradfriErrorCodes.ConnectionTimedOut: {
//             // The gateway is unreachable or did not respond in time
//         }
//         case TradfriErrorCodes.AuthenticationFailed: {
//             // The provided credentials are not valid. You need to re-authenticate using `authenticate()`.
//         }
//         case TradfriErrorCodes.ConnectionFailed: {
//             // An unknown error happened while trying to connect
//         }
//     }
// }

export const adapterEvents$ = ({ identity, psk }) => {
  return gateway$().pipe(
    map((gateway) => new TradfriClient(gateway.addresses[0])),
    switchMap<TradfriClient, Observable<LaampGatewayEvent>>((client) => {
      return from(client.connect(identity, psk)).pipe(
        switchMap<boolean, Observable<LaampGatewayEvent>>((success) => {
          if (!success) {
            throw 1
          }

          const deviceUpdated$ = new Subject<LaampDeviceUpdatedEvent>()
          const deviceRemoved$ = new Subject<LaampDeviceRemovedEvent>()

          const error$ = new Subject<LaampErrorEvent>()

          client
            .on('device updated', deviceUpdated(deviceUpdated$))
            .on('device removed', deviceRemoved(deviceRemoved$))
            .on('error', error(error$))
            .observeDevices()

          const groupUpdated$ = new Subject<LaampGroupUpdatedEvent>()
          const groupRemoved$ = new Subject<LaampGroupRemovedEvent>()

          client
            .on('group updated', groupUpdated(groupUpdated$))
            .on('group removed', groupRemoved(groupRemoved$))
            .on('error', error(error$))
            .observeGroupsAndScenes()

          return merge(
            deviceUpdated$,
            deviceRemoved$,
            groupUpdated$,
            groupRemoved$
          )
        })
      )
    })
  )
}
