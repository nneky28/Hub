import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
    textInput:{
        backgroundColor: AppColors.white,
        width: width(90),
        paddingVertical: height(1.75),
        paddingHorizontal: width(5),
        justifyContent:'center',
        alignSelf:'center',
        borderRadius: width(1.5),
        borderColor: AppColors.grayBorder,
        borderWidth: 1,
        marginTop: height(2)
    },
    text1: {
        fontSize: width(2.75), 
        color: AppColors.black3,
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
    }
);

export default styles;
