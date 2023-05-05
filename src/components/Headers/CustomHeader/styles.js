import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../../utills/AppColors';
import { FontFamily } from '../../../utills/FontFamily';

const styles = StyleSheet.create({
  header: {
    width: width(100),
    paddingHorizontal: width(5),
    paddingTop: height(3),
    paddingBottom: height(2),
    borderBottomWidth: width(0.5),
    borderColor: AppColors.grayBorder,
    backgroundColor: AppColors.white
  },
  logo: {
    width: width(15),
    height: width(10),
    borderRadius: width(5),
  },
  text1: {
    fontSize: width(5),
    color: AppColors.black,
    fontFamily: FontFamily.MontserratBlack,
    // marginLeft: '4%',
    width: width(65),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width(90)
  },
  app_icon: {
    height: height(5),
    width: width(10),
    resizeMode: "contain"
  },
  header_container: {
    width: width(100),
    paddingHorizontal: width(5.5),
    // marginTop: height(5)

  },
  right_icon_button: {
    alignItems: "center",
    width: width(5),
    height: width(12),
    borderRadius: width(50),
    justifyContent: "center",
    // marginLeft: width()
  },
  bottom_container: {
    marginLeft: width(7)
  }
});

export default styles;
