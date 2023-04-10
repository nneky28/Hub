import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import { showMessage } from 'react-native-flash-message';
import { Images } from '../../utills/Image';
import { FontFamily } from '../../utills/FontFamily';
import { H1, TouchableWrapper } from '../../utills/components';

const CustomIcon = () => (<Image resizeMode="contain" source={{ uri: Images.TickIcon }} style={styles.tickIcon} />);
const ErrorIcon = () => (<Image resizeMode="contain" source={{ uri: Images.ErrorIcon }} style={styles.tickIcon} />);
const TaskIcon = () => (<Image resizeMode="contain" source={{ uri: Images.TaskTickIcon }} style={styles.tickIcon} />);



export const showFlashMessage = (props) => {
  const CustomView = ({ message, onPress }) => (
    <View style={styles.actionBtn}>
      <TouchableWrapper onPress={onPress}>
        <H1 style={{ alignSelf: 'center' }} color={"#E1844C"}>Undo</H1>
      </TouchableWrapper>
    </View>
  );

  showMessage({
    statusBarHeight: props.statusBarHeight ? height(props.statusBarHeight) : height(2),
    message: props && props.title ? props.title : 'Update Saved!',
    position: 'top',
    floating: true,
    renderFlashMessageIcon: () => props && props.type === "task" ? <TaskIcon /> : props.type === "error" ? <ErrorIcon /> : <CustomIcon />,
    renderCustomContent: () => props && props.actionType === "task" && (
      <CustomView
        onPress={props.action}
      />
    ),
    animated: true,
    backgroundColor: props.backgroundColor ? props.backgroundColor : AppColors.lightGreen,
    color: AppColors.black,
    style: { height: height(8), alignItems: 'center', width: width(94), alignSelf: 'center', },
    titleStyle: { fontSize: width(3.5), fontFamily: FontFamily.BlackSansSemiBold, width: width(60), justifyContent: 'center', flexDirection: 'row', },
    duration: props.duration ? props.duration : 1850,

  });
}
