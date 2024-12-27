import { Board } from '@/app/Modules/Board'
import { Player } from '@/app/Modules/Player'
import { expect } from 'vitest'

describe('Board Class', () => {
  const board = new Board([new Player('ali', 'red'), new Player('hasan', 'blue')]) // Player 1
  test('Create bord cells', () => {
    expect(board.cells.length).toBe(40)
    expect(board.startAreas.length).toBe(4)
    expect(board.endAreas.length).toBe(4)
  })

  test('Check pieces move', () => {
    expect(board.isThereCollision(new Player('ali', 'red'), 5))
  })
})
