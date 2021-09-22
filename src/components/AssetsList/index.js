import React from 'react';
import {Image, FlatList, Text, TouchableOpacity, View} from 'react-native';
import Button from '../Button';
import AppColors from '../../utills/AppColors';
import {checkIcon, unCheckIcon, placeholderIcon4} from '../../assets/images';
import styles from './styles';

const AssetsList = ({data}) => {
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={styles.margin} />}
      keyExtractor={(i) => String(Math.random())}
      contentContainerStyle={styles.flatList}
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled={true}
      horizontal={true}
      renderItem={({item}) => {
        return (
          <View style={styles.container}>
            <Image source={placeholderIcon4} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.text}>Apple MacBook Pro 2017</Text>
              <Text style={styles.text1}>Apple Touch Bar</Text>
              <Button
                title="Report"
                textStyle={styles.buttonText}
                containerStyle={styles.button}
              />
            </View>
          </View>
        );
      }}
    />
  );
};

export default AssetsList;
