import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';


const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    backgroundColor: AppColors.grayBorder,
  },
  screenTitle: {
    fontFamily: FontFamily.MontserratBlack,
    fontSize: width(12),
    paddingHorizontal: width(14),
    lineHeight: width(10.9),
    top: height(5),
  },
  bg_img: {
    bottom: height(7),

  },
  icon: {
    marginLeft: width(2),
    color: AppColors.white
  }

});
export default styles;
