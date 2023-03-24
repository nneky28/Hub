import { NEW_EMPLOYEE_DATA, NEW_EMPLOYEE_PAYLOAD } from "../Types"

const initiateState = {
    payload: {},
    fieldData: {}
}
const reducer = (state = initiateState, action) => {
    switch (action.type) {
        case NEW_EMPLOYEE_DATA: {
            return { ...state, fieldData: action.payload }
        }
        case NEW_EMPLOYEE_PAYLOAD: {
            return { ...state, payload: action.payload }
        }
        default:
            return state
    }
}

export default reducer;