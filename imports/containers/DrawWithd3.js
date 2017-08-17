import React from 'react'
import { connect } from 'react-redux'
import AuxChart from '../components/AuxChart'
import Chart from '../components/Chart'
import SummaryChart from '../components/SummaryChart'
import { changeSelectedSnapshot } from '../actions'

const getFormatedSnapshots = snapshots => {
  return snapshots? snapshots.map(s => {
    return {
      x: s.SampleDate,
      y: s.Variables.length,
      data: {...s}
    }
  }) : [];
}

const getSelectedVars = (machines, variables, snapshots) => {
  let machine = machines.find(m=> m.selected == true);
  if (machine && machine.selectedVariables) {
    let vars = variables.filter(v=>
      machine.selectedVariables.indexOf(v.Id) >= 0 && 
      (!snapshots || snapshots.find(s=> s.Variables.find(sv=>sv.VariableId === v.Id))
    ));
    return {
      variables: vars,
      count: vars.length
    }
  }
  else
    return {
      variables: [],
      count: 0
    }
}

let DrawWithd3 = ({eventKey, snapshots, selectedVariables, onSnapshotClick, selectedSnapshot, variables}) => {
  let chartData = getFormatedSnapshots(snapshots);
  switch (eventKey) {
    case 1:
      return <Chart 
        areaName='detailChart' 
        data={chartData} 
        width={950} 
        height={400} 
        selectedVars={selectedVariables}
      />;
    case 2:
      return <SummaryChart 
        areaName='summaryChart' 
        data={chartData} 
        width={950} 
        height={400} 
        variables={variables} 
        selectedSnapshot={selectedSnapshot}
      />;
    case 3:
      return <AuxChart 
        areaName="globalChart" 
        snapshotClicked={onSnapshotClick} 
        data={chartData} 
        width={950} 
        height={100} 
        selectedVars={selectedVariables.count}
        selectedSnapshot={selectedSnapshot}
      />;
    default:
      return (<div></div>);
  }
}

const mapStateToProps = (state, props) => {
  return {
    eventKey: props.eventKey,
    snapshots : state.oilSnapshots,
    selectedVariables : getSelectedVars(state.currentMachines, state.machineVariables, state.oilSnapshots),
    selectedSnapshot: state.selectedSnapshot,
    variables: state.machineVariables
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSnapshotClick: snapshot => {
      dispatch(changeSelectedSnapshot(snapshot));
    }
  }
}

DrawWithd3 = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawWithd3)

export default DrawWithd3