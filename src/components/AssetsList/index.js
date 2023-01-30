import React, { useEffect } from 'react';
import {Image, FlatList, Text, TouchableOpacity, View} from 'react-native';
import Button from '../Button';
import AppColors, { ColorList } from '../../utills/AppColors';
import {checkIcon, unCheckIcon, placeholderIcon4} from '../../assets/images';
import styles from './styles';
import { H1, Rounded } from '../../utills/components';
import { Capitalize } from '../../utills/Methods';
import { width } from 'react-native-dimension';

const AssetsList = ({data,onPressHandler}) => {
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
          <View style={{...styles.container,width : data.length === 1 ? width(90) : width(80)}}>
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
              {
                item?.name ? <Text style={styles.text}>{item.name}</Text> : null
              }
              {item?.brand ? <Text style={styles.text1}>{item.brand}</Text> : null}
              {/* <Button
                title="Report"
                textStyle={styles.buttonText}
                containerStyle={styles.button}
                onPress={()=>onPressHandler(item)}
              /> */}
            </View>
          </View>
        );
      }}
    />
  );
};

export default AssetsList;
