import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';

const styles = StyleSheet.create({
  mainViewContainer: {
    backgroundColor: AppColors.white,
    alignItems: 'center',
  },
  header: {
    width: width(100),
    paddingHorizontal: width(5),
    marginTop: height(2),
    marginBottom: height(1.5),
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  leftIcon: {
    width: width(5),
    height: width(5),
  },
  screenTitle: {
    fontSize: width(4),
    color: AppColors.black1,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: width(30),
    // width: width(60),
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    marginTop: height(1),
    elevation: 0,
  },
});

export default styles;