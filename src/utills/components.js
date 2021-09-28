import React from 'react';
import ContentLoader, {BulletList,Facebook} from 'react-content-loader/native'
import LottieView from 'lottie-react-native';
import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
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
import { View } from 'native-base';

export const PageLoader = props => {
    return(
      [...'1235678979'].map((item,i)=>(
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