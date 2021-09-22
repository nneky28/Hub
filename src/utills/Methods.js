
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from 'react-native-flash-message';
export function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

export const ToastError  = (msg) => (
    showMessage({
        message: 'Error',
        description: msg,
        type: 'error',
    })
);

export const ToastSuccess = (msg) =>(
    showMessage({
        message: 'Success',
        description: msg,
        type: 'success',
    })
);

export const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@${key}`, jsonValue);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  export const getData = async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return false;
    }
  };