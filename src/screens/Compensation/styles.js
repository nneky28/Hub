import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  mainViewContainer: {
    backgroundColor: AppColors.white,
    alignItems: 'center',
  },
  header: {
    width: width(100),
    paddingHorizontal: width(5),
    marginTop: height(2),
    marginBottom: height(1.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    width: width(5),
    height: width(5),
  },
  screenTitle: {
    fontSize: width(4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold,
    marginLeft: width(25)
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    marginTop: height(1),
    elevation: 0,
  },
  componentContainer: {
    justifyContent: 'center',
    paddingVertical: height(1),
    backgroundColor: AppColors.white,
    width: width(90),
    alignSelf: 'center',
  },
  listCompTitle: {
    fontSize: width(3.25),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansSemiBold,
  },
  subText: {
    fontSize: width(2.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular,
  }


});

export default styles;