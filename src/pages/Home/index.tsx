import { HomeContainer, CountDownStart, CountDownStop } from './styles'
import { LuPlay } from 'react-icons/lu'
import { FaHandPaper } from 'react-icons/fa'
import { useState, createContext } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/CountDown'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface ContextCyclesType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  ammountSecondsPassed: number
  handleCurrentCycleFinished: () => void
  setSecondsPassed: (secondsPassed: number) => void
}

const formValidationSchema = z.object({
  task: z.string().min(1, 'Informe alguma tarefa'),
  minutesAmount: z
    .number()
    .min(5, 'O minimo de minutos é 5')
    .max(60, 'O maximo de minutos é 60'),
})

type NewFormData = z.infer<typeof formValidationSchema>

export const CyclesContext = createContext({} as ContextCyclesType)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [ammountSecondsPassed, setAmmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewFormData>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCurrentCycleFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        }
        return cycle
      }),
    )
  }

  const handleSubmitForm = (data: NewFormData) => {
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
    reset()
  }

  function setSecondsPassed(seconds: number) {
    setAmmountSecondsPassed(seconds)
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const task = watch('task')
  const isDesabledSubmit = !task

  function handleInterruptCycle() {
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
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            handleCurrentCycleFinished,
            ammountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <CountDown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <CountDownStop type="button" onClick={handleInterruptCycle}>
            <LuPlay size={24} />
            Interromper
          </CountDownStop>
        ) : (
          <CountDownStart disabled={isDesabledSubmit} type="submit">
            <FaHandPaper size={24} />
            Começar
          </CountDownStart>
        )}
      </form>
    </HomeContainer>
  )
}
