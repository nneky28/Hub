import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';


const styles = StyleSheet.create({

    container: {
        backgroundColor: AppColors.gray1,
        width: width(92),
        paddingVertical: height(1.5),
        paddingHorizontal: width(4),
        borderRadius: width(2),
        marginLeft: width(4),
        marginTop: height(2)
    },

    icon: {
        width: width(4),
        height: width(4),
        tintColor: AppColors.black3,
        marginLeft: width(25)

    },
    imgContainer: {
        borderWidth: 0.3,
        borderColor: AppColors.black1,
        paddingHorizontal: width(1.5),
        justifyContent: 'center',
        paddingVertical: height(0.1),
        borderRadius: width(1),

    },
    img: {
        width: width(15),
        height: width(20),
    },
    countCon: {
        flexDirection: 'row',
        marginTop: height(5),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    count: {
        borderWidth: 0.3,
        borderColor: AppColors.black1,
        paddingHorizontal: width(4),
        borderRadius: width(0.5),
        paddingVertical: height(0.2)
    },
    num: {
        margin: width(3)
    },
    payment: {
        flexDirection: 'row',
        marginTop: height(3),
        justifyContent: 'space-between',
        paddingHorizontal: width(5)
    },
    align: {
        paddingVertical: height(2)
    },
    line: {
        width: '92%',
        height: 0.5,
        backgroundColor: AppColors.black3,
        marginTop: height(3),
        elevation: 0,
        marginLeft: width(4)
    },

    line2: {
        width: width(100),
        backgroundColor: AppColors.black3,
        height: 0.5,
        elevation: 0,
        marginTop: height(2),
        //   margin:0
    },
    iconCheck: {
        marginLeft: width(2),
        color: AppColors.white
    },
    btn: {
        width: width(91),
        marginTop: height(3),
    }

});
export default styles;
