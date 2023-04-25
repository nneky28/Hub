import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  mainViewContainer: {
    backgroundColor: AppColors.white,
    alignItems: 'center',
    flex : 1,
  },
  selectedHeading: {
    color: AppColors.green, 
    fontFamily: FontFamily.BlackSansBold,
  },
  heading: {
    fontSize: width(3.4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular
  },
  selected_tab : {
    borderBottomWidth  : width(0.4),
    borderColor: AppColors.green,
  },
  deselected_tab : {
    borderColor: AppColors.grayBorder,
  },

  line2: {
    width: '100%',
    backgroundColor: AppColors.grayBorder,
    height: height(0.2),
    elevation: 0,
  },

});
export default styles;
