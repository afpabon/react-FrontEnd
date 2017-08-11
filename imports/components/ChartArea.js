import React from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import MainChart from '../containers/MainChart'
import GlobalChart from '../containers/GlobalChart'

const ChartArea = () => (
	<Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
    <Tab eventKey={1} title="Chart">
      <MainChart height="80%" />
      <GlobalChart />
    </Tab>
    <Tab eventKey={2} title="Summary">
      {"<SummaryCharts />"}
    </Tab>
  </Tabs>
)

export default ChartArea