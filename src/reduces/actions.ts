import { Cycles } from './cycles/reducer'

export enum ActionTypes {
  // eslint-disable-next-line no-unused-vars
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  // eslint-disable-next-line no-unused-vars
  HANDLE_CURRENT_CYCLE_FINISHED = 'HANDLE_CURRENT_CYCLE_FINISHED',
  // eslint-disable-next-line no-unused-vars
  INTERRUPTE_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
}

export function createNewCycleAction(newCycle: Cycles) {
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
    payload: {
      cycle: newCycle,
    },
  }
}

export function handleCurrentCycleFinishedAction() {
  return {
    type: ActionTypes.HANDLE_CURRENT_CYCLE_FINISHED,
  }
}

export function interruptCurrentCycleAction() {
  return {
    type: ActionTypes.INTERRUPTE_CURRENT_CYCLE,
  }
}
