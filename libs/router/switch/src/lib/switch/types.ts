export class Switch {
  inputs: SwitchInput[]
  outputs: SwitchOutput[]
  matrix: number[]
}

export interface SwitchInput {
  code: string
}

export interface SwitchOutput {
  code: string
}
