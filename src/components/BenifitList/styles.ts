import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  text: {
    fontSize: width(4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold
  },
  text1: {
    fontSize: width(3.1),
    color: AppColors.black1,
    marginVertical: height(0.5),
    fontFamily: FontFamily.BlackSansRegular
  },
  ttext: {
    fontSize: width(3.1),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold
  },
  ttext1: {
    fontSize: width(2.6),
    color: AppColors.black1,
    marginVertical: height(0.5),
    fontFamily: FontFamily.BlackSansRegular
  },
  container: {
    width: width(80),
    backgroundColor: AppColors.white,
    ...AppColors.shadowStyles,
    borderRadius: 20,
    paddingVertical: height(1.5),
    paddingHorizontal: width(3),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  between: {justifyContent: 'space-between'},
  margin: {
    width: width(5),
  },
  margin1: {
    marginTop: height(1),
  },
  margin2: {
    marginRight: width(2),
  },
  flatList: {
    paddingHorizontal: width(5),
    paddingVertical: height(2),
  },

  button: {
    margin: 0,
    backgroundColor: AppColors.black1,
    paddingVertical: height(0.7),
    alignSelf: 'flex-start',
    width: '33%',
  },
  buttonText: {
    fontSize: width(2.9),
    fontFamily: FontFamily.BlackSansRegular
  },
  icon: {
    width: width(3.5),
    height: width(3.5),
    tintColor: AppColors.black1,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#8DADFF',
    marginTop: height(1),
    elevation: 0,
  },
});
export default styles;
