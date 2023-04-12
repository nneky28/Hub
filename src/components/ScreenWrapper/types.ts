import React from "react";

export type ScreenWrapperProps = {
  children?:  React.ReactNode,
  statusBarColor? : string,
  transclucent? : boolean,
  scrollEnabled? : boolean,
  headerUnScrollable? :  () => void,
  footerUnScrollable? : () => void,
  barStyle? : "dark-content" | "light-content",
  backgroundColor? : string,
}