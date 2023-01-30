import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  mainViewContainer: {
    backgroundColor: AppColors.white,
    alignItems: 'center',
  },
  titleContainer: {
    alignSelf: 'center', 
    justifyContent: 'center', 
    width: width(65), 
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
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    marginTop: height(1),
    elevation: 0,
  },
  avatarStyle: {
    height: height(20),
    width: height(20),
    borderRadius: height(4.75),
  },
  headingContainer: {
    marginTop: height(2),
    marginBottom: height(2),
    width: width(90)
  },
  nameText: {
    fontSize: width(4.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold,
  },
  designationText: {
    fontSize: width(3),
    color: AppColors.black1,
    marginTop: height(0.5),
    fontFamily: FontFamily.BlackSansRegular,
  },
  headingText: {
    fontSize: width(3),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold,
  },
  buttonStyle: {
      width: width(90),
      backgroundColor: AppColors.white,
      borderColor: AppColors.grayBorder,
      elevation: 0,
      borderWidth: 1
  },
  buttonText: {
      fontSize: width(3),
      color: AppColors.black1,
      fontFamily: FontFamily.BlackSansRegular,
  },
  profileListContainer: {
    justifyContent: 'center',
    paddingVertical: height(2.5),
    backgroundColor: AppColors.white,
    width: width(90),
    paddingHorizontal: width(4),
    borderColor: AppColors.grayBorder,
    borderWidth: 1,
    borderRadius: height(1.75),
    alignSelf: 'center',
    marginTop: height(2),
  },
  userInfoContainer: {
    marginTop: height(3),
    marginBottom: height(2),
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  subHeading:{
    fontSize: width(3.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansSemiBold,
    marginTop: height(2)
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
  listItemContainer: {
    width: width(90),
    borderColor: AppColors.gray1,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: height(1.25),
    paddingHorizontal: width(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatarSmall: {
    height: height(5),
    width: height(5),
    borderRadius: height(4.75),
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
  textContainer: {
    justifyContent: 'space-between',
    height: height(4.5),
    marginLeft: width(2)
  },
  horizontalListContainer: {
    width: width(35), 
    height: height(17), 
    paddingHorizontal: width(2), 
    paddingVertical: height(1)
  }
});

export default styles;