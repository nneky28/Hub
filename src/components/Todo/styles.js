import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    marginVertical: height(1),
    elevation: 0,
  },
  icon: {
    width: width(5),
    height: width(5),
    tintColor: AppColors.green,
  },
  text: {
    fontSize: width(3),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold    
  },
  text1: {
    fontSize: width(2.5),
    color: AppColors.black,
    fontFamily: FontFamily.BlackSansRegular
  },
});
export default styles;
