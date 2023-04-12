import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export type HeaderWithBackButtonProps =  {
    headerContainerStyle? : ViewStyle
    headerText? : string
    headerTextStyle? : TextStyle
    rightIcon? : IconSource
    iconStyle? : TextStyle
    onPressHandler? : () => void
    subHeaderText? : string
    rightText? : never
    subHeaderTextStyle? : TextStyle
    bottomText? : string
    rightButtonText? : never
    bottomTextStyle? : TextStyle
} | {
    headerContainerStyle? : ViewStyle
    headerText? : string
    headerTextStyle? : TextStyle
    rightIcon? : never
    iconStyle? : TextStyle
    onPressHandler? : () => void
    subHeaderText? : string
    rightText? : string
    rightButtonText? : never
    subHeaderTextStyle? : TextStyle
    bottomText? : string
    bottomTextStyle? : TextStyle
} | {
    headerContainerStyle? : ViewStyle
    headerText? : string
    headerTextStyle? : TextStyle
    rightIcon? : never
    iconStyle? : TextStyle
    onPressHandler? : () => void
    subHeaderText? : string
    rightText? : never
    rightButtonText? : string
    subHeaderTextStyle? : TextStyle
    onSubmitHandler : () => void
    isLoading : boolean
    buttonTextColor? : string
    bottomText? : string
    bottomTextStyle? : TextStyle
}

export type HomePageHeaderProps = {
    image : string
    imageStyle? : ImageStyle
    header : string
    headerStyle? : TextStyle
    rightIcon? : never
    onPressHandler? : never
} | {
    image : string
    imageStyle? : ImageStyle
    header : string
    headerStyle? : TextStyle
    rightIcon : IconSource
    rightIconColor? : string
    onPressHandler : () => void
}