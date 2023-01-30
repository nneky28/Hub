import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({

  listContainer: {
    width: width(90),
    alignSelf: "center",
    marginTop: height(2),
  },
  dropDownContainer: {
    backgroundColor: AppColors.white,
    marginRight: width(20),
    width: width(100)
  },
  errorText: {
    fontSize: width(2.75),
    color: AppColors.red,
    fontFamily: FontFamily.BlackSansRegular
  },
  errorInput: {
    borderColor: AppColors.red,
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
    // position: 'absolute', 
    // left: width(82)
  }
}
);

export default styles;
