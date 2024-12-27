import { Player, type PlayerI } from '@/app/Modules/Player'
import { Board, type BoardI } from '@/app/Modules/Board'
import type { PieceI } from '@/app/Modules/Piece'
import type { Color } from '@/app/constants/colors'

export interface MenschGameI {
  players: PlayerI[]
  board: BoardI
  rollDice(): void
  allPieceHasCollision(): boolean
  playTurn(piece: PieceI): void
  nextTurn(): void
  handleCurrentTurn(): void
  isRolled: boolean
  rolledDice: number
}

class MenschGame implements MenschGameI {
  board: BoardI
  players: PlayerI[]
  currentPlayerIndex: number
  isRolled: boolean
  rolledDice: number
  constructor(players: { name: string; color: Color }[]) {
    this.players = players.map((player) => new Player(player.name, player.color))
    this.board = new Board(this.players)
    this.currentPlayerIndex = 0
    this.isRolled = false
    this.rolledDice = 1
  }

  rollDice() {
    this.rolledDice = Math.floor(Math.random() * 6) + 1
  }

  allPieceHasCollision(): boolean {
    return this.players[this.currentPlayerIndex].pieces.every((piece) => !piece.canItMove)
  }

  nextTurn() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length
  }

  handleCurrentTurn() {
    if (this.isRolled) return
    this.isRolled = true
    this.rollDice()
    this.board.setPiecesMoveAllow(this.players[this.currentPlayerIndex], this.rolledDice)
    if (this.allPieceHasCollision()) {
      if (this.rolledDice < 6) {
        this.nextTurn()
      }
      this.isRolled = false
    }
  }

  playTurn(piece: PieceI) {
    if (!this.isRolled) return
    if (this.players[this.currentPlayerIndex].color !== piece.color || !piece.canItMove) return
    this.board.setPlayerPiecesAllowToDenied(this.players[this.currentPlayerIndex])
    if (this.rolledDice === 6) {
      this.board.movePiece(piece, this.rolledDice)
    } else {
      this.board.movePiece(piece, this.rolledDice)
      this.nextTurn()
    }
    this.isRolled = false
    this.checkWinner()
  }

  checkWinner() {
    const winner = this.board.endAreas.find((endArea) => endArea.cells.every((cell) => !!cell))
    if (winner) {
      console.log(winner.color)
    }
  }
}

export { MenschGame }
