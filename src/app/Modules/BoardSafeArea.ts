import type { Color } from '@/app/types'
import type { AreaType, FourCells } from '@/app/Modules/Board'
import type { Player } from '@/app/Modules/Player'

export interface BoardSafeAreaI {
  color: Color
  areaType: AreaType
  cells: FourCells

  setStartPieces(players: Player[]): void
}

class BoardSafeArea implements BoardSafeAreaI {
  color: Color
  areaType: AreaType
  cells: FourCells

  constructor(color: Color, areaType: AreaType) {
    this.color = color
    this.areaType = areaType
    this.cells = Array(4).fill(null) as FourCells
  }
}

export { BoardSafeArea }
