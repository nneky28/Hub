import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
// import {Button} from 'native-base';
import {Button} from 'react-native-paper';
import {withTheme} from 'react-native-paper';
import {TouchableRipple} from 'react-native-paper';
import AppColors from '../../utills/AppColors';

const GenButton = (props) => {
  const {colors} = props.theme;
  console.log("color||||---",props)
  return (
    // <Button
    //   //
    //   style={props.btnStyle || styles.GeneralBtnSty}
    //   onPress={props.handelButtonPress}>
    //   <Text style={props.textStyle || styles.GeneralTextSty}>
    //     {props.btnText}
    //   </Text>
    // </Button>
    <TouchableRipple
      onPress={props.handelButtonPress}
      rippleColor="transparent">
      <Button
        // contentStyle={{width: '100%'}}
        mode="contained"
        style={{
          ...{backgroundColor: AppColors.green},
          ...(props.btnStyle || styles.GeneralBtnSty),
        }}
        onPress={props.handelButtonPress}
        loading={props.isloading || false}
        disabled={props.isdisabled || false}>
        <Text
          style={{
            ...{color: AppColors.white},
            ...(props.textStyle || styles.GeneralTextSty),
          }}>
          {props.isloading ? '' : props.btnText}
        </Text>
      </Button>
    </TouchableRipple>
  );
};

export default withTheme(GenButton);

const styles = StyleSheet.create({
  GeneralBtnSty: {
    // backgroundColor: '#2898A4',
    borderRadius: 5,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 30,
    height: 40,
    elevation: 0,
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
    // height: 45,
  },
  GeneralTextSty: {
    // color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
