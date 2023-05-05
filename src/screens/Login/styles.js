import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,

  },
  logo: {
    width: width(5),
    height: height(2),
    resizeMode: 'contain',
    marginRight: width(3),
  },
  header: {
    fontSize: width(7),
    paddingVertical: height(1),
    marginTop: height(2),
    paddingHorizontal: width(4)
  },

  btnCon: {
    marginTop: height(4)
  },
  btn: {
    width: width(90)
  },
  btn1: {
    backgroundColor: AppColors.transparent,
    borderWidth: 0.5,
    borderColor: AppColors.grayBorder,
    width: width(90)
  },
  btn2: {
    backgroundColor: AppColors.blue2,
    width: width(90)
  },
  text: {
    color: AppColors.black,
    fontSize: width(3.5),
    fontFamily: FontFamily.MontserratRegular
  },
  fbkCon: {
    backgroundColor: AppColors.white,
    borderWidth: 0.1
  },
  login: {
    textDecorationLine: 'underline',
    fontFamily: FontFamily.MontserratRegular
  },
  loginText: {
    fontFamily: FontFamily.MontserratCondensedLight
  }
});
export default styles;
