import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';
const styles = StyleSheet.create({
  flatlistContainer: {
    borderWidth: width(0.2),
    borderColor: AppColors.grayBorder,
    paddingHorizontal: width(3),
    paddingVertical: height(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: width(2.5),
    marginVertical: height(0.5),
    width: width(90),
    //elevation: width(0.1),
  },
  titleWrapper: {
    flexDirection: 'column',
    marginRight: width(9),
  },
  titleandperiod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  createddate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Periodtext: {
    fontSize: width(3),
    color: AppColors.titlecolor,
    fontFamily:FontFamily.BlackSansRegular,
    marginLeft: width(2.5),
  },

  Titletext: {
    fontSize: width(3.5),
    color: AppColors.titlecolor,
    fontFamily: FontFamily.BlackSansSemiBold,
  },

  dateText: {
    marginTop: height(0.5),
    fontSize: width(3),
    color: AppColors.titlecolor,
    fontFamily:FontFamily.BlackSansRegular,
  },

  fileIcon: {
    height: height(5),
    width: width(7),
  },
  dotIcon: {
    height: height(3),
    width: width(5),
  },
  downloadWrapper: {
    backgroundColor: AppColors.greyboxcolor,
    width: width(60),
    height: height(5),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: width(5),
    top: height(6),
    borderRadius: width(1.5),
    elevation: 5,
    borderWidth: width(0.1),
    borderColor: AppColors.greylinecolor,
  },
  downloadText: {
    fontFamily:FontFamily.BlackSansRegular,
    color: AppColors.titlecolor,
  },
});
export default styles;
