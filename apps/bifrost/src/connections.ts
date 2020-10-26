import { uniq } from 'ramda'
import { Switcher } from './switcher'

export interface Connection {
  upstreamId: number
  upstreamOutput: number
  downstreamId: number
  downstreamInput: number
}

export const makeConnection = (
  switchers: Switcher[],
  connections: Connection[],
  upstreamId: number,
  upstreamInput: number,
  downstreamId: number,
  downstreamOutput: number,
): { sid: number; cmd: string }[] => {
  // identify the switchers
  const dsSwitcher = switchers.find((sw) => sw.id === downstreamId)
  const usSwitcher = switchers.find((sw) => sw.id === upstreamId)

  // limit our concern to the connections between them
  const relevantConnections = connections.filter(
    (con) =>
      con.upstreamId === usSwitcher.id && con.downstreamId === dsSwitcher.id,
  )

  const availableConnections = relevantConnections.filter(
    (con) => !dsSwitcher.isInputInUse(con.downstreamInput),
  )

  const preExistingConnection = relevantConnections.find(
    (con) => usSwitcher.getMatrix(con.upstreamOutput) === upstreamInput,
  )

  const connection =
    preExistingConnection ?? availableConnections.slice(0, 1).pop()

  if (!connection) {
    console.log('cannot make connection')
    console.dir(availableConnections)
    return []
  }

  const uscmd = usSwitcher.setMatrix(connection.upstreamOutput, upstreamInput)

  const dscmd = dsSwitcher.setMatrix(
    downstreamOutput,
    connection.downstreamInput,
  )

  return [
    { sid: usSwitcher.id, cmd: uscmd },
    { sid: dsSwitcher.id, cmd: dscmd },
  ]
}

export const connections: Connection[] = [
  {
    upstreamId: 1,
    upstreamOutput: 1,
    downstreamId: 3,
    downstreamInput: 1,
  },
  {
    upstreamId: 1,
    upstreamOutput: 2,
    downstreamId: 3,
    downstreamInput: 2,
  },
  {
    upstreamId: 1,
    upstreamOutput: 3,
    downstreamId: 3,
    downstreamInput: 3,
  },
  {
    upstreamId: 1,
    upstreamOutput: 4,
    downstreamId: 3,
    downstreamInput: 4,
  },
  {
    upstreamId: 2,
    upstreamOutput: 1,
    downstreamId: 3,
    downstreamInput: 5,
  },
  {
    upstreamId: 2,
    upstreamOutput: 5,
    downstreamId: 3,
    downstreamInput: 6,
  },
  {
    upstreamId: 2,
    upstreamOutput: 3,
    downstreamId: 3,
    downstreamInput: 7,
  },
  {
    upstreamId: 2,
    upstreamOutput: 4,
    downstreamId: 3,
    downstreamInput: 8,
  },
]
