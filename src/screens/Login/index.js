import React, { useEffect } from 'react';
import {View, KeyboardAvoiText,StyleSheet,Dimensions,ScrollView, BackHandler} from 'react-native';
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
import { employees_me, getAPIs, postAPIs, postNoToken } from '../../utills/api';
import { ToastError, ToastSuccess,storeData } from '../../utills/Methods';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import moment from 'moment';


export default function Dashboard(props) {
  const defaultColor = "black";
  const blackColor = "black";
  const [data,setData] = React.useState({
    // email : "jane@email.com",
    // password : "jane12345"

    //real deal
    email : "leo@denzel.com",
    password : "asd123def"
    //email : "",
    //password : ""
  })
  const auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])
  const loginMethod = async () => {
    try{
      if(!data.email || data.email.trim() === "" || !data.password
        || data.password.trim() === ""
      ){
        return ToastError("All fields are requird")
      }
      let fd = {
        email : data.email,
        password : data.password
      }
      dispatch(setLoaderVisible(true));
      let res = await postNoToken('/accounts/auth/employees/login/',fd);
      let token  = res.access_token ? res.access_token : null;
      await storeData("token",token)
      console.log("postNoToken-res",res,token)
      let refresh = res.refresh_token ? res.refresh_token : null;
      let business = res.user.employee_user_memberships && 
      Array.isArray(res.user.employee_user_memberships) && 
      res.user.employee_user_memberships.length > 0 ? 
      res.user.employee_user_memberships[0] : null;
      if(!business) return ToastError("No business connected to this account");
      let employees_me_url = employees_me(business.business_id);
      let about_me = await getAPIs(employees_me_url,token);
      await storeData("refresh",refresh);
      await storeData("about_me",about_me)
      await storeData("user",res.user);
      await storeData('token_expiry',moment(new Date()).add(30,'minutes'))
      ToastSuccess("Login was successful")
      dispatch(setLoaderVisible(false));
      return dispatch(login({...auth,user : {userName: "Joe"}, route : "main",isLogin : true}));
    }catch(err){
      console.log("errr",err);
      dispatch(setLoaderVisible(false));
      let msg = "";
      if(err.msg && err.msg.code === "invalid_credentials"){
        msg = "Unable to login with the provided credentials"
      }
      msg = err.msg && err.msg.code && typeof(err.msg.code) == "string" ? "Unable to login with the provided credentials."  : "Something went wrong. Please retry"
      ToastError(msg)
    }
  };
  return (
    <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
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
          value={data.email}
          onChangeData={(value)=>{
            setData({...data,email : value})
          }}
          color={AppColors.black}
        />
          <Field
            component={CustomInput}
            name="password"
            placeholder="Password"
            value={data.password}
           // secure={true}
            onChangeData={(value)=>{
              setData({...data,password : value})
            }}
            secureTextEntry={true}
            color={AppColors.black}
          />
        <View style={{width: '100%', marginTop : '5%'}}>
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
    </KeyboardAvoidingScrollView>
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
    height: 50,
    // // marginTop: -30,
    // marginBottom: 20,

    //flex: 1,
    // width: null,
    //height: null,
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
});
