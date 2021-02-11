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

  div {
    margin: 18px 0px;
  }
`

const ProfitDiv = styled.div`
  margin-top: 2.5rem;
`

const GameMain: React.FC = () => {
  const [buyAmount, setbuyAmount] = useState(0)
  const [sellAmount, setSellAmount] = useState(0)
  const [profit, setProfit] = useState(0)
  const dispatch = useDispatch()
  const state = useTypedSelector((state) => state)

  useEffect(() => {}, [state.game.coinDataId, state.game.gameOverFlag])

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
      dispatch(actionCreators.endGame())
      calculateProfit()
      alert(
        `You ended the game with: ${formatDollar(
          state.game.tokenAmount &&
            state.game.tokenAmount * Eos[state.game.coinDataId].coinPrice,
          5
        )}`
      )
      return
    } else {
      dispatch(actionCreators.hold())
    }
  }

  const buy = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state.game.coinDataId === 14) {
      dispatch(actionCreators.endGame())
      alert(
        `You ended the game with: ${formatDollar(
          state.game.tokenAmount * Eos[state.game.coinDataId].coinPrice,
          5
        )} /n You made: ${formatDollar(
          1000 * Eos[0].coinPrice,
          5
        )} - ${formatDollar(
          state.game.tokenAmount * Eos[state.game.coinDataId].coinPrice,
          5
        )}
      `
      )
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
      setbuyAmount(0)
    }
  }

  const sell = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state.game.coinDataId === 14) {
      dispatch(actionCreators.endGame())
      alert(
        `You ended the game with: ${formatDollar(
          state.game.tokenAmount * Eos[state.game.coinDataId].coinPrice,
          5
        )}`
      )
      return
    } else if (state.game.tokenAmount <= 0) {
      alert("You have no tokens, try another action")
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
      setSellAmount(0)
    }
  }

  const startGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(
      actionCreators.startGame({
        id: "eos",
        coinSet: {
          pictureId: 0,
          price: Eos[0].coinPrice,
        },
      })
    )
  }

  const calculateProfit = () => {
    let profits =
      state.game.tokenAmount * Eos[14].coinPrice -
      1000 / Eos[0].coinPrice +
      state.game.cashFlow
    setProfit(profits)
    return
  }

  return (
    <Div className="ui container">
      <ContentDiv>
        <div>
          <h1>Time The Top</h1>
        </div>
        <div>{`Spare Cash: $${state.game.cashFlow}`}</div>
        <div>{`Token Balance in usd: ${formatDollar(
          state.game.tokenAmount &&
            state.game.tokenAmount * Eos[state.game.coinDataId].coinPrice,
          5
        )}`}</div>
      </ContentDiv>

      {state.game.gameOverFlag === true ? (
        <div>
          <h4>You start off with ~$400 in this mystery token.</h4>
          <h4>You have $1000 spare cash to buy when you want as well.</h4>
          <h4>Good Luck and post your gainz in the group!</h4>
          <div>
            <button onClick={startGame}>Start Game</button>
          </div>
        </div>
      ) : (
        <div>
          {state.game.coinDataId !== undefined ? (
            <img src={Eos[state.game.coinDataId].pictureId} />
          ) : (
            "Loading"
          )}
        </div>
      )}

      {state.game.gameOverFlag === false ? (
        <Form onSubmit={buy}>
          <button className="ui button">Buy</button>
          <Input
            className="ui input"
            placeholder="Enter Amount"
            onChange={(e) => setbuyAmount(parseInt(e.target.value))}
            value={buyAmount}
          />
        </Form>
      ) : null}

      {state.game.gameOverFlag === false ? (
        <Form onSubmit={sell}>
          <button className="ui button">Sell</button>

          <Input
            className="ui input"
            placeholder="Enter Amount"
            onChange={(e) => setSellAmount(parseInt(e.target.value))}
            value={sellAmount}
          />
        </Form>
      ) : null}

      {state.game.gameOverFlag === false ? (
        <button className="ui button" onClick={hold}>
          Hodl
        </button>
      ) : null}

      {state.game.coinDataId >= 14 && state.game.gameOverFlag === true ? (
        <ProfitDiv>
          <h1>
            {`You Ended The Game With: ${formatDollar(
              state.game.tokenAmount * Eos[state.game.coinDataId].coinPrice,
              5
            )}`}
          </h1>
          <h2>{`Your Profits Are: $${profit.toFixed(4)}`}</h2>
        </ProfitDiv>
      ) : null}
    </Div>
  )
}

export default GameMain
