import React, { useRef } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { height, width } from 'react-native-dimension';
import ModalDropdown from 'react-native-modal-dropdown';
import { downIcon } from '../../assets/images';
import CommonStyles from '../../utills/CommonStyles';
import styles from './styles';


const CustomModalDropdown = (props) => {
  const {
    field: { name, onBlur, onChange, value},
    form: { errors, touched, setFieldTouched , setFieldValue},
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]
  const dropdown = useRef(null);

  return (
    <TouchableOpacity
    onPress={() => dropdown.current.show()}
    style={CommonStyles.justifyCenter}
    >
      <ModalDropdown
      ref={dropdown}
      isFullWidth
      options={name==='gender'?['Male', 'Female', 'Other']: ['Single', 'Married', 'Divorced']} 
      style={[
            styles.listContainer,
            hasError && styles.errorInput
          ]}
      dropdownStyle={styles.dropDownContainer}
      defaultIndex={-1}
      defaultValue={name==='gender'? "Gender" : "Marital Status"}
      textStyle={styles.text1}
      dropdownTextStyle={[styles.text1, {marginLeft: width(3.5)}]}
      onSelect={(index,text) => {
        setFieldValue(name, text)
        props.onChangeData ? props.onChangeData(text) : null
      }}
      renderRightComponent={() => <Image 
                  resizeMode="contain" 
                  source={downIcon} 
                  style={[styles.downIcon2]}
                  />
      }
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      
    </TouchableOpacity>
  )
}

export default CustomModalDropdown