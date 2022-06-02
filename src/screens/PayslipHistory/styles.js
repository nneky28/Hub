import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: height(3),
    alignItems : "center"
  },
  downIcon: {
    width: width(4),
    height: width(4),
    position: 'absolute', 
    left: width(35)
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
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    marginTop: height(1),
    elevation: 0,
  },
  screenTitle: {
    fontSize: width(4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold,
    alignSelf: 'center',
    marginLeft: width(30),
    // width: width(60),
  },
  listContainer:{
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    width: width(43.5),
    paddingVertical: height(2),
    // paddingHorizontal: width(3),
    justifyContent:'space-between',
    alignSelf:'center',
    alignItems: 'center',
    borderRadius: width(1.5),
    borderColor: AppColors.grayBorder,
    borderWidth: 1
  },
  listsContainer: {
    width: width(90),
    flexDirection: 'row',
    marginTop: height(2),
    justifyContent: 'space-between'
  },    
  text1: {
    fontSize: width(2.75), 
    color: AppColors.black3,
    fontFamily: FontFamily.BlackSansRegular,
  },
  dropDownContainer1: {
    backgroundColor: AppColors.white,
    width: width(43.5),
    borderWidth: 0,
    marginTop: height(3)
  },
});
export default styles;
