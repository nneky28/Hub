import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension'
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: AppColors.gray1,
        width: width(100),
        paddingHorizontal: width(2),
        alignItems: 'center',
        borderRadius: width(1.5),
        marginTop: height(1.5),
        height: height(6.5),
    },
    inputStyle: {
        width: width(90),
    },
    inputStyleIOS: {
        width: width(50),
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
        marginLeft: width(4),
        marginRight: width(3)
    },

});
export default styles;
