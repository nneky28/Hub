import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  mainCon: {
    flex: 1, 
    paddingHorizontal: width(2),
    width: width(100),
  },
  // list: {
  //   paddingHorizontal: width(4),
  //   paddingVertical:height(3)
  // },
  column_wrapper : {
    justifyContent: 'space-between', 
    width: width(90)
  },
  contentContainerStyle : {
   paddingVertical : height(2),
    paddingBottom : height(10),
    backgroundColor: AppColors.transparent,
    paddingHorizontal: width(4),
  },
  rowFlat: {
    justifyContent: 'space-between', 
    width: width(90)
},
  text: {
    fontSize: width(4.5),
    color: AppColors.black1,
    fontFamily: FontFamily.MontserratBold
  },
  header: {
    paddingHorizontal: width(2),
    marginTop: height(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  center: {alignSelf: 'center', marginTop: height(2)},
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: width(10),
    height: width(10),
    borderRadius: width(5),
  },

  logo1: {
    width: width(7),
    height: width(7),
    borderRadius: width(3.5),
  },
  text1: {
    fontSize: width(7),
    color: AppColors.black,
    fontFamily: FontFamily.MontserratBold,
    marginLeft: '4%',
    width: width(65),
  },
  filterIcon: {
    backgroundColor: AppColors.black,
    alignItems: 'center',
    borderRadius: width(1.5),
    marginTop: height(1.5),
    height: height(6.5),
    width: width(12), 
    marginLeft: width(2),
    marginRight: width(2),
    justifyContent: 'center', 
  },


  filterIconContainerIOS: {
    backgroundColor: AppColors.black,
    paddingVertical: height(1),
    paddingHorizontal: width(2),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: width(1.5),
    marginTop: height(1.5),
    marginLeft: width(2)
  },

  filterIcons: {
    width: width(5),
    height: height(2.5),
  },
  filterIconIOS: {
    width: width(5),
    height: height(2),
  },
  heading: {
    fontSize: width(4),
    color: AppColors.black1,
    fontFamily: FontFamily.MontserratBold,
    marginTop: height(2),
    marginLeft: width(5),
  },
  searchBoxContainer: {
    width: width(30), 
    justifyContent: 'flex-start', 
    flexDirection: 'row', 
    alignItems: 'center',
    // paddingHorizontal:width(1)
  },
  searchBoxStyle: {
    width: width(75), 
    alignSelf: 'flex-start'
  },

  threeButtonCont: {
    width: width(90),
    alignSelf: 'center',
    marginTop: height(2),
    flexDirection: 'row',
    // justifyContent: 'space-around',
    height: height(5.5),
    // alignItems: 'center',
    // paddingHorizontal:width(4)
},

animatedView: {
    width: width(20),
    backgroundColor: AppColors.black,
  paddingVertical: height(1.3),
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: width(3),
    ...AppColors.smallShadow,

},

button: {
width: width(20),
backgroundColor: AppColors.gray1,
paddingVertical: height(1.3),
justifyContent: 'center',
alignItems: 'center',
borderRadius: width(3),
  ...AppColors.smallShadow,
},
selected_tab_text : {
    fontFamily: FontFamily.MontserratBold,
    color: AppColors.white,
    textAlign : "center"
},
tab_text : {
    fontFamily: FontFamily.MontserratSemiBold,
    color: AppColors.black,
    fontSize: width(3.3),
},

 
  text2: {
    fontSize: width(3.4),
    color: AppColors.black,
    fontFamily: FontFamily.MontserratLight
  },
  buttonText: {
    fontSize: width(3.3),
    color: AppColors.black,
    fontFamily: FontFamily.MontserratRegular
  },
  buttonText1: {
    color: AppColors.white,
    fontFamily: FontFamily.MontserratBold
  },
  text4: {
    fontSize: width(3.2),
    color: AppColors.black3,
    marginRight: width(2),
    fontFamily: FontFamily.MontserratSemiBold

  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    marginTop: height(1),
    elevation: 0,
  },
  nameContainer: {
    marginTop: height(2),
    marginLeft: width(5),
  },
  toDoContainer: {
    width: width(90),
    alignSelf: 'center',
    marginTop: height(2),
    paddingHorizontal: width(5),
    paddingVertical: height(1.3),
    borderWidth: 1,
    borderColor: AppColors.grayBorder,
    backgroundColor: AppColors.white,
    borderRadius: 15,
    ...AppColors.shadowStyles,
  },
  // threeButtonCont: {
  //   width: width(90),
  //   alignSelf: 'center',
  //   marginTop: height(2),
  //   borderWidth: 1,
  //   borderColor: AppColors.grayBorder,
  //   borderRadius: 20,
  //   flexDirection: 'row',
  //   justifyContent: 'space-evenly',
  //   height: height(5.5),
  //   alignItems: 'center',
  // },
  // button: {
  //   width: '33%',
  //   height : height(3),
  //   alignItems : "center",
  //   justifyContent : "center"
  // },
  // animatedView: {
  //   position: 'absolute',
  //   width: '33%',
  //   backgroundColor: AppColors.lightGreen,
  //   height: '100%',
  //   borderRadius: 20,
  //   left: 0,
  //   zIndex: -1,
  // },
});
export default styles;
