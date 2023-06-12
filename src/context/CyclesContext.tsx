import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycles, cyclesReducer } from '../reduces/cycles/reducer'
import {
  createNewCycleAction,
  handleCurrentCycleFinishedAction,
  interruptCurrentCycleAction,
} from '../reduces/actions'
import { differenceInSeconds } from 'date-fns'

export interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface ContextCyclesType {
  cycles: Cycles[]
  activeCycle: Cycles | undefined
  activeCycleId: string | null
  ammountSecondsPassed: number
  handleCurrentCycleFinished: () => void
  setSecondsPassed: (secondsPassed: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interrupteCurrentCycle: () => void
  minutes: string
  seconds: string
  totalCurrentSeconds: number
}

export const CyclesContext = createContext({} as ContextCyclesType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [states, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ICYou_Pomodoro:cyclesState-v1.0.0',
      )
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
    },
  )
  useEffect(() => {
    const stateJSON = JSON.stringify(states)
    localStorage.setItem('@ICYou_Pomodoro:cyclesState-v1.0.0', stateJSON)
  }, [states])

  const { cycles, activeCycleId } = states
  const activeCycle: Cycles = cycles.find((cycle) => cycle.id === activeCycleId)

  const [ammountSecondsPassed, setAmmountSecondsPassed] = useState(() => {
    if (states.activeCycleId) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  const totalSecondsActive = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const totalCurrentSeconds = activeCycle
    ? totalSecondsActive - ammountSecondsPassed
    : 0

  const currentMinutesfromCurrentSeconds = Math.floor(totalCurrentSeconds / 60)
  const currentSecondsfromMinutes = totalCurrentSeconds % 60

  const minutes = String(currentMinutesfromCurrentSeconds).padStart(2, '0')
  const seconds = String(currentSecondsfromMinutes).padStart(2, '0')

  function handleCurrentCycleFinished() {
    dispatch(handleCurrentCycleFinishedAction())
    setAmmountSecondsPassed(0)
  }

  function setSecondsPassed(seconds: number) {
    setAmmountSecondsPassed(seconds)
  }

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'ICYou - Pomodoro'
    }
  }, [minutes, seconds, activeCycle])

  const createNewCycle = (data: CreateCycleData) => {
    const id: string = Date.now().toString()

    const newCycle: Cycles = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch(createNewCycleAction(newCycle))
    setAmmountSecondsPassed(0)
  }

  function interrupteCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        handleCurrentCycleFinished,
        ammountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interrupteCurrentCycle,
        minutes,
        seconds,
        totalCurrentSeconds,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
