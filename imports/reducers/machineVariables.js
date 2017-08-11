const machineVariables = (state = [], action) => {
  switch (action.type) {
    case 'SET_VARIABLES_LIST':
      return action.data
    default:
      return state
  }
}

export default machineVariables