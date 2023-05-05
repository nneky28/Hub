
import { ImageResizeMode, ImageSourcePropType, LayoutChangeEvent, TextStyle, ViewStyle } from "react-native"
import { DateData } from "react-native-calendars/src/types"


export type boldType = "10" | "20" | "30" | "40" | "50" | "60" | "70" | "80" | "90" | "100" | "110"

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


export type PTagProps = {
  fontSize? : number,
  textAlign? : "auto" | "left" | "right" | "center" | "justify",
  lineHeight? : number,
  color? : string,
  underline? : 'none' | 'underline' | 'line-through',
  lineColor? : string,
  marginTop? : number,
  marginLeft? : number,
  marginBottom? : number,
  marginRight? : number,
  style? : TextStyle,
  numberOfLines? : number,
  children : React.ReactNode
}

export type HTagProps = {
  fontSize? : number,
  textAlign? : "auto" | "left" | "right" | "center" | "justify",
  lineHeight? : number,
  color? : string,
  underline? : 'none' | 'underline' | 'line-through',
  lineColor? : string,
  marginTop? : number,
  marginLeft? : number,
  marginBottom? : number,
  marginRight? : number,
  style? : TextStyle,
  numberOfLines? : number,
  children : React.ReactNode,
  bold? : boldType
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
  position?: "absolute" | "relative";
  flex?: number;
  elevation?: number;
  width?: number;
  height?: number;
  borderColor?: string;
  widthPercent?: string;
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
  direction: "row";
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
  borderTopRightRadius? : number
  borderTopLeftRadius? : number
  style?: ViewStyle;
  children?: React.ReactNode;
} | {
  position?: "absolute" | "relative";
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
  direction?: "column" | "row-reverse";
  wrap?: "wrap";
  horizontalAlignment?: "flex-start" | "center" | "flex-end";
  verticalAlignment?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-evenly";
  alignSelf?: "flex-start" | "center" | "flex-end";
  backgroundColor?: string;
  borderTopRightRadius? : number
  borderTopLeftRadius? : number
  style?: ViewStyle;
  children?: React.ReactNode;
}

export type BackHandlerProps = {
  onPress? : () => void
  style? : ViewStyle
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



export type CordType = {
  [key : string] : {
      height? : number
      width? : number
      x? : number
      y? : number
  }
}
export type TouchableWrapperProps = {
  onPress : (param? : any) => void
  rippleColor? : string,
  isText? : boolean,
  height? : number,
  width? : number
  size? : number,
  style? : ViewStyle | ViewStyle[],
  disabled? : boolean
  onLayout? : (event : LayoutChangeEvent) => void,
  children : React.ReactNode
}

export type EmptyStateWrapperProps = {
  marginTop? : number
  marginBottom? : number
  backgroundColor? : string
  icon : string
  height? : number
  header_1? : string
  header_2? : string
  sub_text? : string
  spacing? : number
}

export type ImageWrapProps = {
  source : ImageSourcePropType
  url? : never
  position? : "relative" | "absolute"
  width? : number
  height? : number
  backgroundColor? : string
  borderRadius? : number
  borderTopLeftRadius? : number
  borderBottomLeftRadius?: number
  margin? : number
  marginVertical? : number
  marginHorizontal? : number
  marginRight? : number
  marginLeft? : number
  marginTop? : number
  marginBottom? : number
  padding? : number
  children? : React.ReactNode
  fit? : ImageResizeMode
} | {
  url : string
  source? : never
  position? : "relative" | "absolute"
  width? : number
  height? : number
  backgroundColor? : string
  borderRadius? : number
  borderTopLeftRadius? : number
  borderBottomLeftRadius?: number
  margin? : number
  marginVertical? : number
  marginHorizontal? : number
  marginRight? : number
  marginLeft? : number
  marginTop? : number
  marginBottom? : number
  padding? : number
  children? : React.ReactNode
  fit? : ImageResizeMode
}