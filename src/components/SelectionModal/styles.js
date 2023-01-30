import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';


const styles = StyleSheet.create({
  container: {
    width: width(100),
    paddingTop: height(2),
    paddingBottom: height(5),
    backgroundColor: AppColors.white,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  text: {
    color: AppColors.black1,
    fontSize: width(3.5),
    textAlign: 'center',
    fontFamily: FontFamily.BlackSansRegular
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  icon: {
    width: width(5),
    height: height(4),
    tintColor: AppColors.black1,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    marginVertical: height(2.5),
    elevation: 0,
  },
  line1: {
    width: '15%',
    height: 4,
    backgroundColor: '#E1E1E1',
    marginBottom: height(1.5),
    marginTop: height(0.5),
    elevation: 0,
    alignSelf: 'center',
  },
});
export default styles;
