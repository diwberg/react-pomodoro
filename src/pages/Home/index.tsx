import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/CountDown'
import { CyclesContext } from '../../context/CyclesContext'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { HomeContainer, CountDownStart, CountDownStop } from './styles'
import { LuPlay } from 'react-icons/lu'
import { FaHandPaper } from 'react-icons/fa'

const formValidationSchema = z.object({
  task: z.string().min(1, 'Informe alguma tarefa'),
  minutesAmount: z
    .number()
    .min(1, 'O minimo de minutos é 5')
    .max(60, 'O maximo de minutos é 60'),
})

type NewFormData = z.infer<typeof formValidationSchema>

export function Home() {
  const { createNewCycle, activeCycle, interrupteCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewFormData>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewFormData) {
    createNewCycle(data)
    reset()
  }
  const task = watch('task')
  const isDesabledSubmit = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />
        {activeCycle ? (
          <CountDownStop type="button" onClick={interrupteCurrentCycle}>
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
