import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';


const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#F5F5F5',
        flex: 1,
        alignItems: 'center',
    },

    twoButtonCont: {
        width: width(90),
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: AppColors.grayBorder,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: height(4.5),
        alignItems: 'center',

    },
    button3: {
        width: '64%',
        height: height(3),
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        fontSize: width(3.3),
        fontFamily: FontFamily.BlackSansRegular,
        color: AppColors.black1,
    },
    buttonText1: {
        fontSize: width(3.3),
        fontFamily: FontFamily.BlackSansRegular,
        color: AppColors.green,
    },
    animatedView3: {
        position: 'absolute',
        width: width(40),
        backgroundColor: AppColors.lightGreen,
        height: height(4),
        borderRadius: 20,
        zIndex: -1,
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
        width: width(100),
        paddingVertical: height(2),
        paddingHorizontal: width(4.5),
        // marginTop: height(1)
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
        height: height(30),
        width: width(90),
        // minHeight: height(20)

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
    titleText: {
        fontSize: width(3.5),
        color: AppColors.black1,
        marginRight: width(5),
        fontFamily: FontFamily.BlackSansBold,

    },
    textContainer: {
        justifyContent: 'space-between',
        height: height(4.5),
        marginLeft: width(2),
        marginTop: height(2)
    },
    subText: {
        fontSize: width(2.5),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansRegular,
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
    listContainer: {
        width: width(90),
        justifyContent: 'space-between',
        paddingVertical: height(0.8),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height(2)
    },


});
export default styles;
