import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

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
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftIcon: {
    width: width(5),
    height: width(5),
  },
  screenTitle: {
    fontSize: width(4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    marginTop: height(1),
    elevation: 0,
  },
  saveBtnStyle: {
    backgroundColor: AppColors.white,
    width: width(9),
    elevation: 0,
    margin: 0,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    paddingVertical: 0,
    // position: 'absolute',
    // bottom:height(30), 
    // right: width(50)
  },
  saveBtnText: {
    color: AppColors.green,
    margin: 0,
    fontSize: width(4),
    fontFamily: FontFamily.BlackSansSemiBold
  },
  downIcon: {
    width: width(4),
    height: width(4),
    position: 'absolute', 
    left: width(77)
 },
 downIcon2: {
    width: width(4),
    height: width(4),
    position: 'absolute', 
    left: width(82)
 },
 listContainer:{
  flexDirection: 'row',
  backgroundColor: AppColors.white,
  width: width(90),
  paddingVertical: height(2.5),
  paddingHorizontal: width(5),
  justifyContent:'flex-start',
  alignSelf:'center',
  alignItems: 'center',
  borderRadius: width(1.5),
  borderColor: AppColors.grayBorder,
  borderWidth: 1
},
dropDownContainer: {
  backgroundColor: AppColors.white,
  marginRight: width(20),
  width: width(100)
  // paddingHorizontal: width(5),
  // justifyContent:'center',
  // alignSelf:'center',
  // borderRadius: width(1.5),
  // borderColor: AppColors.grayBorder,
  // borderWidth: 1
 },
 text1: {
  fontSize: width(2.75), 
  color: AppColors.black3
},

});

export default styles;