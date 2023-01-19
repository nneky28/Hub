import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';
import { bottom } from 'styled-system';


const styles = StyleSheet.create({
    mainViewContainer: {
        backgroundColor: AppColors.white,
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: AppColors.gray1,
        marginTop: height(1.5),
        elevation: 0,
    },
    header: {
        width: width(100),
        paddingHorizontal: width(5),
        marginTop: height(2),
        marginBottom: height(0.5),
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
    leftIcon: {
        width: width(5),
        height: width(5),
    },
    screenTitle: {
        fontSize: width(5),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansBold,
        paddingHorizontal: width(2)

    },
    headerTitle: {
        fontSize: width(4.5),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansBold,
        paddingHorizontal: width(6),
        paddingVertical: height(2.5)

    },
    team: {
        paddingHorizontal: width(5),
        marginTop: height(0.2),


    },
    scrollViewContainer: {
        marginTop: height(3),
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 0.5,
        borderColor: AppColors.grayBorder,
        borderRadius: width(15),
        backgroundColor: '#F2F2F2',
        paddingHorizontal: width(1),
        marginLeft: width(4.5)

    },
    threeButtonCont: {
        width: width(90),
        alignSelf: 'center',
        marginTop: height(4),
        borderWidth: 1,
        borderColor: AppColors.grayBorder,
        borderRadius: width(15),
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: height(4.5),
        alignItems: 'center',
        backgroundColor: AppColors.whiteBase
    },

    animatedView: {
        position: 'absolute',
        width: width(27),
        backgroundColor: AppColors.white,
        height: height(3),
        borderRadius: width(15),
        zIndex: -1,

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


    button: {
        width: '30%',
        height: height(3),
        alignItems: "center",
        justifyContent: "center"
    },


    addButton: {
        height: height(8),
        width: height(8),
        borderRadius: height(10),
        backgroundColor: '#ADE5EB',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: height(80),
        left: width(80),
        borderWidth: 0.1,
        borderColor: '#ADE5EB',

    },
    addButtonText: {
        fontSize: width(10),
        color: '#1E727B',
        fontFamily: FontFamily.BlackSansRegular
    },
    emptyState: {
        height: height(8),
        width: height(8),
        borderRadius: height(10),
        backgroundColor: '#ADE5EB',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: height(30),
        left: width(40),
        borderWidth: 0.1,
        borderColor: '#ADE5EB'
    },
    logoBox: { backgroundColor: '#FDEDCE', padding: width(1.5), borderRadius: width(1.5) },
    logo: { width: width(4.5), height: height(2), borderRadius: 50, alignSelf: 'center', },

    animatedView3: {
        position: 'absolute',
        width: width(20),
        backgroundColor: AppColors.lightGreen,
        height: height(3.4),
        borderRadius: 20,
        zIndex: -1,
    },

    selected: {
        borderWidth: 3,
        borderColor: AppColors.purple
    },
    search: { flexDirection: 'row', paddingHorizontal: width(5) },
    searchView: {
        justifyContent: "center",
        borderRadius: 50,
        alignItems: 'center',
        width: width(15),
        height: height(7),
        borderWidth: 1,
        borderColor: AppColors.grayBorder

    },
    searchBoxStyle: { width: width(4), height: height(2), borderRadius: 50, alignSelf: 'center', },

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height(4),
        paddingHorizontal: width(5)
    },

    downIcon: {
        width: width(6),
        height: width(6),
        marginLeft: width(1)

    },
    row: {
        flexDirection: 'row',
        marginTop: height(3),
        justifyContent: 'space-between',
        paddingHorizontal: width(3)

    },
    date: {
        marginRight: width(2)
    },
    dateRow: { marginBottom: height(2) },
    row1: {
        flexDirection: 'row',
        marginTop: height(1.5),
        paddingHorizontal: width(12)
    },
    buttonStyle: {
        margin: 0,
        backgroundColor: '#FFE7E7',
        paddingVertical: height(0.7),
        alignSelf: 'flex-start',
        width: '25%',
        borderRadius: width(6)
    },
    buttonText: {
        fontSize: width(3.3),
        color: AppColors.black,
        fontFamily: FontFamily.BlackSansRegular
    },
    buttonText1: {
        color: AppColors.black,
        fontFamily: FontFamily.BlackSansBold
    },

    content: {
        flexDirection: 'row',
        marginTop: height(1.2),
        paddingHorizontal: width(5),

    },
    icon: {
        width: width(6),
        height: width(6),
        marginRight: width(2)
    },
    contents: {
        paddingVertical: height(0.5)
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
    scroll: {
        backgroundColor: '#F5F5F5',
        paddingBottom: height(1)

    },
    emptyCon: {
        paddingHorizontal: width(18),
        marginTop: height(15)
    },
    emptyText: {
        textAlign: 'center',
        color: '#545454'
    },
    boxContainer: {
        elevation: 3,
        flexDirection: 'row',
        marginTop: height(3),
        justifyContent: 'space-evenly',
        paddingHorizontal: width(3)

    },
    mainContainer: { borderWidth: 0.5, width: width(28), borderRadius: width(3.5), borderColor: AppColors.transparent, },
    clipped: { height: height(8.5), resizeMode: 'contain' },
    count: {
        position: 'absolute',
        left: width(19),
        top: height(4)
    }

});
export default styles;
