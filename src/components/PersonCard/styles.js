import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: AppColors.grayBorder,
    borderWidth: 1,
    borderRadius: width(3),
    paddingHorizontal: width(5),
    paddingVertical: height(3.5),
    width: width(43.25)
  },    
  avatarStyle: {
    height: height(8),
    width: height(8),
    borderRadius: height(4.75),
  },
  nameText: {
    fontSize: width(4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold,
    marginTop: height(1)
  },
  designationText: {
    fontSize: width(3),
    color: AppColors.black1,
    marginTop: height(0.5),
    fontFamily: FontFamily.BlackSansRegular,
  },
});

export default styles;