import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Fab} from 'native-base';
import Image from '../image/Image';

import {withTheme} from 'react-native-paper';

const GenFabButton = (props) => {
  const {colors} = props.theme;
  return (
    <Fab
      active={true}
      direction="up"
      containerStyle={{}}
      style={props.fabSty || styles.GeneralFabSTy}
      position={props.fabPosition || 'bottomRight'}
      onPress={props.handleOnpress}>
      <Image
        ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1618437951/mobile/pxylsktal7fnv8mpi0tp.png"
        imageStyle={{width: 21, height: 21}}
      />
    </Fab>
  );
};

export default withTheme(GenFabButton);

const styles = StyleSheet.create({
  GeneralFabSTy: {
    backgroundColor: '#2898A4',
    marginBottom: 40,
  },
});
