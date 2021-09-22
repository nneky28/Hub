import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import ImagePicker from 'react-native-image-crop-picker';
import { leftIcon, placeholder5, tickIcon } from '../../assets/images';
import Button from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import styles from './styles';
import {showMessage} from 'react-native-flash-message';


const CustomIcon = () => (<Image resizeMode="contain" source={tickIcon} style={styles.tickIcon} />);

export const showFlashMessage = () => {
    showMessage({
    statusBarHeight: height(2),
    message: 'Update Saved.',
    position: 'top',
    floating: true,
    renderFlashMessageIcon: () => <CustomIcon />,
    animated: true,
    backgroundColor: AppColors.lightGreen,
    color: AppColors.black,
    style:{height: height(10),  alignItems: 'center', width: width(92), alignSelf: 'center'},
    titleStyle: {fontSize: width(3.5), fontWeight: 'bold'}
    
  });
}