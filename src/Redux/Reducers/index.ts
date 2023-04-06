import Auth from './Auth'
import Config from './Config'
import EmployeeData from "./EmployeeData"
import { combineReducers } from 'redux'

export default combineReducers({
    Auth: Auth,
    Config: Config,
    Employee: EmployeeData
});
