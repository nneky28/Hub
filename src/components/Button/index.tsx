import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import AppColors from '../../utills/AppColors';
import {TouchableRipple} from "react-native-paper"
import styles from './styles';
import { ButtonProps } from './types';

const Button = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  loaderColor = AppColors.white,
  containerStyle,
  textStyle,
} : ButtonProps) => {
  return (
    <TouchableRipple
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[styles.container, containerStyle]}
      tvParallaxProperties={undefined}
      hasTVPreferredFocus={undefined}

    >
      {isLoading ? (
        <ActivityIndicator color={loaderColor} size="small" />
      ) : (
        <Text style={[styles.text, textStyle]} numberOfLines={1}>{title}</Text>
      )}
    </TouchableRipple>
  );
};

export default Button;
