import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment-timezone'
import AuxChart from '../components/AuxChart'

const getFormatedSnapshots = snapshots => {
  return snapshots? snapshots.map(s => {
    return {
      x: s.SampleDate,
      y: s.Variables.length
    }
  }) : [];
}

let GlobalChart = ({snapshots}) => {
  let chartData = getFormatedSnapshots(snapshots);
  //TO DO: Buscar cómo cambiar idioma de meses en gŕafica. En librería hay otros idiomas, 
  //¿cuál es el parámetro para cambiar el idioma?
  return (<div>
  <AuxChart data={chartData} width={900} height={520} />
  </div>)
}

const mapStateToProps = state => {
  return {
    snapshots : state.oilSnapshots
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

GlobalChart = connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalChart)

export default GlobalChart