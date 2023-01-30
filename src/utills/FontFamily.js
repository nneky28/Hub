import { Platform } from "react-native";

const FontFamily = Platform.OS === "ios" ? {
  BlackSansBlack: 'BlackSans-Black',
  BlackSansBold: 'BlackSans-SemiBold',//Note: The value is actually not BlackSansBold, we had to improvise
  //'BlackSans-Bold',
  BlackSansCondensedBold: 'BlackSans-CondensedBold',
  BlackSansCondensedBook: 'BlackSans-CondensedBook',
  BlackSansCondensedLight: 'BlackSans-CondensedLight',
  BlackSansCondensedMedium: 'BlackSans-CondensedMedium',
  BlackSansLight: 'BlackSans-Light',
  BlackSansRegular: 'BlackSans-Regular',
  BlackSansSemiBold: 'BlackSans-SemiBold',
  BlackSansThin: 'BlackSans-Thin',
  BlackSansUltraLight: 'BlackSans-UltraLight',
} : {
  BlackSansBlack: 'black-sans-black',
  BlackSansBold: 'black-sans-semi-bold', //Note: The value is actually not BlackSansBold, we had to improvise
  
  //'black-sans-bold',
  BlackSansCondensedBold: 'black-sans-condensed-bold',
  BlackSansCondensedBook: 'black-sans-condensed-book',
  BlackSansCondensedLight: 'black-sans-condensed-light',
  BlackSansCondensedMedium: 'black-sans-condensed-medium',
  BlackSansLight: 'black-sans-light',
  BlackSansRegular: 'black-sans-regular',
  BlackSansSemiBold: 'black-sans-semi-bold',
  BlackSansThin: 'black-sans-thin',
  BlackSansUltraLight: 'black-sans-ultralight',
}
export {FontFamily};
