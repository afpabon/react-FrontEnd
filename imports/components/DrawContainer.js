import React from 'react'
import FilterMachine from '../containers/FilterMachine'
import MachinesList from '../containers/MachinesList'

const SearchSideBar = () => (
	<div>
		<FilterMachine />
		<MachinesList />
	</div>
)

export default SearchSideBar