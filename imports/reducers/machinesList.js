const machinesList = (state = [], action) => {
  switch (action.type) {
    case 'SET_MACHINES_LIST':
      return action.data
    default:
      return state
  }
}

export default machinesList