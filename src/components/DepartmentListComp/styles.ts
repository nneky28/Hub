import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  listItemContainer: {
    width: width(90),
    paddingVertical: height(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  avatarStyle: {
    height: height(6),
    width: height(5.5),
    borderRadius: height(4.75),
  },
  textContainer: {
    justifyContent: 'space-between',
    height: height(4.5),
    marginLeft: width(2),
    marginTop: height(0.5)
  },
  subText: {
    fontSize: width(2.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular,
  },
  titleText: {
    fontSize: width(3.5),
    color: AppColors.black1,
    marginRight: width(5),
    fontFamily: FontFamily.BlackSansBold,

  },
  textContainer1: {
      width : width(75)
  },
  listContainer1: {
    width: width(90),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf : "center",
    paddingVertical : height(1)
  },
});

export default styles;