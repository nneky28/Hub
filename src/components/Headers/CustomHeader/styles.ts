import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../../utills/AppColors';
import { FontFamily } from '../../../utills/FontFamily';

const styles = StyleSheet.create({
  header: {
    width: width(100),
    paddingHorizontal: width(5),
    paddingTop: height(3),
    paddingBottom : height(2),
    borderBottomWidth : width(0.5),
    borderColor : AppColors.grayBorder,
    backgroundColor : AppColors.white
  },
  logo: {
    width: width(15),
    height: width(10),
    borderRadius: width(5),
  },
  text1: {
    fontSize: width(4.5),
    color: AppColors.black,
    fontFamily: FontFamily.BlackSansBold,
    marginLeft: '4%',
    width: width(65),
  },
  row: {
    flexDirection: 'row', 
    alignItems: 'center',
    width : width(90)
  },
  app_icon : {
    height : height(5),
    width : width(10),
    resizeMode : "contain"
  },
  header_container : {
    width : width(70),
    justifyContent : "center",
    alignItems : "center"
  },
  right_icon_button : {
    alignItems: "center",
    width : width(12),
    height : width(12),
    borderRadius : width(50),
    justifyContent : "center"
  }
});

export default styles;