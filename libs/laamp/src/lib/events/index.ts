import { LaampEvent } from '../types'
import { Subject } from 'rxjs'

export const events$ = new Subject<LaampEvent>()

export const publishEvent = (event: LaampEvent) => {
  events$.next(event)
}
