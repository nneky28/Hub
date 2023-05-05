import { View, ImageBackground, Text, Image } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { SizedBox, TouchableWrapper, P, H1 } from '../../utills/components';
import styles from './styles';
import { cartIcon, item1, starIcon } from '../../assets/images';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderWithBackButton } from '../../components/Headers/CustomHeader';
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button';
import CommonStyles from '../../utills/CommonStyles';
import { ToastSuccess, storeData, useAppSelector } from '../../utills/Methods';
import { useDispatch } from 'react-redux';
import { setCartItems, setItemVisible } from '../../Redux/Actions/Config';

const index = ({ navigation, route }) => {
  const [data, cartItems] = useAppSelector((state) => [state.Config.isItemVisible, state.Config.cartItems]);

  const {
    id
  } = route?.params

  const item = data.find((item) => item.id === id)
  const [menu, setMenu] = useState('');
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
  const [isLiked, setIsLiked] = useState(item.favourite);
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

  const setButtons = (i, size) => {
    setCurrentTabIndex(i);
    const newSize = data.map((val) => {
      if (val.id === item.id) {
        return { ...val, size }
      }
      return val
    })
    dispatch(setItemVisible(newSize))
  };

  return (
    <ScreenWrapper>
      <HeaderWithBackButton
        headerText="Details"
        backHandler
        rightIcon={'bell-outline'}
        onPressHandler={() => navigation.goBack()}
        headerTextStyle={styles.header}
      />
      <View style={styles.bgCont}>
        <View>
          <ImageBackground resizeMode="cover" source={item?.img} style={styles.img}>
            <TouchableWrapper
              onPress={() => handleLike()}
              style={[styles.heart]}>
              <Ionicons name={item.favourite ? "heart" : "heart-outline"} size={18} style={[styles.icon]} color={item.favourite ? 'red' : AppColors.black1} />
            </TouchableWrapper>
          </ImageBackground>
        </View>

        <SizedBox height={2} />
        <Text style={styles.title}>{item?.title}</Text>
        <View style={styles.row}>
          <Image source={starIcon} style={styles.star} />
          <P fontSize={4.3}>4.5/5 {''}</P>
          <P fontSize={4.3} color={AppColors.black1}>
            (45 reviews)
          </P>
        </View>
        <View style={styles.descCon}>
          <P style={styles.desc}>
            {item?.description}
          </P>
        </View>
        <View>
          <H1>Choose size</H1>
        </View>
      </View>

      <View style={styles.threeButtonCont}>
        {['S', 'M', 'L'].map((item, i) => (
          <TouchableWrapper
            onPress={() => {
              setButtons(i, item)
            }} style={[currentTabIndex === i ? styles.animatedView : styles.container,]}>
            <Text style={currentTabIndex === i ? styles.buttonText1 : styles.buttonText} >{item}</Text>
          </TouchableWrapper>
        ))}
      </View>

      <View style={styles.action}>
        <View style={[CommonStyles.marginTop_2, CommonStyles.marginLeft_2]}>
          <P color={AppColors.black1}>Price</P>
          <P fontSize={4}>${item?.price} -52%</P>
        </View>

        <View>
          <Button
            containerStyle={styles.btn}
            logo={<Image source={cartIcon} style={styles.logo} />}
            title="Add to Cart"
            onPress={() => {
              const updatedCartItems = [...cartItems, { ...item, count: 1 }];
              if (cartItems.find((val) => val.id === item.id)) {
                ToastSuccess("Item already in cart")
                return
              }
              dispatch(setCartItems(updatedCartItems))
              navigation.navigate("Cart");
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default index;

