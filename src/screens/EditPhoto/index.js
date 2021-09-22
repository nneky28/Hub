import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import ImagePicker from 'react-native-image-crop-picker';
import { Circle, Defs, Mask, Rect, Svg } from 'react-native-svg';
import { leftIcon, placeholder5 } from '../../assets/images';
import Button from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import { showFlashMessage } from '../../components/SuccessFlash';
import AppColors from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import styles from './styles';




export default function EditPhoto({navigation}) {

    const [profilePicture, setProfilePicture] = useState(placeholder5);
    const [isSaved, setIsSaved] = useState(true);

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

    const imageFromCamera = () => {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          compressImageQuality: 0.7,
          cropping: true,
          cropperCircleOverlay: true
        }).then((response) => {
            setProfilePicture({ uri: response.path, name: response.filename ?? "profile" + Math.random(1000)+'.'+response.mime.split('/')[1], type: response.mime });
            setIsSaved(false);
        });
        
    };
    
    const imageFromGallery = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          mediaType: 'photo',
          compressImageQuality: 0.7,
          cropping: true,
          cropperCircleOverlay: true
        }).then((response) => {
            setProfilePicture({ uri: response.path, name: response.filename ?? "profile" + Math.random(1000)+'.'+response.mime.split('/')[1], type: response.mime });
            setIsSaved(false);
        });
    };

    // const cropImage = (image) => {
    //     let imageHeight = resolveAssetSource(image).height;
    //     let imageWidth = resolveAssetSource(image).width;
    //     console.log(imageHeight)
    //     console.log(imageWidth)

        // let cropX = imageWidth - width(25);
        // let cropY = imageHeight - width(25); 

        // const cropRegion = { x: cropValues.x, y: cropValues.y, height: cropValues.height, width: cropValues.width };
        // const targetSize = { size: cropValues.width, height: cropValues.height, width: cropValues.width };
        
        // const cropRegion = { x: 0, y: imageHeight*0.1, height: cropValues.height, width: cropValues.width };
        // const targetSize = { size: cropValues.width, height: cropValues.height, width: cropValues.width };

        // PhotoManipulator.crop(image, cropRegion, targetSize).then(path => {
        //     console.log(`Result image path: ${path}`);
        //     setProfilePicture({uri: path})
        // })
        // .catch(e => console.error(e));
    // }

    useEffect(() => {
        //cleanup code
        return ImagePicker.clean().then(() => {
            console.log('removed all tmp images from tmp directory');
          }).catch(e => {
            alert(e);
          });
    }, []);

    
        
    return (
        <ScreenWrapper scrollEnabled={true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.screenTitle}>
                Edit Photo
                </Text>
                <Button 
                title="save"
                onPress={() => {
                    setIsSaved(true);
                    showFlashMessage()
                    }} 
                containerStyle={styles.saveBtnStyle} 
                textStyle={styles.saveBtnText} 
                />
            </View>
            <View style={styles.line} />

            <View style={styles.mainViewContainer}>
                <View style={styles.imageContainer}>
                    <ImageBackground 
                    source={profilePicture} 
                    resizeMode='contain' 
                    style={styles.imageStyle}
                    >
                        <SvgCircle />
                    </ImageBackground>
                </View>
                
                <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_5]}>
                    <Button 
                    title="Take Photo"
                    onPress={imageFromCamera}
                    // onPress={() => setProfilePicture(placeholder5)}
                    containerStyle={styles.takePhotoBtn}
                    textStyle={styles.btnText}
                    />
                    <Button 
                    title="Choose Photo"
                    onPress={imageFromGallery}
                    // onPress={() => cropImage(profilePicture)}
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
                // onPress={() => setProfilePicture(placeholder5)}
                containerStyle={styles.removeBtn}
                textStyle={[styles.btnText, {color: AppColors.red}]}
                />
            </View>
        </ScreenWrapper>  
    );
}
