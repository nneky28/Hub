import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
    genContainer: {
        backgroundColor: AppColors.white,
        margin: 0,
        marginTop: height(10),
        flex: 1,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        justifyContent: 'center'
    },
    mainContainer: {
        flex: 1,
        borderTopRightRadius: width(5),
        borderTopLeftRadius: width(5),
        backgroundColor: 'transparent',
    },
    container: {
        paddingHorizontal: width(5),
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
    },

    title: {
        color: AppColors.black1
    },

    row1: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    line: {
        width: width(100),
        height: 1,
        backgroundColor: AppColors.grayBorder,
        elevation: 0,
        marginTop: height(1.5),
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
    subTitle: { fontSize: width(3.1), color: AppColors.black1, marginLeft: width(4) },
    descriptionCon: { marginTop: height(2) },
    con: {
        borderWidth: width(0.3),
        borderColor: AppColors.grayBorder,
        marginTop: height(1.5),
        borderRadius: width(2),
        height: height(13),
        paddingHorizontal: width(3),
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
        marginTop: height(2),
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
        flexDirection: 'row',
        justifyContent: 'center',

    },
    description: {
        fontSize: width(3),
        fontFamily: FontFamily.BlackSansRegular,
        color: AppColors.black1,
        paddingVertical: height(1),
        lineHeight: 18,
        paddingHorizontal: width(1)
    },

    sections: {
        backgroundColor: '#E0EEF0',
        paddingVertical: height(1),
        width: width(100),
        marginTop: height(2),
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: width(5),
    },
    logText: {
        fontFamily: FontFamily.BlackSansBlack,
        fontSize: width(3.5)
    },
    leftIcon: {
        width: width(3.5),
        height: width(3.5),
    },
    newBtn: {
        alignSelf: 'flex-end',
        paddingVertical: height(1)
    },
    stickyDate: {
        paddingHorizontal: width(5),
        marginTop: height(2),
    }

});
export default styles;
