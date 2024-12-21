interface MenschPlayer {
  userName: string
  color: string
  menschSaveCoordinates: [number, number][]
  menschStarter: { coordinate: [number, number]; color: string }
  menschHome: [number, number][]
  finishIndex: number
}

const menschPlayer: MenschPlayer[] = [
  {
    userName: 'user1',
    color: 'red',
    menschSaveCoordinates: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ],
    menschStarter: { coordinate: [1, 5], color: '#faa' },
    menschHome: [
      [2, 6],
      [3, 6],
      [4, 6],
      [5, 6]
    ],
    finishIndex: 29
  },
  {
    userName: 'user2',
    color: 'blue',
    menschSaveCoordinates: [
      [10, 1],
      [11, 1],
      [10, 2],
      [11, 2]
    ],
    menschStarter: { coordinate: [7, 1], color: '#b9b9ff' },
    menschHome: [
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5]
    ],
    finishIndex: 39
  },
  {
    userName: 'user3',
    color: 'yellow',
    menschSaveCoordinates: [
      [1, 10],
      [2, 10],
      [1, 11],
      [2, 11]
    ],
    menschStarter: { coordinate: [5, 11], color: '#ffffb4' },
    menschHome: [
      [6, 7],
      [6, 8],
      [6, 9],
      [6, 10]
    ],
    finishIndex: 19
  },
  {
    userName: 'user4',
    color: 'green',
    menschSaveCoordinates: [
      [10, 10],
      [11, 10],
      [11, 11],
      [10, 11]
    ],
    menschStarter: { coordinate: [11, 7], color: '#b9ffb9' },
    menschHome: [
      [7, 6],
      [8, 6],
      [9, 6],
      [10, 6]
    ],
    finishIndex: 9
  }
]

export default menschPlayer
