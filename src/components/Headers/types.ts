import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export type HeaderWithBackButtonProps =  {
    headerContainerStyle? : ViewStyle
    headerText? : string
    headerTextStyle? : TextStyle
    rightIcon? : string
    iconStyle? : TextStyle
    onPressHandler? : () => void
    subHeaderText? : string
    rightText? : string
    subHeaderTextStyle? : TextStyle
    bottomText? : string
    bottomTextStyle? : TextStyle
}

export type HomePageHeaderProps = {
    image : string
    imageStyle? : ImageStyle
    header : string
    headerStyle? : TextStyle
}