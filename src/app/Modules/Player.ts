import type { PieceI } from '@/app/Modules/Piece'
import { Piece } from '@/app/Modules/Piece'
import type { Color } from '@/app/constants/colors'
type Pieces = [PieceI, PieceI, PieceI, PieceI]

export interface PlayerI {
  name: string
  color: Color
  pieces: Pieces
}

class Player implements PlayerI {
  name: string
  color: Color
  pieces: Pieces

  constructor(name: string, color: Color) {
    this.name = name
    this.color = color

    this.pieces = Array.from({ length: 4 }).map((_, index) => new Piece(color, index)) as Pieces
  }
}

export { Player }
