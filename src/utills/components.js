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
import { View ,Dimensions} from 'react-native';
import { FontFamily } from './FontFamily';
import { height, width } from 'react-native-dimension';
import { ActivityIndicator, Modal, TouchableRipple } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

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
            {/* <TouchWrap
              onPress={()=>props.setShow(false)}
            >
                <H1>Done</H1>
            </TouchWrap> */}
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
      <Modal visible={props.show}>
        <DatePicker 
              date={date || new Date()} 
            // onDateChange={(newDate) => {
            //   setDate(newDate);
            //   props.onChangeData ? props.onChangeData(moment(newDate).format("YYYY-MM-DD")) : null
            //   //onChange(newDate.toDateString())
            // }} 
            mode="date" 
            maximumDate={props.maximumDate === null ? props.maximumDate : new Date()}
          /> 
      </Modal>
  )
}



// <Calendar
//             // Initially visible month. Default = Date()
//             current={'2012-03-01'}
//             // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
//             minDate={'2012-05-10'}
//             // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
//             maxDate={'2012-05-30'}
//             // Handler which gets executed on day press. Default = undefined
//             onDayPress={(day) => {console.log('selected day', day)}}
//             // Handler which gets executed on day long press. Default = undefined
//             onDayLongPress={(day) => {console.log('selected day', day)}}
//             // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
//             monthFormat={'yyyy MM'}
//             // Handler which gets executed when visible month changes in calendar. Default = undefined
//             onMonthChange={(month) => {console.log('month changed', month)}}
//             // Hide month navigation arrows. Default = false
//             hideArrows={true}
//             // Replace default arrows with custom ones (direction can be 'left' or 'right')
//             renderArrow={(direction) => (<Arrow/>)}
//             // Do not show days of other months in month page. Default = false
//             hideExtraDays={true}
//             // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
//             // day from another month that is visible in calendar page. Default = false
//             disableMonthChange={false}
//             // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
//             firstDay={1}
//             // Hide day names. Default = false
//             hideDayNames={true}
//             // Show week numbers to the left. Default = false
//             showWeekNumbers={true}
//             // Handler which gets executed when press arrow icon left. It receive a callback can go back month
//             onPressArrowLeft={subtractMonth => subtractMonth()}
//             // Handler which gets executed when press arrow icon right. It receive a callback can go next month
//             onPressArrowRight={addMonth => addMonth()}
//             // Disable left arrow. Default = false
//             disableArrowLeft={false}
//             // Disable right arrow. Default = false
//             disableArrowRight={false}
//             // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
//             disableAllTouchEventsForDisabledDays={true}
//             // Replace default month and year title with custom one. the function receive a date as parameter
//             //renderHeader={(date) => {/*Return JSX}}
//             // Enable the option to swipe between months. Default = false
//             enableSwipeMonths={true}
//           />