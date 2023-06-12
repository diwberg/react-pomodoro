import { CountDownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { useEffect, useContext } from 'react'
import { CyclesContext } from '../../../../context/CyclesContext'

export function CountDown() {
  const {
    activeCycle,
    handleCurrentCycleFinished,
    setSecondsPassed,
    minutes,
    seconds,
    totalCurrentSeconds,
  } = useContext(CyclesContext)

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (totalCurrentSeconds <= 0) {
          handleCurrentCycleFinished()
          clearInterval(interval)
        }
        setSecondsPassed(secondsDifference)
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    handleCurrentCycleFinished,
    setSecondsPassed,
    totalCurrentSeconds,
  ])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
