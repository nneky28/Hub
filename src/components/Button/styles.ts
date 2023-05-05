import {StyleSheet} from 'react-native';
import {width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: AppColors.black,
    width: '85%',
    alignSelf: 'center',
    paddingVertical: 15,
    margin: 8,
   marginLeft:width(4),
    ...AppColors.shadowStyles,
  },
  text: {
    color: AppColors.white,
    fontSize: width(3.5),
    fontFamily:FontFamily.MontserratRegular
  },

});
export default styles;
