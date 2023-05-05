import { View, Text } from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { HeaderWithBackButton } from '../../components/Headers/CustomHeader';
import styles from './styles';
import { Container } from '../../utills/components';
import CheckoutCart from '../../components/CheckoutCart';
import { useAppSelector } from '../../utills/Methods';

const index = ({ navigation, route }) => {

  const cartItems = useAppSelector((state) => state.Config.cartItems);

  return (
    <ScreenWrapper scrollEnabled={true}>
      <HeaderWithBackButton
        headerText="My Cart"
        backHandler
        rightIcon={'bell-outline'}
        onPressHandler={() => navigation.goBack()}
        headerTextStyle={styles.header}
      />

      <View>
        <CheckoutCart cartItems={cartItems} />
      </View>
    </ScreenWrapper>
  );
};

export default index;
