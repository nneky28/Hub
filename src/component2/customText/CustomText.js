/* eslint-disable react-native/no-inline-styles */

import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';

//import {observer} from 'mobx-react';

const CustomText = (props) => {
  let textSize = props.textSize;
  let textWeight = props.textWeight;
  let textcolor = props.textcolor;
  return (
    <Text
      {...props}
      style={[
        {
          color: textcolor,
          fontWeight: textWeight,
          fontSize: textSize,
          // fontFamily: 'caros',
        },
        props.textStyle,
      ]}>
      {props.displayText}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  textDislayStyle: {
    color: '#717171',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 40,
  },
});
