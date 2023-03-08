import { StyleSheet } from "react-native"
import { height, width } from 'react-native-dimension';
import { backgroundColor } from "styled-system";
import AppColors from '../../utills/AppColors';
import { FontFamily } from "../../utills/FontFamily";

const styles = StyleSheet.create({
    wrapper: { backgroundColor: '#F5F5F5', paddingBottom: height(1), },
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
    btn: { flexDirection: 'row', marginTop: height(1) },
    button: {
        backgroundColor: '#D9D9D9',
        width: width(25),
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
        // borderColor: AppColors.green,
        // borderWidth: width(0.15)
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: width(5),
    },

    by: {
        paddingHorizontal: width(5.2),
        height: height(2),
        fontSize: width(3.2),
    },
    date: {
        color: AppColors.black3,
        marginLeft: width(2),
        fontSize: width(3.1)
    },

    row1: {
        flexDirection: 'row',
        paddingHorizontal: width(6),

    },
    subTaskRow: {
        flexDirection: 'row',
        paddingHorizontal: width(10),
    },
    buttonText: {
        fontSize: width(2.7),
        fontFamily: FontFamily.BlackSansRegular,
        color: AppColors.black,
        width: width(35),
        textAlign: 'center'
    },
    title: {
        fontSize: width(3.4),
        color: AppColors.black1,
        paddingVertical: height(1),
        width: width(50),
    },
    dots: {
        color: AppColors.darkGray,
    },
    content: {
        flexDirection: 'row',
    },
    sub: {
        color: AppColors.black3,
        fontSize: width(3.1),
        fontFamily: FontFamily.BlackSansRegular,
        marginTop: height(1),
        width: width(50)
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
    }

})

export default styles