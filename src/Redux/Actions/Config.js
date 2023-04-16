import { SCROLLTOPOSITION, SETBOTTOMTABBARVISIBLE, SETLOADERVISIBLE, SETSECURITYVISIBLE, SETCURRENTTASKTABINDEX, SETMODALVISIBLE, SETCURRENTTASKITEM } from '../Types';

export const setLoaderVisible = (payload) => {
  return {
    type: SETLOADERVISIBLE,
    payload: payload,
  };
};

export const setSecurityVisible = (payload) => {
  return {
    type: SETSECURITYVISIBLE,
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

export const setCurrentTabIndex = (payload) => {
  return {
    type: SETCURRENTTASKTABINDEX,
    payload: payload,
  };
};
export const setModalVisible = (payload) => {
  return {
    type: SETMODALVISIBLE,
    payload: payload,
  };
};

export const setCurrentTaskItem = (payload) => {
  return {
    type: SETCURRENTTASKITEM,
    payload: payload,
  };
};