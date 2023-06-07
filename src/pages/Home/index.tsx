import { useState } from 'react'
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
  const [task, setTask] = useState('')
  const [minutes, setMinutes] = useState(5)

  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            onChange={(e) => setTask(e.target.value)}
            value={task}
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
            placeholder="00"
            step={5}
            min={5}
            max={60}
            onChange={(e) =>
              +e.target.value < 5
                ? setMinutes(5)
                : +e.target.value > 60
                ? setMinutes(60)
                : setMinutes(+e.target.value)
            }
            value={minutes}
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
        <ButtonStart disabled={!task || !minutes} type="submit">
          <LuPlay size={24} />
          Começar
        </ButtonStart>
      </form>
    </HomeContainer>
  )
}
