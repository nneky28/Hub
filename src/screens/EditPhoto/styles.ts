import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import { width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';



const styles = StyleSheet.create({
  mainViewContainer: {
    backgroundColor: AppColors.white,
    alignItems: 'center',
    flex: 1,
    justifyContent : "center"
  },

  takePhotoBtn: {
    width: width(43),
    ...AppColors.noShadow
  },
  choosePhotoBtn: {
    width: width(43),
    backgroundColor: AppColors.white,
    borderColor: AppColors.grayBorder,
    borderWidth: 1,
    ...AppColors.noShadow
  },
  removeBtn: {
    width: width(90),
    backgroundColor: AppColors.white,
    borderColor: AppColors.red,
    borderWidth: 1,
    ...AppColors.noShadow
  },
  btnText: {
    fontSize: width(3.5),
    fontFamily: FontFamily.BlackSansSemiBold
  },
 
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(50)
  },


});

export default styles;