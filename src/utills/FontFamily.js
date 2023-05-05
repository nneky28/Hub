import { Platform } from "react-native";

const FontFamily = Platform.OS === "ios" ? {
  MontserratBlack: 'Montserrat-Black',
  MontserratBold: 'Montserrat-SemiBold',//Note: The value is actually not MontserratBold, we had to improvise
  //'Montserrat-Bold',
  MontserratCondensedBold: 'Montserrat-CondensedBold',
  MontserratCondensedBook: 'Montserrat-CondensedBook',
  MontserratCondensedLight: 'Montserrat-CondensedLight',
  MontserratCondensedMedium: 'Montserrat-CondensedMedium',
  MontserratLight: 'Montserrat-Light',
  MontserratRegular: 'Montserrat-Regular',
  MontserratSemiBold: 'Montserrat-SemiBold',
  MontserratThin: 'Montserrat-Thin',
  MontserratUltraLight: 'Montserrat-UltraLight',
} : {
  MontserratBlack: 'black-sans-black',
  MontserratBold: 'black-sans-semi-bold', //Note: The value is actually not MontserratBold, we had to improvise

  //'black-sans-bold',
  MontserratCondensedBold: 'black-sans-condensed-bold',
  MontserratCondensedBook: 'black-sans-condensed-book',
  MontserratCondensedLight: 'black-sans-condensed-light',
  MontserratCondensedMedium: 'black-sans-condensed-medium',
  MontserratLight: 'black-sans-light',
  MontserratRegular: 'black-sans-regular',
  MontserratSemiBold: 'black-sans-semi-bold',
  MontserratThin: 'black-sans-thin',
  MontserratUltraLight: 'black-sans-ultralight',
}
export { FontFamily };
