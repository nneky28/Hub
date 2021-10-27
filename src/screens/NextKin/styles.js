import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  mainViewContainer: {
    backgroundColor: AppColors.white,
    alignItems: 'center',
  },
  titleContainer: {
    alignSelf: 'center', 
    justifyContent: 'center', 
    width: width(80), 
    alignItems: 'center'
  },
  header: {
    width: width(100),
    paddingHorizontal: width(5),
    marginTop: height(2),
    marginBottom: height(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent : "center"
  },
  leftIcon: {
    width: width(5),
    height: width(5),
  },
  screenTitle: {
    fontSize: width(4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold,
  },
  selectedHeading: {
    fontSize: width(3.4),
    paddingRight: width(5),
    color: AppColors.green, 
    fontFamily: FontFamily.BlackSansBold,
  },
  heading: {
    fontSize: width(3.4),
    color: AppColors.black1,
    width: width(30),
    fontFamily: FontFamily.BlackSansRegular,
  },
  scrollViewContainer: {
    paddingTop: height(2), 
    width: width(90), 
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    marginTop: height(1),
    elevation: 0,
  },
  line2: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    elevation: 0,
  },
  animated: {
    width: '50%',
    backgroundColor: AppColors.green,
    height: height(0.8),
    marginTop: height(0.5),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  headingContainer: {
    marginTop: height(2),
    width: width(90),
    marginBottom: height(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  listItemContainer: {
    width: width(90),
    borderColor: AppColors.gray1,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: height(1),
    paddingHorizontal: width(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatarStyle: {
    height: height(5),
    width: height(5),
    borderRadius: height(4.75),
  },
  textContainer: {
    justifyContent: 'space-between',
    height: height(5),
    marginLeft: width(2)
  },

  flatListIcon: {
      height: height(2.5),
      width: width(4.5),
      color: AppColors.black1
  }, 
  iconAndTextContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      height: height(6)
  },
  searchBoxStyle: {
    width: width(79), 
    alignSelf: 'flex-start'
  },
});
export default styles;
