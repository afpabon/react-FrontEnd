import React from 'react'
import SearchSideBar from '../containers/SearchSideBar'
import RecentMachines from '../containers/RecentMachines'
import ChartArea from '../containers/ChartArea'

const App = () => (
  <div>
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