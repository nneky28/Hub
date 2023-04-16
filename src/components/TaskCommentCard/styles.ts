import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
    avatarStyle: {
        height: height(5),
        width: height(5),
        borderRadius: width(50),
    },
    titleText: {
        fontSize: width(3.3),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansRegular
    }
});

export default styles;