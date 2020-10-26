import { Subject } from 'rxjs'

export const toLetter = (n: number) => String.fromCharCode(97 + n)
export const toNumber = (n: string) => n.charCodeAt(0) - 97

export class Switcher {
  private matrix: number[]

  constructor(public id: number, private inputs: number, outputs: number) {
    this.matrix = new Array(outputs).fill(null)
  }

  clearState() {
    this.matrix.fill(null)
  }

  setMatrix(outputNum: number, inputNum: number): string {
    if (inputNum < 1 || inputNum > this.inputs) {
      throw new Error('input out of bounds')
    }

    if (outputNum < 1 || outputNum > this.matrix.length) {
      throw new Error('output out of bounds')
    }

    this.matrix[outputNum - 1] = inputNum

    return `${toLetter(outputNum - 1)}${inputNum}`
  }

  getMatrix(outputNum: number): number {
    return this.matrix[outputNum - 1]
  }

  hasUniqueSelection(outputNum: number) {
    if (!this.getMatrix(outputNum)) {
      return false
    }
    return (
      this.matrix.filter((num) => num === this.getMatrix(outputNum)).length ===
      1
    )
  }

  isInputInUse(inputNum: number): boolean {
    return this.matrix.includes(inputNum)
  }

  getUnusedInputs(): number[] {
    return [1, 2, 3, 4, 5, 6, 7, 8].filter((num) => !this.matrix.includes(num))
  }
}

export const switchers = [
  new Switcher(1, 8, 8),
  new Switcher(2, 8, 8),
  new Switcher(3, 8, 8),
]
