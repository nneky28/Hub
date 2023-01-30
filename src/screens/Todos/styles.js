import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  header : {
    alignItems : "center",
    flexDirection : "row",
  },
  text: {
    color: AppColors.black1,
    fontSize: width(3.5),
    fontFamily: FontFamily.BlackSansBold,
    marginLeft : width(24)
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    width: width(90),
    alignSelf: 'center',
    paddingTop: height(1),
  },
  icon: {
    width: width(5),
    height: height(3),
  },
  icon1: {
    width: width(4),
    height: height(3),
    tintColor: AppColors.black1,
  },
  toDoContainer: {
    width: '100%',
    alignSelf: 'center',
    marginTop: height(2),
    paddingHorizontal: width(5),
    paddingVertical: height(1.3),
    borderWidth: 0.5,
    borderColor: AppColors.grayBorder,
    backgroundColor: AppColors.white,
    borderRadius: 15,
    ...AppColors.shadowStyles,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    marginTop: height(1),
    elevation: 0,
  },
});
export default styles;
