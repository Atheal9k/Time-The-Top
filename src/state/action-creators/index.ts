import { ActionType } from "../action-types"
import { HoldAction, BuyAction, SellAction, StartAction } from "../actions"
import { Coin } from "../coin"

export const hold = (): HoldAction => {
  return {
    type: ActionType.HOLD,
  }
}

export const buy = (amountToBuy: number, coinId: Coin): BuyAction => {
  return {
    type: ActionType.BUY,
    payload: {
      amountToBuy,
      type: coinId,
    },
  }
}

export const sell = (amountToSell: number, coinId: Coin): SellAction => {
  return {
    type: ActionType.SELL,
    payload: {
      amountToSell,
      type: coinId,
    },
  }
}

export const start = (): StartAction => {
  return {
    type: ActionType.START,
  }
}
