import { createSwitch, LabelOptions } from '../switch.create'

describe('createSwitch', () => {
  it('constructs a switch', () => {
    const monoprice8x8 = createSwitch({
      inputs: { labels: LabelOptions.ALPHABETICAL, number: 8 },
      outputs: { labels: LabelOptions.NUMERIC, number: 8 },
    })

    expect(monoprice8x8.outputs).toEqual([
      { code: '1' },
      { code: '2' },
      { code: '3' },
      { code: '4' },
      { code: '5' },
      { code: '6' },
      { code: '7' },
      { code: '8' },
    ])

    expect(monoprice8x8.inputs).toEqual([
      { code: 'A' },
      { code: 'B' },
      { code: 'C' },
      { code: 'D' },
      { code: 'E' },
      { code: 'F' },
      { code: 'G' },
      { code: 'H' },
    ])
  })
})
