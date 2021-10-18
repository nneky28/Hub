import {LOGIN, LOGOUT} from '../Types';
const intialState = {
  user: null,
  isLogin: false,
  route : "splash"
};
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        user: {},
        isLogin: true,
        ...action.payload
      };
    }
    case LOGOUT: {
      return {
        ...state,
        user: {},
        isLogin: false,
      };
    }
    default:
      return state;
  }
};
export default reducer;
