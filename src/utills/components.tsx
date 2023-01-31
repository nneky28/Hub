import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader/native'
import LottieView from 'lottie-react-native';
import { ImageBackground, Text, StyleSheet, Platform, RefreshControl } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import { Images } from "../component2/image/Image"
import {
  Circle,
  Rect,
} from 'react-native-svg';
import AppColors, { ColorList } from './AppColors';
import { View, Dimensions, Modal } from 'react-native';
import { FontFamily } from './FontFamily';
import { height, width } from 'react-native-dimension';
import { ActivityIndicator, TouchableRipple } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/Actions/Auth';
import { Capitalize, getData, getGreetingTime, storeData, ToastError, ToastSuccess } from './Methods';
import { APIFunction, useFetchAttendanceConfig, useFetchAttendanceStatus, useFetchLocationType } from './api';
import { setBottomTabBarVisible, setLoaderVisible } from '../Redux/Actions/Config';
import { BASE_URL, ICON_BUTTON_SIZE } from './Constants';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from 'react-query';
import Geolocation from 'react-native-geolocation-service'
import CustomButton from '../component2/button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { showFlashMessage } from '../components/SuccessFlash';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import CommonStyles from './CommonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReactNativeModal from 'react-native-modal'
import {
  ImgPlaceholderProps, KeyboardAwareWrapperProps, LottieIconProps,
  PTagProps, DatePickerModalProps, BackHandlerProps, CustomFallBackScreenProps,
  EmptyStateWrapperProps, TouchableWrapperProps, UserPINComponentProps,
  SizedBoxProps,
  ImageWrapProps,
  RoundedProps,
  CustomWebViewProps,
  OnboardModalProps,
  onNavigationStateChangeProps,
  TouchWrapProps,
  AppButtonProp,
  HTagProps,
  ContainerProps
} from './types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomCalenderProps } from './types';


const winDimensions = Dimensions.get("window")
const winWidth = winDimensions.width;

export const PageLoader = (props={}) => {
  return (
    [...'123567'].map((item) => (
      <ContentLoader
        key={item}
        viewBox="0 0 778 116" width={350} height={100} {...props}
        backgroundColor={AppColors.gray1}
      >
        <Rect x="37" y="34" rx="0" ry="0" width="0" height="0" />
        <Rect x="28" y="29" rx="0" ry="0" width="258" height="32" />
        <Rect x="28" y="71" rx="0" ry="0" width="465" height="32" />
        <Rect x="434" y="94" rx="0" ry="0" width="0" height="0" />
        <Rect x="29" y="116" rx="0" ry="0" width="749" height="32" />
      </ContentLoader>
    ))
  )
}

export const Reload = (props={}) => {
  return (
    [...'1'].map((item) => (
      <ContentLoader
        key={item}
        viewBox="0 0 778 116" width={350} height={100}{...props}
        backgroundColor={AppColors.gray1}
      >
        <Rect x="37" y="34" rx="0" ry="0" width="0" height="0" />
        <Rect x="28" y="29" rx="0" ry="0" width="258" height="32" />
        <Rect x="28" y="71" rx="0" ry="0" width="465" height="32" />
        <Rect x="434" y="94" rx="0" ry="0" width="0" height="0" />
        <Rect x="29" y="116" rx="0" ry="0" width="749" height="32" />
      </ContentLoader>
    ))
  )
}

export const LottieIcon = ({ icon, size } : LottieIconProps) => {
  return (
    <LottieView
      source={icon}
      autoPlay={true}
      style={{
        width: size || 150,
        height: size || 150
      }}
      loop={true}
    />
  )
}

export const ProfileLoader = () => (
  <ContentLoader
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  // {...props}
  >
    <Rect x="80" y="73" rx="3" ry="3" width="254" height="6" />
    <Rect x="78" y="88" rx="3" ry="3" width="254" height="6" />
    <Rect x="150" y="103" rx="3" ry="3" width="118" height="6" />
    <Circle cx="210" cy="40" r="22" />
  </ContentLoader>
)

export const P = (props : PTagProps) => (
  <Text
    style={[
      {
        fontSize: props.fontSize ? width(props.fontSize) : width(3.5),
        fontFamily: FontFamily.BlackSansRegular,
        textAlign: props.textAlign,
        color: props.color || AppColors.black,
        //lineHeight : props.lineHeight ? height(props.lineHeight) : 0,
      },
      props.style
    ]}
  >
    {props.children}
  </Text>
)

export const H1 = (props:HTagProps) => (
  <Text
    style={[
      {
        fontSize : props?.fontSize ? width(props.fontSize) : width(4),
        fontFamily: FontFamily.BlackSansBold,
        color: props.color || 'black',
        textAlign: props.textAlign,
        textDecorationLine: props.underline || "none",
        textDecorationColor: props.lineColor,
        textDecorationStyle: "solid",
        marginLeft: props?.marginLeft ? width(props?.marginLeft) : null,
        marginTop: props?.marginTop ? height(props?.marginTop) : null
      },
      props.style
    ]}
  >
    {props.children}
  </Text>
)

export const SizedBox = ({...props}:SizedBoxProps) => (
  <View
    style={{
      height: height(props.size || 1),
      backgroundColor: props.backgroundColor || AppColors.white,
      width: props?.width ? width(props.width) : 0
    }}
  />
)

export const useDebounce = (value:any, delay:any) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export const Container = (props:ContainerProps) => (
  <View
    style={[
      {
        position: props.position,
        borderColor: props.borderColor,
        flex: props.flex || 0,
        flexDirection: props.direction,
        width: props.width ? width(props.width) : props.widthPercent ? props.widthPercent : '100%',
        padding: props.padding ? width(props.padding) : null,
        height: props?.height,
        //? height(props.height) : null,
        justifyContent:
          props.direction === "row"
            ? props.horizontalAlignment
            : props.verticalAlignment,
        alignItems:
          props.direction === "row"
            ? props.verticalAlignment
            : props.horizontalAlignment,
        paddingHorizontal: props.paddingHorizontal ? width(props.paddingHorizontal) : width(0),
        marginTop: props.marginTop ? height(props.marginTop) : 0,
        marginBottom: props.marginBottom ? height(props.marginBottom) : 0,
        marginLeft: props.marginLeft ? width(props.marginLeft) : 0,
        paddingTop: props.paddingTop ? height(props.paddingTop) : 0,
        paddingBottom: props.paddingBottom ? height(props.paddingBottom) : null,
        paddingVertical: props.paddingVertical ? height(props.paddingVertical) : height(0),
        paddingRight: props.paddingRight ? width(props.paddingRight) : 0,
        paddingLeft: props.paddingLeft ? width(props.paddingLeft) : 0,
        marginRight: props.marginRight ? width(props.marginRight) : 0,
        backgroundColor: props.backgroundColor || AppColors.white,
        borderWidth: props.borderWidth,
        borderTopWidth: props.borderTopWidth,
        borderBottomWidth: props.borderBottomWidth,
        borderRadius: props.borderRadius,
        alignSelf: props.alignSelf,
        //...props.style
      }, props.style
    ]}
  >
    {props.children}
  </View>
)

export const ImageWrap = (props:ImageWrapProps) => (
  <ImageBackground
    source={props.source || { uri: props.url }}
    resizeMode={props.fit}
    style={{
      overflow: "hidden",
      //...Elevation(props.elevation),
      position: props.position,
      width:props?.width || props.widthPercent || "100%",
      height:props?.height || height(3),
      backgroundColor: props?.backgroundColor,
      borderRadius: props.borderRadius,
      borderTopLeftRadius: props.borderTopLeftRadius,
      borderBottomLeftRadius: props.borderBottomLeftRadius,
      margin: props?.margin || 0,
      marginVertical: props?.marginVertical || 0,
      marginHorizontal: props?.marginHorizontal || 0,
      marginRight:props?.marginRight || 0,
      marginLeft: props?.marginLeft|| 0,
      marginTop: props?.marginTop || 0,
      marginBottom: props?.marginBottom || 0,
      padding: props.padding,
    }}
  >
    {props.children}
  </ImageBackground>
)

export const AppButton = (props:AppButtonProp) => (
  <TouchableOpacity
    onPress={props.onPress}
  >
    <Container
      backgroundColor={props.backgroundColor || AppColors.green}
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: height(5),
        width: props.width ? width(props.width) : 0,
        paddingVertical: props.paddingVertical ? height(props.paddingVertical) : height(2),
      }}
    >
      {props.loading ? <ActivityIndicator size={height(3)}
        color={AppColors.white}
      /> : <H1 color={props.color}>{props.text}</H1>}
    </Container>
  </TouchableOpacity>
)

export const TouchWrap = (props:TouchWrapProps) => (
  <TouchableRipple
    onPress={props.onPress}
    rippleColor="rgba(0, 0, 0, .32)"
    style={[
      {
        alignItems: "center",
        justifyContent: "center",
        width: props.width ? width(props.width) : null,
        height: props.height ? height(props.height) : height(6)
      },
      props.style
    ]}
    hasTVPreferredFocus={false}
    tvParallaxProperties={false}
  >
    {props.children}
  </TouchableRipple>
)
export const Width = (val:any) => {
  let res;
  val === undefined || null ? (res = null) : (res = (val / 100) * winWidth);
  return res;
};
export const Rounded = (props:RoundedProps) => (
  <Container
    style={{
      width: Width(props.size || 15),
      height: Width(props.size || 15),
      borderRadius: 50,
      backgroundColor: props.backgroundColor || AppColors.green,
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    {props.children}
  </Container>
)

export const ImgPlaceholder = React.memo((props : ImgPlaceholderProps ) => (
  <Rounded 
      size={props.size || 10}
      backgroundColor={props.backgroundColor || ColorList[Math.floor(Math.random()*4)]}
      radius={props.radius || 10}
  >
      <H1 fontSize={props.fontSize} bold={props.bold} color={props.color}>{props.text}</H1>
  </Rounded>
),(prevProps,nextProps)=>{
  return prevProps.text === nextProps.text
})

export const CustomCalender = (props:CustomCalenderProps) => {
  return (
    <Container
      paddingVertical={5}
    >
      <TouchableWrapper
        isText
        onPress={() => props.setShow(false)}
      >
        <P>Cancel</P>
      </TouchableWrapper>
      <Calendar
        markedDates={{
          [props.date]: { selected: true, selectedColor: AppColors.green }
        }}
        renderArrow={direction => {
          if (direction === "left") return <Feather name="arrow-left" size={width(6)}
            color={AppColors.green}
          />
          if (direction === "right") return <Feather name="arrow-right" size={width(6)}
            color={AppColors.green}
          />
        }}
        current={moment().format("YYYY-MM-DD")}
        // minDate={moment().format("YYYY-MM-DD")}
        onDayPress={(day) => {
          props.setShow(day)
        }}
      />
    </Container>

  )
}

export const DatePickerModal = (props : DatePickerModalProps) => {
  const [selected,setSelected] = React.useState<string | Date>(moment().format("YYYY-MM-DD"))
  
  useEffect(()=>{
    let current = props.current ? props.current : props?.type === "dob" ? moment().subtract(18,"years").format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")
    setSelected(current)
  }, [props.show])
  return (
    <ReactNativeModal
      onBackButtonPress={() => {
        if (!props?.setShow) return
        props?.setShow(false)
      }}
      onModalHide={() => {
        if (!props?.setShow) return
        props?.setShow(false)
      }}
      animationInTiming={500}
      animationOutTiming={10}
      backdropOpacity={0.2}
      swipeDirection={'down'}
      onSwipeComplete={() => {
        if (!props?.setShow) return
        props?.setShow(false)
      }}
      onBackdropPress={() => {
        if (!props?.setShow) return
        props?.setShow(false)
      }}
      animationIn="fadeInUp"
      animationOut="fadeInDown"
      swipeThreshold={0.3}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      isVisible={props?.show}
    >
      <Container
        //flex={1}
        style={{
          justifyContent: "center",
          alignItems: 'center',
          borderTopLeftRadius: width(5),
          borderTopRightRadius: width(5)
        }}
        backgroundColor={AppColors.white}
        paddingHorizontal={5}
      >
        {
          props?.header ? <Container marginBottom={5}
            width={90}
          >
            <H1 fontSize={4}>{props.header}</H1>
          </Container> : null
        }
        <Container
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: height(3)
          }}
        >
            {
              props?.header ? <Container 
                width={90}
                marginTop={4}

              >
                <H1 fontSize={4} color={AppColors.black2}>{props.header}</H1>
              </Container> : null
            }
            <Container
              style={{
                justifyContent : "center",
                alignItems : "center",
                marginTop : height(3)
              }}
            >
              <DatePicker
                date={new Date(selected)} 
                onDateChange={(newDate) => {
                  if(props.mode) return setSelected(newDate)
                  setSelected(moment(newDate).format("YYYY-MM-DD"))
                }} 
                mode={props.mode || "date"} 
                maximumDate={undefined}
                timeZoneOffsetInMinutes={0}
              /> 
              <Container 
                marginTop={5}
                marginBottom={3}
                width={90}
                direction="row"
                style={{
                  justifyContent : 'space-between'
                }}
              >
                  <TouchableWrapper
                    onPress={()=>props.setShow(false)}
                    isText
                  >
                     <P color={AppColors.black3}>Cancel</P>
                  </TouchableWrapper>

                  <TouchableWrapper
                    onPress={()=>{
                      props.onChangeData(selected)
                    }}
                    isText
                  >
                    <H1 color={AppColors.green}>Select</H1>
                  </TouchableWrapper>
              </Container>
            </Container>
        </Container>
      </Container>
    </ReactNativeModal>
  )
}


const onNavigationStateChange = async ({param, dispatch, auth}:onNavigationStateChangeProps) => {
  try {
    let split = param.url && typeof (param.url) == "string" ? param.url.split("&business_id") : []
    if (split.length === 1) return
    var regexp = /[?&]([^=#]+)=([^&#]*)/g, payload = {}, check;
    while (check = regexp.exec(param.url)) {
      payload[check[1]] = check[2];
    }
    // let token = split[1];

    // // parseURLParams is a pseudo function.
    // // Make sure to write your own function or install a package
    // const params = parseURLParams(url);

    // if (params.token) {
    //   // Save token for native requests & move to the next screen
    // }
    dispatch(setLoaderVisible(true))
    await storeData("token", payload.token)
    let about_me = await APIFunction.about_me(payload.business_id)
    let user = await APIFunction.user_info()
    let refresh = null;
    let data = {
      access_token: payload.token,
      refresh_token: null,
      user: user
    }
    await storeData("refresh", data.refresh_token);
    await storeData("about_me", about_me)
    await storeData("user", data.user);
    await storeData("logout_time", moment(new Date()).add(2, 'hours'));
    await storeData('token_expiry', moment(new Date()).add(60, 'minutes'))
    ToastSuccess("Login was successful")
    //dispatch(setLoaderVisible(false));
    return dispatch(login({ ...auth, onboard: false, url: null, user: { userName: "Joe", ...data.user }, route: "onboard", isLogin: true }));
  } catch (err) {
  }
};

export const OnboardModal = (props:OnboardModalProps) => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.Auth)
  return (
    <Modal visible={props.visible}>
      <Container
        flex={1}
      >
        <Container
          marginTop={5}
          marginLeft={2}
          width={width(3)}
        >
          <TouchWrap
            onPress={() => {
              let load = { ...auth, onboard: false, url: null }
              storeData("auth", load)
              dispatch(login(load))
            }}
          >
            <H1>Close</H1>
          </TouchWrap>
        </Container>
        <WebView
          source={{ uri: `${BASE_URL}${props.url}` }}
          style={{ marginTop: 20 }}
          onNavigationStateChange={(param) => onNavigationStateChange(param, dispatch, auth)}
          startInLoadingState={true}
          renderLoading={() => <Container paddingVertical={4}>
            <ActivityIndicator
              color={AppColors.green}
            />
          </Container>}
        />
      </Container>
    </Modal>
  )
}

export const CustomRefreshControl = (props : {loading : boolean, onRefresh : () => void}) =>{
  return(
    <RefreshControl
        colors={[AppColors.white]}
        progressBackgroundColor={AppColors.green}
        refreshing={props.loading}
      // onRefresh={props.onRefresh}
      {...props}
  />)
}

export const CustomWebView = (props:CustomWebViewProps) => (
  <Modal visible={props.show}>
    <Container
      flex={1}
    >
      <Container
        marginTop={5}
        marginLeft={2}
        width={20}
      >
        <TouchWrap
          onPress={() => props.setShow}>
          <H1 textAlign="center">Close</H1>
        </TouchWrap>
      </Container>
      <WebView
        source={{ uri: props.web_url }}
        style={{ marginTop: 20 }}
        startInLoadingState={true}
        renderLoading={() => <Container paddingVertical={4}>
          <ActivityIndicator
            color={AppColors.green}
          />
        </Container>}
      />
    </Container>
  </Modal>
)

export const BackHandler = ({ onPress, position }:BackHandlerProps) => {
  const navigation = useNavigation()
  return (
    <TouchableWrapper
      size={ICON_BUTTON_SIZE}
      onPress={() => {
        if (onPress) return onPress()
        if (!navigation.canGoBack()) return
        navigation.goBack()
      }}
      style={{
        alignItems: position || "flex-start",
      }}
    >
      <ImageWrap
        url={Images.BackArrow}
        fit={"contain"}
        height={5}
        width={5}
      />
    </TouchableWrapper>
  )
}
export const CloseHandler = ({ onPress }:BackHandlerProps) => {
  const navigation = useNavigation()
  return (
    <TouchableWrapper
      size={ICON_BUTTON_SIZE}
      onPress={() => {
        if (onPress) return onPress()
        if (!navigation.canGoBack()) return
        navigation.goBack()
      }}
      style={{
        alignItems: "center",
        //backgroundColor : AppColors.yellow
      }}>
      {/* <ImageWrap
        url={Images.Close}
        fit={"contain"}
        height={4}
        width={4}
      /> */}
      <Ionicons name="close-outline" size={25} />
    </TouchableWrapper>
  )
}



export const NotifyHandler = ({ onPress }:BackHandlerProps) => {
  const navigation = useNavigation()
  return (
    <TouchableWrapper
      size={ICON_BUTTON_SIZE}
      onPress={() => {
        if (onPress) return onPress()
        if (!navigation.canGoBack()) return
        navigation.goBack()
      }}
      style={{
        alignItems: "center",
        //backgroundColor : AppColors.yellow
      }}
    >
      <ImageWrap
        url={Images.QuestionMark}
        fit={"contain"}
        height={5}
        width={5}
      />
    </TouchableWrapper>
  )
}

export const CustomFallBackScreen = (props:CustomFallBackScreenProps) => {
  const reportError = useMutation((load) => APIFunction.error_report(load))
  const logoutMethod = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys()
      AsyncStorage.multiRemove(keys);
      RNRestart.Restart();
    } catch (err) {
    }
  }
  const reportMainError = () => {
    let fd = {
      report: JSON.stringify(`${props?.error}${props?.error?.toString()}`)
    }
    reportError.mutateAsync(fd)
  }
  useEffect(() => {
    // reportMainError()
  }, [])
  return (
    <Container flex={1} style={{
      alignItems: "center",
      justifyContent: "center"
    }}
    >
      <Container width={90}>
        <EmptyStateWrapper
          marginTop={5}
          icon={Images.EmptyTimeoff}
          header_1={"Oh no! Something went wrong :("}
          sub_text={"This issue has been reported and our developers are working to resolve it.Please press refresh to login again."}
        />
        <Container marginTop={5}>
          <CustomButton
            btnText={'Refresh Now'}
            handelButtonPress={logoutMethod}
          />
        </Container>
      </Container>
    </Container>
  )
}

export const EmptyStateWrapper = (props:EmptyStateWrapperProps) => (
  <Container
    marginTop={props.marginTop || 8}
    style={{
      alignItems: "center",
      backgroundColor: props.backgroundColor || AppColors.white
    }}
  >
    <ImageWrap
      url={props.icon}
      height={props.height || 30}
      fit="contain"
    />
    <SizedBox height={props?.spacing || 2} />
    {
      props.header_1 ? (
        <H1
          color={AppColors.black3}
          fontSize={5}
        >{props.header_1}</H1>
      ) : null
    }
    <SizedBox height={props?.spacing || 2} />
    {
      props.header_2 ? <React.Fragment>
        <H1 color={AppColors.black3}
          fontSize={5}>{props.header_2}</H1>
        <SizedBox height={props?.spacing || 2} />
      </React.Fragment> : null
    }
    {
      props.sub_text ? <P color={AppColors.black2}>{props.sub_text}</P> : null
    }
  </Container>
)

export const TouchableWrapper = (props:TouchableWrapperProps) => (
  <TouchableRipple onPress={props.onPress}
    rippleColor={AppColors.whiteBase}
    style={[
      props?.isText ? {
        height: props?.height ? height(props?.height) : height(5),
        width: props?.width ? width(props?.width) : width(25),
        justifyContent: "center",
        alignItems: "center"
      } : props?.size ? {
        borderRadius: 50,
        height: height(props.size),
        width: height(props.size),
        justifyContent: "center",
        alignItems: "center"
      } : {}, props.style
    ]}
    disabled={props?.disabled}
    onLayout={props?.onLayout}
    hasTVPreferredFocus={false}
    tvParallaxProperties={false}
  >
    {props.children}
  </TouchableRipple>
)

export const UserPINComponent = (props:UserPINComponentProps) => {
  return (
    <React.Fragment>
      <Container
        horizontalAlignment='center'
        marginTop={4}
      >
        {
          !props?.hasPIN && props?.action === "create" ? <React.Fragment>
            <H1 fontSize={6} color={AppColors.black1}>Create New Pin</H1>
            <P color={AppColors.black1} style={CommonStyles.marginTop_1}>Stay sharp & secure with your pin</P>
          </React.Fragment> : null
        }

        {
          !props?.hasPIN && props?.action === "confirm" ? <React.Fragment>
            <H1 fontSize={6} color={AppColors.black1}>Confirm New Pin</H1>
            {props?.error ? <P color={AppColors.red} style={CommonStyles.marginTop_1}>{props?.error}</P> : null}
            <P color={AppColors.black1} style={CommonStyles.marginTop_1}>Enter your pin again for confirmation</P>
          </React.Fragment> : null
        }
        {
          props?.hasPIN ? <React.Fragment>
            <P color={AppColors.black1}>Welcome back</P>
            <H1 fontSize={6} color={AppColors.black1} style={CommonStyles.marginTop_1}>{props?.auth?.about?.first_name ? Capitalize(props?.auth?.about?.first_name) : null} {props?.auth?.about?.last_name ? `${Capitalize(props?.auth?.about?.last_name[0])}.` : null}</H1>
            {props?.error ? <P color={AppColors.red} style={CommonStyles.marginTop_1}>{props?.error}</P> : null}
          </React.Fragment> : null
        }
        <Container marginTop={3} horizontalAlignment="center">
          <SmoothPinCodeInput password mask="﹡"
            cellSpacing={width(5)}
            codeLength={4}
            autoFocus={true}
            value={props.holder}
            onTextChange={(value:string)=> {
              props.setError("")
              props?.setHolder(value)
            }}
            onFulfill={props.validatePIN}
            restrictToNumbers={true}
            cellStyle={{
              borderWidth: 2,
              borderColor: AppColors.grayBorder
            }}
            cellStyleFocused={{
              borderColor: AppColors.green,
            }}
          />
        </Container>
      </Container>
    </React.Fragment>
  )
}


export const ClockINContainer = ({ setVisible }) => {
  const [current, setCurrent] = React.useState("")
  const auth = useSelector(state => state.Auth)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const [tab, setTab] = React.useState("On-Site")
  const clockEmployeeIn = useMutation((load) => APIFunction.employee_clock_in(load))
  const clockEmployeeOut = useMutation((load) => APIFunction.employee_clock_out(load))

  const {
    data: config,
    isFetching: fetching
  } = useFetchAttendanceConfig()
  const {
    data: status,
    isFetching: fetchingStatus
  } = useFetchAttendanceStatus()

  const {
    data: type,
    isFetching: fetchingType
  } = useFetchLocationType()

  useEffect(() => {
    if (!type?.location_type) return
    if (status?.location_type === "on_site") {
      return setTab("On-Site")
    }
    if (status?.location_type && status?.location_type !== "on_site") {
      return setTab("Remote")
    }
    if (type?.location_type === "Onsite") return setTab("On-Site")
    setTab("Remote")
  }, [type, status])

  var interval
  useEffect(() => {
    setInterval(() => {
      interval = setCurrent(moment().format("HH : mm"))
    }, 1000);
    return () => {
      clearInterval(interval)
    }
  }, [])

  const submitHandler = async () => {
    try {
      if (status?.is_clocked_in) {
        let user = await getData("about_me")
        dispatch(setLoaderVisible(true))
        let fd = {
          employee: user.id,
          clock_in_time: status?.clock_in_time,
          clock_out_time: moment().toISOString()
        }
        await clockEmployeeOut.mutateAsync(fd)
        queryClient.invalidateQueries("attendance_status")
        dispatch(setLoaderVisible(false))
        return showFlashMessage({ title: `You clocked out from work at ${moment().format("hh:mm a")}`, type: "success" })
      }
      dispatch(setLoaderVisible(true))
      if(Platform.OS === "ios") await Geolocation.requestAuthorization("always")
      Geolocation.getCurrentPosition(
        async (position) => {
          try{
            let fd = {
              latitude : position?.coords?.latitude,
              longitude : position?.coords?.longitude,
              location_type: tab === "Remote" ? "remote" : "on_site"
            }
            await clockEmployeeIn.mutateAsync(fd)
            queryClient.invalidateQueries("attendance_status")
            dispatch(setLoaderVisible(false))
            showFlashMessage({ title: `You resumed for work at ${moment().format("hh:mm a")}`, type: "success" })
          }catch(error){
            dispatch(setLoaderVisible(false))
            ToastError(error?.msg)
          }
        },
        error => {
          // See error code charts below.
          dispatch(setLoaderVisible(false))
          ToastError(error?.message)
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          accuracy: {
            ios: 'best',
            android: 'high',
          },
        },
      );
    } catch (err) {
      dispatch(setLoaderVisible(false))
      if ((err && err.toString().includes("Location not available")) || err?.name === "LocationError") {
        return setVisible(true)
      }
      ToastError(err.msg)
    }
  }

  return (
    <React.Fragment>
      {
        config?.data?.is_configured ? <View
          style={{
            alignItems: "center"
          }}
        >
          <Container
            marginTop={3}
            marginBottom={30}
            style={{
              alignItems: "center",
              height: height(28),
              width: width(90),
              borderRadius: width(8)
            }}
            backgroundColor={AppColors.lightOrange}
            borderWidth={1}
            borderColor={AppColors.yellow}
          >
            <Container marginTop={3} direction="row"
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
              backgroundColor={AppColors.lightOrange}
            >
              <Container width={1} backgroundColor="transparent" />
              <P fontSize={4} color={AppColors.black1}>
                Daily Attendance
              </P>
            </Container>
            <SizedBox height={1} />
            <H1 fontSize={4} color={AppColors.black1}>
              {moment().format("dddd, DD MMM YYYY")}
            </H1>
            <SizedBox height={1} />
            <Container
              backgroundColor={AppColors.white}
              marginTop={1.5}
              direction="row"
              width={80}
              borderColor={AppColors.white}
              borderWidth={1}
              style={{
                alignItems: "center",
                justifyContent: "space-around",
                borderRadius: width(2)
              }}
            >
              {
                ["On-Site", "Remote"].map((item, i) => <TouchableOpacity key={i}
                  disabled={status?.location_type ? true : false}
                  onPress={() => setTab(item)}
                  style={[
                    ComponentStyles.attendance_tab,
                    tab === item && status?.location_type ? { backgroundColor: AppColors.grayBorder } : tab === item ? { backgroundColor: AppColors.black }
                      : { backgroundColor: AppColors.white }
                  ]}
                >
                  <H1 textAlign="center" fontSize={3} color={
                    tab === item && status?.location_type ? AppColors.darkGray : tab === item ? AppColors.white : AppColors.black
                  }>{item}</H1>
                </TouchableOpacity>)
              }
            </Container>
            <Container
              style={{
                alignItems: "center",
                top: height(17),
                width: width(90),
                paddingTop: height(3),
                paddingBottom: height(3),
                zIndex: 1000,
                borderRadius: width(5),
                borderWidth: width(0.3),
                borderTopWidth: 0,
                borderTopColor: "transparent"
              }}
              position="absolute"
              borderColor={AppColors.yellow}
            >
              <Container
                style={{
                  alignItems: "center",
                }}
                marginBottom={2}
              >
                <P fontSize={3.3} color={AppColors.darkGray}>{getGreetingTime()}</P>
                <Container
                  marginTop={2}
                  direction="row"
                  width={63}
                  style={{
                    alignSelf: "center",
                    justifyContent: "space-around"
                  }}
                >
                  {
                    current ? [...current.toString()].filter(num => num.trim() !== "").map((num, i) => (
                      <Container key={i}
                        width={num !== ":" ? 14 : 2}
                        style={num !== ":" ? {
                          backgroundColor: AppColors.gray1,
                          borderRadius: width(2),
                          justifyContent: "center",
                          height: height(6),
                          borderBottomWidth: width(0.5),
                          borderBottomColor: AppColors.lightYellow
                        } : {
                          justifyContent: "center",
                          height: height(6)
                        }}
                      >
                        <H1 fontSize={9} color={AppColors.black}
                          textAlign="center"
                        >{num}</H1>
                      </Container>
                    )) : null
                  }
                </Container>

              </Container>
              <Container
                marginTop={1}
                marginBottom={1}
                direction="row"
                width={50}
                borderTopWidth={width(0.5)}
                borderBottomWidth={width(0.5)}
                borderColor={AppColors.lightYellow}
                backgroundColor={AppColors.gray}
                height={height(5)}
                borderRadius={width(2)}
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {
                  fetchingStatus ? <ActivityIndicator size={width(2)}
                    color={AppColors.green}
                  /> :
                    status?.is_clocked_in && status?.clock_in_time && !status?.has_clocked_out ? <React.Fragment>
                      <P fontSize={3.3} color={AppColors.darkGray}>Clocked In time:</P>
                      <P fontSize={3.3} color={AppColors.black}> {moment(status?.clock_in_time).format("HH : mm")}</P>
                    </React.Fragment> : status?.has_clocked_out && status?.clocked_out_time ? <React.Fragment>
                      <P fontSize={3.3} color={AppColors.darkGray}>Clocked Out time:</P>
                      <P fontSize={3.3} color={AppColors.black}> {moment(status?.clocked_out_time).format("HH : mm")}</P>
                    </React.Fragment> : <React.Fragment>
                      <P fontSize={3.3} color={AppColors.darkGray}>Clock In time:</P>
                      <P fontSize={3.3} color={AppColors.black}> -- : --</P>
                    </React.Fragment>
                }
              </Container>
              <TouchableOpacity onPress={submitHandler}
                disabled={(status?.has_clocked_out || fetchingStatus) ? true : false}
                style={{
                  borderRadius: 7,
                  backgroundColor: (status?.has_clocked_out || fetchingStatus) ? AppColors.lightOrange : AppColors.yellow,
                  height: height(5.8),
                  marginTop: height(2),
                  width: width(80),
                  justifyContent: "center"
                }}
              >
                {
                  tab === "Remote" ? <H1 textAlign="center">{!status?.is_clocked_in ? "Clock In Remotely" : "Clock Out"} </H1> : <H1 textAlign="center">{!status?.is_clocked_in ? "Clock In" : "Clock Out"} </H1>
                }
              </TouchableOpacity>
              <P fontSize={3} color={AppColors.black3}
                style={{
                  marginTop: height(1.5)
                }}
              >
                Work Hours - {status?.is_clocked_in && status?.clock_in_time && !status?.has_clocked_out ? moment.utc(moment().diff(moment(status?.clock_in_time))).format("HH:mm:ss") : status?.has_clocked_out && status?.clocked_out_time ? moment.utc(moment(status?.clocked_out_time).diff(moment(status?.clock_in_time))).format("HH:mm:ss") : "00:00:00"}
              </P>
            </Container>
          </Container>
        </View> : null
      }
    </React.Fragment>
  )
}

export const KeyboardAwareWrapper = ({children} : KeyboardAwareWrapperProps) => {

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(setBottomTabBarVisible(false))
      return () => dispatch(setBottomTabBarVisible(true))
  }, []);

  return(
      <KeyboardAwareScrollView 
        enableResetScrollToCoords={false}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </KeyboardAwareScrollView>
  )
}

// const areEqual = (prevProps, nextProps) => {
//   return (prevProps.isVisible === nextProps.isVisible) && (prevProps.loading === nextProps.loading)
// }


//export const Rounded = React.memo(_Rounded, areEqual);


const ComponentStyles = StyleSheet.create({
  attendance_tab: {
    paddingVertical: height(1),
    width: width(38),
    borderRadius: width(2),
    marginTop: height(0.3),
    marginBottom: height(0.3)
  }
})

