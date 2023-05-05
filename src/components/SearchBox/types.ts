import { ViewStyle } from "react-native";

export type SearchBoxProps = {
    title : string, 
    containerStyle? : ViewStyle, 
    onSubmitEditing : (e : any) => void,
    value: string,
}

export type SearchBoxIconRightProps = SearchBoxProps & {
    value : string
    // onChangeText: (value: string) => void,
    
}