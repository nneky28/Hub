import React, {useEffect} from 'react';
import {Image, Keyboard, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {searchIcon} from '../../assets/images/index';
import {setBottomTabBarVisible} from '../../Redux/Actions/Config';
import AppColors from '../../utills/AppColors';
// import { Images } from "../../component2/image/Image"
import styles from './styles';
import {SearchBoxIconRightProps, SearchBoxProps} from './types';

export default function SearchBox({
  title,
  containerStyle,
  onSubmitEditing,
  ...inputProps
}: SearchBoxProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () =>
      dispatch(setBottomTabBarVisible(false)),
    );
    Keyboard.addListener('keyboardDidHide', () =>
      dispatch(setBottomTabBarVisible(true)),
    );
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={searchIcon} style={styles.searchIcon} />
      <TextInput
        style={styles.inputStyle}
        placeholder={title}
        placeholderTextColor={AppColors.black3}
        keyboardType="default"
        onChangeText={onSubmitEditing}
        onSubmitEditing={(value) => {
          if (typeof value === 'object') return;
          onSubmitEditing(value);
        }}
        {...inputProps}
      />
    </View>
  );
}

export const SearchBoxIOS = ({
  title,
  containerStyle,
  onSubmitEditing,
}: SearchBoxIconRightProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () =>
      dispatch(setBottomTabBarVisible(false)),
    );
    Keyboard.addListener('keyboardDidHide', () =>
      dispatch(setBottomTabBarVisible(true)),
    );
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={searchIcon} style={styles.searchIcon} />
      <TextInput
        style={styles.inputStyleIOS}
        placeholder={title}
        placeholderTextColor={AppColors.black3}
        keyboardType="default"
        onChangeText={onSubmitEditing}
        onSubmitEditing={(value) => {
          if (typeof value === 'object') return;
          onSubmitEditing(value);
        }}
      />
    </View>
  );
};
