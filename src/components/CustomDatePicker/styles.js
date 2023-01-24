import {Platform, StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  listContainer:{
    flexDirection: 'row',
    backgroundColor: AppColors.gray,
    width: width(90),
    height : height(6),
    paddingHorizontal: width(5),
    justifyContent:'flex-start',
    alignSelf:'center',
    alignItems: 'center',
    borderRadius: width(3),
    borderColor: AppColors.grayBorder,
    borderWidth: 1,
    marginTop: height(2)
  },
  dropDownContainer: {
    backgroundColor: AppColors.white,
    marginRight: width(20),
    width: width(100)
   },
    text1: {
        fontSize: width(3.2), 
        color: AppColors.black,
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
      downIcon: {
        width: width(4),
        height: width(4),
        position: 'absolute', 
        left: width(77)
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
