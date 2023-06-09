import { CountDownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { useEffect, useContext } from 'react'
import { CyclesContext } from '../..'

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    handleCurrentCycleFinished,
    ammountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSecondsActive = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSecondsActive) {
          handleCurrentCycleFinished()
          setSecondsPassed(totalSecondsActive)
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
    totalSecondsActive,
    activeCycleId,
    handleCurrentCycleFinished,
    setSecondsPassed,
  ])

  const currentSeconds = activeCycle
    ? totalSecondsActive - ammountSecondsPassed
    : 0

  const currentMinutesfromSeconds = Math.floor(currentSeconds / 60)
  const currentSecondsfromMinutes = currentSeconds % 60

  const minutes = String(currentMinutesfromSeconds).padStart(2, '0')
  const seconds = String(currentSecondsfromMinutes).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

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
