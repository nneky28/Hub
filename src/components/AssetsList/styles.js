import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';


const styles = StyleSheet.create({
  text: {
    fontSize: width(3.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold
  },
  text1: {
    fontSize: width(2.5),
    color: AppColors.darkGray,
    marginVertical: height(0.5),
    fontFamily: FontFamily.BlackSansRegular
  },
  container: {
    width: width(80),
    backgroundColor: AppColors.white,
    borderWidth: 0.5,
    borderColor: AppColors.grayBorder,
    ...AppColors.shadowStyles,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 20,
    paddingVertical: height(1.5),
    paddingHorizontal: width(3),
    justifyContent: 'space-between',
  },
  margin: {
    width: width(5),
  },
  flatList: {
    paddingHorizontal: width(5),
    paddingVertical: height(2),
  },
  image: {
    width: '35%',
    height: height(13),
    borderRadius: 10,
  },
  details: {
    width: '60%',
  },
  button: {
    marginLeft: 0,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.green,
    paddingVertical: height(0.7),
    alignSelf: 'flex-start',
    width: '66%',
    ...AppColors.noShadow
  },
  buttonText: {
    color: AppColors.black1,
    fontSize: width(3.5),
    fontFamily: FontFamily.BlackSansRegular
  },
});
export default styles;
