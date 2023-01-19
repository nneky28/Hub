import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension'
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: AppColors.white,
        width: width(90),
        paddingHorizontal: width(2),
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: width(1.5),
        borderColor: AppColors.grayBorder,
        borderWidth: 1,
        marginTop: height(1.5),
        height: height(5),
    },
    inputStyle: {
        width: width(90),
    },
    inputStyleIOS: {
        width: width(90),
        textAlignVertical: "center",
        marginLeft: 5
    },
    text1: {
        fontSize: width(2.75),
        color: AppColors.black3,
        marginLeft: width(5),
        fontFamily: FontFamily.BlackSansRegular
    },
    searchIcon: {
        width: width(4),
        height: height(2),
    },

});
export default styles;
