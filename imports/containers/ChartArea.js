import React, { Component } from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import { connect } from 'react-redux'
import MainChart from './MainChart'


class TabControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      key: 1
    };
    this.tabSelected = (key) => {
      this.setState({key: key});
    };
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.snapshot && this.state.key !== 2) {
      this.setState({ key: 2});
    }
  }
  render() {
    return <Tabs activeKey={this.state.key} onSelect={this.tabSelected} animation={false} id="noanim-tab-example">
      <Tab eventKey={1} title="Chart">
        <MainChart />
      </Tab>
      <Tab eventKey={2} title="Summary">
        {"<SummaryCharts />"}
      </Tab>
    </Tabs>
  }
}

let ChartArea = ({selectedSnapshot}) => {
  let snapshot = selectedSnapshot? true : false;
	return <TabControl snapshot={snapshot}/>
}

const mapStateToProps = state => {
  return {
    selectedSnapshot : state.selectedSnapshot,
  }
}

ChartArea = connect(
  mapStateToProps
)(ChartArea)

export default ChartArea