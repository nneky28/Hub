import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import TextWithIcon from '../../components/TextWithIcon';
import CommonStyles from '../../utills/CommonStyles';
import {ImgPlaceholder} from '../../utills/components';
import {profileData} from '../../utills/data/profileData';
import {Capitalize} from '../../utills/Methods';
import styles from './styles';
import {RootScreenProps} from '../../Routes/types';
import {useFetchAboutMe} from '../../utills/api';
import {useFetchAboutMeProps} from '../../components/TimeoffModal/types';
import {Images} from '../../utills/Image';
import {HeaderWithBackButton} from '../../components/Headers/CustomHeader';

export default function EditProfile({navigation}: RootScreenProps) {
  // const [about, setAbout] = useState(null)
  //   const [kins, setKins] = useState(null);
  //   const [emergency, setEmergency] = useState(null);

  const {data: about} = useFetchAboutMe('main') as useFetchAboutMeProps;

  // const getProfile = async () => {
  //     try {
  //         // const profile = await getData("about_me") as useFetchNextKin | null;
  //         if (!profile || !profile) return;
  //         setAbout(profile.about);
  //         setKins(profile.kin)
  //         setEmergency(profile.emergency)
  //     } catch (err:any) {
  //         let msg = err.msg && err.msg.detail && typeof (err.msg.detail) == "string" ? err.msg.detail : "Something went wrong. Please retry"
  //         ToastError(msg)
  //     }
  // }

  // useFocusEffect(
  //     React.useCallback(() => {
  //         getProfile();
  //     }, [])
  // )
  return (
    <ScreenWrapper scrollEnabled={true}>
      <HeaderWithBackButton headerText=" Edit Profile" />
      <View style={styles.mainViewContainer}>
        <View style={styles.userInfoContainer}>
          {about && about.photo ? (
            <Image
              resizeMode="contain"
              source={{uri: about.photo}}
              style={styles.avatarStyle}
            />
          ) : (
            <ImgPlaceholder
              text={`${
                about?.first_name?.[0] ? Capitalize(about?.first_name?.[0]) : ''
              }${
                about?.last_name?.[0] ? Capitalize(about?.last_name?.[0]) : ''
              }`}
              size={20}
            />
          )}

          <View style={[CommonStyles.marginTop_2, CommonStyles.marginBottom_2]}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Profile', {screen: 'EditPhoto'})
              }
              activeOpacity={0.8}
              style={[styles.buttonStyle]}>
              <Image
                resizeMode="contain"
                source={{uri: Images.CameraIcon}}
                style={styles.cameraIcon}
              />
              <Text style={[styles.buttonText]}>Edit Photo</Text>
            </TouchableOpacity>
            <Text numberOfLines={1} style={styles.subText}>
              Click a section below to edit
            </Text>
          </View>
        </View>
        <TextWithIcon
          item={profileData[0]}
          iconStyle={styles.rightIcon}
          onPressHandle={() => {
            if (!about) return;
            navigation.navigate('PersonalInfo', {about});
          }}
        />

        <TextWithIcon item={profileData[1]} iconStyle={styles.rightIcon} />
        <TextWithIcon
          item={profileData[2]}
          iconStyle={styles.rightIcon}
          onPressHandle={() => {
            //if(!kins) return
            navigation.navigate('NextKin', {kins});
          }}
        />
        <TextWithIcon
          item={profileData[3]}
          iconStyle={styles.rightIcon}
          onPressHandle={() => {
            //if(!emergency) return
            navigation.navigate('Emergency', {emergency});
          }}
        />
        <TextWithIcon
          item={profileData[4]}
          iconStyle={styles.rightIcon}
          onPressHandle={() => {
            //if(!banking) return
            navigation.navigate('PensionInfo', {banking});
          }}
        />
      </View>
    </ScreenWrapper>
  );
}
