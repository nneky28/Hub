import { View, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import CommonStyles from '../../utills/CommonStyles';
import { item1 } from '../../assets/images';
import {
  EmptyStateWrapper,
  H1,
  KeyboardAwareWrapper,
  P,
  TouchableWrapper,
} from '../../utills/components';
import Feather from 'react-native-vector-icons/Feather';
import AppColors from '../../utills/AppColors';
import CustomInput from '../CustomInput';
import Button from '../Button';
import { ToastSuccess, useAppSelector } from '../../utills/Methods';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setCartItems } from '../../Redux/Actions/Config';
import CartCard from '../CartCard/index'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckOutModal from '../CheckoutModal';


const index = () => {
  const navigation = useNavigation();
  const cartItems = useAppSelector((state) => state.Config.cartItems);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.count * item.price), 0);
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const vat = 7870
  const shippingFee = 5870


  const handleIncrement = (item) => {
    const newCartItems = cartItems.map(el => {
      if (el.id === item.id) {
        return { ...el, count: ++item.count }
      }
      return el
    })

    dispatch(setCartItems(newCartItems))
  };

  const handleDecrement = (item) => {
    if (item.count < 2) {
      return
    }
    const newCartItems = cartItems.map(el => {
      if (el.id === item.id) {
        return { ...el, count: --item.count }
      }
      return el
    })

    dispatch(setCartItems(newCartItems))

  };

  const handleDelete = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    dispatch(setCartItems(newCartItems))
    ToastSuccess("Item has been removed from cart")

  };

  const renderItem = ({ item, i }) => {
    return (
      <View>
        <CartCard item={item}
          handleDelete={() => handleDelete(i)}
          handleDecrement={() => handleDecrement(item)}
          handleIncrement={() => handleIncrement(item)}
        />
      </View>
    )
  }
  const KeyExtractor = (item, i) =>
    `${item}${i}`.toString();

  const ListEmptyComponent = () => {
    return (
      <EmptyStateWrapper
        header_1={'You do not have'}
        header_2={'any item in your cart.'}
        sub_text={'When you do, they will show up here.'}
      />
    );
  };
  const onDismiss = () => {
    dispatch(setCartItems([]))
    setShow(false);
  };


  return (
    <React.Fragment>
      <FlatList
        data={cartItems}
        keyExtractor={KeyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />
      {
        cartItems.length !== 0 &&
        <>
          <KeyboardAwareWrapper>
            <CustomInput
              placeholder="Add a voucher"
              onChangeData={() => null}
              value=""
              inputWidth={93}
              keyboardType={'number-pad'}
            />
          </KeyboardAwareWrapper>
          <View style={styles.payment}>
            <View>
              <P color={AppColors.black1} fontSize={4}>
                Sub-total
              </P>
              <P fontSize={4} color={AppColors.black1} style={styles.align}>
                VAT (%)
              </P>
              <P fontSize={4} color={AppColors.black1}>
                Shipping fee
              </P>
            </View>
            <View>
              <H1>${totalPrice}</H1>
              <H1 style={styles.align}>${vat}</H1>
              <H1>${shippingFee}</H1>
            </View>
          </View>
          <View style={styles.line} />

          <View style={styles.payment}>
            <View>
              <P color={AppColors.black1} fontSize={4}>
                Total
              </P>
            </View>
            <View>
              <H1>${totalPrice + vat + shippingFee}</H1>
            </View>
          </View>
          <View style={styles.line2} />
          <Button
            title="Checkout"
            onPress={() => setShow(true)}
            containerStyle={styles.btn}
            icon={
              <Feather name="arrow-right" size={15} style={styles.iconCheck} />
            }
          />

        </>
      }

      {show ? (
        <CheckOutModal
          isVisible={show}
          onHide={onDismiss}
          title={'Checkout Successfull'}
          sub_title={'Check your email for product details'}
          submitBtnText={'CLOSE'}
          icon={'checkmark-done-outline'}
          iconColor={AppColors.black}
        />
      ) : null}
    </React.Fragment>
  );
};

export default index;

