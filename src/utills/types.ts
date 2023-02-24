import { ViewStyle,LayoutChangeEvent } from "react-native"
import { DateData } from "react-native-calendars/src/types"


export type boldType = "10" | "20" | "30" | "40" | "50" | "60" | "70" | "80" | "90" | "100" | "110"

export type UserPINActionType = "create" | "confirm" | "NoMobilePIN" | "HasMobilePIN" | "reset"
export type ImgPlaceholderProps = {
    size? : number,
    backgroundColor? : string,
    radius? : number,
    fontSize? : number,
    bold? : boldType,
    color? : string,
    text? : string
}

export type LottieIconProps = {
    icon : string | {uri : string}
    size? : number
}
export type SizedBoxProps = {
  width?: number;
  height?: number;
  size?:number,
  backgroundColor?: string;
  style?: {}
}
export type BackHandlerProps = {
  onPress? : () => void
  position? : "flex-start" | "center" | "flex-end"
}
export type CustomWebViewProps = {
  web_url : string
  show : boolean
  setShow : () => void
}
export type OnboardModalProps = {
  url : string
  visible : boolean
}
export type onNavigationStateChangeProps = {
  param : { url : string},
  dispatch : (
    (param : any) => void
  ),
  auth: any,
}
export type TouchWrapProps = {
  onPress : (param? : any) => void
  rippleColor? : string,
  height? : number,
  width? : number
  justifyContent?: string;
  alignItems?: string;
 style?: any,
  children:React.ReactNode
}
export type AppButtonProp = {
  text: string;
  onPress: (param?: any) => void;
  height?: number;
  width?: number;
  backgroundColor?: string;
  color?: string;
  paddingVertical?: number;
  loading : boolean,
}
export type ContainerProps = {
  position?: string;
  flex?: number;
  elevation?: number;
  width?: number;
  height?: number;
  borderColor?: string;
  widthPercent?: any;
  padding?: number;
  paddingHorizontal?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  paddingVertical?: number;
  paddingTop?: number;
  paddingBottom?: number;
  marginRight?: number;
  paddingLeft?: number;
  paddingRight?: number;
  borderWidth?: number;
  borderTopWidth?: number;
  borderBottomWidth?: number;
  borderRadius?: number;
  direction?: "row" | "column" | "row-reverse";
  wrap?: "wrap";
  verticalAlignment?: "flex-start" | "center" | "flex-end";
  horizontalAlignment?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-evenly";
  alignSelf?: "flex-start" | "center" | "flex-end";
  backgroundColor?: string;
  style?: object;
  children?: React.ReactNode;
}

export type PTagProps = {
    fontSize? : number,
    textAlign? : 'flex-start' | 'flex-end' | 'center',
    lineHeight? : number,
    color? : string,
    underline? : 'none' | 'underline' | 'line-through',
    lineColor? : string,
    marginTop? : number,
    marginLeft? : number,
    marginBottom? : number,
    style? : any,
    numberOfLines? : number,
    children : React.ReactNode
}

export type HTagProps = {
    fontSize? : number,
    textAlign? : 'flex-start' | 'flex-end' | 'center',
    lineHeight? : number,
    color? : string,
    underline? : 'none' | 'underline' | 'line-through',
    lineColor? : string,
    marginTop? : number,
    marginLeft? : number,
    marginBottom? : number,
    style? : any,
    numberOfLines? : number,
    children : React.ReactNode,
    bold? : boldType
  }

  export interface KeyboardAwareWrapperProps {
    children : React.ReactNode
  }
  

export type DatePickerModalProps = {
    show : boolean
    setShow : (param : boolean) => void
    type? : string
    current : string
    header? : string
    mode : "time" | "date" | "datetime"
   
    onChangeData : (param : string | Date) => void
}
export type CustomCalenderProps = {
    setShow : (param : false | DateData) => void
    date : string
    disableMinimum? : boolean
  }
export type DateModeProps = "text-field" | "calendar"

  export type EffectiveDateModalProps = CustomCalenderProps & {
    onHide : () => void
    show : boolean
    mode : DateModeProps
    title? : string
    sub_title? : string
    placeholder : string
    date : string
    setShow : (param : false | DateData) => void
    submitBtnText : string
    submitHandler : () => void
    isLoading : boolean
  }

 export type ItemListModalProps = {
  setOpen : () => void,
  loading : boolean,
  data : readonly any[],
  open : boolean,
  onPressHandler : (param : any) => void,
  header_1 : string,
  header_2 : string,
  sub_text : string,
  getMore : boolean,
  setPage : (param : number) => void,
  page : number,
  saving? : boolean,
  type? : string,
  buttonTitle? : string,
  addNewHandler? : (param : {
      type : string,
      text : string
    }) => void,
  handleSearch? : (param : {
      type : string,
      text : string
    }) => void,
  error? : string,
  setError? : (param : string) => void
}

 export type PeopleListModalProps = {
    setOpen : () => void,
    timestamp : number | null
    loading : boolean,
    data : readonly any[],
    show : boolean,
    onPressHandler : (param : any) => void,
    getMore : boolean,
    setPage : (param : number) => void,
    page : number
 }

 export type ListComponentProps = {
     index : number, 
     item : any,
     onPress : () => void
}
export type UserPINActionType = "create" | "confirm" | "NoMobilePIN" | "HasMobilePIN" | "reset"

export type UserPINComponentProps = {
  action : UserPINActionType,
  hasPIN : boolean,
  auth : {
      user? : {
          first_name? : string,
          last_name? : string
      }
  },
  holder : string,
  setHolder : (param : string) => void,
  validatePIN : ((param : string) => void) | ((param : string) => Promise<void>),
  error : string
  setError : (param : string) => void
}
