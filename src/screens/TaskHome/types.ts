import { ViewStyle } from "react-native";

export type AddButtonProps = {
    onPress : () => void
    style? : ViewStyle
}

export type RenderItemProps = {
    char : string
}