import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    backgroundColor: AppColors.gray,
    width: width(90),
    height: height(6),
    //paddingVertical: height(2.5),
    // paddingHorizontal: width(5),
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: width(3),
    borderColor: AppColors.grayBorder,
    borderWidth: 1,
    marginTop: height(2)
  },
  dropDownContainer: {
    backgroundColor: AppColors.white,
    width: width(90),
    borderBottomColor: AppColors.grayBorder,
    height: height(17),
    ...AppColors.bigShadow
  },
  text1: {
    color: AppColors.black3,
    fontSize: width(4),
    marginLeft: width(3.5),
    fontFamily: FontFamily.BlackSansRegular
  },
  text2: {
    color: AppColors.black3,
    fontSize: width(4),
    marginLeft: width(3.5),
    fontFamily: FontFamily.BlackSansRegular
  },

  downIcon2: {
    width: width(4),
    height: width(4),
    position: 'absolute',
    left: width(82)
  },
}
);

export default styles;
