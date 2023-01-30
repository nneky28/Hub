import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension'
const styles = StyleSheet.create({
    container:{
        backgroundColor: AppColors.white,
        width: width(40),
        //paddingVertical: height(1),
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderRadius: width(5)
    },
    image  : {
        height : height(20),
        width : width(20)
    }
});
export default styles;
