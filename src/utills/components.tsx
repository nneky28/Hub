import React, {useEffect, useRef, useState} from 'react';
import ContentLoader from 'react-content-loader/native';
import {ImageBackground, Text, ViewStyle} from 'react-native';
import {Rect} from 'react-native-svg';
import AppColors from './AppColors';
import {View} from 'react-native';
import {height, width} from 'react-native-dimension';
import {TouchableRipple, IconButton} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppSelector} from './Methods';
import {scrollToPosition} from '../Redux/Actions/Config';
import {
  BackHandlerProps,
  ContainerProps,
  CordType,
  HTagProps,
  PTagProps,
  SizedBoxProps,
} from './types';
import {FontFamily} from './FontFamily';
import {ICON_BUTTON_SIZE} from './Constants';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {
  EmptyStateWrapperProps,
  TouchableWrapperProps,
  ImageWrapProps,
} from './types';

export const PageLoader = (props = {}) => {
  return [...'123567'].map((item) => (
    <ContentLoader
      key={item}
      viewBox="0 0 778 116"
      width={350}
      height={100}
      {...props}
      backgroundColor={AppColors.gray1}>
      <Rect x="37" y="34" rx="0" ry="0" width="0" height="0" />
      <Rect x="28" y="29" rx="0" ry="0" width="258" height="32" />
      <Rect x="28" y="71" rx="0" ry="0" width="465" height="32" />
      <Rect x="434" y="94" rx="0" ry="0" width="0" height="0" />
      <Rect x="29" y="116" rx="0" ry="0" width="749" height="32" />
    </ContentLoader>
  ));
};

export const SizedBox = ({...props}: SizedBoxProps) => (
  <View
    style={{
      height: height(props.size || 1),
      backgroundColor: props.backgroundColor || AppColors.white,
      width: props?.width ? width(props.width) : 0,
    }}
  />
);

export const useDebounce = (value: any, delay: any) => {
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
    [value, delay], // Only re-call effect if value or delay changes
  );
  return debouncedValue;
};

export const ImageWrap = (props: ImageWrapProps) => (
  <ImageBackground
    source={props.source || {uri: props.url}}
    resizeMode={props.fit}
    style={{
      overflow: 'hidden',
      //...Elevation(props.elevation),
      position: props.position,
      width: props.width ? width(props?.width) : '100%',
      height: props.height ? height(props?.height) : height(3),
      backgroundColor: props?.backgroundColor,
      borderRadius: props.borderRadius,
      borderTopLeftRadius: props.borderTopLeftRadius,
      borderBottomLeftRadius: props.borderBottomLeftRadius,
      margin: props?.margin || 0,
      marginVertical: props?.marginVertical || 0,
      marginHorizontal: props?.marginHorizontal || 0,
      marginRight: props?.marginRight || 0,
      marginLeft: props?.marginLeft || 0,
      marginTop: props?.marginTop || 0,
      marginBottom: props?.marginBottom || 0,
      padding: props.padding,
    }}>
    {props.children}
  </ImageBackground>
);

export const P = (props: PTagProps) => (
  <Text
    style={[
      {
        fontSize: props.fontSize ? width(props.fontSize) : width(3.5),
        fontFamily: FontFamily.MontserratRegular,
        textAlign: props.textAlign,
        lineHeight: props.lineHeight ? height(props.lineHeight) : undefined,
        color: props.color || AppColors.black,
        textDecorationLine: props.underline || 'none',
        textDecorationColor: props.lineColor,
        textDecorationStyle: 'solid',
        marginTop: props.marginTop ? height(props.marginTop) : undefined,
        marginLeft: props.marginLeft ? width(props.marginLeft) : undefined,
        marginBottom: props.marginBottom
          ? height(props.marginBottom)
          : undefined,
        marginRight: props.marginRight ? height(props.marginRight) : undefined,
      },
      props.style,
    ]}
    numberOfLines={props?.numberOfLines}>
    {props.children}
  </Text>
);

export const H1 = (props: HTagProps) => (
  <Text
    style={[
      {
        fontSize: props?.fontSize ? width(props.fontSize) : width(4),
        fontFamily: FontFamily.MontserratBold,
        color: props.color || AppColors.black,
        textAlign: props.textAlign,
        textDecorationLine: props.underline || 'none',
        textDecorationColor: props.lineColor,
        textDecorationStyle: 'solid',
        lineHeight: props.lineHeight ? height(props.lineHeight) : undefined,
        marginTop: props.marginTop ? height(props.marginTop) : undefined,
        marginBottom: props.marginBottom
          ? height(props.marginBottom)
          : undefined,
        marginRight: props.marginRight ? width(props.marginRight) : undefined,
        marginLeft: props.marginLeft ? width(props.marginLeft) : undefined,
      },
      props.style,
    ]}
    numberOfLines={props?.numberOfLines}>
    {props.children}
  </Text>
);

export const Container = (props: ContainerProps) => (
  <View
    style={[
      {
        position: props.position,
        borderColor: props.borderColor
          ? props.borderColor
          : AppColors.grayBorder,
        flex: props.flex,
        flexDirection: props.direction,
        width: props.width
          ? width(props.width)
          : props.widthPercent
          ? props.widthPercent
          : '100%',
        padding: props.padding ? width(props.padding) : undefined,
        height: props?.height,
        justifyContent:
          props.direction === 'row'
            ? props.horizontalAlignment
            : props.verticalAlignment,
        alignItems:
          props.direction === 'row'
            ? props.verticalAlignment
            : props.horizontalAlignment,
        paddingHorizontal: props.paddingHorizontal
          ? width(props.paddingHorizontal)
          : width(0),
        marginTop: props.marginTop ? height(props.marginTop) : 0,
        marginBottom: props.marginBottom ? height(props.marginBottom) : 0,
        marginLeft: props.marginLeft ? width(props.marginLeft) : 0,
        paddingTop: props.paddingTop ? height(props.paddingTop) : 0,
        paddingBottom: props.paddingBottom
          ? height(props.paddingBottom)
          : undefined,
        paddingVertical: props.paddingVertical
          ? height(props.paddingVertical)
          : undefined,
        paddingRight: props.paddingRight ? width(props.paddingRight) : 0,
        paddingLeft: props.paddingLeft ? width(props.paddingLeft) : 0,
        marginRight: props.marginRight ? width(props.marginRight) : 0,
        backgroundColor: props.backgroundColor || AppColors.transparent,
        borderWidth: props.borderWidth,
        borderTopWidth: props.borderTopWidth,
        borderBottomWidth: props.borderBottomWidth,
        borderRadius: props.borderRadius,
        borderTopRightRadius: props.borderTopRightRadius,
        borderTopLeftRadius: props.borderTopLeftRadius,
        alignSelf: props.alignSelf,
        //...props.style
      },
      props.style,
    ]}>
    {props.children}
  </View>
);

export const EmptyStateWrapper = (props: EmptyStateWrapperProps) => (
  <Container
    marginTop={props.marginTop || 8}
    style={{
      alignItems: 'center',
      backgroundColor: props.backgroundColor || AppColors.white,
    }}>
    <Container
      width={70}
      alignSelf="center"
      backgroundColor={props.backgroundColor}>
      <ImageWrap url={props.icon} height={props.height || 30} fit="contain" />
    </Container>
    <SizedBox height={props?.spacing || 2} />
    {props.header_1 ? (
      <H1 color={AppColors.black3} fontSize={5}>
        {props.header_1}
      </H1>
    ) : null}
    <SizedBox height={props?.spacing || 2} />
    {props.header_2 ? (
      <React.Fragment>
        <H1 color={AppColors.black3} fontSize={5}>
          {props.header_2}
        </H1>
        <SizedBox height={props?.spacing || 2} />
      </React.Fragment>
    ) : null}
    {props.sub_text ? <P color={AppColors.black2}>{props.sub_text}</P> : null}
  </Container>
);

export const BackHandler = ({onPress, style}: BackHandlerProps) => {
  const navigation = useNavigation();
  return (
    <IconButton
      size={width(ICON_BUTTON_SIZE)}
      onPress={() => {
        if (onPress) return onPress();
        if (!navigation.canGoBack()) return;
        navigation.goBack();
      }}
      style={[styles.back_button, style]}
      icon={'keyboard-backspace'}
      hasTVPreferredFocus={undefined}
      tvParallaxProperties={undefined}
      rippleColor={AppColors.whiteBase}
    />
  );
};

export const TouchableWrapper = (props: TouchableWrapperProps) => (
  <TouchableRipple
    onPress={props.onPress}
    rippleColor={AppColors.whiteBase}
    style={[
      props?.isText
        ? {
            height: props?.height ? height(props?.height) : height(5),
            width: props?.width ? width(props?.width) : width(25),
            justifyContent: 'center',
            alignItems: 'center',
          }
        : props?.size
        ? {
            borderRadius: 50,
            height: height(props.size),
            width: height(props.size),
            justifyContent: 'center',
            alignItems: 'center',
          }
        : {},
      props.style,
    ]}
    disabled={props?.disabled}
    onLayout={props?.onLayout}
    hasTVPreferredFocus={false}
    tvParallaxProperties={false}>
    {props.children}
  </TouchableRipple>
);

interface KeyboardAwareWrapperProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
}

export const KeyboardAwareWrapper = ({
  children,
  scrollable,
  style,
}: KeyboardAwareWrapperProps) => {
  const ref = useRef<KeyboardAwareScrollView>(null);
  const position: CordType = useAppSelector(
    (state) => state.Config.scrollPosition,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (scrollable && ref?.current?.scrollToPosition) {
      ref?.current?.scrollToPosition(0, position?.[0]?.y || 0, true);
    }
  }, [position]);

  useEffect(() => {
    return () => {
      dispatch(
        scrollToPosition({
          [0]: {
            y: 0,
            x: 0,
          },
        }),
      );
    };
  }, []);
  return (
    <KeyboardAwareScrollView
      enableResetScrollToCoords={false}
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      ref={ref}
      style={style}>
      {children}
    </KeyboardAwareScrollView>
  );
};
