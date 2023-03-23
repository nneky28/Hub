import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';
import { borderWidth, justifyContent, marginLeft } from 'styled-system';

const styles = StyleSheet.create({
    mainViewContainer: {
        backgroundColor: AppColors.white,
        paddingHorizontal: width(5),
        flex: 1,
        borderTopRightRadius: width(5),
        borderTopLeftRadius: width(5),

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height(5)
    },
    formRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: height(5)
    },
    line: {
        width: width(90),
        height: 1,
        backgroundColor: AppColors.blackgray,
        marginTop: height(1)
    },

    button: {
        width: width(50),
        height: height(4),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppColors.gray1,
        flexDirection: 'row',
        borderRadius: width(2),
    },
    button1: {
        width: width(42),
        height: height(4),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppColors.gray1,
        flexDirection: 'row',
        borderRadius: width(2),
    },
    buttonText1: {
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansBold
    },

    container: {
        marginTop: height(1.5),
        borderWidth: width(0.3),
        borderColor: AppColors.grayBorder,
        borderRadius: width(5),
        height: height(14),
        justifyContent: 'center',
        alignSelf: 'center',
        width: width(90)
    },
    assign: {
        flexDirection: 'row',
        borderBottomWidth: width(0.5),
        borderBottomColor: AppColors.gray1,
        height: height(7),
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    dueDate: {
        flexDirection: 'row',
        height: height(7),
        alignItems: 'center',
        justifyContent: 'space-around',

    },

    btn: {
        backgroundColor: '#BCEFFF',
        paddingVertical: height(1.5),
        borderRadius: width(1.5),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: width(1),
        padding: width(3.5),
        maxWidth: width(30)
    },
    btn2: {
        paddingVertical: height(1.5),
        borderRadius: width(1.5),
        alignItems: 'center',
        justifyContent: 'center',
        padding: width(4.5),
        maxWidth: width(45)
    },
    date: {
        color: AppColors.black3,
        fontSize: width(3.1),
        fontFamily: FontFamily.BlackSansBold
    },

    btnIcon: {
        color: AppColors.black3,
        fontSize: width(3.1),
        padding: 5,
        fontFamily: FontFamily.BlackSansBold
    },
    attachIcon: {
        resizeMode: 'contain',
        width: width(8),
        height: height(8)
    },
    addSubtask: {
        marginTop: height(1.5),
        borderWidth: width(0.3),
        borderColor: AppColors.grayBorder,
        borderRadius: width(2),
        height: height(5),
        justifyContent: 'center',
        alignSelf: 'center',
    },
    addBtn: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    input: {
        marginTop: height(1)
    },
    btnContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: AppColors.white,
        marginTop: height(2)
        // paddingHorizontal: width(4),

    },
    buttonStyle: {
        borderRadius: width(3),
        backgroundColor: '#EAF8FA',
        width: width(90),
        paddingVertical: height(1.8)
    },
    buttonStyle1: {
        borderRadius: width(3),
        borderColor: AppColors.transparent,
        width: width(90),
        // marginTop: height(1.5),
        paddingVertical: height(1.8)
    },
    buttonText: {
        color: AppColors.green,
        fontFamily: FontFamily.BlackSansBold,
        fontSize: width(3.5)
    },
    buttonText1: {
        color: AppColors.white,
        fontFamily: FontFamily.BlackSansBold,
        fontSize: width(3.5)
    },
    close: {
        marginTop: height(1),
        marginLeft: width(3)
    }


});

export default styles;