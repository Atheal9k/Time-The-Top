import { useEffect, useState } from "react"
import Eos from "./CoinData/Eos"
import { actionCreators } from "../state"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../hooks/useTypedSelector"
import styled from "styled-components"

const Div = styled.div`
  margin-top: 10rem;
  margin-left: 5rem;
  text-align: center;
`

const Input = styled.input`
  border-radius: 5px;
  border-color: green;
`

const Form = styled.form`
  margin: 15px 15px;
`

const ContentDiv = styled.div`
  margin-bottom: 3rem;
  font-size: 1.5rem;
`

const GameMain: React.FC = () => {
  const [buyAmount, setbuyAmount] = useState(0)
  const [sellAmount, setSellAmount] = useState(0)
  const dispatch = useDispatch()
  const state = useTypedSelector((state) => state)

  useEffect(() => {
    if (state.game.gameOverFlag == true) {
      return (
        <div>
          <button onClick={start}>Start Game</button>
        </div>
      )
    }
  }, [state.game.coinDataId])

  const formatDollar = (
    number: any,
    maximumSignificantDigits: number | undefined
  ) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits,
    }).format(number)

  const hold = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (state.game.coinDataId === 14) {
      return
    } else {
      dispatch(actionCreators.hold())
    }

    console.log(state)
  }

  const buy = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state.game.coinDataId === 14) {
      return
    } else if (state.game.cashFlow <= 0) {
      alert("You have no more spare cash")
      return
    } else if (state.game !== undefined) {
      dispatch(
        actionCreators.buy(buyAmount, {
          id: "eos",
          coinSet: {
            pictureId: state.game.coinDataId,
            price: Eos[state.game.coinDataId].coinPrice,
          },
        })
      )
      console.log(state.game.coinDataId)
    }
  }

  const sell = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state.game.coinDataId === 14) {
      return
    } else if (state.game.tokenAmount <= 0) {
      alert("You have no tokens, game has ended")
      return
    } else if (state.game !== undefined) {
      dispatch(
        actionCreators.sell(sellAmount, {
          id: "eos",
          coinSet: {
            pictureId: state.game.coinDataId,
            price: Eos[state.game.coinDataId].coinPrice,
          },
        })
      )
    }
  }

  const start = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(actionCreators.start)
  }

  return (
    <Div className="ui container">
      <ContentDiv>
        <div>
          <h1>Time The Top</h1>
        </div>
        <div>{`Token Balance in usd: ${formatDollar(
          state.game.tokenAmount &&
            state.game.tokenAmount * Eos[state.game.coinDataId].coinPrice,
          5
        )}`}</div>
        <section>{`Spare Cash: $${state.game.cashFlow}`}</section>
      </ContentDiv>

      {state.game.gameOverFlag == true ? (
        <div>
          <button onClick={start}>Start Game</button>
        </div>
      ) : null}

      <div>
        {state.game.coinDataId !== undefined ? (
          <img src={Eos[state.game.coinDataId].pictureId} />
        ) : (
          "Loading"
        )}
      </div>

      <Form onSubmit={buy}>
        <button className="ui button">Buy</button>
        <Input
          className="ui input"
          placeholder="Enter Amount"
          onChange={(e) => setbuyAmount(parseInt(e.target.value))}
          value={buyAmount}
        />
      </Form>

      <Form onSubmit={sell}>
        <button className="ui button">Sell</button>

        <Input
          className="ui input"
          placeholder="Enter Amount"
          onChange={(e) => setSellAmount(parseInt(e.target.value))}
          value={sellAmount}
        />
      </Form>

      <button className="ui button" onClick={hold}>
        Hodl
      </button>
    </Div>
  )
}

export default GameMain
