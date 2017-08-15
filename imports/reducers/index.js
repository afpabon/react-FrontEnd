import { combineReducers } from 'redux'
import currentMachines from './currentMachines'
import machinesList from './machinesList'
import machineVariables from './machineVariables'
import oilSnapshots from './oilSnapshots'
import selectedSnapshot from './selectedSnapshot'
import {sidebarVisibleTab} from './visibleReducers'

const oilSamplesApp = combineReducers({
  currentMachines,
  machinesList,
  sidebarVisibleTab,
  machineVariables,
  oilSnapshots,
  selectedSnapshot
})

export default oilSamplesApp