import { useReducer, useState } from "react"

//1. state에 대한 interface
interface IState {
  counter: number
}

//2. reducer에 대한 interface
interface IAction {
  type: 'INCREASE' | 'DECREASE' | 'RESET_TO_ZERO'
}

function reducer(state: IState, action: IAction): IState {
  const { type } = action;
  switch (type) {
    case 'INCREASE': {
      return {
        ...state,
        counter: state.counter + 1,
      }
    }
    case 'DECREASE': {
      return {
        ...state,
        counter: state.counter - 1,
      }
    }
    case 'RESET_TO_ZERO': {
      return {
        ...state,
        counter: 0,
      }
    }
    default:
      return state;
  }
}

export default function App() {
  //1. useState
  const [count, setCount] = useState(0)

  const handleIncrease = () => {
    setCount(count + 1)
  }

  //2. useReducer
  const [state, dispatch] = useReducer(reducer, {
    counter: 0
  })

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-dvh">
      <div>
        <h2>useState hook : {count}</h2>
        <button onClick={handleIncrease}>Increase</button>
      </div>
      <div>
        <h2>useReducer hook : {state.counter}</h2>
        <button onClick={() => dispatch({ type: 'INCREASE' })}>Increase</button>
        <button onClick={(): void => dispatch({ type: 'DECREASE' })}>Decrease</button>
        <button onClick={(): void => dispatch({ type: 'RESET_TO_ZERO' })}>Reset</button>
      </div>
    </div>
  )
}
