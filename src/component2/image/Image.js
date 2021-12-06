/* eslint-disable react-native/no-inline-styles */

import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';

export const Images = {
  TimeoffIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638359560/myedge%20mobile/waiting_pcfzma.png",
  ErrorIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638369259/myedge%20mobile/251-2514375_free-high-quality-error-youtube-icon-png-2018-removebg-preview_s184ga.png",
  LeaveIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638362875/myedge%20mobile/Vector_1_qunykd.png",
  CakeIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638365299/myedge%20mobile/Vector_3_bt64pb.png",
  RadioIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638794942/myedge%20mobile/Group_8672_1_ilsj1d.png",
  PayslipIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638795031/myedge%20mobile/Group_8662_1_pguyok.png",
  DocumentIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638794806/myedge%20mobile/Group_1448_1_gdltlg.png",
  BenefitIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638794994/myedge%20mobile/Group_8673_1_u4gpam.png",
  TrainingIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638795073/myedge%20mobile/Group_8657_1_ejagj8.png",
  PeopleIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638794654/myedge%20mobile/three-men_qeesrb.png",
  AnnivIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638793722/myedge%20mobile/Vector_4_u137ta.png",
  RemoteIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638362875/myedge%20mobile/Vector_iz1psh.png"
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
