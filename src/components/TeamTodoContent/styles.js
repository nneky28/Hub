import { StyleSheet } from "react-native"
import { height, width } from 'react-native-dimension';
import { backgroundColor, marginTop } from "styled-system";
import AppColors from '../../utills/AppColors';
import { FontFamily } from "../../utills/FontFamily";

const styles = StyleSheet.create({
    wrapper: { backgroundColor: '#F5F5F5', marginTop: height(2) },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height(3),
        paddingHorizontal: width(5)
    },
    line: {
        width: width(100),
        height: 0.5,
        backgroundColor: AppColors.black1,
        marginTop: height(2),
        elevation: 0,
    },
    line1: {
        height: 1,
        backgroundColor: AppColors.grayBorder,
        elevation: 0,
        margin: 0,
        marginTop: height(1)
    },
    leftIcon: {
        width: width(5),
        height: width(5),
    },
    downIcon: {
        width: width(6),
        height: width(6),
        resizeMode: 'contain',
        marginTop: height(2)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: width(6),
    },
    date: {
        marginRight: width(2),

    },
    dateRow: { marginTop: height(1) },

    row1: {
        flexDirection: 'row',
        marginTop: height(1.5),
        marginBottom: height(1.5)
    },
    button: {
        backgroundColor: '#E1E1E1',
        width: width(25),
        borderRadius: width(6),
        margin: 0,

    },
    buttonText: {
        fontSize: width(3),
        fontFamily: FontFamily.BlackSansBold,
        color: AppColors.black1,
    },
    newButton: {
        backgroundColor: '#D9D9D9',
        width: width(27),
        borderTopLeftRadius: width(6),
        borderBottomLeftRadius: width(6),
        borderRightWidth: width(0.5),
        borderRightColor: AppColors.white,
        alignItems: 'center',
        padding: height(1),
    },
    btnPart: {
        backgroundColor: '#D9D9D9',
        width: width(6),
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: width(6),
        borderBottomRightRadius: width(6),
        margin: 0,
    },

    btn: { flexDirection: 'row' },

    title: {
        fontSize: width(3.4),
        color: AppColors.black1,
    },
    content: {
        flexDirection: 'row',
        width: width(50),
        paddingHorizontal: width(1)
    },
    icon: {
        width: width(5),
        height: width(4),
        paddingVertical: height(2),
    },


    author: {
        marginTop: height(0.8),
        color: AppColors.black1,
        fontSize: width(3.2),
        fontFamily: FontFamily.BlackSansRegular
    },
    dots: {
        margin: 0,
        marginLeft: width(6),
        width: width(47),
    },
    sub: {
        color: AppColors.black1,
        fontSize: width(3.3),
        fontFamily: FontFamily.BlackSansRegular,
        marginTop: height(0.8),
    },
    subRow: {
        flexDirection: 'row',
        paddingHorizontal: width(20),
    },
    row1: {
        flexDirection: 'row',
        marginTop: height(0.5),

    },
    flag: {
        resizeMode: 'contain',
        width: width(3),
        height: height(3),
        marginRight: width(3.5)
    },
    flagText: {
        fontSize: width(3.1),
        color: AppColors.black3,
        marginTop: height(0.5)
    },
    date: {
        color: AppColors.black3,
        marginLeft: width(2),
        fontSize: width(3.1)
    },

})

export default styles