import React from 'react';
import {useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Fragment} from 'react';
import AppColors from '../utills/AppColors';
import {height, width} from 'react-native-dimension';
import {logout} from '../Redux/Actions/Auth';
import {
  rightIcon,
  logoIcon,
  plusIcon,
  settingIcon,
  logoutIcon,
} from '../assets/images';
import {showMessage} from 'react-native-flash-message';
import { FontFamily } from '../utills/FontFamily';
const Drawer = ({navigation, ...props}) => {
  const dispatch = useDispatch();
  const logoutMethod = () => {
    showMessage({
      message: 'Logged Out',
      description: 'Succfully logged out',
      type: 'danger',
    });
    dispatch(logout());
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8}>
        <View style={styles.row}>
          <Image resizeMode="contain" source={logoIcon} style={styles.logo} />
          <View style={styles.margin}>
            <Text numberOfLines={1} style={styles.text1}>
              Belarus
            </Text>
            <Text numberOfLines={2} style={styles.text2}>
              belarusng@bizedge.com
            </Text>
          </View>
        </View>
        <Image resizeMode="contain" source={rightIcon} style={styles.icon} />
      </TouchableOpacity>
    );
  };
  const ItemWithText = ({icon, text, onPress}) => {
    return (
      <TouchableOpacity
        style={styles.row1}
        onPress={onPress}
        activeOpacity={0.8}>
        <Image source={icon} resizeMode="contain" style={styles.icon1} />
        <Text style={styles.text3}>{text}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <Fragment>
      <Text style={styles.text}>Businesses</Text>
      <View style={styles.line} />
      <View style={{height: height(63)}}>
        <FlatList
          data={['', '']}
          keyExtractor={() => Math.random()}
          contentContainerStyle={styles.itemList}
          ItemSeparatorComponent={() => <View style={{marginTop: height(2)}} />}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
      <View style={[styles.line, {backgroundColor: AppColors.gray1}]} />
      <ItemWithText icon={plusIcon} text="Add Another Buisness " />
      <ItemWithText icon={settingIcon} text="Settings" />
      <ItemWithText onPress={logoutMethod} icon={logoutIcon} text="Sign Out" />
    </Fragment>
  );
};
export default Drawer;
const styles = StyleSheet.create({
  text: {
    fontSize: width(4.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold,
    marginTop: height(5),
    marginLeft: '5%',
  },
  text1: {
    fontSize: width(4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold,
  },
  text2: {
    fontSize: width(2.9),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular,
  },
  text3: {
    fontSize: width(3.4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular,
    marginLeft: '5%',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray,
    marginTop: height(2),
    elevation: 0,
  },
  itemContainer: {
    width: '100%',
    backgroundColor: AppColors.gray,
    paddingHorizontal: '5%',
    paddingVertical: height(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemList: {
    paddingVertical: height(2),
  },
  logo: {
    width: width(10),
    height: width(10),
    borderRadius: width(5),
  },
  icon: {
    width: width(3),
    height: width(3),
    tintColor: AppColors.black1,
  },
  icon1: {
    width: width(5),
    height: width(5),
    tintColor: AppColors.black1,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '5%',
    marginTop: height(3),
  },
  margin: {marginLeft: '7%', width: '65%'},
});
