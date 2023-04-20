import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({

    container: {
        width: width(100),
        backgroundColor: AppColors.white,
        flex : 1
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
        justifyContent : "center",
        alignItems : "center"
    },
    item: {
        fontSize: width(3.5),
        color: AppColors.black1
    },
    twoButtonCont: {
        width: width(90),
        alignSelf: 'center',
        marginTop: height(2),
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
        marginBottom: height(0.4)
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
        borderBottomWidth : width(0.3),
        borderBottomColor : AppColors.gray1
    },
    people: {
        paddingHorizontal: width(7),
        marginTop: height(2),
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

    emptyState: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: height(15),

    },
    searchBoxStyle: {
        width: width(90),
        alignSelf: 'flex-start',
        backgroundColor: AppColors.transparent
    },
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
    },
    alphabetscontentContainerStyle : {
        paddingHorizontal : width(5)
    },
    searchBoxContainer: {
        width: width(100),
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width(4.5),
        marginBottom : height(2)
    },
}
);

export default styles;
