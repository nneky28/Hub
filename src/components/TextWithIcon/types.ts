import { ViewStyle,TextStyle, ImageStyle } from "react-native";
import { ProfileDataType } from '../../utills/data/profileData';




export type TextWithIconCopyProps = {
    item:  ProfileDataType;
    iconStyle?: ImageStyle
    onHide: () => void,
    url?:string
}

export type TextWithProps = {
    containerStyle? : ViewStyle,
    textStyle?: TextStyle,
    iconStyle?: ImageStyle
    item: ProfileDataType,
    onPressHandle?: () => void,
    url?:string
}





