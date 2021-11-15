import { useFocusEffect } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { height, width } from 'react-native-dimension';
//import ImagePicker from 'react-native-image-crop-picker';
import { Circle, Defs, Mask, Rect, Svg } from 'react-native-svg';
import { leftIcon, placeholder5 } from '../../assets/images';
import Button from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import { showFlashMessage } from '../../components/SuccessFlash';
import AppColors, { ColorList } from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import { Capitalize, getData, storeData, ToastError, ToastSuccess } from '../../utills/Methods';
import styles from './styles';
import {setLoaderVisible} from '../../Redux/Actions/Config';
import { useDispatch } from 'react-redux';
import { APIFunction, putAPIs, storeFile, storeFilePut } from '../../utills/api';
import { ActivityIndicator } from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { H1, Rounded } from '../../utills/components';
import { PermissionsAndroid } from 'react-native';



export default function EditPhoto({navigation}) {

  const [profilePicture, setProfilePicture] = useState(null);
  const [isSaved, setIsSaved] = useState(true);
  const [about,setAbout] = useState(null);
  const [loading,setLoading] = useState(null);
  const [file,setFile] = useState(null)
  const [fileMeta,setFileMeta] = useState(null)
  const dispatch = useDispatch();
    var cropValues;
    const SvgCircle = (props) => {
        return (
          <Svg width={width(100)} height={height(40)}>
            <Defs>
              <Mask id="mask" x="0" y="0" height={height(100)} width={width(100)}>
                <Rect height={height(100)} width={width(100)} fill={AppColors.white} />
                <Circle 
                onLayout={async event => {
                    var {x, y, width, height} = await event.nativeEvent.layout;
                    console.log(x, y, width, height);
                    cropValues = {x: x, y: y, width: width, height: height}
                }}
                r={width(25)} 
                cx="50%" cy={height(18)}
                  fill="black"
                />
              </Mask>
            </Defs>
            <Rect height="100%" width="100%" fill={isSaved? AppColors.white: "rgba(0, 0, 0, 0.7)"} mask="url(#mask)" fill-opacity="0" />
          </Svg>
        );
      }

    const imageFromGallery = () => {
      const options = {
        title: 'Select Profile PIcture',
      };
      launchImageLibrary(options, response => {
        try {
          if(response.fileSize > 2000000){
            return ToastError("Image must not be more than 2mb");
          }
          if(response.didCancel) {
            return false;
          }
          if(response.error) {
            return ToastError(response.error);
          }
          setProfilePicture(response);
        } catch (error) {
          console.log("ERR---",error)
        }
      });
    };
  
    const __imageFromCamera = () => {
      const options = {
        title: 'Select Profile PIcture',
      };
      launchCamera(options, response => {
        try {
          console.log("response--",response)
          if(response.fileSize > 2000000){
            return ToastError("Image must not be more than 2mb");
          }
          if(response.didCancel) {
            return false;
          }
          if(response.error) {
            return ToastError(response.error);
          }
          setProfilePicture(response);
        } catch (error) {
          console.log("ERR--",error)
        }
      });
    };


    const imageFromCamera = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "App Camera Permission",
            message:"App needs access to your camera",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          __imageFromCamera()
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };
    

    const getProfile = async () => {
      try{
          const profile = await getData("profile");
          setAbout(profile.about);
      }catch(err){
          console.log("member---",err)
          let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : "Something went wrong. Please retry"
          ToastError(msg)
      }
    }
    
    useEffect(() => {
        getProfile();
    }, []);

    const updateImage = async () => {
      try{
        if(!profilePicture){
          return ToastError("Please select an image to upload");
        }
        setLoading(true)
        setIsSaved(false);
        let token = await getData("token");
        let about_me = await getData("about_me")
        let user = await getData("user");
        let profile = await getData("profile")
        let biz = user.employee_user_memberships &&
        Array.isArray(user.employee_user_memberships) && user.employee_user_memberships[0]
        && user.employee_user_memberships[0].business_id ? user.employee_user_memberships[0] : null;
        dispatch(setLoaderVisible(true));
        let url = APIFunction.update_photo(biz.business_id,about_me.id)
        let fd = new FormData();
        let file = {
          uri: profilePicture.assets[0].uri,
          type: profilePicture.assets[0].type,
          name: profilePicture.assets[0].fileName,
        }
        fd.append("photo",file)
        let res = await storeFilePut(url,token,fd);
        await storeData("about_me",res);
        await storeData("profile",{...profile,about : res })
        setIsSaved(true);
        setLoading(false);
        dispatch(setLoaderVisible(false));
        showFlashMessage();
      }catch(err){
        let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : "Something went wrong. Please retry"
        console.log("err|||",err,msg)
        dispatch(setLoaderVisible(false));
        ToastError(msg)
        setLoading(false)
      }
    }
        
    return (
        <ScreenWrapper scrollEnabled={true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.screenTitle}>
                  Edit Photo
                </Text>
                {
                  loading ? (
                    <ActivityIndicator size={15} color={AppColors.green} />
                  ) : (
                    <Button 
                      title="save"
                      onPress={() => {
                          updateImage()
                        }} 
                      containerStyle={styles.saveBtnStyle} 
                      textStyle={styles.saveBtnText} 
                      />
                  )
                }
            </View>
            <View style={styles.line} />

            <View style={styles.mainViewContainer}>
                <View style={styles.imageContainer}>
                    {
                      about && about.photo && !profilePicture ? (
                        <ImageBackground
                          source={{uri : about.photo}}
                          resizeMode='contain' 
                          style={styles.imageStyle}
                          >
                              <SvgCircle />
                          </ImageBackground>
                      ) : profilePicture && profilePicture.assets && profilePicture.assets[0] ? (
                          <ImageBackground 
                            source={{uri : profilePicture.assets[0].uri}} 
                            resizeMode='contain' 
                            style={styles.imageStyle}
                          >
                              <SvgCircle />
                          </ImageBackground>
                      ) : null
                    }
                    {
                      about && !about.photo && !profilePicture ? (
                        <Rounded backgroundColor={ColorList[Math.floor(Math.random()*4)]}
                          size={25}
                        >
                          <H1>
                            {about && about.first_name && about.first_name.length > 0 ? 
                              Capitalize([...about.first_name][0]) : ""}
                            {about && about.last_name && about.last_name.length > 1 ? 
                            `${Capitalize([...about.last_name][0])}` : ""}
                          </H1>
                        </Rounded>
                      ) : null
                    }
                </View>
                
                <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_5]}>
                    <Button 
                    title="Take Photo"
                    onPress={imageFromCamera}
                    containerStyle={styles.takePhotoBtn}
                    textStyle={styles.btnText}
                    />
                    <Button 
                    title="Choose Photo"
                    onPress={imageFromGallery}
                    containerStyle={styles.choosePhotoBtn}
                    textStyle={[styles.btnText, {color: AppColors.black3}]}
                    />
                </View>
                <Button 
                title="Remove Photo"
                onPress={() => {
                  setIsSaved(false)
                  setProfilePicture(null)
                }}
                containerStyle={styles.removeBtn}
                textStyle={[styles.btnText, {color: AppColors.red}]}
                />
            </View>
        </ScreenWrapper>  
    );
}
