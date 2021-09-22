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
  screenTitle: {
    fontSize: width(4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    marginTop: height(2),
    marginBottom: height(2),
    elevation: 0,
  },
  userInfoContainer: {
    marginTop: height(3),
    marginBottom: height(3),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarStyle: {
    height: height(20),
    width: height(20),
    borderRadius: height(4.75),
  },
  headingContainer: {
    marginTop: height(2),
    width: width(90)
  },
  nameText: {
    fontSize: width(4.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold
  },
  designationText: {
    fontSize: width(3),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular
  },
  buttonStyle: {
      width: width(40),
      backgroundColor: AppColors.white,
      borderColor: AppColors.grayBorder,
      elevation: 0,
      borderWidth: 1
  },
  buttonText: {
      fontSize: width(3),
      color: AppColors.black1,
      fontFamily: FontFamily.BlackSansRegular
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: height(2.5),
  },
  profileListContainer: {
    justifyContent: 'center',
    // paddingBottom: height(2.5),
    backgroundColor: AppColors.white,
    width: width(90),
    paddingHorizontal: width(4),
    borderColor: AppColors.grayBorder,
    borderWidth: 1,
    borderRadius: height(1.75),
    alignSelf: 'center',
    marginTop: height(2),
  },
  smallerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: height(1.5),
    backgroundColor: AppColors.gray,
    width: width(80),
    paddingHorizontal: width(4),
    borderColor: AppColors.grayBorder,
    borderWidth: 1,
    borderRadius: height(1.75),
    alignSelf: 'center',
    marginTop: height(1),
    height: height(8)
  },
  downIcon: {
    width: width(4),
    height: width(4),
  },
  listCompTitle: {
    fontSize: width(3.75),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansSemiBold
  },
  
  insideText1: {
    fontSize: width(2.75),
    color: AppColors.black2,
    fontFamily: FontFamily.BlackSansRegular
  },
  insideText2: {
    fontSize: width(3.75),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular,
    marginTop: height(1.3)
  },
  subHeading:{
    fontSize: width(3.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansSemiBold,
    marginTop: height(1)
  },
  saveBtnStyle: {
    backgroundColor: AppColors.white,
    width: width(20),
    height: height(5),
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: AppColors.gray,
    ...AppColors.noShadow,
  },
  saveBtnText: {
    color: AppColors.green,
    margin: 0,
    fontSize: width(2.75),
    fontFamily: FontFamily.BlackSansSemiBold,
    textDecorationLine: 'underline'
  },
  insideText3: {
    fontSize: width(3.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold,
    marginTop: height(0.5)
  },
  insideText4: {
    fontSize: width(2.75),
    color: AppColors.black2,
    fontFamily: FontFamily.BlackSansRegular
  },

  halfWidthContainer: {
    width: width(50)
  },
});

export default styles;