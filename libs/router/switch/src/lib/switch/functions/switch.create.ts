import { numberToCharacter } from '../../util'
import { Switch } from '../types'

export interface CreateSwitchOptions {
  inputs: IoOptions
  outputs: IoOptions
}

interface IoOptions {
  number: number
  labels: LabelOptions
}

export enum LabelOptions {
  ALPHABETICAL,
  NUMERIC,
}

export const createSwitch = (options: CreateSwitchOptions): Switch => ({
  inputs: makeIo(options.inputs),
  outputs: makeIo(options.outputs),
  matrix: Array(options.outputs.number).fill(null),
})

const makeIo = (options: IoOptions) =>
  Array(options.number)
    .fill(null)
    .map((_, idx) => ({
      code:
        options.labels === LabelOptions.ALPHABETICAL
          ? numberToCharacter(idx)
          : (idx + 1).toString(),
    }))
