
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { width } from 'react-native-dimension';
import { showMessage } from 'react-native-flash-message';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useFetchAboutMeData } from '../components/TimeoffModal/types';
import type { RootState,AppDispatch } from '../Redux';
import { StoredUserProps } from '../Routes/types';
import AppColors from './AppColors';
import { FontFamily } from './FontFamily';


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const ToastError = (msg:string) => {
  showMessage({
    message: 'Error',
    description: msg,
    type: 'danger',
    titleStyle : {
      fontFamily : FontFamily.BlackSansBold,
      fontSize : width(4)
    },
    textStyle : {
      fontFamily : FontFamily.BlackSansRegular,
      fontSize : width(3.3)
    }
  })
};

export const validateEmail = (value:string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return true
  return false
}

export const ToastSuccess = (msg : string) => (
  showMessage({
    message: 'Success',
    description: msg,
    type: 'success',
    backgroundColor : AppColors.green,
    titleStyle : {
      fontFamily : FontFamily.BlackSansBold,
      fontSize : width(4)
    },
    textStyle : {
      fontFamily : FontFamily.BlackSansRegular,
      fontSize : width(3.3)
    }
  })
);
export type getStoredBusinessProps = {
  business_id? : string
  business_name? : string
  created? : string
  currency? : string
  logo? : string
}

export const getStoredBusiness = async () : Promise<getStoredBusinessProps | null>  => {
  let user : StoredUserProps | false | null | string = await getData("user");
  if(typeof user === "string" || !user || !user?.employee_user_memberships?.[0] ) return null
  return user?.employee_user_memberships?.[0];
}

export const getStoreAboutMe = async () : Promise<useFetchAboutMeData | null>  => {
  let user : useFetchAboutMeData | false | null | string = await getData("about_me");
  if(typeof user === "string" || !user ) return null
  return user;
}

export const getStoredUser = async () : Promise<StoredUserProps | null>  => {
  let user : StoredUserProps | false | null | string = await getData("user");
  if(typeof user === "string" || !user ) return null
  return user;
}

export const storeData = async (key : string, value : any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@${key}`, jsonValue);
    return true;
  } catch (e) {
    return false;
  }
};

export const getData = async (key : string) : Promise<{[index : string] : any} | null |  false | string> => {
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

type __flattenProps = {
  results? : any[]
}[] | {
  pages : {
    results? : any[]
  }[]
}

export const __flatten = (data:__flattenProps) => {
  if("pages" in data){
    let arr : any[] = []
    for(let index = 0; data.pages.length > index; index++){
      arr.push(data.pages[index])
    }
    return arr.map((res:any) => res?.results || {})
    .filter((arr) => Array.isArray(arr))
    .flat();
  }
  return data
    .map((res:any) => res?.results || {})
    .filter((arr) => Array.isArray(arr))
    .flat();
};

export const Capitalize = (string:string) => {
  const words = string.split(' ');
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });
  return capitalizedWords.join(' ');
};