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
    onSubmitHandler? : never
    isLoading?: never,
    backHandler?: boolean
iconRight?:IconSource,
    rightIconColor?: string,
    
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