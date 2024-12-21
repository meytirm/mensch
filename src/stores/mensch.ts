import { defineStore } from 'pinia'

export const useMenschStore = defineStore('counter', {
  state: (): State => ({
    users: [],
    dice: 6,
    turn: 0,
    piecesStatus: [false, false, false, false]
  }),
  actions: {}
})

interface UsersModel {
  name: string
  pieces: [number, number][]
}

interface State {
  users: UsersModel[]
  dice: number
  turn: number
  piecesStatus: boolean[]
}
