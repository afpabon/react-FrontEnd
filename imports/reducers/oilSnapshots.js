export const oilSnapshots = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SNAPSHOTS':
      return action.snapshots;
    break;
    default:
      return state;
  }
}

export default oilSnapshots