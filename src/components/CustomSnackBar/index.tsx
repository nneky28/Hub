import React from  "react"
import { width } from "react-native-dimension"
import { Snackbar } from "react-native-paper"
import AppColors from "../../utills/AppColors"
import { P } from "../../utills/components"
import {CustomSnackBarProps} from "./types"
import styles from "./styles"

const CustomSnackBar = (props : CustomSnackBarProps) => {
    return(
        <Snackbar
            visible={props?.visible}
            onDismiss={props?.onDismiss}
            duration={7000}
            action={{
                label: !props?.loading ? props?.label : "",
                onPress: props.onPressHandler,
                labelStyle : props?.labelStyle || styles.label,
                loading : props?.loading
            }}
            style={props?.containerStyle || styles.container}
            theme={{
                roundness: width(3)
              }
            }
        >
           <P color={props?.textColor || AppColors.white}>{props?.text}</P>
        </Snackbar>
    )
}

export default CustomSnackBar