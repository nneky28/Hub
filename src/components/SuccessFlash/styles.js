import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';

const styles = StyleSheet.create({
  tickIcon: {
    width: width(8),
    height: width(8),
    marginRight: width(2)
  },
  actionBtn: {
    backgroundColor: "#F7AD82",
    paddingVertical: height(0.5),
    width: width(20),
    alignItems: 'center',
    paddingHorizontal: width(1.5),
    borderRadius: 5,
    alignSelf: 'flex-end',
    // bottom: height(1.5),
    position: 'absolute',
    height: height(3),
  },


});

export default styles;