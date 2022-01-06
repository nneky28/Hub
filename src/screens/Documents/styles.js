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
    // justifyContent: 'space-evenly',
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
    alignSelf: 'center',
    marginLeft: width(30),
    // width: width(60),
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    marginTop: height(1),
    elevation: 0,
  },
  listItemContainer: {
    width: width(90),
    backgroundColor: AppColors.white,
    paddingVertical: height(1),
    // paddingHorizontal: width(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textContainer: {
    justifyContent: 'space-evenly',
    height: height(5),
    marginLeft: width(3.5),
    width : width(80)
  },

  fileIcon: {
      height: height(4),
      width: width(5),
      color: AppColors.black1
  }, 
  dotsIcon: {
    height: height(0.5),
    width: width(3.5),
    color: AppColors.black1
  }, 
  subText: {
    fontSize: width(2.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular,
  },
  titleText: {
    fontSize: width(3),
    color: AppColors.black1,
    flexWrap : 'wrap',
    marginRight: width(2),
    fontFamily: FontFamily.BlackSansBold,
  },
});

export default styles;