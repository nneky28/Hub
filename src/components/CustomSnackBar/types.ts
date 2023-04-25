import { TextStyle, ViewStyle } from "react-native";

export type CustomSnackBarProps = {
    visible : boolean
    onDismiss : () => void
    label : string
    onPressHandler : () => void
    text : string
    labelStyle? : TextStyle
    containerStyle? : ViewStyle
    loading? : boolean
    textColor? : string
}