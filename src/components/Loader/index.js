import React from 'react';
import {ActivityIndicator, View,Image} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import { Images } from '../../component2/image/Image';
import AppColors from '../../utills/AppColors';
import styles from './styles'
export default function Loader() {
  const isLoaderVisible = useSelector((state) => state.Config.isLoaderVisible);
  return (
    <Modal isVisible={isLoaderVisible} backdropOpacity={0.4}>
      <View style = {styles.container}>
        {/* <ActivityIndicator size="large" color={AppColors.black} /> */}
        <Image source={{uri : Images.LogoGIF}} 
              style={styles.image}
          />
      </View>
    </Modal>
  );
}
