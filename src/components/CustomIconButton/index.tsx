import React from "react"
import { IconButton } from "react-native-paper"
import { CustomIconButtonProps } from "./types"
import AppColors from "../../utills/AppColors"
import { width } from "react-native-dimension"

const CustomIconButton = (props : CustomIconButtonProps) => {
    return(
        <IconButton 
            onPress={props.onPress}
            icon={props.icon} 
            rippleColor={props?.rippleColor || AppColors.whiteBase}
            hasTVPreferredFocus={undefined} 
            color={props.color || AppColors.green}
            size={props.size ? width(props.size) : undefined}
            tvParallaxProperties={undefined}       
        />
    )
}

export default CustomIconButton