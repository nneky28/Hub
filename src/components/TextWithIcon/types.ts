import { ViewStyle,TextStyle } from "react-native";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export type TextWithIconCopyProps = {
    item: {
        url: string,
        title: string,
        iconLeft: IconSource,
        iconRight:IconSource,
    },
    iconStyle:ViewStyle,
    onHide:()=>void
}

export type TextWithProps = {
    containerStyle? : ViewStyle,
    textStyle?: TextStyle,
    iconStyle: ViewStyle,
    item: {
        url: never,
        title: string,
        iconLeft: string,
        iconRight:string
    }
}