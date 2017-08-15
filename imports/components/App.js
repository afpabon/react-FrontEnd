import React from 'react'
import SearchSideBar from '../containers/SearchSideBar'
import RecentMachines from '../containers/RecentMachines'
import ChartArea from '../containers/ChartArea'
import GlobalChart from '../containers/GlobalChart'

const App = () => (
  <div>
    <div className="row">
      <RecentMachines />
    </div>
    <div className="col-md-3">
      <SearchSideBar />
    </div>
    <div className="col-md-9">
      <div className="row" height="80%">
        <ChartArea />
      </div>
      <div className="row">
        <GlobalChart />
      </div>
    </div>
  </div>
)

export default App