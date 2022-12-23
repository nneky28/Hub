import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
    text: {
        fontSize: width(4.5),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansBold,
    },
    imagePng: {
        width: width(15),
        height: width(15),
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },

    container: {
        paddingHorizontal: width(5),
    },
    row: {
        flexDirection: 'row',
        paddingVertical: height(2)
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },

    button: {
        margin: 0,
        backgroundColor: '#E0EEF0',
        paddingVertical: height(0.5),
        width: '28%',
        borderRadius: width(6),
        marginLeft: width(7.5),

    },
    buttonText: {
        fontSize: width(3.3),
        fontFamily: FontFamily.BlackSansRegular,
        color: AppColors.green,
        marginLeft: width(1)
    },
    count: {
        color: AppColors.green,
        fontSize: width(4.5),
        fontFamily: FontFamily.BlackSansBold
    },
    task: { color: '#E0EEF0', fontSize: width(4.5), fontFamily: FontFamily.BlackSansBold },

    line: {
        width: width(80),
        height: 8,
        borderRadius: width(5)
    },
    icon: {
        marginLeft: width(2),
        color: AppColors.green
    }
})
export default styles;
