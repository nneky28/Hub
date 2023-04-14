import { ViewStyle,TextStyle } from "react-native";
import { ProfileDataType } from '../../utills/data/profileData';




export type TextWithIconCopyProps = {
    item:  ProfileDataType;
    iconStyle:{}
    onHide: () => void,
    url?:string
}

export type TextWithProps = {
    containerStyle? : ViewStyle,
    textStyle?: TextStyle,
    iconStyle:{}
    item: ProfileDataType,
    onPressHandle?: () => void,
    url?:string
}





