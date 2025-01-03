import { type PieceI } from '@/app/Modules/Piece'
import type { Player, PlayerI } from '@/app/Modules/Player'
import { BoardSafeArea, type BoardSafeAreaI } from '@/app/Modules/BoardSafeArea'
import { mapSafePlace } from '@/app/utils/utils'
import { type Color, colors } from '@/app/constants/colors'

type BoardCellType = null | PieceI
export type FourCells = [BoardCellType, BoardCellType, BoardCellType, BoardCellType]
export type AreaType = 'startArea' | 'endArea'

export type PlayerSafes = [BoardSafeAreaI, BoardSafeAreaI, BoardSafeAreaI, BoardSafeAreaI]

export interface BoardI {
  cells: BoardCellType[]
  startAreas: PlayerSafes
  endAreas: PlayerSafes

  setPiecesMoveAllow(player: PlayerI, rolledDice: number): void
  movePiece(piece: PieceI, rolledDice: number): void
  getPlayerStartArea(color: Color): BoardSafeArea
  findNextCell(piece: PieceI, rolledDice: number): BoardCellType
  knockPiece(nextCell: PieceI): void
  setPlayerPiecesAllowToDenied(player: PlayerI): void
}

class Board implements BoardI {
  cells: BoardCellType[]
  startAreas: PlayerSafes
  endAreas: PlayerSafes
  boardCellsLength: 40

  constructor(players: Player[]) {
    this.boardCellsLength = 40
    this.cells = Array(this.boardCellsLength).fill(null)
    this.startAreas = mapSafePlace('startArea')
    this.endAreas = mapSafePlace('endArea')

    colors.forEach((color, index) => {
      const player = players.find((player) => player.color === color)
      if (player) {
        this.startAreas[index].cells = player.pieces.map((piece) => piece) as FourCells
      }
    })
  }
  knockPiece(nextCell: PieceI) {
    const startArea = this.getPlayerStartArea(nextCell.color)
    const emptyCellIndex = startArea.cells.findIndex((cell) => cell === null)
    nextCell.steps = 0
    nextCell.position = emptyCellIndex
    startArea.cells[emptyCellIndex] = nextCell
    nextCell.state = 'inStart'
  }

  setPlayerPiecesAllowToDenied(player: PlayerI) {
    player.pieces.forEach((piece) => (piece.canItMove = false))
  }

  getPlayerStartArea(color: Color) {
    return this.startAreas.find((startArea) => startArea.color === color)!
  }

  getPlayerEndArea(color: Color) {
    return this.endAreas.find((endArea) => endArea.color === color)!
  }
  movePiece(piece: PieceI, rolledDice: number) {
    if (piece.state === 'inStart' && rolledDice === 6) {
      const startArea = this.getPlayerStartArea(piece.color)
      startArea.cells[piece.position] = null
      const nextCell = this.cells[piece.startPosition]
      if (nextCell) {
        this.knockPiece(nextCell)
      }
      this.cells[piece.startPosition] = piece
      piece.steps = 1
      piece.position = piece.startPosition
      piece.state = 'inBoard'
    } else if (piece.state === 'inBoard') {
      this.cells[piece.position] = null
      if (piece.steps + rolledDice <= this.boardCellsLength) {
        const nextPosition = (piece.position + rolledDice) % this.boardCellsLength
        const nextCell = this.cells[nextPosition]
        if (nextCell) {
          this.knockPiece(nextCell)
        }
        this.cells[nextPosition] = piece
        piece.position = nextPosition
      } else {
        const nextPosition = piece.steps + rolledDice - this.boardCellsLength - 1
        const endArea = this.getPlayerEndArea(piece.color)
        endArea.cells[nextPosition] = piece
        piece.position = nextPosition
        piece.state = 'inHome'
      }
      piece.steps += rolledDice
    } else if (piece.state === 'inHome') {
      const endArea = this.getPlayerEndArea(piece.color)
      endArea.cells[piece.position] = null
      endArea.cells[piece.position + rolledDice] = piece
      piece.steps += rolledDice
      piece.position += rolledDice
    }
  }

  findNextCell(piece: PieceI, rolledDice: number): BoardCellType {
    const nextPosition = (piece.position + rolledDice) % this.boardCellsLength
    let nextCell: BoardCellType = this.cells[nextPosition]
    const isNextPositionOverBoard = piece.steps + rolledDice > this.boardCellsLength
    if (isNextPositionOverBoard && piece.steps + rolledDice <= 44) {
      const endArea = this.endAreas.find((endArea) => endArea.color === piece.color)!
      nextCell = endArea.cells[(piece.steps + rolledDice - 1) % this.boardCellsLength]
    } else if (piece.steps + rolledDice > 44) {
      piece.canItMove = false
    }
    return nextCell
  }

  setPiecesMoveAllow(player: PlayerI, rolledDice: number) {
    player.pieces.forEach((piece) => {
      piece.canItMove = false
      if (piece.state === 'inStart' && rolledDice === 6) {
        piece.canItMove = true
        const pieceStartPositionOnCell = this.cells[piece.startPosition]
        if (pieceStartPositionOnCell) {
          piece.canItMove = pieceStartPositionOnCell.color !== piece.color
        }
      } else if (piece.state === 'inBoard') {
        piece.canItMove = true
        const nextCell = this.findNextCell(piece, rolledDice)
        console.log(nextCell)
        if (nextCell) {
          piece.canItMove = nextCell.color !== piece.color
        }
      } else if (piece.state === 'inHome') {
        const nextPosition = piece.position + rolledDice
        if (nextPosition <= 3) {
          const endArea = this.endAreas.find((endArea) => endArea.color === piece.color)!
          const nextPositionOnHome = endArea.cells[nextPosition]
          piece.canItMove = !nextPositionOnHome
        }
      }
    })
  }
}

export { Board }
