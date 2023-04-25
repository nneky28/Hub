import { TextStyle, ViewStyle } from "react-native";
import { useFetchEmployeesData } from "../../screens/People/types";

export type PersonCardProps = {
    item : useFetchEmployeesData
    onPressHandler : () => void 
    containerStyle? : ViewStyle
    titleStyle? : TextStyle
    subtitleStyle? : TextStyle
}