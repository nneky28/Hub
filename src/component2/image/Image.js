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
  RemoteIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638362875/myedge%20mobile/Vector_iz1psh.png",
  HomeFillIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638869622/myedge%20mobile/home-fill_h3gfhf.png",
  NotificationIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638869622/myedge%20mobile/notification_nta31q.png",
  NotificationFillIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638869622/myedge%20mobile/notification-fill_fdsfwq.png",
  HomeIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638869621/myedge%20mobile/home_slvnla.png",
  MenuFillIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638869621/myedge%20mobile/Category-fill_yvixtm.png",
  ProfileFillIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638869622/myedge%20mobile/profile-fill_hk8oat.png",
  ProfileIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638869622/myedge%20mobile/profile_rouc3z.png",
  MenuIcon : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1638869622/myedge%20mobile/category_vjknog.png",
  EmptyTimeoff : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1639046163/myedge%20mobile/TimeOff-LOW_abcaru.png",
  EmptyDoc : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1639046163/myedge%20mobile/DocGen-LOW_edreng.png",
  EmptyPayslip : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1639046163/myedge%20mobile/Payslips-LOW_l9nyy6.png",
  EmptyTraining : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1639046163/myedge%20mobile/Training-LOW_mknwjt.png",
  EmptyBenefits : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1639046163/myedge%20mobile/Benefits-LOW_tftbof.png",
  EmptyTeams : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1639147364/myedge%20mobile/Teams-LOW_e3f0fr.png",
  EmptyCelebration : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1639147364/myedge%20mobile/Celebration-LOW_oikr4z.png",
  EmptyNotification : "https://res.cloudinary.com/dgny8sjrg/image/upload/v1639147364/myedge%20mobile/Notification-LOW_vlg8os.png"
  



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
