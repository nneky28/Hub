import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  mainViewContainer: {
    backgroundColor: AppColors.white,
    flex : 1,
    alignItems: 'center',
  },

  scrollViewContainer: {
    paddingTop: height(1)
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    marginTop: height(1),
    elevation: 0,
  },

  heading1: {
    fontSize: width(4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold,
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
    marginLeft: width(2),
  },

  flatListIcon: {
      height: height(2.5),
      width: width(4.5),
  }, 
  iconAndTextContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      height: height(6)
  },
  heading2: {
    fontSize: width(3),
    marginRight: width(2),
    fontFamily: FontFamily.BlackSansBold,
    color: AppColors.black2,
  },

  subText: {
    fontSize: width(2.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular,
  },
  titleText: {
    fontSize: width(3),
    color: AppColors.black1,
    marginRight: width(2),
    fontFamily: FontFamily.BlackSansBold,
  },
  smallBtnContainer: {
    height: height(2.5),
    backgroundColor: AppColors.green,
    borderRadius: 30,
    padding: 0,
    justifyContent: 'center',
    paddingHorizontal: width(2.5),
    alignItems: 'center'
  },
  smallText: {
    fontSize: width(2.25),
    color: AppColors.white,
    fontFamily: FontFamily.BlackSansRegular,
  },
  searchBoxContainer: {
    width: width(90), 
    justifyContent: 'flex-start', 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  searchBoxStyle: {
    width: width(90), 
    alignSelf: 'flex-start'
  },
  selected_tab : {
    borderBottomWidth  : width(0.4),
    borderColor : AppColors.green
  },
  deselected_tab : {
    borderBottomWidth  : width(0.4),
    borderColor : AppColors.grayBorder
  },
  selectedHeading: {
    color: AppColors.green, 
   fontFamily: FontFamily.BlackSansBold
  },
  heading: {
    fontSize: width(3.4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular
  },
  column_wrapper : {
    justifyContent: 'space-between', 
    width: width(90)
  },
  contentContainerStyle : {
    marginTop : height(1),
    paddingBottom : height(40),
    backgroundColor : AppColors.transparent
  }
});
export default styles;
