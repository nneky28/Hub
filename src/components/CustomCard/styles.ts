import {StyleSheet} from 'react-native';
import { width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width(5),
    backgroundColor: AppColors.white,
    borderRadius: width(3),
    width: width(90),
    borderWidth: width(0.2),
    borderColor: AppColors.grayBorder,
    elevation: width(0.3),
  },
});
export default styles;
