import { BottomTabNavigationProp, BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { DrawerNavigationProp, DrawerScreenProps } from "@react-navigation/drawer"
import { CompositeNavigationProp, CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { useFetchAboutMeData } from "../components/TimeoffModal/types"


type ParamsType = {
    [key : string] : unknown
}

//NAVIGATION TYPES

export type HomeScreenList = {
    Dashboard : undefined
    Notifications : undefined
}

export type PeopleScreenList = {
    PeopleHome : undefined
    MemberProfile : ParamsType
}

export type ProfileScreenList = {
    PersonalInfo : undefined
    EditProfile : undefined
    ProfileHome : undefined
    ScreenTemplate : undefined
    EditPhoto : undefined
    Compensation : undefined
    Settings : undefined
    NextKin : undefined
    Emergency : undefined
    PensionInfo : undefined
}

export type AuthScreenList = {
    Welcome : undefined
    Login : undefined
}

export type MenuScreenList = {
    TimeOff : undefined
    PayslipBreakDown : ParamsType | undefined
    Benefits : undefined
    Documents : undefined
    Trainings : undefined
    TaskOnboarding : undefined
    CreateTask : ParamsType | undefined
    TeamTaskHome : ParamsType | undefined
    TaskPeopleList : ParamsType  | undefined
    TaskLandingPage : undefined
    TaskHome : undefined
    PayslipHistory : undefined
    TaskDetails : ParamsType
}

export type OnboardScreenList = {
    LandingPage : undefined
    PersonalInfo : undefined
    Emergency : undefined
    NextKin : undefined
    PensionInfo: undefined
    EditPhoto:undefined
}

export type TabScreenList = {
    Home : NavigatorScreenParams<HomeScreenList>
    Menu : NavigatorScreenParams<MenuScreenList>
    People : NavigatorScreenParams<PeopleScreenList>
    Profile : NavigatorScreenParams<ProfileScreenList>
}

export type DrawerStackList = {
    App : undefined
    Settings : undefined
}

export type RootScreenProps = CompositeScreenProps<
    BottomTabScreenProps<TabScreenList>,
    DrawerScreenProps<DrawerStackList>
>

export type RootNavigationProps = CompositeNavigationProp<
    BottomTabNavigationProp<TabScreenList>,
    DrawerNavigationProp<DrawerStackList>
>

export type RootMenuNavigationProps = StackNavigationProp<MenuScreenList>

export type RootAuthScreenProps = StackScreenProps<AuthScreenList>

export type RootOnboardScreenProps = StackScreenProps<OnboardScreenList>

export type RootHomeScreenProps = StackScreenProps<HomeScreenList>




//PUSH NOTIFICAITON TYPES

export const CLOCK_IN_ALERT = "clock_in_alert"
export const TIME_OFF_REQUEST = "time_off_request"


export type PushNotificationData = {
    data? : {
        message_body? : string
        message_icon? : string
        message_title? : string
        type? : string
        type_id? : string
    }
    from? : string
    messageId? : string
    sentTime? : number
    ttl? : number
}


export type UserMembershipProps = {
    business_id? : string, 
    business_name?: string, 
    created?: string, 
    currency? : string, 
    logo? : string
}
export type StoredUserProps = {
    business_onboarding_status? : string
    business_user_memberships? : []
    email? : string
    employee_user_memberships? : UserMembershipProps[]
    first_name? : string
    last_name? : string
    profiles? : []
    
}

export type StoredAboutMeProps = useFetchAboutMeData