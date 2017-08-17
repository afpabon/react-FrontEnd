import React, { Component } from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import { connect } from 'react-redux'
import DrawWithd3 from './DrawWithd3'
import { TAPi18n } from '../ARTIMO_FUNCIONES'

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
      <Tab eventKey={1} title={TAPi18n.__("Chart")}>
        <DrawWithd3 eventKey={1}/>
      </Tab>
      <Tab eventKey={2} title={TAPi18n.__("Summary")}>
        <DrawWithd3 eventKey={2}/>
      </Tab>
    </Tabs>
  }
}

let ChartArea = ({selectedSnapshot}) => {
  let snapshot = selectedSnapshot? true : false;
	return (
    <div>
      <div className="row" height="80%">
        <TabControl snapshot={snapshot}/>
      </div>
      <div className="row" height="20%">
        <DrawWithd3 eventKey={3}/>
      </div>
    </div>
  
  )
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