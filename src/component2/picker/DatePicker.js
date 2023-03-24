import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
// import {Button} from 'native-base';
import {Button} from 'react-native-paper';
import {withTheme} from 'react-native-paper';
import CusInput from '../input/inputElement';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TouchableRipple} from 'react-native-paper';

const CustomDatePicker = (props) => {
  const {colors} = props.theme;
  const {
    title,
    defaultValue,
    showDatePickerHandler,
    hideDatePickerHandler,
    showDatePicker,
    onhandlePicker,
  } = props;
  defaultValue === null ? '2020-02-19' : defaultValue;
  return (
    <TouchableRipple onPress={showDatePickerHandler} rippleColor="#fff">
      <View
        style={[
          {
            width: '100%',
            // marginBottom: 15,
            // marginTop: 10,
          },
        ]}
        pointerEvents={'none'}>
        <CusInput
          placeholder={title}
          onChangeText={showDatePickerHandler}
          name="HireDate "
          defaultValue={defaultValue.toString()}
          keyboardType={'default'}
          autoCapitalize={'words'}
          value={defaultValue.toString()}
          // disabled={true}
        />

        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          onConfirm={onhandlePicker}
          onCancel={hideDatePickerHandler}
          // maximumDate={this.state.maxyear}
        />
      </View>
    </TouchableRipple>
  );
};

export default withTheme(CustomDatePicker);

// const styles = StyleSheet.create({
//   GeneralBtnSty: {
//     // backgroundColor: '#2898A4',
//     borderRadius: 5,
//     paddingBottom: 10,
//     paddingTop: 10,
//     paddingRight: 30,
//     paddingLeft: 30,
//     elevation: 0,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     width: '100%',
//     textAlign: 'center',
//     marginTop: 20,
//     // height: 45,
//   },
//   GeneralTextSty: {
//     // color: '#fff',
//     fontSize: 14,
//     fontWeight: '500',
//   },
// });
