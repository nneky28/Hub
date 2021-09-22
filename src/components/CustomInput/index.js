import React, { useEffect } from 'react';
import { Keyboard, Text, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { setBottomTabBarVisible } from '../../Redux/Actions/Config';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';
import styles from './styles';


const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]
  const dispatch = useDispatch();

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => dispatch(setBottomTabBarVisible(false)));
    Keyboard.addListener('keyboardDidHide', () => dispatch(setBottomTabBarVisible(true)))

}, []);

  return (
    <>
      <TextInput
        style={[
          styles.textInput,
          hasError && styles.errorInput
        ]}
        fontFamily={FontFamily.BlackSansRegular}
        placeholderTextColor={AppColors.black3}
        value={value}
        onChangeText={(text) => {
          console.log("text>>",text)
          onChange(text)
          //onChange(name)(text)
        }}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      
    </>
  )
}

export default CustomInput