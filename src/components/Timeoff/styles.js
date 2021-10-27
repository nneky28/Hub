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
  line2: {
    width: 1,
    height: '90%',
    backgroundColor: AppColors.gray1,
    marginVertical: height(1),
    elevation: 0,
    alignSelf: 'center',
  },
  line1: {
    width: width(10),
    height: 1,
    backgroundColor: AppColors.grayBorder,
    elevation: 0,
  },
  line3: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    marginBottom: height(0.5),
    elevation: 0,
  },
  
  icon: {
    width: width(3),
    height: width(3),
    tintColor: AppColors.black1,
    marginLeft: width(2),
  },
  text: {
    fontSize: width(3.2),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold
  },
  count: {
    fontSize: width(5),
    color: AppColors.green,
    fontFamily: FontFamily.BlackSansBold
  },
  endText: {
    fontSize: width(3.4),
    color: AppColors.red,
    fontFamily: FontFamily.BlackSansRegular
  },
  date: {
    fontSize: width(2.7),
    color: AppColors.black2,
    fontFamily: FontFamily.BlackSansRegular
  },
  date1: {
    fontSize: width(2),
    color: AppColors.black2,
    fontFamily: FontFamily.BlackSansRegular
  },
  count1: {
    fontSize: width(5),
    color: AppColors.grayBorder,
    fontFamily: FontFamily.BlackSansBold
  },
  count2: {
    fontSize: width(3),
    color: AppColors.grayBorder,
    fontFamily: FontFamily.BlackSansBold
  },
  text1: {
    fontSize: width(3),
    color: AppColors.black,
    marginVertical: height(1),
    fontFamily: FontFamily.BlackSansRegular
  },
  text2: {
    fontSize: width(2.65),
    fontFamily: FontFamily.BlackSansRegular
  },
  margin: {
    width: width(5),
  },
  flatList: {
    paddingHorizontal: width(5),
    paddingVertical: height(2.2),
    alignItems: 'flex-start',
  },
  flatListVertical: {
    paddingHorizontal: width(5),
    alignItems: 'flex-start',
    paddingBottom: height(2)
  },
  container: {
    width: width(42.2),
    backgroundColor: AppColors.white,
    ...AppColors.smallShadow,
    alignItems: 'center',
    borderRadius: 20,
    paddingTop: height(2),
    paddingBottom: height(1.5),
    paddingHorizontal: width(3),
    borderWidth: 0.5,
    borderColor: AppColors.grayBorder
  },
  absolute: {
    position: 'absolute',
    padding: width(5),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    // backgroundColor: 'gray',
    // zIndex: -1,
  },
  button: {
    margin: 0,
    backgroundColor: AppColors.white,
    borderColor: AppColors.grayBorder,
    borderWidth: 1,
    paddingVertical: height(0.4),
    width: '55%',
    marginTop: height(1),
    ...AppColors.noShadow
  },
  buttonText: {
    color: AppColors.black2,
    fontSize: width(2.2),
    fontFamily: FontFamily.BlackSansRegular
  },
});
export default styles;
