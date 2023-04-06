
export type ScreenWrapperProps = {
  children?:  JSX.Element|JSX.Element[],
  statusBarColor? : string,
  transclucent? : boolean,
  scrollEnabled? : boolean,
  headerUnScrollable? :  () => void,
  footerUnScrollable? : () => void,
  barStyle? : "dark-content" | "light-content",
  backgroundColor? : string,
}