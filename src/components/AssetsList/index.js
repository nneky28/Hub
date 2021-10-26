import React, { useEffect } from 'react';
import {Image, FlatList, Text, TouchableOpacity, View} from 'react-native';
import Button from '../Button';
import AppColors, { ColorList } from '../../utills/AppColors';
import {checkIcon, unCheckIcon, placeholderIcon4} from '../../assets/images';
import styles from './styles';
import { H1, Rounded } from '../../utills/components';
import { Capitalize } from '../../utills/Methods';

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
            {
              item && item.image ? (
                <Image source={{uri : item.image}} style={styles.image} />
              ) : (
                <Rounded backgroundColor={ColorList[Math.floor(Math.random()*4)]}>
                  <H1>
                    {item && item.name && item.name.length > 0 ? Capitalize([...item.name][0]) : ""}
                  </H1>
                </Rounded>
              )
            }
            
            <View style={styles.details}>
              <Text style={styles.text}>{item && item.name ? item.name: ""}</Text>
              <Text style={styles.text1}>{item && item.brand ? item.brand : ""}</Text>
              {/* <Button
                title="Report"
                textStyle={styles.buttonText}
                containerStyle={styles.button}
              /> */}
            </View>
          </View>
        );
      }}
    />
  );
};

export default AssetsList;
