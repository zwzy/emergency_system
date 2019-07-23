
export const updateCommationInformation = (commationInfo) => {
  return {
    type: 'UPDATE_COMMATION_INFORMATION',
    commationInfo
  }
}
export const resetCommationInformation = () => {
  return {
    type: 'RESEET_COMMATION_INFORMATION'
  }
}
