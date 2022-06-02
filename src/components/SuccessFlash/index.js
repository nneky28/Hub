import React from 'react';
import { Image} from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import {showMessage} from 'react-native-flash-message';
import { Images } from '../../component2/image/Image';
import { FontFamily } from '../../utills/FontFamily';


const CustomIcon = () => (<Image resizeMode="contain" source={{uri : Images.TickIcon}} style={styles.tickIcon} />);
const ErrorIcon = () => (<Image resizeMode="contain" source={{uri : Images.ErrorIcon}} style={styles.tickIcon} />);

export const showFlashMessage = (props) => {
    showMessage({
    statusBarHeight: height(2),
    message: props && props.title ? props.title  : 'Update Saved!',
    position: 'top',
    floating: true,
    renderFlashMessageIcon: () => props && props.type === "error" ? <ErrorIcon /> : <CustomIcon />,
    animated: true,
    backgroundColor: AppColors.lightGreen,
    color: AppColors.black,
    style:{height: height(10),  alignItems: 'center', width: width(92), alignSelf: 'center'},
    titleStyle: {fontSize: width(3.5), fontFamily: FontFamily.BlackSansSemiBold}

  });
}