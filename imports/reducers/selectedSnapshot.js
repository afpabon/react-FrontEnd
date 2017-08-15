export const selectedSnapshot = (state = null, action) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_SNAPSHOT':
      return action.snapshot;
    break;
    default:
      return state;
  }
}

export default selectedSnapshot