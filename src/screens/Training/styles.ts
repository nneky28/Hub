import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  mainViewContainer: {
    backgroundColor: AppColors.white,
    alignItems: 'center',
    flex : 1,
  },
  header: {
    width: width(100),
    paddingHorizontal: width(5),
    marginTop: height(2),
    marginBottom: height(1.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    width: width(5),
    height: width(5),
  },
  screenTitle: {
    fontSize: width(4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold,
    marginLeft : width(24)
  },

  selectedHeading: {
    color: AppColors.green, 
    fontFamily: FontFamily.BlackSansBold,
    paddingRight: width(5),
  },
  heading: {
    fontSize: width(3.4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular
  },
  selected_tab : {
    borderBottomWidth  : width(0.4),
    borderColor: AppColors.green,
    width: '40%',
  },
  deselected_tab : {
    borderBottomWidth  : width(0.4),
    borderColor: AppColors.grayBorder,
    width: '40%',
  },
 animated : {
   height: height(0.8),
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
    backgroundColor: AppColors.gray1,
    height: height(0.3),
    marginBottom: height(7),
    elevation: 0,
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
      // justifyContent: 'space-evenly',
      height: height(6)
  },
  searchBoxStyle: {
    width: width(79), 
    alignSelf: 'flex-start'
  },
});
export default styles;
