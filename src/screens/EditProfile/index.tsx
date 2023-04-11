import { useFocusEffect } from '@react-navigation/core';
import React, {useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../../component2/image/Image';
import ScreenWrapper from '../../components/ScreenWrapper';
import TextWithIcon from '../../components/TextWithIcon';
import CommonStyles from '../../utills/CommonStyles';
import { BackHandler, ImgPlaceholder } from '../../utills/components';
import { profileData } from '../../utills/data/profileData';
import { Capitalize, getData } from '../../utills/Methods';
import styles from './styles';


interface Props {
    navigation: any;
    about?: {
      photo?: string;
      first_name?: string;
      last_name?: string;
    };
    kins?: object;
    emergency?: object;
    banking?: object;
  }
  interface ProfileDataItem {
    key: string;
    title: string;
    iconLeft: {
      uri: string;
    };
    data: string[];
    iconRight: {
      uri: string;
    };
  }
const index:React.FC<Props> = ({ navigation}) => {
    
    const [about, setAbout] = useState(null)
    const [kins, setKins] = useState(null)
    const [ setBanking] = useState(null);
    const [emergency, setEmergency] = useState(null);


    
    const getProfile = async () => {
        try {
            // const profile = await getData("about_me") as useFetchNextKin | null;
            if (!profile || !profile) return; 
            setAbout(profile.about);
            setKins(profile.kin)
            setEmergency(profile.emergency)
        } catch (err) {
            let msg = err.msg && err.msg.detail && typeof (err.msg.detail) == "string" ? err.msg.detail : "Something went wrong. Please retry"
            ToastError(msg)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getProfile();
        }, [])
    )
  return (
    <ScreenWrapper scrollEnabled={true}>
    <View style={styles.header}>
        <BackHandler position='center' />
        <Text numberOfLines={1} style={styles.screenTitle}>
            Edit Profile
        </Text>
    </View>
    <View style={styles.line} />
    <View style={styles.mainViewContainer}>
        <View style={styles.userInfoContainer}>
            {
                about && about.photo ? (
                    <Image resizeMode="contain"
                        source={{ uri: about.photo }}
                        style={styles.avatarStyle} />
                ) : (
                    <ImgPlaceholder
                        text={`${about?.first_name?.[0] ? Capitalize(about?.first_name?.[0]) : ""}${about?.last_name?.[0] ? Capitalize(about?.last_name?.[0]) : ""}`}
                        size={20}
                    />

                )
            }

            <View style={[CommonStyles.marginTop_2, CommonStyles.marginBottom_2]}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditPhoto')}
                    activeOpacity={0.8}
                    style={[styles.buttonStyle]}>
                    <Image resizeMode="contain" source={{ uri: Images.CameraIcon }} style={styles.cameraIcon} />
                    <Text style={[styles.buttonText]}>Edit Photo</Text>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.subText}>Click a section below to edit</Text>
            </View>
        </View>
        <TextWithIcon item={profileData[0]} iconStyle={styles.rightIcon}
            onPressHandle={() => {
                if (!about) return
                navigation.navigate('PersonalInfo', { about })
            }}
        />
        <TextWithIcon item={profileData[1]} iconStyle={styles.rightIcon} />
        <TextWithIcon item={profileData[2]} iconStyle={styles.rightIcon}
            onPressHandle={() => {
                //if(!kins) return
                navigation.navigate('NextKin', { kins })
            }}
        />
        <TextWithIcon item={profileData[3]} iconStyle={styles.rightIcon}
            onPressHandle={() => {
                //if(!emergency) return
                navigation.navigate('Emergency', { emergency })
            }}
        />
        <TextWithIcon item={profileData[4]} iconStyle={styles.rightIcon}
            onPressHandle={() => {
                //if(!banking) return
                navigation.navigate('PensionInfo', { banking })
            }}
        />
    </View>
</ScreenWrapper>
  )
}

export default index