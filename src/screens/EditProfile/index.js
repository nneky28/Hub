import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { cameraIcon, leftIcon } from '../../assets/images';
import ScreenWrapper from '../../components/ScreenWrapper';
import TextWithIcon from '../../components/TextWithIcon';
import CommonStyles from '../../utills/CommonStyles';
import { profileData } from '../../utills/data/profileData';
import styles from './styles';


export default function EditProfile({navigation}) {
        
    return (
        <ScreenWrapper scrollEnabled={true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.screenTitle}>
                Edit Profile
                </Text>
            </View>
            <View style={styles.line} />

            <View style={styles.mainViewContainer}>
                <View style={styles.userInfoContainer}>
                    <Image source={require('../../assets/images/dummy/placeholder.png')} style={styles.avatarStyle} /> 
                    <View style={[CommonStyles.marginTop_2, CommonStyles.marginBottom_2]}>
                        <TouchableOpacity
                        onPress={() => navigation.navigate('EditPhoto')}
                        activeOpacity={0.8}
                        style={[styles.buttonStyle]}>
                            <Image resizeMode="contain" source={cameraIcon} style={styles.cameraIcon}/>
                            <Text style={[styles.buttonText]}>Edit Photo</Text>
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={styles.subText}>Click a section below to edit</Text>
                    </View>     
                </View>
                <TextWithIcon item={profileData[0]} iconStyle={styles.rightIcon} onPressHandle={() => navigation.navigate('PersonalInfo')}/>
                <TextWithIcon item={profileData[1]} iconStyle={styles.rightIcon}/>
                <TextWithIcon item={profileData[2]} iconStyle={styles.rightIcon}/>
                <TextWithIcon item={profileData[3]} iconStyle={styles.rightIcon}/>
                <TextWithIcon item={profileData[4]} iconStyle={styles.rightIcon}/>
            </View>
        </ScreenWrapper>  
    );
}
