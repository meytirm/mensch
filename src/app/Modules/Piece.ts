import type { Color } from '@/app/constants/colors'
import { colors } from '@/app/constants/colors'

type PieceState = 'inHome' | 'inBoard' | 'inStart'

export interface PieceI {
  state: PieceState
  steps: number
  color: Color
  position: number
  canItMove: boolean
  startPosition: number

  movedPiece(steps: number, state: PieceState): void
}

class Piece implements PieceI {
  state: PieceState
  steps: number
  color: Color
  position: number
  canItMove: boolean
  startPosition: number

  constructor(color: Color, position: number) {
    this.state = 'inStart'
    this.steps = 0
    this.color = color
    this.position = position
    this.canItMove = false

    const startAreaIndex = colors.findIndex((itemColor) => itemColor === color)
    this.startPosition = startAreaIndex * 10
  }

  movedPiece(rolledDice: number, state: PieceState) {
    this.steps += rolledDice
    this.state = state
  }
}

export { Piece }
