import React from 'react'
import { connect } from 'react-redux'
import { removeMachine, getVariables, changeSelectedMachine, getSnapshots } from '../actions'
import FilterMachine from '../containers/FilterMachine'

let RecentMachines = ({machines, onCurrentMachineClick, onCloseClick}) => (
  <ol className="breadcrumb recent-vehicles-bar">
    {
      machines.map(machine => {
        let value1, value2;
        if (machine.selected) {
          value1 = '';/*<a key="MachineGeneralInfo" className="btn btn-info btn-circle" title="Machine_General_Information" data-toggle="modal" data-target="#machine_detail_info">
            <i className="glyphicon glyphicon-info-sign"></i>
          </a>*/
          value2 = machine.Identification.Number;
        }
        else {
          value1 = <a className="tracking-vehicle" onClick = {()=> onCurrentMachineClick(machine)}>
            {machine.Identification.Number}
          </a>;
          value2 = <a type="button" className="btn btn-danger btn-xs" title='Delete' onClick = {() => onCloseClick(machine)}>
            <span className="glyphicon glyphicon-remove"></span>
          </a>;
        }
        return <li key={machine._id.valueOf()}>
          {value1}{value2}
        </li>;
      })
    }
  </ol>
)

const mapStateToProps = state => {
  return {
    machines : state.currentMachines,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCurrentMachineClick: machine => {
      dispatch(changeSelectedMachine(machine));
      dispatch(getVariables(machine));
      dispatch(getSnapshots(machine));
    },
    onCloseClick: id => {
      dispatch(removeMachine(id))
    }
  }
}

RecentMachines = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentMachines)

export default RecentMachines