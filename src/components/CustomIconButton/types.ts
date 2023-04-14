import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export type CustomIconButtonProps = {
    onPress :  () => void
    icon : IconSource
    color? : string
    rippleColor? : string
    size? : number
}