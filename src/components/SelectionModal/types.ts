import { MenuScreenList } from "../../Routes/types"

export type TextWithIconProps = { 
    text : string
    screen : keyof MenuScreenList,
    icon : string, fill : string
}

export type SelectionModalProps = {
    isVisible : boolean,
    onHide : () => void
}

export type useFetchAppOnboardingData = {
    type : string
    id? : number
    mobile_navigation : {
        [key : string] : boolean
    }
    mobile_onboarding : {
        [key : string] : boolean
    }
    business? : string
    employee? : string
    has_completed_mobile_navigation : boolean
    has_completed_mobile_onboarding : boolean
}
export type useFetchAppOnboardingProps = {
    data : useFetchAppOnboardingData[]
    isLoading : boolean
    isFetching : boolean
}