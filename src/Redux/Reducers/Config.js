import {SCROLLTOPOSITION, SETBOTTOMTABBARVISIBLE, SETLOADERVISIBLE, SETSECURITYVISIBLE} from '../Types';
const intialState = {
  isLoaderVisible: false,
  isSecurityVisible : false,
  isBottomTabBarVisible: true,
  scrollPosition: {x:0, y:0}
};
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SETLOADERVISIBLE: {
      return {
        ...state,
        isLoaderVisible: action.payload,
      };
    }
    case SETSECURITYVISIBLE: {
      return {
        ...state,
        isSecurityVisible: action.payload,
      };
    }
    case SETBOTTOMTABBARVISIBLE: {
      return {
        ...state,
        isBottomTabBarVisible: action.payload,
      };
    }

    case SCROLLTOPOSITION: {
      return {
        ...state,
        scrollPosition: action.payload,
      };
    }
    default:
      return state;
  }
};
export default reducer;
