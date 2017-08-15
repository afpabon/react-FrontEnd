export const searchMachine = (input) => {
  return dispatch => {
    Meteor.call('getMachinesByPlate', input, (err, res) => {
      if (res) {
        dispatch({
          type: 'SET_MACHINES_LIST',
          data: res
        });
      }
    });
  }
}

export const getVariables = (input) => {
  return dispatch => {
    Meteor.call('getOilVariablesList', input, (err, res) => {
      if (res) {
        dispatch({
          type: 'SET_VARIABLES_LIST',
          data: res
        });
      }
    });
  }
}

export const getSnapshots = (input) => {
  return dispatch => {
    Meteor.call('getOilSnapshots', input, (err, res) => {
      if (res) {
        dispatch({
          type: 'ADD_SNAPSHOTS',
          snapshots: res
        });
      }
    });
  }
}

export const changeSelectedSnapshot = (input) => {
  return {
    type: 'CHANGE_SELECTED_SNAPSHOT',
    snapshot: input
  }
}

export const setMachine = (machine) => {
  return {
    type: 'ADD_MACHINE',
    machine: machine
  }
}

export const changeSelectedMachine = (machine) => {
  return {
    type: 'CHANGE_SELECTED',
    machine: machine
  }
}

export const removeMachine = (machine) => {
  return {
    type: 'REMOVE_MACHINE',
    machine: machine
  }
}

export const changeSidebarTab = (text) => {
  return {
    type: 'CHANGE_SIDEBAR_TAB',
    visibleTab: text
  }
}

export const toggleSelectedVariables = (machine, id) => {
  return {
    type: 'TOGGLE_VARIABLE',
    machine: machine,
    variableId: id
  }
}