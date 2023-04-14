import React, { useEffect, useRef, useState } from 'react';
import ContentLoader from 'react-content-loader/native'
import LottieView from 'lottie-react-native';
import { ImageBackground, Text, Platform, RefreshControl, TextInput, SafeAreaView, FlatList, KeyboardAvoidingView,ViewStyle } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import { Images } from "./Image"
import {
  Circle,
  Rect,
} from 'react-native-svg';
import AppColors, { ColorList } from './AppColors';
import { View, Dimensions, Modal } from 'react-native';
import { FontFamily } from './FontFamily';
import { height, width } from 'react-native-dimension';
import { ActivityIndicator, IconButton, TouchableRipple } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/Actions/Auth';
import { Capitalize, storeData, ToastSuccess } from './Methods';
import { APIFunction} from './api';
import { setLoaderVisible } from '../Redux/Actions/Config';
import { BASE_URL, ICON_BUTTON_SIZE } from './Constants';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import CommonStyles from './CommonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReactNativeModal from 'react-native-modal'
import { ImgPlaceholderProps,  LottieIconProps, PTagProps,DatePickerModalProps, UserPINComponentProps, ItemListModalProps, ListComponentProps, ContainerProps, HTagProps, CustomCalenderProps, CustomWebViewProps, SizedBoxProps, CustomFallBackScreenProps, TouchableWrapperProps, EmptyStateWrapperProps, ImageWrapProps, AppButtonProp, TouchWrapProps, RoundedProps, onNavigationStateChangeProps, OnboardModalProps, BackHandlerProps } from './types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SearchBox from '../components/SearchBox';
import Button from '../components/Button';
import styles from "./styles"
import CustomInput from '../components/CustomInput';
import { useAppSelector } from './Methods';
import { scrollToPosition } from '../Redux/Actions/Config';
import { CordType } from './types';
import { useFetchAboutMeData } from '../components/TimeoffModal/types';
import { FontWeights } from './FontWeights';


const winDimensions = Dimensions.get("window")
const winWidth = winDimensions.width;

export const PageLoader = () => {
  return (
    <React.Fragment>
          {
              [...'123567'].map((item) => (
                <ContentLoader
                  key={item}
                  viewBox="0 0 778 116" width={350} height={100}
                  backgroundColor={AppColors.gray1}
                >
                  <Rect x="37" y="34" rx="0" ry="0" width="0" height="0" />
                  <Rect x="28" y="29" rx="0" ry="0" width="258" height="32" />
                  <Rect x="28" y="71" rx="0" ry="0" width="465" height="32" />
                  <Rect x="434" y="94" rx="0" ry="0" width="0" height="0" />
                  <Rect x="29" y="116" rx="0" ry="0" width="749" height="32" />
                </ContentLoader>
              ))
            
          }
    </React.Fragment>
)}

export const Reload = () => {
  return (
    <React.Fragment>
          {
                [...'1'].map((item) => (
                  <ContentLoader
                    key={item}
                    viewBox="0 0 778 116" width={350} height={100}
                    backgroundColor={AppColors.gray1}
                  >
                    <Rect x="37" y="34" rx="0" ry="0" width="0" height="0" />
                    <Rect x="28" y="29" rx="0" ry="0" width="258" height="32" />
                    <Rect x="28" y="71" rx="0" ry="0" width="465" height="32" />
                    <Rect x="434" y="94" rx="0" ry="0" width="0" height="0" />
                    <Rect x="29" y="116" rx="0" ry="0" width="749" height="32" />
                  </ContentLoader>
                ))
          }
    </React.Fragment>
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
        fontSize : props.fontSize ? width(props.fontSize) : width(3.5),
        fontFamily : FontFamily.BlackSansRegular,
        textAlign : props.textAlign,
        lineHeight : props.lineHeight ? height(props.lineHeight) : undefined,
        color : props.color || AppColors.black,
        textDecorationLine: props.underline || "none",
        textDecorationColor : props.lineColor,
        textDecorationStyle: "solid",
        marginTop : props.marginTop ? height(props.marginTop) : undefined,
        marginLeft : props.marginLeft ? width(props.marginLeft) : undefined,
        marginBottom : props.marginBottom ? height(props.marginBottom) : undefined,
        marginRight : props.marginRight ? height(props.marginRight) : undefined,
      },
      props.style
    ]}
    numberOfLines={props?.numberOfLines}
  >
    {props.children}
  </Text>
)

export const H1 = (props: HTagProps) => (
  <Text
    style={[
      {
        fontSize : props?.fontSize ? width(props.fontSize) : width(4),
        fontFamily : props.bold ? FontWeights[props.bold] : FontFamily.BlackSansBold,
        color : props.color || AppColors.black,
        textAlign: props.textAlign,
        textDecorationLine: props.underline || "none",
        textDecorationColor : props.lineColor,
        textDecorationStyle: "solid",
        lineHeight : props.lineHeight ? height(props.lineHeight) : undefined,
        marginTop : props.marginTop ? height(props.marginTop) : undefined,
        marginBottom : props.marginBottom ? height(props.marginBottom) : undefined,
        marginRight : props.marginRight ? width(props.marginRight) : undefined,
        marginLeft : props.marginLeft ? width(props.marginLeft) : undefined
      },
      props.style
    ]}
    numberOfLines={props?.numberOfLines}
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

export const useDebounce = (value:string, delay:number) => {
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

export const ListComponent = ({index, item,onPress} : ListComponentProps) => {
  let name = ""
  if(item.title){
    name = item.title
  }
  if(item.name){
    name = item.name
  }
  if(item.first_name || item.last_name){
    name = `${item.first_name} ${item.last_name}`.trim()
  }
  if(item.account_name){
    name = item.account_name
  }
  return(
    <TouchableWrapper onPress={()=>{
      if(!onPress){
        return 
      }
      onPress()
    }} key={index} style={styles.list_component}>
       <P color={AppColors.black1}>{name ? Capitalize(name) : ""}</P>
    </TouchableWrapper>
  )
}

export const ItemListModal = ({setOpen,loading,data,open,onPressHandler,
  header_1,
  header_2,sub_text,
  getMore,
  setPage,
  page,
  saving,
  type = "",
  buttonTitle,
  addNewHandler,
  handleSearch,
  error,
  setError
} : ItemListModalProps) => {
  const [add,setAdd] = React.useState(false)
  const [text,setText] = React.useState("")
  const [search,setSearch] = React.useState("")

  const onSubmitEditing = (text : string) => {
    setSearch(text)
    if(!handleSearch || !setPage) return
    setPage(1)
    handleSearch({
      type,
      text : text
    })
  }
  const submitHandler = () => {
    if(!add) return setAdd(true)
    if(!addNewHandler) return
    addNewHandler({
      type,
      text
    })
  }

  useEffect(()=>{
    setText("")
    setAdd(false)
    if(setError) setError("")
    if(handleSearch){
      handleSearch({
        type,
        text : text
      })
    }
  },[open])
  
  return(
    <Modal visible={open}>
        {
          !add ? (
              <SafeAreaView style={{flex : 1}}>
                <Container marginBottom={2}>
                  <TouchableWrapper onPress={setOpen} size={8}>
                    <Ionicons name="close" size={width(8)} />
                  </TouchableWrapper>
                  {
                    handleSearch ? <SearchBox title="Search"
                      onSubmitEditing={onSubmitEditing}
                      value={search}
                    /> : null
                  }
                  
                </Container>
                <FlatList 
                    data={data}
                    ItemSeparatorComponent={() => <View />}
                    keyExtractor={(item,i) => `${item}${i}`.toString()}
                    contentContainerStyle={CommonStyles.flatList}
                    renderItem={({item,index})=><ListComponent item={item} index={index}
                        onPress={()=>onPressHandler(item)}
                      />}
                      ListEmptyComponent={<EmptyStateWrapper icon={Images.EmptyDoc} 
                        header_1={header_1}
                        header_2={header_2}
                        sub_text={sub_text}
                      />}
                      onEndReachedThreshold={0.1}
                      onEndReached={()=>{
                        if(!getMore || !setPage || !page) return
                        setPage(page + 1)
                      }}
                      ListFooterComponent={()=>{
                        if(loading) return <Container marginTop={3}>
                              <ActivityIndicator size={width(8)} color={AppColors.green}/>
                          </Container> 
                        return <React.Fragment></React.Fragment>
                      }}
                    />
                {
                  buttonTitle && addNewHandler ? <Container horizontalAlignment='center'>
                    <Button title={buttonTitle} onPress={submitHandler}
                      containerStyle={styles.addNewButton}
                      textStyle={styles.addNewText}
                    />
                  </Container> : null
                }
            </SafeAreaView>
          ) : <SafeAreaView style={{flex : 1}}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"} 
                  style={{justifyContent : "flex-end",flex : 1,backgroundColor : AppColors.black2}}
                >
                  <Container 
                    borderTopLeftRadius={width(6)}
                    borderTopRightRadius={width(6)}
                    backgroundColor={AppColors.white}
                    paddingVertical={3}
                  >
                    <Container width={90} alignSelf="center">
                      <H1 color={AppColors.black1} textAlign="center" marginBottom={2}>{buttonTitle}</H1>
                      {error ?  <P color={AppColors.red}>{error}</P> : null }
                        <React.Fragment>
                          <CustomInput 
                            value={text}
                            placeholder={type === "Contact" ? "First Name" : type ?  Capitalize(type.toString().replace("_", " ")) : ""}
                            onChangeData={(value : string)=>{
                              setText(value)
                              if(setError) setError("")
                            }}
                          />
                        </React.Fragment>
                    </Container>
                    <Container alignSelf="center" width={90} marginTop={10}>
                      <Button title={"Save"} onPress={submitHandler}
                        containerStyle={styles.addNewButton}
                        textStyle={styles.addNewText}
                        isLoading={saving}
                        loaderColor={AppColors.green}
                      />
                      {
                        !saving ? <TouchableWrapper onPress={()=>setAdd(false)}
                        isText
                        width={90}
                      >
                        <H1 color={AppColors.green}>Close</H1>
                      </TouchableWrapper> : null
                      }
                    </Container> 
                  </Container>
                </KeyboardAvoidingView>
          </SafeAreaView>
        }
    </Modal>
  )
}

export const Container = (props : ContainerProps) => (
  <View
    style={[
      {
        position: props.position,
        borderColor: props.borderColor?props.borderColor:AppColors.grayBorder,
        flex: props.flex || 0,
        flexDirection: props.direction,
        width: props.width ? width(props.width) : props.widthPercent ? props.widthPercent : '100%',
        padding: props.padding ? width(props.padding) : undefined,
        height: props?.height,
        //? height(props.height) : null,
        justifyContent:
          props.direction === "row"
            ? props.horizontalAlignment
            : props.verticalAlignment,
        alignItems:
          props.direction === "row"
            ? props.verticalAlignment : props.horizontalAlignment,
        paddingHorizontal: props.paddingHorizontal ? width(props.paddingHorizontal) : width(0),
        marginTop: props.marginTop ? height(props.marginTop) : 0,
        marginBottom: props.marginBottom ? height(props.marginBottom) : 0,
        marginLeft: props.marginLeft ? width(props.marginLeft) : 0,
        paddingTop: props.paddingTop ? height(props.paddingTop) : 0,
        paddingBottom: props.paddingBottom ? height(props.paddingBottom) : undefined,
        paddingVertical: props.paddingVertical ? height(props.paddingVertical) : undefined,
        paddingRight: props.paddingRight ? width(props.paddingRight) : 0,
        paddingLeft: props.paddingLeft ? width(props.paddingLeft) : 0,
        marginRight: props.marginRight ? width(props.marginRight) : 0,
        backgroundColor: props.backgroundColor || AppColors.white,
        borderWidth: props.borderWidth,
        borderTopWidth: props.borderTopWidth,
        borderBottomWidth: props.borderBottomWidth,
        borderRadius: props.borderRadius,
        borderTopRightRadius : props.borderTopRightRadius,
        borderTopLeftRadius : props.borderTopLeftRadius,
        alignSelf: props.alignSelf
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
      width:props.width ? width(props?.width) : "100%",
      height:props.height? height(props?.height) : height(3),
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
        width: props.width ? width(props.width) : undefined,
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
  val === undefined || null ? (res = undefined) : (res = (val / 100) * winWidth);
  return res;
};
export const Rounded = (props:RoundedProps) => (
  <Container
    style={{
      width: Width(props.size || 15),
      height: Width(props.size || 15),
      borderRadius: width(props?.radius || 50),
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

export const CustomCalender = (props : CustomCalenderProps) => {
  return (
    <Container
      paddingVertical={5}
    >
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
                      if(!props.onChangeData) return
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
    var regexp = /[?&]([^=#]+)=([^&#]*)/g, payload : {[index : string] : string} = {}, check;
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
    await storeData("token", payload?.token)
    let about_me = await APIFunction.about_me(payload?.business_id) as useFetchAboutMeData
    let user = await APIFunction.user_info()
    let data = {
      access_token: payload.token,
      refresh_token: null,
      user: user
    }
    await storeData("refresh", data.refresh_token);
    await storeData("about_me", about_me)
    await storeData("user", data.user);
    await storeData("logout_time", moment(new Date()).add(360, 'hours'));
    await storeData('token_expiry', moment(new Date()).add(60, 'minutes'))
    ToastSuccess("Login was successful")
    //dispatch(setLoaderVisible(false));
    return dispatch(login({ ...auth, onboard: false, url: null, user: about_me, route: "onboard", isLogin: true }));
  } catch (err) {
  }
};

export const OnboardModal = (props:OnboardModalProps) => {
  const dispatch = useDispatch()
  const auth = useAppSelector(state => state.Auth)
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
          onNavigationStateChange={(param) => onNavigationStateChange({param, dispatch, auth})}
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
          onPress={() => props.setShow()}>
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

export const BackHandler = ({ onPress,style}:BackHandlerProps) => {
  const navigation = useNavigation()
  return (
    <IconButton
        size={width(ICON_BUTTON_SIZE)}
        onPress={() => {
          if (onPress)
            return onPress();
          if (!navigation.canGoBack())
            return;
          navigation.goBack();
        } }
        style={[
          styles.back_button,
          style
        ]}
        icon={"keyboard-backspace"} 
        hasTVPreferredFocus={undefined} 
        tvParallaxProperties={undefined}    
        rippleColor={AppColors.whiteBase}
      />
  )
}
 {/* <ImageWrap
        url={Images.BackArrow}
        fit={"contain"}
        height={5}
        width={5}
      />
    </IconButton> */}
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
      }}>
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
  const {
    mutateAsync : reportError
  } = useMutation(APIFunction.error_report)
  const logoutMethod = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys()
      AsyncStorage.multiRemove(keys);
      RNRestart.Restart();
    } catch (err) {
    }
  }
  const reportMainError = () => {
    if(__DEV__) return
    let fd = {
      report: JSON.stringify(`${props?.error}${props?.error?.toString()}`)
    }
    reportError(fd)
  }
  useEffect(() => {
    reportMainError()
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
          <Button
            title={'Refresh Now'}
            onPress={logoutMethod}
          />
        </Container>
      </Container>
    </Container>
  )
}

export const EmptyStateWrapper = React.memo((props:EmptyStateWrapperProps) => {
  return(
      <Container
      marginTop={props.marginTop || 8}
      style={{
        alignItems: "center",
        backgroundColor: props.backgroundColor || AppColors.white
      }}
    >
      <Container width={70} alignSelf="center" backgroundColor={props.backgroundColor}>
        <ImageWrap
          url={props.icon}
          height={props.height || 30}
          fit="contain"
        />
      </Container>
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
},(prevProps,nextProps)=>{
  return (prevProps.header_1 === nextProps.header_1) && (prevProps.header_2 === nextProps.header_2) &&
  (prevProps.sub_text === nextProps.sub_text)
})

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

export const UserPINComponent = (props : UserPINComponentProps) => {
  const ref = useRef<TextInput>(null)
    useEffect(()=>{
      if(!ref?.current?.focus) return
      ref?.current?.focus()
    },[props.action])
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
            <H1 fontSize={6} color={AppColors.black1} style={CommonStyles.marginTop_1}>{props?.auth?.user?.first_name ? Capitalize(props?.auth?.user?.first_name) : null} {props?.auth?.user?.last_name ? `${Capitalize(props?.auth?.user?.last_name?.[0])}.` : null}</H1>
            {props?.error ? <P color={AppColors.red} style={CommonStyles.marginTop_1}>{props?.error}</P> : null}
          </React.Fragment> : null
        }
        <Container marginTop={3} horizontalAlignment="center">
          <SmoothPinCodeInput password mask="﹡"
            cellSpacing={width(5)}
            codeLength={4}
            autoFocus={true}
            value={props.holder}
            onTextChange={(value : string) => {
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

interface KeyboardAwareWrapperProps {
  children : React.ReactNode
  scrollable? : boolean
  style? : ViewStyle
}

export const KeyboardAwareWrapper = ({children,scrollable,style} : KeyboardAwareWrapperProps) => {
  const ref = useRef<KeyboardAwareScrollView>(null)
  const position : CordType = useAppSelector(state=>state.Config.scrollPosition)
  const dispatch = useDispatch()
  useEffect(()=>{
      if(scrollable && ref?.current?.scrollToPosition){
        ref?.current?.scrollToPosition(0,position?.[0]?.y || 0,true)
      }
  },[position])

  useEffect(()=>{
      return () => {
          dispatch(scrollToPosition({
              [0] : {
                  y : 0,
                  x : 0
              }
          }))
      }
  },[])
  return(
      <KeyboardAwareScrollView 
        enableResetScrollToCoords={false}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ref={ref}
        style={style}
      >
        {children}
      </KeyboardAwareScrollView>
  )
}


