import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
    mainViewContainer: {
        backgroundColor: AppColors.white,
        paddingHorizontal: width(5),
        flex: 1,
        borderTopRightRadius: width(5),
        borderTopLeftRadius: width(5),

    },
    container: {
        marginTop: height(1.5),
        borderWidth: width(0.3),
        borderColor: AppColors.grayBorder,
        borderRadius: width(5),
        justifyContent: 'center',
        alignSelf: 'center',
        width: width(90)
    },
    button: {
        width: width(50),
        paddingVertical : height(0.5),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppColors.gray1,
        flexDirection: 'row',
        borderRadius: width(2),
    },
    assign: {
        flexDirection: 'row',
        borderBottomWidth: width(0.5),
        borderBottomColor: AppColors.gray1,
        alignItems: 'center',
        marginTop : height(1),
        paddingBottom : height(1),
        justifyContent: 'space-around',
    },

    dueDate: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop : height(0.5),
        marginBottom : height(0.5)
    },
    btnIcon: {
        color: AppColors.black3,
        fontSize: width(3.1),
        padding: 5,
        fontFamily: FontFamily.BlackSansBold
    },
    button1: {
        width: width(42),
        paddingVertical : height(1.2),
        paddingHorizontal : width(2),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppColors.gray1,
        borderRadius: width(2),
    },
    date: {
        color: AppColors.black3,
        fontSize: width(3.1),
        fontFamily: FontFamily.BlackSansBold
    },

    addBtn: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
   
    btnContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: AppColors.white,
        marginTop: height(2),
        marginBottom : height(3)

    },

});

export default styles;