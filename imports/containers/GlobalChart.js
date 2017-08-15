import React from 'react'
import { connect } from 'react-redux'
import AuxChart from '../components/AuxChart'
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

const getSelectedVars = machines => {
  let machine = machines.find(m=> m.selected == true);
  return machine && machine.selectedVariables? machine.selectedVariables.length : 0;
}

let GlobalChart = ({snapshots, selectedVariables, onSnapshotClick}) => {
  let chartData = getFormatedSnapshots(snapshots);
  //TO DO: Buscar cómo cambiar idioma de meses en gŕafica. En librería hay otros idiomas, 
  //¿cuál es el parámetro para cambiar el idioma?
  return (<div>
  <AuxChart snapshotClicked={onSnapshotClick} data={chartData} width={950} height={100} selectedVars={selectedVariables}/>
  </div>)
}

const mapStateToProps = state => {
  return {
    snapshots : state.oilSnapshots,
    selectedVariables : getSelectedVars(state.currentMachines)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSnapshotClick: snapshot => {
      dispatch(changeSelectedSnapshot(snapshot));
    }
  }
}

GlobalChart = connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalChart)

export default GlobalChart