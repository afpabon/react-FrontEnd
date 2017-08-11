import { combineReducers } from 'redux'
import currentMachines from './currentMachines'
import machinesList from './machinesList'
import machineVariables from './machineVariables'
import oilSnapshots from './oilSnapshots'
import {sidebarVisibleTab} from './visibleReducers'

const oilSamplesApp = combineReducers({
  currentMachines,
  machinesList,
  sidebarVisibleTab,
  machineVariables,
  oilSnapshots
})

export default oilSamplesApp