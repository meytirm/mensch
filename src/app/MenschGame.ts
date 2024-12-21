// Plan
interface PlayerData {
  id: number
  name: string
  color: string
  piecesNumber: number
  startPosition: number
}

interface IGame {
  players: IPlayer[]
  board: IBoard
  currentTurn: number
  isDiceRolled: boolean
  diceRoll: number

  start(): void
  rollDice(): number
  playTurn(): void
  movePiece(piece: IPiece): void
  checkWinner(): IPlayer | null
}

interface IBoard {
  spaces: (IPiece | null)[] // Array to represent board spaces, either empty or occupied by a piece
  size: number

  isSpaceFree(position: number): boolean
  movePiece(piece: IPiece, newPosition: number): void
}

interface IPlayer {
  id: number
  name: string
  color: string
  pieces: IPiece[]
  startPosition: number // Where the player must start on board
  homeCells: (IPiece | null)[] // It's a place for each player to win game with fill it

  isCollisionInBoard(piece: IPiece, diceRoll: number, board: IBoard, players: IPlayer[]): boolean
  isCollisionWithHome(piece: IPiece, diceRoll: number, board: IBoard, players: IPlayer[]): boolean
  isCollisionInHome(piece: IPiece, diceRoll: number, players: IPlayer[]): boolean
  setPiecesAllowToMove(diceRoll: number, board: IBoard, players: IPlayer[]): void
  hasWon(): boolean
}

interface IPiece {
  position: number // Current position on the board
  index: number // Player piece index(number)
  steps: number // All steps that piece moved
  playerId: number
  _allowToMove: boolean

  get allowToMove(): boolean
  set allowToMove(allowToMove: boolean)

  move(newPosition: number): void // Move piece to new position on board
}

// Implementation

class Piece implements IPiece {
  position: number
  index: number
  steps: number
  playerId: number
  _allowToMove: boolean

  constructor(index: number, playerId: number) {
    this.position = -1
    this.index = index
    this.steps = 0
    this.playerId = playerId
    this._allowToMove = false
  }

  get allowToMove(): boolean {
    return this._allowToMove
  }

  set allowToMove(value: boolean) {
    this._allowToMove = value
  }

  move(newPosition: number): void {
    this.position = newPosition
  }
}

class Player implements IPlayer {
  id: number
  name: string
  color: string
  pieces: IPiece[]
  homeCells: (IPiece | null)[]
  startPosition: number

  constructor(player: PlayerData) {
    const { id, name, color, piecesNumber, startPosition } = player
    this.id = id
    this.name = name
    this.color = color
    this.startPosition = startPosition

    this.pieces = Array.from({ length: piecesNumber }, (_, index: number) => new Piece(index, id))
    this.homeCells = Array(piecesNumber).fill(null)
  }

  isCollisionInBoard(piece: IPiece, diceRoll: number, board: IBoard, players: IPlayer[]): boolean {
    const newPosition = piece.position + diceRoll
    const newPositionOnBoard = board.spaces[newPosition]

    if (newPositionOnBoard) {
      if (piece.playerId === this.id) {
        return true
      } else {
        for (const player of players) {
          const playerStartPositionSpace = board.spaces[player.startPosition]
          if (playerStartPositionSpace) {
            return playerStartPositionSpace.playerId === player.id
          }
        }
      }
    }
    return false
  }

  isCollisionWithHome(piece: IPiece, diceRoll: number): boolean {
    if (piece.steps + diceRoll > 40) {
      const homeCellIndex = piece.steps + diceRoll - 40 - 1
      return !!(this.homeCells[homeCellIndex] || homeCellIndex > 3)
    }
    return false
  }

  isCollisionInHome(piece: IPiece, diceRoll: number, players: IPlayer[]): boolean {
    if (piece.steps + diceRoll > 44) {
      return true
    } else {
      const player = players.find((player) => player.id === piece.playerId)!
      return !!player.homeCells[piece.steps - 40 + (diceRoll - 1)]
    }
  }

  setPiecesAllowToMove(diceRoll: number, board: IBoard, players: IPlayer[]): void {
    for (const piece of this.pieces) {
      if (piece.steps > 0 && piece.steps <= 40) {
        piece.allowToMove = !(
          this.isCollisionInBoard(piece, diceRoll, board, players) ||
          this.isCollisionWithHome(piece, diceRoll)
        )
      } else if (piece.steps > 40) {
        piece.allowToMove = !this.isCollisionInHome(piece, diceRoll, players)
      } else {
        const playerStartPositionSpace = board.spaces[piece.position]
        if (playerStartPositionSpace) {
          piece.allowToMove = !(playerStartPositionSpace.playerId === this.id)
        } else {
          piece.allowToMove = diceRoll === 6
        }
      }
    }
  }

  hasWon(): boolean {
    return this.homeCells.every((cell) => cell !== null) // Winning position
  }
}

class Board implements IBoard {
  spaces: (IPiece | null)[]
  size: number

  constructor(size: number = 40) {
    this.size = size
    this.spaces = Array(size).fill(null)
  }

  isSpaceFree(position: number): boolean {
    return this.spaces[position] === null
  }

  movePiece(piece: IPiece, diceRoll: number) {
    const newPosition = piece.position + diceRoll
    if (this.isSpaceFree(newPosition)) {
      this.spaces[piece.position] = null // Clear old position
      this.spaces[newPosition] = piece // Place piece in the new position
      piece.move(newPosition) // Update piece position
      piece.steps += diceRoll
    } else {
      this.spaces[piece.position]?.move(-1)
      this.spaces[piece.position] = null // Clear old position
      this.spaces[newPosition] = piece // Place piece in the new position
    }
  }
}

class Game implements IGame {
  players: IPlayer[]
  board: IBoard
  currentTurn: number
  isDiceRolled: boolean
  diceRoll: number

  constructor(players: PlayerData[]) {
    this.board = new Board()
    this.players = players.map((player) => new Player(player))
    this.currentTurn = 0
    this.isDiceRolled = false
    this.diceRoll = 1
  }

  rollDice(): number {
    return Math.floor(Math.random() * 6) + 1 // Random number between 1 and 6
  }

  playTurn(): void {
    if (this.isDiceRolled) {
      return
    }
    const player = this.players[this.currentTurn]
    console.log(player.name)
    this.diceRoll = this.rollDice()
    this.isDiceRolled = true
    // console.log(`Player ${player.id} rolled a ${this.diceRoll}`)
    // const moved = player.movePiece(this.diceRoll, this.board)
    player.setPiecesAllowToMove(this.diceRoll, this.board, this.players)
    if (!player.pieces.some((piece) => piece.allowToMove) && this.diceRoll < 6) {
      this.currentTurn = (this.currentTurn + 1) % this.players.length
      this.isDiceRolled = false
    }

    // if (player.hasWon()) {
    //   console.log(`Player ${player.id} wins!`)
    //   process.exit(0)
    // }
  }

  movePiece(piece: IPiece): void {
    const player = this.players[this.currentTurn]
    if (!this.isDiceRolled) {
      return
    }
    if (this.diceRoll < 6) {
      this.currentTurn = (this.currentTurn + 1) % this.players.length
    }
    if (
      piece.steps >= 41 &&
      this.diceRoll + piece.steps >= 42 &&
      this.diceRoll + piece.steps <= 44
    ) {
      const player = this.players[this.currentTurn]
      player.homeCells[piece.steps - 40 - 1] = null
      player.homeCells[piece.steps + this.diceRoll - 40 - 1] = piece
      piece.steps += this.diceRoll
      piece.move(piece.position + this.diceRoll)
    } else if (piece.steps + this.diceRoll > 40) {
      if (piece.steps + this.diceRoll <= 44) {
        this.board.spaces[piece.position] = null
        player.homeCells[piece.steps + this.diceRoll - 40 - 1] = piece
        piece.steps += this.diceRoll
        piece.move(piece.position + this.diceRoll)
      }
    } else if (piece.steps > 0) {
      this.board.movePiece(piece, this.diceRoll)
    } else {
      this.board.movePiece(piece, this.players[this.currentTurn].startPosition + 1)
    }
    this.isDiceRolled = false
    player.pieces.forEach((piece: IPiece) => {
      piece.allowToMove = false
    })
  }

  start(): void {
    console.log('Game started!')
    // while (true) {
    //   this.playTurn();
    // }
  }

  checkWinner(): IPlayer | null {
    return this.players.find((player) => player.hasWon()) || null
  }
}

export { Game }
