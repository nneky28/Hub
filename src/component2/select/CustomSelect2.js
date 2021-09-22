/* eslint-disable react-native/no-inline-styles */
import {DefaultTheme, Provider, TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {View} from 'native-base';
import DropDown from './droper';
import {Fragment} from 'react';
import Image from '../image/Image';

function CustomSelect2(props) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState();

  const genderList = [
    {label: 'Option 1', value: 'Option 1'},
    {label: 'Option 2', value: 'Option 2'},
    {label: 'Option 3', value: 'Option 3'},
    {label: 'Option 4', value: 'Option 4'},
  ];
  const theme = {
    ...DefaultTheme,
    // roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#e1e1e1',
      accent: 'yellow',

      // primary: string;
      // background: '#FEFEFE',
      // surface: string;
      // accent: string;
      // error: string;
      // text: string;
      // onSurface: string;
      // onBackground: string
    },
    fontSize: 12,
  };
  const {items, onchangeSelect, selectedValue} = props;
  return (
    <View
      style={{
        width: '100%',
        position: 'relative',
        // height: 60,
        zIndex: 99999999999,
      }}>
      <DropDown
        label={props.selectName}
        mode={'outlined'}
        // value={gender}
        value={selectedValue}
        // setValue={setGender}
        setValue={onchangeSelect}
        // list={genderList}
        list={items || genderList}
        visible={showDropDown}
        activeColor={'green'}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        inputProps={{
          // right: <AntDesign name='caretdown' style={{color: "red"}} />,
          color: '#000',
          fontSize: 12,
          height: 120,
        }}
        theme={theme}
        //   dropDownContainerMaxHeight={}
      />
      <Image
        ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1618187752/mobile/Vector_d1ntc6.png"
        imageStyle={{
          width: 10,
          height: 6,
          position: 'absolute',
          right: 20,
          top: 22.5 + 3,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    //   width: "80%"
    flex: 1,
    // marginHorizontal: 10,
    // justifyContent: 'center',
  },
});

export default CustomSelect2;
