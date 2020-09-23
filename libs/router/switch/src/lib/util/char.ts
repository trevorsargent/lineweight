const A = 'A'.charCodeAt(0)

export const numberToCharacter = (number: number) =>
  String.fromCharCode(A + number)

export const characterToNumber = (character: string) =>
  character.charCodeAt(0) - A
