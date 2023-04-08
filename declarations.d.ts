
declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-dimension' {
  const width : (param : number) => number;
  const height : (param : number) => number
  export {width,height};
}

declare module 'react-native-freshchat-sdk' {
  import { NativeEventSubscription } from 'react-native';
  type funcType = {
    (param : {count : number,status : boolean}) : void
  }
  type fnType = {
    () : void
  }
  let Freshchat : {
    addEventListener(event : string,fn : fnType) : void,
    EVENT_UNREAD_MESSAGE_COUNT_CHANGED : "com.freshchat.consumer.sdk.MessageCountChanged",
    getUnreadCountAsync(fn : funcType) : void,
    resetUser : () => void
  }
  export {Freshchat}
}

declare module 'react-native-swipeable'{
  let Swipeable : any
  export default Swipeable
}

declare module 'react-native-smooth-pincode-input'{
  let SmoothPinCodeInput : any
  export default SmoothPinCodeInput
}

declare module "*.png" {
  import {ImageSourcePropType} from  "react-native"
  const value: ImageSourcePropType;
  export = value;
}
