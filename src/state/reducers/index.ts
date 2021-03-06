import gameReducer from "./gameReducer"
import { combineReducers } from "redux"

const reducers = combineReducers({
  game: gameReducer,
})

export default reducers

export type RootState = ReturnType<typeof reducers>
