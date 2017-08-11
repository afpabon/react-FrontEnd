const currentMachines = (state = [], action) => {
  let newState = [...state];
  let index;
  switch (action.type) {
    case 'ADD_MACHINE':
      let exists = newState.find(s=> s.GuidBackend==action.machine.GuidBackend);
      if (exists) return newState;
      else {
        newState.forEach((s) => s.selected = false);
        newState = [{...action.machine, selected: true, selectedVariables: []}, ...newState];
        if (state.length < 10) return newState;
        else {
          newState.pop();
          return newState;
        }
      }
    case 'REMOVE_MACHINE':
      index = newState.findIndex(v => {return v.GuidBackend === action.machine.GuidBackend});
      newState.splice(index, 1);
      return newState;
    case 'CHANGE_SELECTED':
      newState.forEach(v => {
        v.selected = v.GuidBackend === action.machine.GuidBackend ? true : false;
      });
      return newState;
    case 'TOGGLE_VARIABLE':
      index = newState.findIndex(v => {return v.GuidBackend === action.machine.GuidBackend});
      let i = newState[index].selectedVariables.indexOf(action.variableId);
      if (i >=0) newState[index].selectedVariables.splice(i, 1);
      else newState[index].selectedVariables.push(action.variableId);
      return newState;
    default:
      return state
  }
}

export default currentMachines