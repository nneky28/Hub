
import React from "react"
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { useEffect } from 'react';
import { showMessage } from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {logout} from '../Redux/Actions/Auth';
import { APIFunction, getAPIs } from "./api";


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

  export const getTimeOffsFunction = async () => {
    let token = await getData("token");
    let user =  await getData("user");
    let about_me = await getData("about_me")
    let biz = user.employee_user_memberships &&
    Array.isArray(user.employee_user_memberships) && user.employee_user_memberships[0]
    && user.employee_user_memberships[0].business_id ? user.employee_user_memberships[0] : null;
    let timeoff_url = APIFunction.timeoff(biz.business_id,about_me.id);
    let active_url = APIFunction.timeoff_taken(biz.business_id,about_me.id,"active");
    let upcoming_url = APIFunction.timeoff_taken(biz.business_id,about_me.id,"upcoming");
    let hist_url = APIFunction.timeoff_taken(biz.business_id,about_me.id,"history")
    let req_url  = APIFunction.timeoff_reqs(biz.business_id,about_me.id);

    let timeoff_res = await getAPIs(timeoff_url,token);
    let active_res = await getAPIs(active_url,token);
    let upcoming_res = await getAPIs(upcoming_url,token);
    let hist_res = await getAPIs(hist_url,token);
    let req_res = await getAPIs(req_url,token);
    let tabs = [];
    let active = []
    let history = []
    let available = [];
    let requests = []
     if(
         timeoff_res && timeoff_res.results && 
         Array.isArray(timeoff_res.results) &&
         timeoff_res.results.length > 0
     ){
         tabs.push("Available")
         available = [...available,...timeoff_res.results]
     }
     if(
         active_res && active_res.results && 
         Array.isArray(active_res.results) &&
         active_res.results.length > 0
     ){
         tabs.push("Active")
         active = [...active,...active_res.results];
     }
     if(
         upcoming_res && upcoming_res.results && 
         Array.isArray(upcoming_res.results) &&
         upcoming_res.results.length > 0
     ){
         !tabs.includes("Active") ? tabs.push("Active") : null
         active = [...active,...upcoming_res.results];
     }
     if(
         hist_res && hist_res.results && 
         Array.isArray(hist_res.results) &&
         hist_res.results.length > 0
     ){
         tabs.push("History")
         history = [...history,...hist_res.results]
     }
     if(
         req_res && req_res.results && 
         Array.isArray(req_res.results) &&
         req_res.results.length > 0
     ){
        tabs.push("Request")
        requests = [...requests,...req_res.results]
     }
     return {
       requests,
       history,
       active,
       tabs,
       available
     }
  }