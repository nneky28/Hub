/* eslint-disable react-native/no-inline-styles */

import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';

export const Images = {
  TimeoffIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638359560/myedge%20mobile/waiting_pcfzma.png",
  ErrorIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638369259/myedge%20mobile/251-2514375_free-high-quality-error-youtube-icon-png-2018-removebg-preview_s184ga.png"
}


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
