import {SCROLLTOPOSITION, SETBOTTOMTABBARVISIBLE, SETLOADERVISIBLE} from '../Types';

export const setLoaderVisible = (payload) => {
  return {
    type: SETLOADERVISIBLE,
    payload: payload,
  };
};

export const setBottomTabBarVisible = (payload) => {
  return {
    type: SETBOTTOMTABBARVISIBLE,
    payload: payload,
  };
};

export const scrollToPosition = (payload) => {
  return {
    type: SCROLLTOPOSITION,
    payload: payload,
  };
};
