import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: height(8),
    justifyContent: 'center',
    backgroundColor: AppColors.white,
  },
  cardTitle: {
    height: height(5),
    backgroundColor: AppColors.lightgrey,
    justifyContent: 'center',
    paddingLeft: width(3),
    borderTopStartRadius: width(3),
    borderTopEndRadius: width(3),
  },
  titleText: {
    fontFamily: FontFamily.BlackSansSemiBold,
    color: AppColors.titlecolor,
    fontSize: width(3.6),
  },
  summaryWrapper: {
    flexDirection: 'row',
    paddingHorizontal: width(3),
    paddingVertical: height(2),
    justifyContent: 'space-between',
  },
  innerWrapper: {
    flexDirection: 'row',
    paddingHorizontal: width(3),
  },
  dataWrapper: {
    flexDirection: 'column',
    marginVertical: height(1),
  },
  titleStyle: {
    fontFamily: FontFamily.BlackSansRegular,
    color: AppColors.titlecolor,
    fontSize: width(3),
  },
  amountStyle: {
    fontFamily: FontFamily.BlackSansBold,
    color: AppColors.titlecolor,
    fontSize: width(3.6),
    marginTop: height(0.5),
  },
  grosstitle: {
    fontFamily: FontFamily.BlackSansRegular,
    color: AppColors.titlecolor,
    fontSize: width(3),
  },
  grossamount: {
    fontFamily: FontFamily.BlackSansBold,
    color: AppColors.titlecolor,
    fontSize: width(3.2),
    marginTop: height(0.5),
  },
  empdataWrapper: {
    height: height(5),
    paddingLeft: width(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  employeeContainer: {
    marginTop: height(2),
    borderTopStartRadius: width(3),
    borderTopEndRadius: width(3),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  NameTitle: {
    fontFamily: FontFamily.BlackSansRegular,
    fontSize: width(3),
  },
  NetSalary: {
    fontFamily: FontFamily.BlackSansRegular,
    fontSize: width(3),
    marginRight: width(15),
  },
  listView: {
    borderWidth: width(0.1),
    marginHorizontal: width(5),
    marginVertical: height(0.5),
    elevation: width(0.2),
    flex : 1,
    borderColor: AppColors.greylinecolor,
  },
  empListView: {
    flexDirection: 'row',
    paddingVertical: height(2.5),
    paddingHorizontal: width(3),
    justifyContent: 'space-between',
  },
  nameText: {
    fontFamily: FontFamily.BlackSansSemiBold,
    color: AppColors.titlecolor,
  },
  netsalarytext: {
    fontFamily: FontFamily.BlackSansSemiBold,
    color: AppColors.titlecolor,
    width: width(25),
    //backgroundColor: 'red',
  },
  separator: {
    borderWidth: width(0.1),
    borderColor: AppColors.greylinecolor,
    marginHorizontal: width(2),
  },
  innerContainer: {
    width: width(55),

    //backgroundColor: 'green',
  },

  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray1,
    marginTop: height(1),
    elevation: 0,
  },
  screenTitle: {
    fontSize: width(4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold,
    alignSelf: 'center',
    marginLeft: width(30),
    // width: width(60),
  },
  header: {
    width: width(100),
    paddingHorizontal: width(5),
    marginTop: height(2),
    marginBottom: height(1.5),
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
  },

});
export default styles;
