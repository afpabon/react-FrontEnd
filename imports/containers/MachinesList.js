import React from 'react'
import { connect } from 'react-redux'
import { setMachine, getVariables, getSnapshots, changeSidebarTab } from '../actions'
import Machine from '../components/Machine'

let MachineList = ({ currentMachines, machines, onMachineClick }) => {
  machineClicked = (machine) => {
    let currentGuids = currentMachines.map(m=>m.GuidBackend);
    if ( currentGuids.indexOf(machine.GuidBackend) < 0 ) onMachineClick(machine);
  }
  return <div className="plate-search-result">
    {
      machines.map(machine => (
      <Machine key={machine.GuidBackend} {...machine} onClick={() => machineClicked(machine)} />
    ))}
  </div>
}

const mapStateToProps = state => {
  return {
    currentMachines: state.currentMachines,
    machines: state.machinesList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMachineClick: machine => {
      dispatch(setMachine(machine));
      dispatch(getVariables(machine));
      dispatch(getSnapshots(machine));
      dispatch(changeSidebarTab('VARIABLES'));
    }
  }
}

MachineList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MachineList)

export default MachineList