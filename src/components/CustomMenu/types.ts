import React from "react";
import { TextStyle, ViewStyle } from "react-native";

export type CustomMenuProps = {
    onDismiss : () => void
    onPressHandler : (param : string) => void
    visible : boolean
    listItem : string[]
    anchor : React.ReactNode
    titleStyle? : TextStyle
    contentStyle? : ViewStyle
}