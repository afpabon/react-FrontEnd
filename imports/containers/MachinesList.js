import React from 'react'
import { connect } from 'react-redux'
import { setMachine, getVariables, getSnapshots } from '../actions'
import Machine from '../components/Machine'

let MachineList = ({ machines, onMachineClick }) => (
  <div className="plate-search-result">
    {
      machines.map(machine => (
      <Machine key={machine.GuidBackend} {...machine} onClick={() => onMachineClick(machine)} />
    ))}
  </div>
)

const mapStateToProps = state => {
  return {
    machines : state.machinesList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMachineClick: machine => {
      dispatch(setMachine(machine));
      dispatch(getVariables(machine));
      dispatch(getSnapshots(machine));
    }
  }
}

MachineList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MachineList)

export default MachineList