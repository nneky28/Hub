import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';
import { Input } from 'native-base';

const styles = StyleSheet.create({
    listItemContainer: {
        width: width(90),
        backgroundColor: AppColors.white,
        paddingVertical: height(1.5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // test
        borderBottomColor: AppColors.gray1,
        borderBottomWidth: 1
    },
    avatarStyle: {
        height: height(5),
        width: height(5),
        borderRadius: height(4.75),
    },
    textContainer: {
        justifyContent: 'space-between',
        height: height(4.5),
        marginLeft: width(2),
        // added
        marginTop: height(0.5)
    },
    subText: {
        fontSize: width(2.5),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansRegular,
    },
    titleText: {
        fontSize: width(3.3),
        color: AppColors.black1,
        marginRight: width(2),
        fontFamily: FontFamily.BlackSansBold,
        width: width(70)
    },

    textContainer1: {
        justifyContent: 'space-between',
        height: height(4.5),
        marginLeft: width(2),
        marginTop: height(1.5),
        // width: width(90)
    },
    listContainer1: {
        width: width(90),
        justifyContent: 'space-between',
        marginLeft: width(4),
        paddingVertical: height(1),
        flexDirection: 'row',
        alignItems: 'center',
    },

    rowSection: {
        backgroundColor: AppColors.white,
        width: width(90),
        justifyContent: 'space-between',
        marginLeft: width(4),
        borderBottomWidth: 1,
        borderBottomColor: AppColors.gray1,
        borderTopWidth: 1,
        borderTopColor: AppColors.gray1,
        paddingVertical: height(1),
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default styles;