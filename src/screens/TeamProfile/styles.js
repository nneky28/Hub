import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';


const styles = StyleSheet.create({
    mainViewContainer: {
        backgroundColor: AppColors.white,
        alignItems: 'center',
    },
    line1: {
        width: '100%',
        height: 1,
        backgroundColor: AppColors.grayBorder,
        elevation: 0,
    },
    header: {
        width: width(100),
        marginTop: height(2),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: height(1),
        paddingHorizontal: width(4)
    },
    button: {
        backgroundColor: AppColors.lightYellow,
        paddingVertical: height(1),
        alignSelf: 'flex-start',
        maxWidth: width(40),
        borderRadius: width(6),
        marginTop: height(3),
        marginLeft: width(5)
    },
    buttonText: {
        fontSize: width(3.5),
        fontFamily: FontFamily.BlackSansRegular,
        color: AppColors.black1,
    },

    header1: {
        width: width(100),
        marginTop: height(2),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: height(1),
    },

    screenTitle: {
        fontSize: width(4.5),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansBold,
        width: width(40)

    },
    headerTitle: {
        fontSize: width(3.5),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansBold,
        paddingHorizontal: width(6),
    },

    button2: {
        width: '50%',
        height: height(2.5),
        alignItems: "center",
        justifyContent: "center"
    },

    genContainer: {
        marginBottom: height(4),
    },


    buttonText2: {
        fontSize: width(3.3),
        color: AppColors.black,
        fontFamily: FontFamily.BlackSansRegular
    },


    buttonText3: {
        fontSize: width(3.3),
        color: AppColors.green,
        fontFamily: FontFamily.BlackSansRegular
    },
    twoButtonCont: {
        width: width(40),
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderColor: AppColors.grayBorder,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: height(4),
        alignItems: 'center',
        marginRight: width(4)
    },
    button3: {
        width: '35%',
        height: height(3),
        alignItems: "center",
        justifyContent: "center"
    },
    animatedView3: {
        position: 'absolute',
        width: width(20),
        backgroundColor: AppColors.lightGreen,
        height: height(3.4),
        borderRadius: 20,
        zIndex: -1,
    },
    // container: {
    //     flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: width(5), marginTop: height(5)
    // },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height(4),
        paddingHorizontal: width(5)
    },

    boxContainer: {
        marginBottom: height(1),
        elevation: 3,
        flexDirection: 'row',
        marginTop: height(3),
        paddingHorizontal: width(5),
        justifyContent: 'space-between'
    },
    cont: {
        width: width(100),
        marginTop: height(2),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: height(1),
        paddingHorizontal: width(5)
    },
    leftIcon: {
        width: width(5),
        height: width(5),
    },
    line: {
        width: width(100),
        height: 1,
        backgroundColor: AppColors.grayBorder,
        marginTop: height(1),
        elevation: 0,
    },
    boxContainer: {
        elevation: 3,
        flexDirection: 'row',
        marginTop: height(3),
        justifyContent: 'space-evenly',
        paddingHorizontal: width(3)

    },
    mainContainer: { borderWidth: 0.5, width: width(28.5), borderRadius: width(4), borderColor: AppColors.transparent, },
    clipped: { height: height(9), resizeMode: 'contain', width: width(28) },
    count: {
        position: 'absolute',
        left: width(19),
        top: height(4)
    },
    title: {
        fontSize: width(3.3), color: AppColors.white,
    },
    titleCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: width(3),
        paddingVertical: height(2),
    },
    currentTab: {
        backgroundColor: AppColors.white,
        borderRadius: width(8),
        marginRight: width(3.5),
        height: height(3.5),
        ...AppColors.smallShadow,
        alignSelf: 'center'
    },
    defaultTab: {
        marginRight: width(3.5)
    },
    selectedTab: {
        fontFamily: FontFamily.BlackSansSemiBold,
        color: AppColors.green,
    },
    tab: {
        fontFamily: FontFamily.BlackSansSemiBold,
        color: AppColors.black1,
        fontSize: width(3.3)
    },
    scrollViewContainer: {
        flex: 1,
        backgroundColor: '#F2F2F2',


    },
    scrollViewCon: {
        marginTop: height(3),
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: AppColors.grayBorder,
        borderRadius: width(15),
        backgroundColor: '#F2F2F2',
        paddingHorizontal: width(1),
        marginLeft: width(4.5)

    },

});
export default styles;
