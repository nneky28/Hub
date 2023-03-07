import { StyleSheet, FlatList } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({

    container: {
        width: width(100),
        paddingVertical: height(2),
        backgroundColor: AppColors.white,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        marginTop: height(8),
    },
    options: {
        paddingVertical: height(3)
    },
    listContainer: {
        backgroundColor: AppColors.white,
        width: width(90),
        justifyContent: 'center',
        marginLeft: width(4),
        borderBottomWidth: 1,
        borderBottomColor: AppColors.gray1,
        paddingVertical: height(1.5)
    },
    dropDownContainer: {
        backgroundColor: AppColors.white,
        width: width(90),
        borderBottomColor: AppColors.grayBorder,
        height: height(17),
        marginTop: height(2),
        ...AppColors.bigShadow
    },
    text1: {
        fontSize: width(3.2),
        color: AppColors.black,
        marginLeft: width(3.5),
        fontFamily: FontFamily.BlackSansRegular
    },
    errorText: {
        fontSize: width(2.75),
        color: AppColors.red,
        fontFamily: FontFamily.BlackSansRegular
    },
    errorInput: {
        borderColor: AppColors.red,
    },
    downIcon2: {
        width: width(4),
        height: width(4),
        position: 'absolute',
        left: width(82)
    },
    flatlist: {
        paddingHorizontal: width(1),
        paddingVertical: height(1),

    },
    item: {
        fontSize: width(3.5),
        color: AppColors.black1
    },
    twoButtonCont: {
        width: width(90),
        alignSelf: 'center',
        marginTop: height(3),
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
    animatedView3: {
        position: 'absolute',
        width: width(40),
        backgroundColor: AppColors.lightGreen,
        height: height(4),
        borderRadius: 20,
        zIndex: -1,
    },

    team: {
        paddingHorizontal: width(5),
    },
    selected: {
        borderWidth: 3,
        borderColor: AppColors.purple
    },
    containerA: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: width(6),
        marginTop: height(3.5),
        width: width(100),
        marginBottom: height(1.5)
    },
    btnText: {
        textDecorationLine: 'underline',
        color: AppColors.green
    },
    headerTitle: {
        fontSize: width(3.5),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansBold,

    },
    line: {
        width: width(90),
        height: 1,
        backgroundColor: AppColors.gray1,
        elevation: 0,
        marginLeft: width(5),

    },
    line1: {
        width: width(85),
        height: 1,
        backgroundColor: AppColors.gray1,
        elevation: 0,
        marginLeft: width(5),

    },
    people: {
        paddingHorizontal: width(7),
        marginTop: height(4),
        color: '#A8A8A8'
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
    // search: { flexDirection: 'row', paddingHorizontal: width(5) },
    // searchView: {
    //     justifyContent: "center",
    //     borderRadius: 50,
    //     alignItems: 'center',
    //     width: width(15),
    //     height: height(7),
    //     borderWidth: 1,
    //     borderColor: AppColors.grayBorder

    // },
    searchBoxStyle: { width: width(4), height: height(2), borderRadius: 50, alignSelf: 'center' },
    close: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: width(2)
    },
    text: {
        marginTop: height(2),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansBold,
        width: width(13)
    }
}
);

export default styles;
