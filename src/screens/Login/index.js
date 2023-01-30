import React, { useEffect } from 'react';
import { View, KeyboardAvoiText, StyleSheet, Dimensions, ScrollView, BackHandler, Image, Linking, Platform, Keyboard } from 'react-native';
//import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/Actions/Auth';
import { TextInput } from "react-native-paper"
import AppColors from '../../utills/AppColors';
import { setLoaderVisible } from '../../Redux/Actions/Config';
import CustomText from '../../component2/customText/CustomText';
import CustomButton from '../../component2/button/Button';
let deviceHeight = Dimensions.get('window').height;
import { Field, Formik } from 'formik';
import CustomInput from '../../components/CustomInput';
import { employees_me, getAPIs, postNoToken } from '../../utills/api';
import { ToastError, ToastSuccess, storeData, validateEmail } from '../../utills/Methods';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import moment from 'moment';
import { Container, CustomWebView, H1, ImageWrap, OnboardModal, SizedBox, TouchableWrapper } from '../../utills/components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BASE_URL } from '../../utills/Constants';
import { Images } from "../../component2/image/Image"
import { useQueryClient } from 'react-query';
import CommonStyles from '../../utills/CommonStyles';


export default function Dashboard(props) {
  const defaultColor = "black";
  const blackColor = "black";
  const queryClient = useQueryClient()
  const [show, setShow] = React.useState(false)
  const [secure, setSecure] = React.useState(true)
  const [data, setData] = React.useState({
    email: "",
    password: ""
  })
  const auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth && auth.user && auth.user.email) {
      setData({ ...data, email: auth.user.email })
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.navigate("Welcome")
      return true
    })
    return () => backHandler.remove()
  }, [])

  const loginMethod = async () => {
    try {
      Keyboard.dismiss()
      if (!data.email || data.email.trim() === "" || !data.password
        || data.password.trim() === ""
      ) {
        return ToastError("All fields are required")
      }
      if (!validateEmail(data.email.toString().trim())) return ToastError("Please enter a valid email")
      let fd = {
        email: data.email.toString().trim(),
        password: data.password
      }
      dispatch(setLoaderVisible(true));
      let res = await postNoToken('/accounts/auth/employees/login/', fd);
      let token = res.access_token ? res.access_token : null;
      await storeData("token", token)
      let refresh = res.refresh_token ? res.refresh_token : null;
      let business = res.user.employee_user_memberships &&
        Array.isArray(res.user.employee_user_memberships) &&
        res.user.employee_user_memberships.length > 0 ?
        res.user.employee_user_memberships[0] : null;
      if (!business) return ToastError("No business connected to this account");
      let employees_me_url = employees_me(business.business_id);
      let about_me = await getAPIs(employees_me_url, token);
      await storeData("refresh", refresh);
      await storeData("about_me", about_me);
      await storeData("user", res.user);
      await storeData("logout_time", moment(new Date()).add(360, 'hours'));
      await storeData('token_expiry', moment(new Date()).add(60, 'minutes'))
      queryClient.invalidateQueries()
      ToastSuccess("Login was successful")
      return dispatch(login({ ...auth, user: { userName: "Joe", ...about_me }, route: about_me.completed_user_onboarding ? "main" : "onboard", isLogin: true }));
    } catch (err) {

      dispatch(setLoaderVisible(false));
      let msg = "";
      if (err.msg && err.msg.code === "invalid_credentials") {
        msg = "Unable to login with the provided credentials"
      }
      msg = err.msg && err.msg.code && typeof (err.msg.code) == "string" ? "Unable to login with the provided credentials." : err.msg
        && typeof (err.msg) === "string" ? err.msg : "Something went wrong. Please retry"
      ToastError(msg)
    }
  };
  return (
    <KeyboardAvoidingScrollView
      showsVerticalScrollIndicator={false}
      backgroundColor={AppColors.white}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop: "50%",
          backgroundColor: AppColors.white
        }}
      >
        <Container
          height={30}
          width={30}
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ImageWrap
            url={Images.AppLogo}
            height={5}
            fit={"contain"}
          />
        </Container>
        <CustomText
          textSize={20}
          textWeight={'bold'}
          textcolor={defaultColor}
          // displayText={'Welcome to Bizedge! '}
          displayText={'Welcome'}
          textStyle={{
            marginTop: 3,
          }}
        />
        <Formik>
          <>
            <Field
              component={CustomInput}
              name="email"
              placeholder="Email"
              value={data.email}
              onChangeData={(value) => {
                setData({ ...data, email: value })
              }}
              keyboardType={"email-address"}
              color={AppColors.black}
            />

            <Field
              placeholder="Password"
              component={CustomInput}
              name="Password"
              secureTextEntry={secure}
              onChangeData={(value) => setData({ ...data, password: value })}
              // value={data?.password}

              keyboardType={'default'}
              right={<TextInput.Icon name={secure ? "eye" : "eye-off"} style={CommonStyles.marginTop_2}
                color={AppColors.black1}
                onPress={() => setSecure(!secure)}
              />}

            />
          </>
        </Formik>

        <Container marginTop={3} width={90}>
          <CustomButton
            btnText={'Sign In'}
            handelButtonPress={loginMethod}
          />
        </Container>
        <SizedBox height={1} />
        <TouchableWrapper
          isText
          onPress={() => setShow(true)}
          width={90}
        >
          <H1 color={AppColors.green}>Forgot Password?</H1>
        </TouchableWrapper>
        <SizedBox size={25} />
        <CustomText
          textSize={12}
          textWeight={'normal'}
          textcolor={AppColors.black2}
          displayText={
            'MyEdge is part of BizEdge Productivity Tool.'
          }
          textStyle={{
            marginTop: 5,
          }}
        />
      </View>
      {auth.onboard && auth.url ? <OnboardModal visible={auth.onboard} url={auth.url} /> : null}
      {show ? <CustomWebView web_url={`${BASE_URL}forgot-password`} setShow={setShow} show={show} /> : null}
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
    width: "100%",
    resizeMode: 'contain',
  },
  inner: {
    minHeight: deviceHeight,
    backgroundColor: AppColors.white
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
    justifyContent: 'center'
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
