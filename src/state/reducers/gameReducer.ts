import { ActionType } from "../action-types"
import { Action } from "../actions"
import { Coin } from "../coin"
import produce from "immer"

interface GameState {
  gameOverFlag: boolean
  balance: number
  cashFlow: number
  tokenAmount: number
  coinDataId: number
}

const initialState: GameState = {
  gameOverFlag: true,
  balance: 1000,
  cashFlow: 1000,
  tokenAmount: 0,
  coinDataId: 1,
}

const reducer = produce((state: GameState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.HOLD:
      state.coinDataId += 1

      return state
    case ActionType.BUY:
      state.balance += action.payload.amountToBuy
      state.cashFlow -= action.payload.amountToBuy
      if (!state.tokenAmount) {
        state.tokenAmount = 1000 / action.payload.type.coinSet.price
      } else {
        state.tokenAmount +=
          action.payload.amountToBuy / action.payload.type.coinSet.price
      }

      if (!state.coinDataId) {
        state.coinDataId = 1
      } else {
        state.coinDataId += 1
      }

      return state
    case ActionType.SELL:
      state.balance -= action.payload.amountToSell
      state.cashFlow += action.payload.amountToSell
      if (!state.tokenAmount) {
        state.tokenAmount = 1000 / action.payload.type.coinSet.price
      } else {
        state.tokenAmount +=
          action.payload.amountToSell / action.payload.type.coinSet.price
      }

      if (!state.coinDataId) {
        state.coinDataId = 1
      } else {
        state.coinDataId += 1
      }
      return state

    case ActionType.START:
      state.gameOverFlag = false

      return state
    default:
      return state
  }
})

export default reducer
