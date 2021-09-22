/* eslint-disable react-native/no-inline-styles */

import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import UserAvatar from 'react-native-user-avatar';

import {observer} from 'mobx-react';
import {ReturnFirstChar} from '../../dependency/UtilityFunctions';

const CustomAvatar = ({name}) => {
  // let textSize = props.textSize;
  // let textWeight = props.textWeight;
  // let textcolor = props.textcolor;
  let UpcaseName = ReturnFirstChar(name);

  return (
    <UserAvatar
      size={40}
      name={UpcaseName}
      bgColors={['#FFE7E7', '#99E6FF', '#C2D4FF', '#FCE2AF']}
      textColor={'#545454'}
    />
  );
};

export default CustomAvatar;
