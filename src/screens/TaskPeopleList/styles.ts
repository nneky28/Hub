import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';


const styles = StyleSheet.create({
    twoButtonCont: {
        width: width(90),
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: AppColors.grayBorder,
        borderRadius: width(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop : height(2),
        alignItems: 'center',

    },
    selected_tab : {
        width: width(43),
        alignItems: "center",
        justifyContent: "center",
        paddingVertical : height(1),
        backgroundColor : AppColors.lightGreen,
        borderRadius: width(10),
    },
    deselected_tab : {
        width: width(43),
        alignItems: "center",
        justifyContent: "center",
        paddingVertical : height(1),
        backgroundColor : AppColors.white,
        borderRadius: width(10),
    },
    buttonText1: {
        fontSize: width(3.3),
        fontFamily: FontFamily.BlackSansRegular,
        color: AppColors.green,
    },
    line: {
        width: width(90),
        borderWidth : width(0.2),
        borderColor: AppColors.gray1,
    },
    searchBoxContainer: {
        width: width(100),
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width(4.5),
    },
    searchBoxStyle: {
        width: width(90),
        alignSelf: 'flex-start',
        backgroundColor: AppColors.transparent,
        marginTop: height(3),
    },
   
    buttonText: {
        fontSize: width(3.1),
        fontFamily: FontFamily.BlackSansBold,
        color: AppColors.black1,
    },
    contentContainerStyle : {
        justifyContent : "center",
        alignItems : "center"
    }

});
export default styles;
