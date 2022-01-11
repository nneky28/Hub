import {StyleSheet,Platform} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  listContainer:{
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    width: width(90),
    paddingVertical: Platform.OS === "android" ? height(2.3) : height(1.8),
    // paddingHorizontal: width(5),
    justifyContent:'flex-start',
    alignSelf:'center',
    alignItems: 'center',
    borderRadius: width(1.5),
    borderColor: AppColors.grayBorder,
    borderWidth: 1,
    marginTop: height(2)
  },
  dropDownContainer: {
    backgroundColor: AppColors.white,
    width: width(90),
    //borderBottomColor: AppColors.grayBorder,
    height: height(15),
    marginTop: height(2),
    ...AppColors.bigShadow
    // borderLeftWidth: 1
   },
   text1: {
    fontSize: width(3.2), 
    color: AppColors.black,
    marginLeft: width(5),
    fontFamily: FontFamily.BlackSansRegular
  },
  text2: {
    fontSize: width(3.1), 
    color: AppColors.black,
    marginLeft: width(5),
    fontFamily: FontFamily.BlackSansRegular
  },
    errorText: {
        fontSize: width(2.75), 
        color: AppColors.red,
        fontFamily: FontFamily.BlackSansRegular
      },
    errorInput: {
        borderColor: AppColors.red,
      },
     downIcon2: {
        width: width(4),
        height: width(4),
        position: 'absolute', 
        left: width(82)
     },
    }
);

export default styles;
