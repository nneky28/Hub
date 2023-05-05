import {StyleSheet} from 'react-native';
import {width,height} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
// import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
    header: {
        fontSize: width(7),
        paddingVertical: height(1),
        marginTop: height(2),
        paddingHorizontal: width(4)
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(3),
    borderWidth: 1,
    paddingHorizontal: width(5),
    width: width(43),
    marginTop: height(2),
    height: height(22),
    borderColor: AppColors.gray1,
    backgroundColor: AppColors.gray1,
    ...AppColors.shadowStyles,
  }, 
 
img: {
    height: height(30),
    width:width(40)
    },
 heart:{
    backgroundColor: AppColors.white,
   alignItems: 'center',
   borderRadius: width(1.5),
   marginTop: height(6),
  height: height(4),
   width: width(10), 
   justifyContent: 'center',
    alignSelf:'flex-end'
 },  

    icon: {
        height: height(5),
        width: width(5),
        marginTop: height(2.5),
    }

});
export default styles;
