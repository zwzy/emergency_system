export const updateUmoEventState = (umoEventState) => {
  return {
    type: 'UPDATE_UMOEVENT_STATE',
    umoEventState
  }
}
export const resetUmoEventState = () => {
  return {
    type: 'RESET_UMOEVENT_STATE'
  }
}
