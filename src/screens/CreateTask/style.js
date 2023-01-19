import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';
import { borderWidth, justifyContent, marginLeft } from 'styled-system';

const styles = StyleSheet.create({
    mainViewContainer: {
        backgroundColor: AppColors.white,
        paddingHorizontal: width(5),
        marginTop: height(10),
        flex: 1,
        borderTopRightRadius: width(5),
        borderTopLeftRadius: width(5)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height(5)
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
        marginTop: height(2),
        borderWidth: width(0.3),
        borderColor: AppColors.grayBorder,
        borderRadius: width(5),
        height: height(15),
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
        width: width(3),
        height: height(3)
    },
    addSubtask: {
        marginTop: height(2),
        borderWidth: width(0.3),
        borderColor: AppColors.grayBorder,
        borderRadius: width(2),
        height: height(5.5),
        justifyContent: 'center',
        alignSelf: 'center',
    },
    addBtn: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    input: {
        marginTop: height(1)
    },
    btnContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flex: 1,
        paddingVertical: height(9.5)
    },
    buttonStyle: {
        borderRadius: width(3),
        backgroundColor: '#EAF8FA'
    },
    buttonStyle1: {
        borderRadius: width(2),
        borderWidth: 1,
        borderColor: AppColors.transparent,
        width: width(90),
        paddingVertical: height(1.5),
        marginTop: height(2)
    },
    buttonText: {
        color: AppColors.green,
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