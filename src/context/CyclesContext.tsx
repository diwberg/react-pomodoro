import { ReactNode, createContext, useState } from 'react'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface ContextCyclesType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
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
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [ammountSecondsPassed, setAmmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function handleCurrentCycleFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        }
        return cycle
      }),
    )
    setActiveCycleId(null)
    setAmmountSecondsPassed(0)
  }

  function setSecondsPassed(seconds: number) {
    setAmmountSecondsPassed(seconds)
  }

  const createNewCycle = (data: CreateCycleData) => {
    const id: string = Date.now().toString()

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmmountSecondsPassed(0)
  }

  function interrupteCurrentCycle() {
    setActiveCycleId(null)

    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        }
        return cycle
      }),
    )
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
