import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  listItemContainer: {
    width: width(90),
    backgroundColor: AppColors.white,
    paddingVertical: height(1),
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
    height: height(4.5),
    marginLeft: width(2)
  },
  subText: {
    fontSize: width(2.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular,
  },
  titleText: {
    fontSize: width(3),
    color: AppColors.black1,
    marginRight: width(2),
    fontFamily: FontFamily.BlackSansBold,
  },
});

export default styles;