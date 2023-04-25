import { ViewStyle } from "react-native";

export type SearchBoxProps = {
    title? : string, 
    containerStyle? : ViewStyle, 
    onSubmitEditing : (e : any) => void| undefined,
    value?: string,
}

export type SearchBoxIconRightProps = SearchBoxProps & {
    value?: string
    title?:string
    // onChangeText: (value: string) => void,
    
}