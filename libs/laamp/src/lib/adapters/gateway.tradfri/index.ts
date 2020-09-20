import { discoverGateway, TradfriClient } from 'node-tradfri-client'
import { from, Observable, Subject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { LaampGatewayEvent } from '../gateway.types'
import { deviceRemoved } from './hooks/deviceRemoved'
import { deviceUpdated } from './hooks/deviceUpdated'
import { error } from './hooks/error'
import { groupRemoved } from './hooks/groupRemoved'
import { groupUpdated } from './hooks/groupUpdated'

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

export const gatewayEvents$ = ({ identity, psk }) => {
  return gateway$().pipe(
    map((gateway) => new TradfriClient(gateway.addresses[0])),
    switchMap<TradfriClient, Observable<LaampGatewayEvent>>((client) => {
      return from(client.connect(identity, psk)).pipe(
        switchMap<boolean, Observable<LaampGatewayEvent>>((success) => {
          if (!success) {
            throw 1
          }

          const events$ = new Subject<LaampGatewayEvent>()

          client
            .on('device updated', deviceUpdated(events$))
            .on('device removed', deviceRemoved(events$))
            .on('error', error(events$))
            .observeDevices()

          client
            .on('group updated', groupUpdated(events$))
            .on('group removed', groupRemoved(events$))
            .on('error', error(events$))
            .observeGroupsAndScenes()

          return events$
        }),
      )
    }),
  )
}
