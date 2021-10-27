import React from 'react';
import ContentLoader, {BulletList,Facebook} from 'react-content-loader/native'
import LottieView from 'lottie-react-native';
import {Text} from  'react-native';
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
import { View ,Dimensions} from 'react-native';
import { FontFamily } from './FontFamily';
import { height, width } from 'react-native-dimension';
import { ActivityIndicator, TouchableRipple } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    console.log("size,",size,icon)
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
        flex : props.flex || 0,
        width : props.width ? width(props.width) : props.widthPercent ? props.widthPercent : '100%',
        padding : props.padding ? width(props.padding) : height(2),
        paddingVertical : props.paddingVertical ? height(props.paddingVertical) : height(0),
        paddingHorizontal : props.paddingHorizontal ? width(props.paddingHorizontal) : width(0),
        marginTop : props.marginTop ? height(props.marginTop) : 0,
        marginLeft : props.marginLeft,
        backgroundColor : props.backgroundColor || AppColors.white,
        ...props.style
      }}
    >
      {props.children}
    </View>
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
      rippleColor="transparent"
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