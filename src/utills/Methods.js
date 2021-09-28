
import React from "react"
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { useEffect } from 'react';
import { showMessage } from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {logout} from '../Redux/Actions/Auth';


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

export const ToastError  = (msg) => {
  console.log("ToastError--",msg)
  return msg === "Given token not valid for any token type" ? <LogUserOut /> : (
    showMessage({
        message: 'Error',
        description: msg,
        type: 'danger',
    })
  )
};

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

  const LogUserOut = () => {
    alert("Out!")
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(logout())
    },[])
    return(<> </>)
  }
  
  export const getData = async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return false;
    }
  };

  export const getGreetingTime = () => {
    const splitAfternoon = 12; // 24hr time to split the afternoon
    const splitEvening = 17; // 24hr time to split the evening
    const currentHour = parseFloat(moment().format('HH'));
    if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
      // Between 12 PM and 5PM
      return 'Good afternoon';
    } else if (currentHour >= splitEvening) {
      // Between 5PM and Midnight
      return 'Good evening';
    }
    // Between dawn and noon
    return 'Good morning';
  }

  export const Capitalize = string => {
    string = string.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase());
    return string;
  };