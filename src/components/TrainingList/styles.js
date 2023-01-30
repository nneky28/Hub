import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';


const styles = StyleSheet.create({
  text: {
    fontSize: width(3.9),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold,
  },
  text1: {
    fontSize: width(2.7),
    color: AppColors.black1,
    marginVertical: height(0.5),
    fontFamily: FontFamily.BlackSansRegular,
  },
  ttext: {
    fontSize: width(3.1),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansSemiBold,
  },
  ttext1: {
    fontSize: width(3.1),
    color: AppColors.black1,
    marginVertical: height(0.5),
    fontFamily: FontFamily.BlackSansRegular,
  },
  container: {
    width: width(90),
    backgroundColor: AppColors.white,
    ...AppColors.bigShadow,
    borderRadius: 20,
    paddingVertical: height(1.5),
    paddingHorizontal: width(3),
    marginTop : height(3)
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
    paddingVertical: height(0.5),
  },
 halfWidth: {
    width: width(50)
  }
});
export default styles;
