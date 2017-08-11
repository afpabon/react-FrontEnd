import React from 'react'
import SearchSideBar from '../containers/SearchSideBar'
import DrawContainer from './DrawContainer'
import RecentMachines from '../containers/RecentMachines'
import ChartArea from './ChartArea'

const App = () => (
  <div className="prueba">
    <div className="row">
      <RecentMachines />
    </div>
    <div className="col-md-3">
      <SearchSideBar />
    </div>
    <div className="col-md-9">
      <ChartArea />
    </div>
  </div>
)

export default App