
import React from 'react';
import {Image, View,Text} from 'react-native';
import styles from './styles';
import AppColors from '../../../utills/AppColors';
import { BackHandler, TouchableWrapper,Container,H1,P } from  '../../../utills/components';
import { Capitalize } from '../../../utills/Methods';
import { HeaderWithBackButtonProps, HomePageHeaderProps } from './types';
import { width } from 'react-native-dimension';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../../Routes/types';
import { ActivityIndicator, IconButton } from 'react-native-paper';

export function HomePageHeader(props : HomePageHeaderProps) {
  const navigation = useNavigation<RootNavigationProps>()
  return (
    <View style={styles.header}>
        <Container width={90} alignSelf="center" direction="row" horizontalAlignment='space-between' verticalAlignment='center'>
            <Container direction="row" verticalAlignment='center' width={60}>
              <TouchableWrapper onPress={() => navigation.toggleDrawer()}>
                  <Image 
                      source={{uri : props.image}}
                      style={[styles.app_icon,props.imageStyle]}
                  />
              </TouchableWrapper>
              <Text numberOfLines={1} style={[styles.text1,props?.headerStyle]}>
                  {props.header}
              </Text>
            </Container>
            {
              props?.rightIcon ? <IconButton
                onPress={props.onPressHandler}
                rippleColor={AppColors.whiteBase}
                size={width(6)}
                color={props?.rightIconColor || AppColors.green}
                icon={props?.rightIcon} 
                style={styles.right_icon_button}
                hasTVPreferredFocus={undefined} 
                tvParallaxProperties={undefined}              
            /> : null
            }
        </Container>
    </View>
  );
}
export function HeaderWithBackButton(props : HeaderWithBackButtonProps) {
  return (
    <Container 
        paddingTop={3}
        paddingBottom={3}
        borderBottomWidth={2}
        borderColor={AppColors.grayBorder}
        verticalAlignment='center'
        backgroundColor={AppColors.white}
        style={props?.headerContainerStyle}
      >
          <Container 
            direction='row' 
            horizontalAlignment={(props?.rightText || props?.rightButtonText || props?.rightIcon) ? 'space-between' : undefined}
            verticalAlignment='center'
            width={!props.rightText && props?.rightButtonText ? 98 : 95}
          >
              <BackHandler 
                onPress={props.onPressHandler}
              />
              <View style={(props?.rightText || props?.rightButtonText || props?.rightIcon) ? undefined : styles.header_container}>
                <H1 style={props?.headerTextStyle}>{props?.headerText ? Capitalize(props?.headerText) : ""}</H1>
              </View>
              {props.rightText && !props?.rightButtonText ? <H1 numberOfLines={1}>{props.rightText}</H1> : null}
              {!props.rightText && props?.rightButtonText ? <TouchableWrapper isText onPress={props?.onSubmitHandler}
                disabled={props?.isLoading}
                width={18}
              >
                {props?.isLoading ? <ActivityIndicator color={AppColors.green} /> : <H1 color={props?.buttonTextColor || AppColors.green} numberOfLines={1}>{props.rightButtonText}</H1>}
              </TouchableWrapper> : null}
          </Container>
          {props?.bottomText ? 
            <Container width={90} alignSelf='center'>
                <P style={props.bottomTextStyle} color={AppColors.black1} fontSize={3.3}
                  lineHeight={2}
                >{props?.bottomText}</P>
            </Container>
          : null}
      </Container>
  )
}
