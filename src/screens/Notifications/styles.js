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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftIcon: {
    width: width(5),
    height: width(5),
  },
  downIcon: {
    width: width(3),
    height: width(3),
  },
  text1: {
    fontSize: width(4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold,
    // marginLeft: '6%',
    width: width(60),
  },
  heading: {
    fontSize: width(4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold
    
  },
  subText: {
    fontSize: width(2.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular
  },
  titleText: {
    fontSize: width(3),
    color: AppColors.black1,
    marginRight: width(2),
    fontFamily: FontFamily.BlackSansBold
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    marginTop: height(1),
    elevation: 0,
  },
  headingContainer: {
    marginTop: height(2),
    width: width(90),
    marginBottom: height(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  listItemContainer: {
    width: width(90),
    borderColor: AppColors.gray1,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: height(1.1),
    paddingHorizontal: width(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatarStyle: {
    height: height(5),
    width: height(5),
    borderRadius: height(4.75),
  },
  textContainer: {
    justifyContent: 'space-between',
    height: height(5),
    marginLeft: width(2)
  },

  flatListIcon: {
      height: height(2.5),
      width: width(4.5),
      color: AppColors.black1
  }, 
  iconAndTextContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      height: height(6)
  },
  heading2: {
    fontSize: width(3),
    marginRight: width(2),
    fontFamily: FontFamily.BlackSansBold,
    color: AppColors.black3,
  }
});
export default styles;
