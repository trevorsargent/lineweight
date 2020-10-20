import { Injectable } from '@nestjs/common'

@Injectable()
export class CoreService {
  createSwitch(key: string, numInputs: number, numOutputs: number) {}
}

class Switch {
  // Input codes are numbers
  // Output codes are letters
  sources: Source[]
  matrix: Map<number, number>

  constructor(
    public readonly numInputs: number,
    public readonly numOutputs: number,
  ) {
    this.matrix = new Map<number, number>()
    this.sources = new Array(numInputs).fill(null)
  }

  setMatrix(input: string, output: string) {
    const inputIndex = Number.parseInt(input)
    const outputIndex = characterToNumber(output)

    if (inputIndex < 0 || inputIndex > this.numInputs - 1) {
      throw new Error('INVALID INPUT')
    }

    if (outputIndex < 0 || outputIndex > this.numOutputs - 1) {
      throw new Error('INVALID OUTPUT')
    }

    this.matrix.set(outputIndex, inputIndex)
  }
}

type Source = FeedSource | OutputSource

interface FeedSource {
  type: SourceType.FEED
  feedCode: string
}

interface OutputSource {
  type: SourceType.OUTPUT
  switchKey: string
  outputCode: string
}

enum SourceType {
  FEED,
  OUTPUT,
}

const A = 'A'.charCodeAt(0)

export const numberToCharacter = (number: number) =>
  String.fromCharCode(A + number)

export const characterToNumber = (character: string) =>
  character.charCodeAt(0) - A
