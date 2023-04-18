import React, { useState } from 'react';
import { ImageBackground, Platform, View } from 'react-native';
import { Rect, Svg } from 'react-native-svg';
import Button from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import { Capitalize, storeData, ToastError, ToastSuccess, useAppSelector } from '../../utills/Methods';
import styles from './styles';
import { APIFunction, useFetchAboutMe } from '../../utills/api';
import {CameraOptions, ImageLibraryOptions, ImagePickerResponse, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Container, ImgPlaceholder, ProfileLoader } from '../../utills/components';
import { PermissionsAndroid } from 'react-native';
import { useFetchAboutMeProps } from '../../components/TimeoffModal/types';
import WarningModal from '../../components/WarningModal';
import { useMutation, useQueryClient } from 'react-query';
import { ABOUT_ME } from '../../utills/payload';
import { HeaderWithBackButton } from '../../components/Headers/CustomHeader';
import { height } from 'react-native-dimension';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Actions/Auth';



export default function EditPhoto() {
  const [profilePicture, setProfilePicture] = useState<ImagePickerResponse>();
  const [show,setShow] = React.useState(false)
  const queryClient = useQueryClient()
  const auth = useAppSelector(state=>state.Auth)
  const dispatch = useDispatch()

  const {
    mutateAsync,
    isLoading : isDeleting
  } = useMutation(APIFunction.remove_photo)

  const {
    mutateAsync : completeOnboarding,
    isLoading : onboarding
  } = useMutation(APIFunction.complete_user_onboarding)

  const {
    mutateAsync : update,
    isLoading
  } = useMutation(APIFunction.update_photo)

  const {
    data : about,
    isLoading : loading
  } = useFetchAboutMe("main") as useFetchAboutMeProps

    const SvgCircle = ()=> <Svg height={height(25)} width={height(25)}>
        <Rect height="100%" width="100%" fill={AppColors.transparent} mask="url(#mask)" fill-opacity="0" />
  </Svg>


    const imageFromGallery = async () => {
      const options : ImageLibraryOptions = {
        mediaType : "photo"
      };
      launchImageLibrary(options,response=>{
        if(response.didCancel){
          return false
        }
        if(response.errorMessage){
          return ToastError(response.errorMessage)
        }
        console.log("setProfilePicture",response)
        setProfilePicture(response);
      })
    };
  
    const __imageFromCamera = () => {
      const options : CameraOptions = {
        mediaType : "photo"
      };
      launchCamera(options, response => {
        if(response.didCancel) {
          return false;
        }
        if(response.errorMessage) {
          return ToastError(response.errorMessage);
        }
        setProfilePicture(response);
      });
    };


    const imageFromCamera = async () => {
      try {
        if(Platform.OS === "ios"){
          return __imageFromCamera()
        }
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
          ToastError("Something went wrong.Please retry")
        }
      } catch (err) {
        ToastError("Something went wrong.Please retry")
      }
    };
    
    const removeImage = async () =>{
      try{
        if(!about?.id) return
        await mutateAsync(about?.id)
        setProfilePicture(undefined)
        setShow(false)
        queryClient.invalidateQueries(ABOUT_ME)
        ToastSuccess("Photo removed")
      }catch(err : any){
        ToastError(err?.msg)
      }
    }
    

    const updateImage = async () => {
      try{
        if(!profilePicture){
          return ToastError("Please select an image to upload");
        }
        if(
          !profilePicture?.assets?.[0]?.uri || 
          !profilePicture?.assets?.[0].type || 
          !profilePicture?.assets[0]?.fileName
          ) return
        let fd = new FormData();
        let file = {
          uri: profilePicture.assets[0].uri,
          type: profilePicture.assets[0].type,
          name: profilePicture.assets[0].fileName,
        }
        fd.append("photo",file)
        await update(fd)
        setProfilePicture(undefined)
        ToastSuccess("Photo has been saved")
        queryClient.invalidateQueries(ABOUT_ME)
        if(auth.route !== "main"){
          await completeOnboarding()
          await storeData("about_me",{...about,completed_user_onboarding : true});
          return dispatch(login({...auth,onboard : false, route : "main"}))
        }
      }catch(err : any){
        ToastError(err?.msg)
      }
    }

    const onDismiss = () => {
      setShow(false)
    }
        
    return (
        <ScreenWrapper>
            <HeaderWithBackButton 
              headerText="Edit Photo"
              rightButtonText="Save"
              onSubmitHandler={updateImage}
              isLoading={onboarding || isLoading}
            />

           {
             loading ? <Container flex={1} verticalAlignment="center" horizontalAlignment="center">
                    <ProfileLoader />
             </Container> :  <View style={styles.mainViewContainer}>
                    <View>
                        {
                          about && about.photo && !profilePicture ? (
                            <ImageBackground
                              source={{uri : about.photo}}
                              resizeMode='cover' 
                              style={styles.imageStyle}
                              imageStyle={styles.imageStyle}
                            >
                                  <SvgCircle />
                            </ImageBackground>
                          ) : profilePicture && profilePicture.assets && profilePicture.assets[0] ? (
                              <ImageBackground 
                                source={{uri : profilePicture.assets[0].uri}} 
                                resizeMode='cover' 
                                style={styles.imageStyle}
                                imageStyle={styles.imageStyle}
                              >
                                  <SvgCircle />
                              </ImageBackground>
                          ) : null
                        }
                        {
                          about && !about.photo && !profilePicture ? (
                            <ImgPlaceholder 
                              text={`${about?.first_name ? Capitalize(about?.first_name?.[0]) : ""}${about?.last_name ? Capitalize(about?.last_name?.[0]) : ""}`.trim()}
                              radius={50}
                              size={40}
                              fontSize={10}
                            />
                          ) : null
                        }
                    </View>
                    
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_5]}>
                        <Button 
                          title="Take Photo"
                          onPress={imageFromCamera}
                          containerStyle={styles.takePhotoBtn}
                          textStyle={styles.btnText}
                          disabled={onboarding || isLoading}
                        />
                        <Button 
                        title="Choose Photo"
                        onPress={imageFromGallery}
                        containerStyle={styles.choosePhotoBtn}
                        textStyle={[styles.btnText, {color: AppColors.black3}]}
                        disabled={onboarding || isLoading}
                        />
                    </View>
                    <Button 
                      title="Remove Photo"
                      onPress={()=>setShow(true)}
                      containerStyle={styles.removeBtn}
                      textStyle={[styles.btnText, {color: AppColors.red}]}
                    />
                </View>
           }
            {
                show ?  <WarningModal
                  isVisible={show}
                  onHide={onDismiss}
                  title={"Delete Photo?"}
                  sub_title={"Are you sure you want to delete this photo?"}
                  onPressHandler={removeImage}
                  loading={isDeleting}
                  submitBtnText={"Yes, I am sure"}
                  cancelBtnText={"No, go back"}
                  icon={'alert-circle'}
                  iconColor={AppColors.red2}
                />  : null
            }
        </ScreenWrapper>  
    );
}
