import React from 'react';
import {Image, View, Text} from 'react-native';
import styles from './styles';
import AppColors from '../../../utills/AppColors';
import {
  BackHandler,
  TouchableWrapper,
  Container,
  H1,
  P,
} from '../../../utills/components';
import {Capitalize} from '../../../utills/Methods';
import {HeaderWithBackButtonProps, HomePageHeaderProps} from './types';
import {width} from 'react-native-dimension';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../../Routes/types';
import {IconButton} from 'react-native-paper';

export function HomePageHeader(props: HomePageHeaderProps) {
  const navigation = useNavigation<RootNavigationProps>();
  return (
    <View style={styles.header}>
      <Container
        width={90}
        alignSelf="center"
        direction="row"
        horizontalAlignment="space-between"
        verticalAlignment="center">
        <Container direction="row" verticalAlignment="center" width={60}>
          <TouchableWrapper onPress={() => navigation.toggleDrawer()}>
            <Image
              source={{uri: props.image}}
              style={[styles.app_icon, props.imageStyle]}
            />
          </TouchableWrapper>
          <Text numberOfLines={1} style={[styles.text1, props?.headerStyle]}>
            {props.header}
          </Text>
        </Container>
        {props?.rightIcon ? (
          <IconButton
            onPress={props.onPressHandler}
            rippleColor={AppColors.whiteBase}
            size={width(6)}
            color={props?.rightIconColor || AppColors.black}
            icon={props?.rightIcon}
            style={styles.right_icon_button}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}
          />
        ) : null}
      </Container>
    </View>
  );
}
export function HeaderWithBackButton(props: HeaderWithBackButtonProps) {
  return (
    <Container
      verticalAlignment="center"
      backgroundColor={AppColors.white}
      style={props?.headerContainerStyle}
      paddingHorizontal={5}>
      <Container
        direction="row"
        verticalAlignment="center"
        horizontalAlignment="space-between"
        width={!props.rightIcon && props?.rightIcon ? 98 : 95}>
        {props?.backHandler ? (
          <BackHandler onPress={props.onPressHandler} />
        ) : null}
        <View>
          <H1 style={props?.headerTextStyle}>
            {props?.headerText ? Capitalize(props?.headerText) : ''}
          </H1>
        </View>

        {props?.rightIcon ? (
          <IconButton
            onPress={props.onPressHandler}
            rippleColor={AppColors.whiteBase}
            size={width(6)}
            color={props?.rightIconColor || AppColors.black}
            icon={props?.rightIcon}
            style={styles.right_icon_button}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}
          />
        ) : null}
      </Container>

      {props?.bottomText ? (
        <Container width={90} alignSelf="center">
          <P
            style={props.bottomTextStyle}
            color={AppColors.black1}
            fontSize={3.3}
            lineHeight={2}>
            {props?.bottomText}
          </P>
        </Container>
      ) : null}
    </Container>
  );
}
