import React from 'react'
import { connect } from 'react-redux'
import Chart from '../components/Chart'
import { changeSelectedSnapshot } from '../actions'

const getFormatedSnapshots = snapshots => {
  return snapshots? snapshots.map(s => {
    return {
      x: s.SampleDate,
      y: s.Variables
    }
  }) : [];
}

const getSelectedVars = machines => {
  let machine = machines.find(m=> m.selected == true);
  return {
    variables: machine && machine.selectedVariables? machine.selectedVariables : [],
    count: machine && machine.selectedVariables? machine.selectedVariables.length : 0
  }
}

let MainChart = ({snapshots, selectedVariables, onSnapshotClick}) => {
  let chartData = getFormatedSnapshots(snapshots);
  //TO DO: Buscar cómo cambiar idioma de meses en gŕafica. En librería hay otros idiomas, 
  //¿cuál es el parámetro para cambiar el idioma?
  return (<div>
  <Chart data={chartData} width={950} height={400} selectedVars={selectedVariables}/>
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

MainChart = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainChart)

export default MainChart