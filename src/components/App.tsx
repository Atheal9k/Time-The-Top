import React from "react"
import { Provider } from "react-redux"
import { store } from "../state"
import GameMain from "./GameMain"

const App = () => {
  return (
    <Provider store={store}>
      <GameMain />
    </Provider>
  )
}

export default App
