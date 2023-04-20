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
  cameraIcon: {
    width: width(4),
    height: width(4),
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
  subText: {
    fontSize: width(3.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular
  },
  buttonStyle: {
    width: width(32),
    backgroundColor: AppColors.white,
    borderColor: AppColors.grayBorder,
    flexDirection: 'row',
    elevation: 0,
    borderWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: width(4),
    marginBottom: height(2),
    alignSelf: 'center',
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'flex-end'
},
  buttonText: {
    fontSize: width(3.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular
},
rightIcon: {
  width: width(4), 
  height: width(4)
},
});

export default styles;