import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createContainer } from 'meteor/react-meteor-data';
import { changeSidebarTab, toggleSelectedVariables } from '../actions'
import { MachinesCollection } from '../collections'

const getCurrentMachine = (machines) => {
  if (machines.length > 0) return machines.find(m => m.selected === true);
  else return null;
}

let VariablesList = ({machine, variables, toggleSelectedVariables}) => {
  let content = <div> </div>;
  if (machine && variables) {
    let selectedVariables = machine.selectedVariables;
    content = <div className="row">
      {variables.map(v=>(
        <div className="col-md-12" key={machine._id.valueOf() + '_' + v.Id}>
          <label>
            <input defaultChecked={selectedVariables.indexOf(v.Id) >=0} style={{margin: "4px 0 4px"}} type="checkbox" className="selectedVariable" onChange={e => toggleSelectedVariables(machine, v.Id)}/>
            &nbsp; {v.Descriptions[0].Description}
          </label>
        </div>
      ))}
    </div>
  }
  return content;
}

const mapStateToProps = state => {
  return {
    machine : getCurrentMachine(state.currentMachines),
    variables : state.machineVariables
  }
}

const mapDispatchToProps = dispatch => {
  return {
		changeVisibleTab : id => {
      dispatch(changeSidebarTab(id))
    },
    toggleSelectedVariables : (machine, id) => {
      dispatch(toggleSelectedVariables(machine, id))
    }
  }
}

VariablesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(VariablesList)

export default VariablesList