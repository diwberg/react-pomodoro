import { ReactNode, createContext, useReducer, useState } from 'react'
import { Cycles, cyclesReducer } from '../reduces/cycles/reducer'
import {
  createNewCycleAction,
  handleCurrentCycleFinishedAction,
  interruptCurrentCycleAction,
} from '../reduces/actions'

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
}

export const CyclesContext = createContext({} as ContextCyclesType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [states, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })
  const [ammountSecondsPassed, setAmmountSecondsPassed] = useState(0)
  const { cycles, activeCycleId } = states
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function handleCurrentCycleFinished() {
    dispatch(handleCurrentCycleFinishedAction())
    setAmmountSecondsPassed(0)
  }

  function setSecondsPassed(seconds: number) {
    setAmmountSecondsPassed(seconds)
  }

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
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
