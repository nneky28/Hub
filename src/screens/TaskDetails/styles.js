import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
    genContainer: {
        backgroundColor: AppColors.white,
        flex: 1,
        paddingHorizontal: width(5),
    },
    mainContainer: {
        flex: 1,
        backgroundColor: AppColors.white,

    },
    container: {
        paddingHorizontal: width(5),
        marginTop: height(10)
    },

    flagText: {
        fontSize: width(3),
        color: AppColors.black1,
    },
    date: {
        fontSize: width(3),
        color: AppColors.black1,
    },
    row: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: width(100)
    },

    title: {
        color: AppColors.black1
    },

    row1: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: width(1),
        bottom: height(1)
    },
    line: {
        width: width(100),
        height: 1,
        backgroundColor: AppColors.grayBorder,
        elevation: 0,
        alignSelf: 'center',
    },
    line1: {
        width: width(95),
        height: 1,
        backgroundColor: AppColors.grayBorder,
        elevation: 0,
        marginTop: height(2),
        alignSelf: 'center',
        marginBottom: height(2),
    },
    subTitle: { fontSize: width(3.1), color: AppColors.black1, marginLeft: width(4), alignSelf: 'center', width: width(80) },
    descriptionCon: { marginTop: height(1), },
    con: {

        paddingHorizontal: width(1),
    },
    button: {
        width: width(50),
        height: height(4),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppColors.gray1,
        flexDirection: 'row',
        borderRadius: width(2)
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
    container1: {
        marginTop: height(1),
        borderWidth: width(0.3),
        borderColor: AppColors.grayBorder,
        borderRadius: width(2),
        height: height(15),

    },
    subTaskContainer: {
        borderWidth: width(0.3),
        borderColor: AppColors.grayBorder,
        borderRadius: width(2),
        minHeight: height(8),
        paddingHorizontal: width(4),
        paddingVertical: height(1.8),
        width: width(90),
        marginTop: height(2),
    },
    name: {
        color: AppColors.black1,
        fontSize: width(3.1),
        padding: 5,
        fontFamily: FontFamily.BlackSansRegular
    },
    addSubtask: {
        marginTop: height(2),
        borderWidth: width(0.3),
        borderColor: AppColors.grayBorder,
        borderRadius: width(2),
        height: height(6),
        justifyContent: 'center'
    },
    addBtn: {
        bottom: height(1)

    },
    description: {
        fontSize: width(3),
        fontFamily: FontFamily.BlackSansRegular,
        color: AppColors.black1,
        paddingVertical: height(1),
        lineHeight: 18,

    },

    sections: {
        backgroundColor: '#E0EEF0',
        paddingVertical: height(1),
        width: width(100),
        marginTop: height(1),
        marginBottom: height(1),
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: width(5),
    },
    logText: {
        // fontFamily: FontFamily.BlackSansBlack,
        fontSize: width(3.5)
    },
    leftIcon: {
        width: width(3.5),
        height: width(3.5),
    },
    newBtn: {
        marginTop: height(2),

    },
    stickyDate: {
        paddingHorizontal: width(5),
        paddingVertical: height(1)
    },
    buttonStyle: {
        borderWidth: 1,
        borderColor: AppColors.blackgray,
        backgroundColor: AppColors.transparent,
        borderRadius: width(5),
        width: width(30),
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: AppColors.black1,
        fontSize: width(3.1)
    },
    subTaskRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width(4)
    },

    textContainer1: {
        justifyContent: 'space-between',
        marginLeft: width(2),
        alignItems: "center"
    },
    textCon: {
        justifyContent: 'space-between',
        height: height(4.5),
        marginLeft: width(2),
        marginTop: height(1)
    },
    titleText: {
        fontSize: width(3.5),
        fontFamily: FontFamily.BlackSansBold,
        color: AppColors.black1,
        paddingVertical: height(1),
        lineHeight: 18,

    },
    listContainer1: {
        width: width(90),
        justifyContent: 'space-between',
        marginLeft: width(4),
        paddingVertical: height(1),
        flexDirection: 'row',
    },

    rowSection: {
        justifyContent: 'space-between',
        marginLeft: width(4),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height(1),

    },
    Input: {
        width: width(80),
        alignSelf: 'center',
        marginTop: height(1),
    },
    avatarStyle: {
        height: height(5),
        width: height(5),
        borderRadius: height(4.75),
    },

});
export default styles;
