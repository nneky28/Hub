import React from "react"
import { RefreshControl } from "react-native"
import AppColors from "../../utills/AppColors"

export const CustomRefreshControl = (props : {loading : boolean, onRefresh : () => void}) =>{
    return(
      <RefreshControl
          colors={[AppColors.white]}
          progressBackgroundColor={AppColors.green}
          refreshing={props.loading}
        // onRefresh={props.onRefresh}
        {...props}
    />)
  }