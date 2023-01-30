import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';



const styles = StyleSheet.create({
    mainViewContainer: {
        backgroundColor: AppColors.white,
        paddingHorizontal: width(4),
        marginTop: height(33),
        flex: 1,
        borderTopRightRadius: width(5),
        borderTopLeftRadius: width(5)
    },
    row: {
        flexDirection: 'row',
        paddingVertical: height(3),
        justifyContent: 'space-between',
        width: width(100),
        alignItems: 'center'

    },
    screenTitle: {
        color: '#545454',
        fontSize: width(5),
        fontFamily: FontFamily.BlackSansBlack,
        paddingHorizontal: width(15)
    },
    background: {
        backgroundColor: AppColors.darkGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: AppColors.darkGray,
        borderRadius: width(5),
        height: height(17),
        marginBottom: height(2)
    },
    icon: {
        resizeMode: "contain",
        width: width(10),
        height: height(8)
    },







});

export default styles;