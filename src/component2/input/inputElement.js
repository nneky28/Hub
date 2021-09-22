/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  FlatList,
  View
} from 'react-native';

//@observer

//TODO Change to functional Component
const CusInput = () => {
    return (
      <View
        style={[
          styles.borderSty,
          {
            borderWidth: 0,
            borderColor: '#717171',
            position: 'relative',
            width: '100%',
            marginTop: 15,
          },
        ]}>
              
      </View>
    );
}
export default CusInput;

// export default withNavigation(RecruiterLanding);

const styles = StyleSheet.create({
  floatLabel: {
    position: 'absolute',
    top: -8,
    fontSize: 10,
    left: 20,
    color: '#001f90',
    backgroundColor: '#fff',
    zIndex: 999999,
    paddingLeft: 5,
    paddingRight: 5,
  },
  borderSty: {
    borderRadius: 5,
  },
});
