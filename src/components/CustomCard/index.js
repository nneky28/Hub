import React, {Children} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

export default function CustomCard({Cardcontainer = {}, children}) {
  return <View style={[styles.container, Cardcontainer]}>{children}</View>;
}
