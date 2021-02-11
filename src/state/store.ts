import { createStore } from "redux"
import reducers from "./reducers"
import { ActionType } from "./action-types"

export const store = createStore(reducers, {})
