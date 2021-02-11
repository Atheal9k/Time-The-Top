import { ActionType } from "../action-types"
import { Coin } from "../coin"

export interface HoldAction {
  type: ActionType.HOLD
}

export interface BuyAction {
  type: ActionType.BUY
  payload: {
    amountToBuy: number
    type: Coin
  }
}

export interface SellAction {
  type: ActionType.SELL
  payload: {
    amountToSell: number
    type: Coin
  }
}

export interface StartAction {
  type: ActionType.START
}

export type Action = HoldAction | BuyAction | SellAction | StartAction
