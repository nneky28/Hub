import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';


const styles = StyleSheet.create({
    mainViewContainer: {
        backgroundColor: AppColors.white,
    },
    line: {
        width: '100%',
        borderColor: AppColors.gray1,
        borderBottomWidth : width(0.3),
        alignSelf : "center"
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
        paddingHorizontal: width(2.5)

    },
    headerTitle: {
        fontSize: width(4),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansBold,
        paddingHorizontal: width(6),
        paddingVertical: height(2.5)

    },
    scrollRow: {
        alignSelf: 'center',
    },

    scrollViewContainer: {
        marginTop: height(2),
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: AppColors.grayBorder,
        borderRadius: width(15),
        backgroundColor: '#F2F2F2',
        paddingHorizontal: width(1),
        marginLeft: width(4.5),
        height: height(4.5),
        marginBottom : height(2)
    },

    threeButtonCont: {
        width: width(90),
        alignSelf: 'center',
        marginTop: height(2),
        borderWidth: 1,
        // position: 'absolute',
        borderColor: AppColors.grayBorder,
        borderRadius: width(15),
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: height(5.5),
        alignItems: 'center',
        backgroundColor: AppColors.whiteBase
    },

    animatedView: {
        width: width(28),
        backgroundColor: AppColors.white,
        borderRadius: width(15),
        paddingVertical: height(1.5),
        ...AppColors.smallShadow,

    },
    currentTab: {
        backgroundColor: AppColors.white,
        borderRadius: width(8),
        marginRight: width(2),
        height: height(3.5),
        ...AppColors.smallShadow,
        alignSelf: 'center',
        paddingHorizontal: width(3.5),
        justifyContent: 'center',
        alignItems: 'center',

    },

    defaultTab: {
        // alignSelf: "center",
        // paddingHorizontal: width(5),
        borderRadius: width(8),
        marginRight: width(2),
        height: height(3.5),
        alignSelf: 'center',
        paddingHorizontal: width(3.5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    selected_tab_text : {
        fontFamily: FontFamily.BlackSansBold,
        color: AppColors.green,
        textAlign : "center"
    },
    tab_text : {
        fontFamily: FontFamily.BlackSansSemiBold,
        color: AppColors.black1,
        fontSize: width(3.3),
        //alignSelf: "center",
    },
    button: {
        width: width(28),
        borderRadius: width(15),
        paddingVertical: height(1.5)
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

    logoBox: { backgroundColor: '#FDEDCE', borderRadius: width(1.5) },
    logo: { width: width(10), height: height(5), },

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
    search: { 
        flexDirection: 'row',
        paddingHorizontal: width(5),
        marginBottom : height(1)
    },
    searchView: {
        justifyContent: "center",
        borderRadius: 50,
        alignItems: 'center',
        width: width(15),
        height: height(7),
        borderWidth: 1,
        marginRight: width(2),
        borderColor: AppColors.grayBorder

    },
    searchBoxStyle: { width: width(4), height: height(2), borderRadius: 50, alignSelf: 'center', },

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height(2),
        paddingHorizontal: width(5),
        marginBottom : height(2)
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
        fontFamily: FontFamily.BlackSansRegular,
        alignSelf: 'center',

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
        fontSize: width(3.1),
        color: AppColors.black1,
        // marginRight: width(5)
        alignItems: 'flex-start'
    },
    titleCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: height(2),
        paddingHorizontal: width(2)
    },
    scroll: {
        backgroundColor: '#F5F5F5',
        paddingBottom: height(50),

    },
    emptyCon: {
        paddingHorizontal: width(18),
        marginTop: height(15)
    },

    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: width(3)
    },
    mainContainer: {
        borderRadius: width(3.5),
        elevation: width(1),
        height: height(14),
        width: width(28)
    },
    clipped: { resizeMode: 'cover', height: height(7.5), },

    clippedCon: { top: height(1.2) },
    emptyState: {
        flex: 1,
        marginTop: height(12),

    },
    emptyText: {
        color: "#A8A8A8",
        textAlign: "center",
        fontSize: width(4.5)
    },
    searchBox: {
        width: width(90),
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: AppColors.grayBorder,
        borderRadius: width(3),
        alignItems: 'center',
        backgroundColor: AppColors.whiteBase,
        paddingVertical: height(1),
        height: height(5),

    },
    bg_img : {
        width: width(29),
        height: height(15),
        marginTop: height(2),
        justifyContent : "space-between"
    },
    contentContainerStyle : { 
        paddingBottom: height(10),
        marginTop : height(1)
    },
    snackbar : {
        backgroundColor : AppColors.newYellow
    },
    snackbar_label : {
        fontFamily : FontFamily.BlackSansBold,
        color : AppColors.red3
    }
});
export default styles;
