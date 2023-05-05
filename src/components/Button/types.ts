import { TextStyle, ViewStyle } from "react-native"

export type ButtonProps = {
    title : string,
    onPress : () => void,
    disabled? : boolean,
    isLoading? : boolean,
    loaderColor? : string,
    containerStyle? : ViewStyle,
  textStyle?: TextStyle,
  icon?: React.ReactNode,
  logo?: React.ReactNode,
  }