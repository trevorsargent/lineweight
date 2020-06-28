import { LaampEvent } from '../types'
import { Subject } from 'rxjs'

export const events$ = new Subject<LaampEvent>()
