import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';



const styles = StyleSheet.create({
  mainViewContainer: {
    backgroundColor: AppColors.white,
    alignItems: 'center',
    // flex: 1,
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
  tickIcon: {
    width: width(8),
    height: width(8),
    marginRight: width(2)
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
    marginTop: height(1),
    elevation: 0,
  },
  saveBtnStyle: {
    backgroundColor: AppColors.white,
    width: width(9),
    elevation: 0,
    margin: 0,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 0,
  },
  saveBtnText: {
    color: AppColors.green,
    margin: 0,
    fontSize: width(4),
    fontFamily: FontFamily.BlackSansSemiBold
  },
  takePhotoBtn: {
    width: width(43),
    ...AppColors.noShadow
  },
  choosePhotoBtn: {
    width: width(43),
    backgroundColor: AppColors.white,
    borderColor: AppColors.grayBorder,
    borderWidth: 1,
    ...AppColors.noShadow
  },
  removeBtn: {
    width: width(90),
    backgroundColor: AppColors.white,
    borderColor: AppColors.red,
    borderWidth: 1,
    ...AppColors.noShadow
  },
  btnText: {
    fontSize: width(3.5),
    fontFamily: FontFamily.BlackSansSemiBold
  },
  btnTextBlack: {
    fontSize: width(3.5),
    fontFamily: FontFamily.BlackSansSemiBold,
    color:AppColors.black3
  },
  btnTextRed: {
    fontSize: width(3.5),
    fontFamily: FontFamily.BlackSansSemiBold,
    color:AppColors.red
  },
  imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 1,
    marginTop: height(4),   
    },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: height(4.75),
 
  },
  avatarStyle: {
    height: height(20),
    width: height(20),
    borderRadius: height(4.75),

  },
 
  mask: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: height(4.75),
  },
  container: {
    height: height(20),
    width: height(20),
    borderRadius: height(4.75),
  }

});

export default styles;