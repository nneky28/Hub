
import React from 'react';
import {Image, View,Text} from 'react-native';
import styles from './styles';
import AppColors from '../../../utills/AppColors';
import { BackHandler, TouchableWrapper,Container,H1,P } from  '../../../utills/components';
import { Capitalize } from '../../../utills/Methods';
import { HeaderWithBackButtonProps, HomePageHeaderProps } from './types';
import { width } from 'react-native-dimension';
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../../Routes/types';

export function HomePageHeader(props : HomePageHeaderProps) {
  const navigation = useNavigation<RootNavigationProps>()
  return (
    <View style={styles.header}>
        <View style={styles.row}>
            <TouchableWrapper onPress={() => navigation.toggleDrawer()}>
                <Image 
                    source={{uri : props.image}}
                    style={[styles.app_icon,props.imageStyle]}
                />
            </TouchableWrapper>
            <Text numberOfLines={1} style={[styles.text1,props?.headerStyle]}>
                {props.header}
            </Text>
        </View>
    </View>
  );
}
export function HeaderWithBackButton(props : HeaderWithBackButtonProps) {
  if(props.rightText || props?.bottomText) return (
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
            horizontalAlignment={props.rightText ? 'space-between' : undefined}
            verticalAlignment='center'
            width={95}
          >
              <BackHandler 
                  position='center'
                  onPress={props.onPressHandler}
                />
                <Container width={props?.rightText ? undefined : 70} horizontalAlignment='center'>
                  <H1 style={props?.headerTextStyle}>{props?.headerText ? Capitalize(props?.headerText) : ""}</H1>
                </Container>
                {props.rightText ? <H1>{props.rightText}</H1> : null}
                
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
  return (
    <Container 
        direction='row' 
        paddingTop={3}
        paddingBottom={3}
        borderBottomWidth={2}
        borderColor={AppColors.grayBorder}
        verticalAlignment='center'
        backgroundColor={AppColors.white}
        style={props?.headerContainerStyle}
      >
        <BackHandler 
          position='center'
          onPress={props.onPressHandler}
        />
        <Container width={70} horizontalAlignment='center'>
          <H1 style={props?.headerTextStyle}>{props?.headerText ? Capitalize(props?.headerText) : ""}</H1>
          {props?.subHeaderText ? <H1 fontSize={3.1} bold='100' style={props.subHeaderTextStyle}>{props?.subHeaderText}</H1> : null}
        </Container>
        {
          props?.rightIcon ? <TouchableWrapper
            onPress={() => {
                  
            }}
          >
            <Ionicons
              size={width(5)}
              color={AppColors.titlecolor}
              name={props.rightIcon}
              //style={props.iconStyle}
            />
          </TouchableWrapper> : null
        }
      </Container>
  );
}
