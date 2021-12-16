import React from 'react';
import ContentLoader, {BulletList,Facebook} from 'react-content-loader/native'
import LottieView from 'lottie-react-native';
import {ImageBackground, Text} from  'react-native';
import Svg, {
    Circle,
    Ellipse,
    G,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
    SvgUri,
  } from 'react-native-svg';
import AppColors from './AppColors';
import { View ,Dimensions,Modal} from 'react-native';
import { FontFamily } from './FontFamily';
import { height, width } from 'react-native-dimension';
import { ActivityIndicator, TouchableRipple } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {WebView, WebViewNavigation} from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/Actions/Auth';
import { storeData, ToastSuccess } from './Methods';
import { APIFunction } from './api';
import {setLoaderVisible} from '../Redux/Actions/Config';
import { BASE_URL } from './Constants';

const winDimensions = Dimensions.get("window")
const winWidth = winDimensions.width;
const winHeight = winDimensions.height

export const PageLoader = props => {
  return(
    [...'123567'].map((item,i)=>(
      <ContentLoader 
        key={i}
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

export const Reload = props => {
  return(
    [...'1'].map((item,i)=>(
      <ContentLoader 
        key={i}
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

  export const LottieIcon = ({icon,size}) => {
    return(
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

  export const P = (props) => (
    <Text
      style={{
        fontSize : props.fontSize || width(3.5),
        fontFamily : FontFamily.BlackSansRegular,
        textAlign : props.textAlign,
        color : props.color || AppColors.black,
        ...props.style
      }}
    >
     {props.children}
    </Text>
  )

  export const H1 = (props) => (
    <Text
      style={{
        fontSize : width(props.fontSize) || width(4),
        fontFamily : FontFamily.BlackSansBold,
        color : props.color || 'black',
        textAlign: props.textAlign,
        ...props.style
      }}
    >
      {props.children}
    </Text>
  )
  
export const SizedBox = (props) => (
  <View 
    style={{
      height : height(props.size || 1)
    }}
  />
)

  export const Container = (props) => (
    <View 
      style={{
        position : props.position,
        borderColor : props.borderColor,
        flex : props.flex || 0,
        flexDirection : props.direction,
        width : props.width ? width(props.width) : props.widthPercent ? props.widthPercent : '100%',
        padding : props.padding ? width(props.padding) : width(0),
        paddingVertical : props.paddingVertical ? height(props.paddingVertical) : height(0),
        paddingHorizontal : props.paddingHorizontal ? width(props.paddingHorizontal) : width(0),
        marginTop : props.marginTop ? height(props.marginTop) : 0,
        marginBottom : props.marginBottom ? height(props.marginBottom) : 0,
        marginLeft : props.marginLeft ? width(props.marginLeft) : 0,
        paddingTop : props.paddingTop ? height(props.paddingTop) : 0,
        paddingRight : props.paddingRight ? width(props.paddingRight) : 0,
        paddingLeft : props.paddingLeft ? width(props.paddingLeft) : 0,
        marginRight : props.marginRight ? width(props.marginRight) : 0,
        backgroundColor : props.backgroundColor || AppColors.white,
        borderWidth : props.borderWidth,
        borderBottomWidth : props.borderBottomWidth,
        ...props.style
      }}
    >
      {props.children}
    </View>
  )

  export const ImageWrap = (props) => (
    <ImageBackground
      source={props.source || { uri: props.url }}
      resizeMode={props.fit}
      style={{
        overflow: "hidden",
        //...Elevation(props.elevation),
        position: props.position,
        width: width(props.width) || props.widthPercent || "100%",
        height: height(props.height) || height(3),
        backgroundColor: props.backgroundColor,
        borderRadius: props.borderRadius,
        borderTopLeftRadius: props.borderTopLeftRadius,
        borderBottomLeftRadius: props.borderBottomLeftRadius,
        margin: width(props.margin) || 0,
        marginVertical: height(props.marginVertical) || 0,
        marginHorizontal: width(props.marginHorizontal) || 0,
        marginRight: width(props.marginRight) || 0,
        marginLeft: width(props.marginLeft) || 0,
        marginTop: height(props.marginTop) || 0,
        marginBottom: height(props.marginBottom) || 0,
        padding: props.padding,
      }}
    >
      {props.children}
    </ImageBackground>
  )
  
  export const AppButton = (props) => (
    <TouchableOpacity
      onPress={props.onPress}
    >
      <Container
        backgroundColor={props.backgroundColor || AppColors.green}
        style={{
          justifyContent : "center",
          alignItems : "center",
          padding : height(5),
          width  : props.width ? width(props.width) : 0,
          paddingVertical : props.paddingVertical ? height(props.paddingVertical) : height(2),
        }}
      >
        {props.loading ? <ActivityIndicator size={height(3)}
          color={AppColors.white}
        /> : <H1 color={props.color}>{props.text}</H1>}
      </Container>
    </TouchableOpacity>
  )

  export const TouchWrap = (props) => (
    <TouchableRipple
      onPress={props.onPress}
      rippleColor="rgba(0, 0, 0, .32)"
    >
      {props.children}
    </TouchableRipple>
  )
  export const Width = (val) => {
    let res;
    val === undefined || null ? (res = null) : (res = (val / 100) * winWidth);
    return res;
  };
  export const Rounded = (props) =>(
    <Container
      style={{
        width : Width(props.size || 15),
        height: Width(props.size || 15),
        borderRadius : 50,
        backgroundColor : props.backgroundColor || AppColors.green,
        justifyContent : "center",
        alignItems : "center"
      }}
    >
      {props.children}
  </Container>
  )

  export const CustomCalender = (props) => {
    return(
      <Container
        paddingVertical={5}
      >
          <Container
            direction="row"
            marginTop={1}
            marginBottom={1}
            style={{
              justifyContent : "space-between",
              alignItems : "center"
            }}
            paddingRight={5}
            paddingLeft={5}
          >
            <TouchWrap
              onPress={()=>props.setShow(false)}
            >
                <P>Cancel</P>
            </TouchWrap>
          </Container>
          <Calendar
            // Collection of dates that have to be marked. Default = {}
            markedDates={{
              [props.date] : {selected: true, selectedColor: AppColors.green}
            }}
            current={moment().format("YYYY-MM-DD")}
            minDate={moment().format("YYYY-MM-DD")}
            onDayPress={(day) => {
              props.setShow(day)
            }}
          />
        </Container>
    
    )
}

export const DatePickerModal = (props) => {
  return(
      <Modal visible={true}>
        <Container
          flex={1}
          style={{
            justifyContent : "center",
            alignItems : 'center'
          }}
        >
            <Container
              style={{
                justifyContent : "center",
                alignItems : "center"
              }}
            >
              <DatePicker 
                  date={new Date()} 
                  onDateChange={(newDate) => {
                  //setDate(newDate);
                  //props.onChangeData ? props.onChangeData(moment(newDate).format("YYYY-MM-DD")) : null
                  //onChange(newDate.toDateString())
                  }} 
                  mode="date" 
                  maximumDate={new Date()}
              /> 
              <Container 
                marginTop={5}
                width={90}
                direction="row"
                style={{
                  justifyContent : 'space-between'
                }}
              >
                  <TouchWrap
                    onPress={props.setShow}
                  >
                    <P color={AppColors.black3}>Cancel</P>
                  </TouchWrap>

                  <TouchWrap
                    onPress={props.setShow}
                  >
                    <H1 color={AppColors.lightMediumGreen}>Select</H1>
                  </TouchWrap>
              </Container>
            </Container>
        </Container>
      </Modal>
  )
}


const onNavigationStateChange = async (param,dispatch,auth) => {
  try{
    let split = param.url && typeof(param.url) == "string" ? param.url.split("&business_id") : []
    if(split.length === 1) return
    var regexp = /[?&]([^=#]+)=([^&#]*)/g,payload = {},check;
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
    await storeData("token",payload.token)
    let about_me = await APIFunction.about_me(payload.business_id)
    let user = await APIFunction.user_info()
    let refresh = null;
    let data = {
      access_token : payload.token,
      refresh_token : null,
      user : user
    }
    await storeData("refresh",data.refresh_token);
    await storeData("about_me",about_me)
    await storeData("user",data.user);
    await storeData("logout_time",moment(new Date()).add(2,'hours'));
    await storeData('token_expiry',moment(new Date()).add(60,'minutes'))
    ToastSuccess("Login was successful")
    dispatch(setLoaderVisible(false));
    return dispatch(login({...auth,onboard : false,url : null,user : {userName: "Joe",...data.user}, route : "main",isLogin : true}));
  }catch(err){
  }
};

export const OnboardModal = (props) => {
  const dispatch = useDispatch()
  const auth = useSelector(state=>state.Auth)
  return(
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
            onPress={()=>{
              let load = {...auth,onboard : false,url : null}
              storeData("auth",load)
              dispatch(login(load))
            }}
          >
            <H1>Close</H1>
          </TouchWrap>
        </Container>
      <WebView 
        //props.url
        source={{ uri: `${BASE_URL}${props.url}`}}
        style={{ marginTop: 20}}
        onNavigationStateChange={(param)=>onNavigationStateChange(param,dispatch,auth)}

      />
    </Container>
    </Modal>
  )
}

export const CustomWebView = (props) => (
  <Container
    flex={1}
  >
    <Container
      marginTop={2}
      marginLeft={2}
    >
      <TouchableOpacity
        onPress={()=>props.setShow(false)}
      >
        <H1>Close</H1>
      </TouchableOpacity>
    </Container>
    <WebView 
      source={{ uri: props.web_url }}
        style={{ marginTop: 20
      }}
    />
  </Container>
)

export const EmptyStateWrapper =  (props) => (
  <Container
      marginTop={8}
      style={{
          alignItems : "center"
      }}
  >
      <ImageWrap 
        url={props.icon}
        height={30}
        fit="contain"
      />
      <H1
          color={AppColors.black3}
          fontSize={5}
      >{props.header_1}</H1>
      {
        props.header_2 ? <React.Fragment>
          <H1 color={AppColors.black3}
            fontSize={5}>{props.header_2}</H1>
        <SizedBox height={2} />
        </React.Fragment> : null
      }
      <P color={AppColors.black2}>{props.sub_text}</P>
  </Container>
)