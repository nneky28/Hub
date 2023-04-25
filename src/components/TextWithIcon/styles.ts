import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
    contactComponentContainer: {
        justifyContent: 'center',
        paddingVertical: height(2),
        backgroundColor: AppColors.white,
        width: width(90),
        paddingHorizontal: width(2),
        alignSelf: 'center',
        
    },
    downIcon: {
        width: width(4),
        height: width(4),
    },
    listCompTitle: {
        fontSize: width(3.25),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansRegular
    },
    
    TitleText: {
        fontSize: width(3.75),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansSemiBold
    },
    row: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconStyle: {
        width: width(5),
        height: width(5),
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: AppColors.gray1,
        // marginVertical: height(1),
        elevation: 0,
        marginTop: height(2)
    },

});

export default styles;