import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';


const styles = StyleSheet.create({
  header: {
    fontSize: width(5),
    paddingVertical: height(1),
    fontFamily: FontFamily.MontserratBold,
    paddingHorizontal: width(4)
  },

  img: {
    width: width(86),
    height: height(40)
  },
  heart: {
    backgroundColor: AppColors.white,
    alignItems: 'center',
    borderRadius: width(1.5),
    height: height(5),
    width: width(12),
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: width(5),
    marginTop: height(1)
  },

  icon: {
    height: height(5),
    width: width(5),
    marginTop: height(2.5),

  },
  bgCont: {
    paddingHorizontal: width(6.5),
  },

  title: {
    fontSize: width(5),
    fontFamily: FontFamily.MontserratSemiBold,
    color: AppColors.black,
    marginTop: height(1.5),
  },
  star: {
    height: height(2.5),
    width: width(5),
    marginRight: width(2)
  },
  row: {
    flexDirection: 'row',
    paddingVertical: height(1)
  },
  desc: {
    color: AppColors.black2,
    lineHeight: height(3),
    fontFamily: FontFamily.MontserratRegular,
  },
  descCon: {
    paddingVertical: height(2)
  },
  threeButtonCont: {
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderColor: AppColors.grayBorder,
    marginTop: height(2),
    paddingHorizontal: width(7)
  },
  container: {
    borderWidth: 0.3,
    width: width(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height(0.6),
    marginRight: width(4),
    borderColor: AppColors.grayBorder,
    borderTopRightRadius: width(1),
    borderTopLeftRadius: width(1),
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height(1),
    paddingHorizontal: width(5)
  },
  btn: {
    width: width(45)
  },
  logo: {
    width: width(5),
    height: height(2),
    resizeMode: 'contain',
    marginRight: width(3),
  },
  animatedView: {

    borderWidth: 0.3,
    width: width(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height(0.6),
    marginRight: width(4),
    borderColor: AppColors.grayBorder,
    borderTopRightRadius: width(1),
    borderTopLeftRadius: width(1),
    backgroundColor: AppColors.black,
    ...AppColors.smallShadow,


  },
  buttonText: {
    color: AppColors.black,
    fontFamily: FontFamily.BlackSansBold
  },
  buttonText1: {
    color: AppColors.white,
    fontFamily: FontFamily.BlackSansBold
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
});
export default styles;
