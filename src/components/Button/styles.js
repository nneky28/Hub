import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: AppColors.green,
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 10,
    margin: 8,
    ...AppColors.shadowStyles,
  },
  text: {
    color: AppColors.white,
    fontSize: width(4),
  },
});
export default styles;
