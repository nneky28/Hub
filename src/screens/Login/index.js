import React from 'react';
import {View, Text,StyleSheet,Dimensions,ScrollView} from 'react-native';
//import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../Redux/Actions/Auth';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import {showMessage} from 'react-native-flash-message';
import {setLoaderVisible} from '../../Redux/Actions/Config';
import CustomText from '../../component2/customText/CustomText';
import CusInput from '../../component2/input/inputElement';
import CustomButton from '../../component2/button/Button';
import Image from '../../component2/image/Image';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import { Field, Formik } from 'formik';
import CustomInput from '../../components/CustomInput';
import { postAPIs } from '../../utills/api';


export default function Dashboard(props) {
  const defaultColor = "";
  const blackColor = "";
  const [login,setLogin] = React.useState({
    email : "",
    password : ""
  })
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const loginMethod = async () => {
    try{
      console.log("Login---||||",login.email)
      if(!login.email || login.email.trim() === "" || !login.password
        || login.password.trim() === ""
      ){
        return showMessage({
          message: 'Error',
          description: 'All Fields are required',
          type: 'error',
        });
      }
      return alert("Yes")
      console.log("loading_---")
      dispatch(setLoaderVisible(true));
      
      let user = await postAPIs('/accounts/auth/employees/login/',login);
      setTimeout(() => {
        showMessage({
          message: 'Success',
          description: 'Succfully logged In',
          type: 'success',
        });
        dispatch(setLoaderVisible(false));
        dispatch(login({userName: 'John Doe'}));
      }, 1500);
    }catch(err){
      console.log("errr",err);
      return showMessage({
        message: 'Error',
        description: 'Something went wrong. Please retry.',
        type: 'error',
      });
    }
  };
  return (
    <View style={styles.Container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.bodyWrap}>
          <Formik>
              <React.Fragment>
              <Image
          ImageUri={
            'https://res.cloudinary.com/coolowo/image/upload/v1630094478/mobile/modulist/Group_1119_yoan7f.png'
          }
          imageStyle={styles.Image1Sty}
        />
        <View
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            marginTop: 25,
          }}>
            <CustomText
              textSize={20}
              textWeight={'bold'}
              textcolor={defaultColor}
              // displayText={'Welcome to Bizedge! '}
              displayText={'Welcome'}
              textStyle={{
                marginTop: -3,
              }}
            />
        </View>
        <CustomText
          textSize={12}
          textWeight={'normal'}
          textcolor={blackColor}
          displayText={
            'Login to your account to see how your business is doing today.'
          }
          textStyle={{
            marginTop: 5,
          }}
        />
        <Field
          component={CustomInput}
          name="email"
          placeholder="Email"
          value={login.email}
          onChange={(value)=>setLogin({...login,email : value})}
        />
          <Field
          component={CustomInput}
          name="password"
          placeholder="Password"
          value={login.password}
          onChange={(value)=>setLogin({...login,password : value})}
          />
        <View style={{width: '100%'}}>
          <CustomButton
            btnText={'Sign In'}
            handelButtonPress={loginMethod}
            //isloading={isprocessing}
          />
        </View> 
              </React.Fragment>
          </Formik>
      </View>
    </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  Container: {
    minHeight: deviceHeight,
    flex: 1,
    // paddingTop: 40,
    // marginTop: 40,
  },
  Image1Sty: {
    width: '30%',
    // height: 102,
    // // marginTop: -30,
    // marginBottom: 20,

    flex: 1,
    // width: null,
    height: null,
    resizeMode: 'contain',
  },
  inner: {
    minHeight: deviceHeight,
    backgroundColor: '#E5E5E5',
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
});
