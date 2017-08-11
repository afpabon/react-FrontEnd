import React from 'react'
import { connect } from 'react-redux'
import { changeSidebarTab } from '../actions'
import FilterMachine from './FilterMachine'
import MachinesList from './MachinesList'
import VariablesList from './VariablesList'

let SearchSideBar = ({sidebarVisibleTab, changeVisibleTab}) => {
	let buttons = [
		{
			'icon':'fa fa-truck',
			'color':'default',
			'label' : 'Machines',
			'name' : 'SEARCH'
		},
		{
			'icon':'glyphicon glyphicon-list',
			'color':'default',
			'label' : 'Variables',
			'name' : 'VARIABLES'
		},
	];
	return <div>
		<div className="row">
			<div className="btn-toolbar" role="toolbar">
				<div className="btn-group" role="group">
					{buttons.map(b=>{
						return <a 
							key={b.label} 
							className = {(sidebarVisibleTab === b.name)? 'btn btn-primary' : 'btn btn-' + b.color} 
							title={b.label}
							onClick = {()=>changeVisibleTab(b.name)}
						>
							<span className={b.icon}></span>
						</a>}
					)}
				</div>
			</div>
		</div>
		<div className="row">
			<div className={sidebarVisibleTab == "SEARCH"? 'visible' : 'hidden'}>
				<FilterMachine />
				<MachinesList />
			</div>
			<div className={sidebarVisibleTab == "VARIABLES"? 'visible' : 'hidden'}>
				<VariablesList />
			</div>
		</div>
	</div>
}

const mapStateToProps = state => {
  return {
    sidebarVisibleTab : state.sidebarVisibleTab,
  }
}

const mapDispatchToProps = dispatch => {
  return {
		changeVisibleTab : id => {
      dispatch(changeSidebarTab(id))
    }
  }
}

SearchSideBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchSideBar)

export default SearchSideBar