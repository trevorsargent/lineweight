import { Subject } from 'rxjs'
import { OscEvent } from './types'
import { v4 as uuid } from 'uuid'

export const processMessage = (subject: Subject<OscEvent>) => (
  msg: string[]
) => {
  const address = msg[0].split('/').filter((x) => !!x)
  const args = msg.slice(1)

  const event: OscEvent = {
    id: uuid(),
    address,
    args,
  }

  subject.next(event)
}
