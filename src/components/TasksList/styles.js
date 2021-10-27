import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { FontFamily } from '../../utills/FontFamily';


const styles = StyleSheet.create({
  text: {
    fontSize: width(3.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold
  },
  heading: {
    fontSize: width(3.4),
    color: AppColors.black1,
    paddingRight: width(5),
    fontFamily: FontFamily.BlackSansRegular
  },
  viewAll: {
    fontSize: width(3.4),
    color: AppColors.black1,
    textAlign: 'center',
    marginTop: height(2),
    fontFamily: FontFamily.BlackSansSemiBold
  },
  text3: {
    fontSize: width(2.7),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold
  },
  upcomming: {
    fontSize: width(3.2),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular
  },
  text1: {
    fontSize: width(2.4),
    color: AppColors.black1,
    marginVertical: height(0.5),
    fontFamily: FontFamily.BlackSansRegular
  },
  birthday: {
    fontSize: width(2.6),
    color: AppColors.black1,
    marginTop: height(0.5),
    fontFamily: FontFamily.BlackSansRegular
  },
  container: {
    width: width(90),
    backgroundColor: AppColors.white,
    borderWidth: 0.5,
    borderColor: AppColors.grayBorder,
    ...AppColors.shadowStyles,

    borderRadius: 20,
    paddingVertical: height(2),
    paddingHorizontal: width(3),
  },
  margin: {
    height: height(2),
  },
  flatList: {
    paddingHorizontal: width(5),
    paddingVertical: height(2.5),
  },
  image: {
    width: width(10),
    height: width(10),
    borderRadius: width(5),
  },
  icon: {
    width: width(5),
    height: width(5),
  },
  icon1: {
    width: width(3),
    height: width(3),
    tintColor: AppColors.grayBorder,
  },
  details: {
    width: '63%',
  },
  margin1: {
    marginTop: height(2),
  },
  button: {
    margin: 0,
    backgroundColor: AppColors.pink,

    paddingVertical: height(0.5),
    alignSelf: 'flex-start',
    width: '87%',
    ...AppColors.noShadow
  },
  buttonText: {
    color: AppColors.white,
    fontSize: width(2.5),
    fontFamily: FontFamily.BlackSansRegular
  },
  userContainer: {
    width: '47.5%',
    backgroundColor: AppColors.gray,
    borderRadius: 5,
    paddingHorizontal: '3%',
    paddingVertical: height(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userContainer2: {
    width: '90%',
    backgroundColor: AppColors.gray,
    borderRadius: 5,
    paddingHorizontal: '3%',
    paddingVertical: height(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {width: '100%', justifyContent: 'space-between'},
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    //
    elevation: 0,
  },
  animated: {
    width: '80%',
    backgroundColor: AppColors.green,
    height: height(0.8),
    marginTop: height(1),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  birthdayContainer: {
    borderWidth: 0.5,
    borderColor: AppColors.pink,
    borderRadius: 6,
    marginVertical: height(1),
    paddingHorizontal: '3%',
    paddingVertical: height(0.9),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height(2),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height(1),
  },
});
export default styles;
