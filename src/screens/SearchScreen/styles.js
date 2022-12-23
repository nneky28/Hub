import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';


const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#F5F5F5',
        flex: 1,
        marginTop: height(10)
    },

    containerView: {
        width: width(100),
        paddingVertical: height(2),
        // backgroundColor: '#F5F5F5',
        // flex: 1
    },
    mainViewContainer: {
        backgroundColor: AppColors.white,
        alignItems: 'center',
    },

    header: {
        width: width(100),
        // marginBottom: height(0.5),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width(1),
        justifyContent: 'space-between',
        paddingVertical: height(2)
    },
    leftIcon: {
        width: width(5),
        height: width(5),
    },
    screenTitle: {
        fontSize: width(5),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansBold,
    },

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: width(6),
        marginTop: height(3.5),
        width: width(100),
        marginBottom: height(3.5)
    },
    btnText: {
        textDecorationLine: 'underline',
        color: AppColors.green
    },
    line: {
        width: width(90),
        height: 1,
        backgroundColor: AppColors.gray1,
        elevation: 0,
        marginLeft: width(5)
    },

    team: {
        paddingHorizontal: width(5),

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
        alignSelf: 'flex-start'
    },
    filterIconContainer: {
        backgroundColor: AppColors.white,
        // paddingVertical: height(2.2),
        paddingHorizontal: width(2.5),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 6,
        marginTop: height(1.5),
        marginLeft: width(3),
        flexDirection: 'row'
    },

    filterIconContainerIOS: {
        backgroundColor: AppColors.white,
        paddingVertical: height(1),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 6,
        marginTop: height(1.5),
        marginLeft: width(3),
        flexDirection: 'row',
        paddingHorizontal: width(2.5),
    },

    filterIcon: {
        width: width(5),
        height: height(5),
        resizeMode: 'contain'
    },
    filterIconIOS: {
        width: width(5),
        height: height(2.5),
    },
    searchBox: {
        width: width(80),
        alignSelf: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: width(3),
    },
    searchBoxA: {
        width: width(60),
        alignSelf: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: width(3),
    },
    textContainer: {
        justifyContent: 'space-between',
        height: height(4.5),
        marginLeft: width(2),
        marginTop: height(0.5)
    },
    subText: {
        fontSize: width(2.5),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansRegular,
    },
    titleText: {
        fontSize: width(3.5),
        color: AppColors.black1,
        marginRight: width(5),
        fontFamily: FontFamily.BlackSansBold,

    },
    button: {
        backgroundColor: '#E1E1E1',
        width: width(25),
        borderRadius: width(6),
        margin: 0,

    },
    buttonText: {
        fontSize: width(3.1),
        fontFamily: FontFamily.BlackSansBold,
        color: AppColors.black1,
    },
    listItemContainer: {
        backgroundColor: AppColors.white,
        paddingVertical: height(1),
        marginTop: height(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: width(4),
        borderBottomWidth: width(0.5),
        borderBottomColor: AppColors.grayBorder
    },
    rowPart: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    }

});
export default styles;
