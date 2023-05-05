import { View, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import {
  TouchableWrapper,
  P,
  SizedBox,
  Container,
  H1
} from '../../utills/components';
import styles from './styles';
import { item1 } from '../../assets/images';
import AppColors from '../../utills/AppColors';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { storeData, useAppSelector } from '../../utills/Methods';
import { useDispatch } from 'react-redux';
import { setItemVisible } from '../../Redux/Actions/Config';


const index = ({ item, onPressHandler }) => {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(item.favourite);
  const data = useAppSelector((state) => state.Config.isItemVisible);
  const dispatch = useDispatch();


  const handleLike = () => {
    const checked = data.map((val) => {
      if (val.id === item.id) {
        return { ...val, favourite: !item.favourite }
      }
      return val
    })
    dispatch(setItemVisible(checked))
  };

  return (
    <Container width={45} >
      <TouchableWrapper style={styles.container} onPress={onPressHandler}>
        <>
          <View>
            <ImageBackground
              resizeMode="contain"
              source={item?.img}
              style={styles.img}>
              <TouchableWrapper
                onPress={() => handleLike()}

                style={[styles.heart]}>
                <Ionicons name={item.favourite ? "heart" : "heart-outline"} size={18} style={[styles.icon]} color={item.favourite ? 'red' : AppColors.black1} />
              </TouchableWrapper>
            </ImageBackground>
          </View>

        </>
      </TouchableWrapper>
      <SizedBox height={2} />
      <P color={AppColors.black} fontSize={3.5}>
        {item?.title}
      </P>
      <P color={AppColors.black1} fontSize={3} marginTop={1}>${item?.price} -52%</P>
    </Container>
  );
};

export default index;
