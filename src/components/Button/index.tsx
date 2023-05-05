import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import AppColors from '../../utills/AppColors';
import {TouchableRipple} from 'react-native-paper';
import styles from './styles';
import {ButtonProps} from './types';
import CommonStyles from '../../utills/CommonStyles';

const Button = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  loaderColor = AppColors.white,
  containerStyle,
  textStyle,
  icon,
  logo,
}: ButtonProps) => {
  return (
    <TouchableRipple
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[styles.container, containerStyle]}
      tvParallaxProperties={undefined}
      hasTVPreferredFocus={undefined}>
      {isLoading ? (
        <ActivityIndicator color={loaderColor} size="small" />
      ) : (
        <View style={CommonStyles.row}>
          {logo ? logo : null}
          <Text style={[styles.text, textStyle]} numberOfLines={1}>
            {title}
          </Text>
          {icon ? icon : null}
        </View>
      )}
    </TouchableRipple>
  );
};

export default Button;
