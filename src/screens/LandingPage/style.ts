import {StyleSheet} from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  Container: {
    minHeight: height(100),
    flex: 1,
    // paddingTop: 40,
    // marginTop: 40,
  },
  Image1Sty: {
    width : "100%",
    resizeMode: 'contain',
  },
  inner: {
    minHeight: height(100),
    backgroundColor: AppColors.lightGreen
    // paddingTop: 40,
  },
  bodyWrap: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    paddingTop: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent : 'center'
    // marginTop: 40,
  },
  signUpWrap: {
    display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
    width: '100%',
    padding: 20,
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 65,
    alignItems: 'center',
  },
  button : {
    width : width(90),
    marginTop : height(15)
  },
  main_container : {
    flex : 1,
    alignItems : 'center',
    marginTop : "30%",
    backgroundColor : AppColors.lightGreen
  }
});
export default styles;
