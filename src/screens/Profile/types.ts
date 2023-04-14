import { LayoutRectangle, ViewStyle } from "react-native";

export type TopBottomText = {topText : string,bottomText : string,containerStyle? : ViewStyle}

export type useFetchKinData = {
    address1?: string
    address2?: string
    city?: string
    country?: string
    country_display?: string
    created?: string
    email?: string
    employee?: number
    first_name?: string
    gender?: string
    gender_display?: string
    last_name?: string
    marital_status?: string
    marital_status_display?: string
    middle_name?: string
    nationality?: string
    phone_number?: string
    phone_number_two?: string
    postal_code?: string
    relationship?: string
    state?: string
    updated?: string
    url?: string
}
export type useFetchKinProps = {
    data? : useFetchKinData
    isLoading : boolean
    isFetching : boolean
}

export type useFetchEmergencyData = useFetchKinData

export type useFetchEmergencyProps = {
    data? : useFetchEmergencyData
    isLoading : boolean
    isFetching : boolean
}

export type useFetchBankingData = {
    code? : string
    id? : number
    name? : string
}

export type useFetchBankingProps = {
    data? : useFetchBankingData
    isLoading : boolean
    isFetching? : boolean
}

export type TextWithButtonProps = {
    topText : string
    bottomText : string
    onPressHandler : () => void
}

export type Coordinates = {
    [index : string] : LayoutRectangle
}