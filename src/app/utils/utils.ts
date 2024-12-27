import type { Color } from '@/app/types'
import { BoardSafeArea } from '@/app/Modules/BoardSafeArea'
import type { AreaType, PlayerSafes } from '@/app/Modules/Board'
import { colors } from '@/app/constants/colors'

const createSafePlace = (color: Color, areaType: AreaType) => new BoardSafeArea(color, areaType)
export const mapSafePlace = (areaType: AreaType) =>
  Array.from(colors).map((value) => createSafePlace(value, areaType)) as PlayerSafes
