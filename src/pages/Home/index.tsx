import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
import { useState } from 'react'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {

  

  const formValidationSchema = z.object({
    task: z.string().min(1, 'Informe alguma tarefa'),
    minutesAmount: z
      .number()
      .min(5, 'O minimo de minutos é 5')
      .max(60, 'O maximo de minutos é 60'),
  })

  type NewFormData = z.infer<typeof formValidationSchema>

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<NewFormData>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const handleSubmitForm = (data: NewFormData) => {
    console.log(data)
  }
  const onError = (error: Error, e: Event) => console.log(error, e)

  const task = watch('task')
  const isDesabledSubmit = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitForm, onError)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
            {...(errors.task && <span>{errors.task.message}</span>)}
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
            {...(errors.minutesAmount && (
              <span>{errors.minutesAmount.message}</span>
            ))}
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
