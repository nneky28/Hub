
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState,AppDispatch } from '../Redux';
import { StoredUserProps } from '../Routes/types';
import { FontFamily } from './FontFamily';
import { width } from 'react-native-dimension';


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector



export const ToastError = (msg:string) => {
  showMessage({
    message: 'Error',
    description: msg,
    type: 'danger',
    titleStyle : {
      fontFamily : FontFamily.MontserratBold,
      fontSize : width(4)
    },
    textStyle : {
      fontFamily : FontFamily.MontserratRegular,
      fontSize : width(3.3)
    }
  })
};


export const ToastSuccess = (msg : string) => (
  showMessage({
    message: 'Success',
    description: msg,
    type: 'success',
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

export const validateEmail = (value:string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return true
  return false
}

type __flattenProps = {
  res? : {
    results? : any
  }
}

export const __flatten = (data:__flattenProps[]) => {
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