import { StyleProp, TextStyle } from "react-native";

export type WarningModalProps = {
    onHide : () => void
    onPressHandler : () => void
    isVisible : boolean
    loading? : boolean
    cancelBtnText : string
    submitBtnText : string
    title : string
    sub_title : string
    icon? : string
    iconColor? : string
    iconStyle? : StyleProp<TextStyle>
}