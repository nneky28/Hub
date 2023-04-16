import React from "react";
import { TextStyle, ViewStyle } from "react-native";

export type CustomMenuProps<T> = {
    onDismiss : () => void
    onPressHandler : (param : T) => void
    visible : boolean
    listItem : T[]
    anchor : React.ReactNode
    titleStyle? : TextStyle
    contentStyle? : ViewStyle
}