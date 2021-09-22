import {DefaultTheme, Provider, TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {View} from 'native-base';
import DropDown from 'react-native-paper-dropdown';
import {Fragment} from 'react';
import Image from '../image/Image';

function Example() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState();

  const genderList = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Others', value: 'others'},
  ];
  const theme = {
    ...DefaultTheme,
    // roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#000',
      accent: '#f1c40f',
    },
    fontSize: 12
   
  };

  return (
    <View style={{width: '100%', position: 'relative', height: 45}}>
      <DropDown
        label={'Gender'}
        mode={'outlined'}
        value={gender}
        setValue={setGender}
        list={genderList}
        visible={showDropDown}
        activeColor={'red'}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        inputProps={{
          // right: <AntDesign name='caretdown' style={{color: "red"}} />,
          color: '#000',
          fontSize: 12,
        }}
        theme={theme}
        //   dropDownContainerMaxHeight={}
      />
      <Image
        ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1618187752/mobile/Vector_d1ntc6.png"
        imageStyle={{width: 10, height: 6, position: 'absolute', right: 20, top: 30}}
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

export default Example;
