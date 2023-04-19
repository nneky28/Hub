import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  LayoutChangeEvent,
  Platform,
  Image,
  View,
} from 'react-native';
import {height, width} from 'react-native-dimension';
import Button from '../../components/Button';
import {showFlashMessage} from '../../components/SuccessFlash';
import AppColors, {ColorList} from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import {
  Capitalize,
  ToastError,
  ToastSuccess,
  useAppSelector,
} from '../../utills/Methods';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {APIFunction, useFetchAboutMe} from '../../utills/api';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
  PickerOptions,
  Response,
} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import WarningModal from '../../components/WarningModal/index';
import ScreenWrapper from '../../components/ScreenWrapper/index';
import {useFetchAboutMeProps} from '../../components/TimeoffModal/types';
import {ImgPlaceholder} from '../../utills/components';
import {HeaderWithBackButton} from '../../components/Headers/CustomHeader';
import {CropValues} from './types';
import {Images} from '../../utills/Image';
import {useMutation} from 'react-query';
import {login} from '../../Redux/Actions/Auth';

export default function EditPhoto() {
  const auth = useAppSelector((state) => state.Auth);
  const [profilePicture, setProfilePicture] = useState<null>(null);
  const [isSaved, setIsSaved] = useState(true);
  const [file, setFile] = useState(null);
  const [fileMeta, setFileMeta] = useState(null);
  const [show, setShow] = React.useState(false);
  const [text] = useState('');
  const dispatch = useDispatch();
  const [processing, setProcess] = React.useState(false);

  const {data: about} = useFetchAboutMe('main') as useFetchAboutMeProps;

  const {mutateAsync: deletePhoto} = useMutation(APIFunction.remove_photo);
  const {mutateAsync: updatePhoto, isLoading: loading} = useMutation(
    APIFunction.update_photo,
  );
  const {mutateAsync: mutateOnboard} = useMutation(APIFunction.onboarded);

  const ImgCircle = () => {
    const [cropValues, setCropValues] = useState<CropValues>({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });

    const handleLayout = (event: LayoutChangeEvent) => {
      const {x, y, width, height} = event.nativeEvent.layout;
      setCropValues({x: x, y: y, width: width, height: height});
    };

    return (
      <View style={styles.avatarStyle}>
        {cropValues.width && cropValues.height ? (
          <Image
            source={{uri: Images.AddIcon}}
            resizeMode="cover"
            onLayout={handleLayout}
            blurRadius={20}
          />
        ) : (
          <ImgPlaceholder />
        )}
        <Image
          style={[styles.mask, cropValues]}
          // source={require('your-image-path-here')}
          source={{uri: Images.AddIcon}}
          resizeMode="contain"
        />
      </View>
    );
  };

  const imageFromGallery = async () => {
    try {
      const options = {
        title: 'Select Profile Picture',
        mediaType: 'photo',
      };
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          return false;
        }
        if (response.error) {
          ToastError('Something went wrong. Please retry');
        }
        setProfilePicture(response);
      });
    } catch (err) {
      ToastError('Something went wrong. Please retry');
    }
  };

  const __imageFromCamera = () => {
    const options: PickerOptions = {
      title: 'Select Profile Picture',
    };
    launchCamera(options, (response) => {
      try {
        if (response.didCancel || !response.assets?.length) {
          return false;
        }
        setProfilePicture(response.assets[0]);
      } catch (error) {
        console.error(error);
      }
    });
  };

  const imageFromCamera = async () => {
    try {
      if (Platform.OS === 'ios') {
        return __imageFromCamera();
      }
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        __imageFromCamera();
      } else {
        ToastError('Something went wrong.Please retry');
      }
    } catch (err) {
      console.log('Err', err);
      ToastError('Something went wrong.Please retry');
    }
  };

  const removeImage = async () => {
    try {
      setProcess(true);
      if (!about?.id) return;
      await deletePhoto(about.id);
      setProfilePicture(null);
      setProcess(false);
      setShow(false);
      showFlashMessage({title: 'Photo removed'});
    } catch (err: any) {
      ToastError(err.msg);
    }
  };

  const updateImage = async () => {
    try {
      if (!profilePicture && about?.photo && auth?.route !== 'main') {
        return dispatch(login({...auth, onboard: false, route: 'main'}));
      }
      if (!profilePicture) {
        return ToastError('Please select an image to upload');
      }
      setIsSaved(false);
      if (!about?.id) return;
      await updatePhoto(about.id);
      let fd = new FormData();
      let file = {
        uri: profilePicture.assets[0].uri,
        type: profilePicture.assets[0].type,
        name: profilePicture.assets[0].fileName,
      };
      fd.append('photo', file);

      if (auth.route !== 'main') {
        await mutateOnboard(about?.id);
        setIsSaved(true);
        return dispatch(login({...auth, onboard: false, route: 'main'}));
      }
      setIsSaved(true);
      ToastSuccess('Profile image has been saved');
    } catch (err: any) {
      ToastError(err?.msg);
    }
  };
  return (
    <ScreenWrapper scrollEnabled={true}>
      <HeaderWithBackButton
        headerText="Edit Photo"
        rightButtonText="Save"
        onSubmitHandler={updateImage}
        isLoading={loading}
      />
      <View style={styles.mainViewContainer}>
        <View style={styles.imageContainer}>
          {about && about.photo && !profilePicture ? (
            <ImageBackground
              source={{uri: about?.photo}}
              resizeMode="contain"
              style={styles.imageStyle}>
              <ImgCircle />
            </ImageBackground>
          ) : profilePicture &&
            profilePicture?.assets &&
            profilePicture?.assets[0] ? (
            <ImageBackground
              source={{uri: profilePicture?.assets[0].uri}}
              resizeMode="contain"
              style={styles.imageStyle}>
              <ImgCircle />
            </ImageBackground>
          ) : null}
          {about && !about.photo && !profilePicture ? (
            <ImgPlaceholder
              size={20}
              text={`${
                about?.first_name?.[0] ? Capitalize(about?.first_name?.[0]) : ''
              }${
                about?.last_name?.[0] ? Capitalize(about?.last_name?.[0]) : ''
              }`}
              fontSize={5}
            />
          ) : null}
        </View>

        <View
          style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_5]}>
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
            textStyle={styles.btnTextBlack}
          />
        </View>
        <Button
          title="Remove Photo"
          onPress={() => setShow(true)}
          containerStyle={styles.removeBtn}
          textStyle={styles.btnTextRed}
        />
      </View>

      <WarningModal
        isVisible={show}
        onHide={() => {
          setShow(false);
        }}
        title={'Remove Photo'}
        sub_title={text}
        onPressHandler={removeImage}
        loading={processing}
        submitBtnText={'Yes, I am sure'}
        cancelBtnText={'No, go back'}
        icon={'alert-circle'}
        iconColor={AppColors.red2}
      />
    </ScreenWrapper>
  );
}
