import React, { useEffect } from 'react';
import { View, BackHandler, Keyboard } from 'react-native';
import { useDispatch, } from 'react-redux';
import { login } from '../../Redux/Actions/Auth';
import { TextInput } from "react-native-paper"
import AppColors from '../../utills/AppColors';
import CustomInput from '../../components/CustomInput';
import { employees_me, getAPIs } from '../../utills/api';
import { ToastError, ToastSuccess, storeData, validateEmail, useAppSelector } from '../../utills/Methods';
import moment from 'moment';
import { Container, CustomWebView, H1, ImageWrap, KeyboardAwareWrapper, OnboardModal, P, SizedBox, TouchableWrapper } from '../../utills/components';
import { BASE_URL } from '../../utills/Constants';
import { Images } from "../../component2/image/Image"
import { useQueryClient } from 'react-query';
import CommonStyles from '../../utills/CommonStyles';
import Button from '../../components/Button';
import { RootScreenProps, StoredAboutMeProps } from '../../Routes/types';
import {APIFunction} from "../../utills/api"
import {useMutation} from "react-query"
import ScreenWrapper from '../../components/ScreenWrapper';
import styles from "./styles"
import { UserProps } from './types';


export default function Login(props : RootScreenProps) {
  const queryClient = useQueryClient()
  const [show, setShow] = React.useState(false)
  const [secure, setSecure] = React.useState(true)
  const [loading,setLoading] = React.useState(false)
  const [data, setData] = React.useState({
    email: "",
    password: ""
  })
  const auth = useAppSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const {
    mutateAsync
  } = useMutation(APIFunction.login)

  useEffect(() => {
    if (auth && auth.user && auth.user.email) {
      setData({ ...data, email: auth.user.email })
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack()
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
      setLoading(true)
      let res = await mutateAsync(fd) as UserProps
      let token = res.access_token ? res.access_token : null;
      await storeData("token", token)
      let refresh = res.refresh_token ? res.refresh_token : null;
      let business = res?.user?.employee_user_memberships &&
        Array.isArray(res.user.employee_user_memberships) &&
        res.user.employee_user_memberships.length > 0 ?
        res.user.employee_user_memberships[0] : null;
      if (!business?.business_id) return ToastError("No business connected to this account");
      let employees_me_url = employees_me(business.business_id);
      let about_me = await getAPIs(employees_me_url) as StoredAboutMeProps;
      await storeData("refresh", refresh);
      await storeData("about_me", about_me);
      await storeData("user", res.user);
      await storeData("logout_time", moment(new Date()).add(360, 'hours'));
      await storeData('token_expiry', moment(new Date()).add(60, 'minutes'))
      queryClient.invalidateQueries()
      setLoading(false)
      ToastSuccess("Login was successful")
      return dispatch(login({ ...auth, user: about_me, route: about_me.completed_user_onboarding ? "main" : "onboard", isLogin: true }));
    } catch (err : any) {
      setLoading(false)
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
    <ScreenWrapper>
      <KeyboardAwareWrapper>
          <View
            style={styles.main_container}
          >
            <Container
              width={35}
              style={styles.img_container}
            >

              <ImageWrap
                url={Images.AppLogo}
                height={5}
                fit={"contain"}
              />
            </Container>
            <H1 fontSize={6} marginTop={1} marginBottom={3}>Welcome</H1>
            <CustomInput 
              placeholder="Email"
              value={data.email}
              onChangeData={(value) => {
                setData({ ...data, email: value })
              }}
              keyboardType={"email-address"}
            />
            <CustomInput 
              placeholder="Password"
              secureTextEntry={secure}
              onChangeData={(value) => setData({ ...data, password: value })}
              value={data?.password}
              keyboardType={'default'}
              right={<TextInput.Icon 
                name={secure ? "eye" : "eye-off"} style={CommonStyles.marginTop_2}
                color={AppColors.black1}
                onPress={() => setSecure(!secure)}
                tvParallaxProperties={undefined}
                hasTVPreferredFocus={undefined}

              />}
            />

            <Container marginTop={3}
              width={90}>
              <Button
                title={'Sign In'}
                onPress={loginMethod}
                containerStyle={styles.button}
                isLoading={loading}
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
            <P color={AppColors.black2} marginBottom={2}>MyEdge is part of BizEdge Productivity Tool.</P>
          </View>
          {auth.onboard && auth.url ? <OnboardModal visible={auth.onboard} url={auth.url} /> : null}
          {show ? <CustomWebView web_url={`${BASE_URL}forgot-password`} setShow={()=>setShow(false)} show={show} /> : null}
        </KeyboardAwareWrapper>
    </ScreenWrapper>
  );
}
