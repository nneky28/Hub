import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  mainViewContainer: {
    backgroundColor: AppColors.white,
    alignItems: 'center',
    flex : 1
  },


  avatarStyle: {
    height: height(20),
    width: height(20),
    borderRadius: height(4.75),
  },
  headingContainer: {
    marginTop: height(2),
    marginBottom: height(2),
    width: width(90),
    alignSelf : "center"
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

  userInfoContainer: {
    marginTop: height(3),
    marginBottom: height(2),
    justifyContent: 'center',
    alignItems: 'center'
  },
  subHeading:{
    fontSize: width(3.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansSemiBold,
    marginTop: height(2)
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
    justifyContent: 'space-between',
    alignSelf : "center"
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
  },
  contentContainerStyle : {
    paddingHorizontal : width(2)
  }
});

export default styles;