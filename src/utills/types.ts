import { TextStyle } from "react-native"


export type boldType = "10" | "20" | "30" | "40" | "50" | "60" | "70" | "80" | "90" | "100" | "110"
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
    style? : TextStyle,
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
    style? : TextStyle,
    numberOfLines? : number,
    children : React.ReactNode,
    bold? : boldType
  }

  export interface KeyboardAwareWrapperProps {
    children : React.ReactNode
  }