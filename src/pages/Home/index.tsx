import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  HomeContainer,
  FormContainer,
  CountDownContainer,
  Separator,
  ButtonStart,
  TaskInput,
  MinutesAmountInput,
} from './styles'
import { LuPlay } from 'react-icons/lu'

export function Home() {
  const formValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe alguma tarefa'),
    minutesAmount: zod
      .number()
      .min(5, 'O minimo de minutos é 5')
      .max(60, 'O maximo de minutos é 60'),
  })

  type NewFormData = zod.infer<typeof formValidationSchema>

  const { register, handleSubmit, watch, reset } = useForm<NewFormData>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleSubmitFormTask(data: NewFormData) {
    console.log(data)
    reset()
  }

  const task = watch('task')
  const isDesabledSubmit = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitFormTask)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>
          <label htmlFor="minutesAmount">Durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount')}
          />
          <span>minutos.</span>
        </FormContainer>
        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>
        <ButtonStart disabled={isDesabledSubmit} type="submit">
          <LuPlay size={24} />
          Começar
        </ButtonStart>
      </form>
    </HomeContainer>
  )
}
