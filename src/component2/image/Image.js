/* eslint-disable react-native/no-inline-styles */

import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';

const GenImage = (props) => {
  return (
    <Image
      source={{uri: props.ImageUri}}
      style={props.imageStyle || styles.GenImageStyle}
    />
  );
};

export default GenImage;

const styles = StyleSheet.create({
  GenImageStyle: {
    width: 134,
    height: 134,
  },
});
