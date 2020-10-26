import { Switcher, switchers } from './switcher'
import { connections, makeConnection } from './connections'
describe('switcher', () => {
  it('can do the thing', () => {
    expect(makeConnection(switchers, connections, 1, 1, 3, 5)).toEqual({
      1: 'a1',
      3: 'e1',
    })

    expect(makeConnection(switchers, connections, 1, 2, 3, 4)).toEqual({
      1: 'b2',
      3: 'd2',
    })

    expect(makeConnection(switchers, connections, 1, 3, 3, 1)).toEqual({
      1: 'c3',
      3: 'a3',
    })

    expect(makeConnection(switchers, connections, 2, 1, 3, 8)).toEqual({
      2: 'a1',
      3: 'h5',
    })

    expect(makeConnection(switchers, connections, 2, 2, 3, 8)).toEqual({
      2: 'a2',
      3: 'h5',
    })

    expect(makeConnection(switchers, connections, 2, 2, 3, 7)).toEqual({
      2: 'a2',
      3: 'g5',
    })

    expect(makeConnection(switchers, connections, 2, 2, 3, 6)).toEqual({
      2: 'a2',
      3: 'f5',
    })
    expect(makeConnection(switchers, connections, 2, 2, 3, 5)).toEqual({
      2: 'a2',
      3: 'e5',
    })
    expect(makeConnection(switchers, connections, 1, 3, 3, 8)).toEqual({
      1: 'c3',
      3: 'h3',
    })
    expect(makeConnection(switchers, connections, 1, 7, 3, 1)).toEqual({
      1: 'a7',
      3: 'a1',
    })

    // expect(makeConnection(switchers, connections, 1, 1, 3, 5)).toEqual({
    //   1: 'a1',
    //   3: 'e1',
    // })
  })
})
