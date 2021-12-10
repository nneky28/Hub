import React, { useEffect } from 'react';
import { FlatList, Image, Linking, Text, View } from 'react-native';
import { width } from 'react-native-dimension';
import { Modal } from 'react-native-paper';
import { rightIcon, twoMenIcon } from '../../assets/images';
import { APIFunction, getAPIs } from '../../utills/api';
import CommonStyles from '../../utills/CommonStyles';
import { Capitalize, getData } from '../../utills/Methods';
import Button from '../Button';
import styles from './styles';
const BenifitList = ({data, horizontal,benefits,goToWeb}) => {
  let color = "";
  return (
    <FlatList
    data={benefits}
    ItemSeparatorComponent={() => <View style={horizontal ? styles.margin : CommonStyles.marginTop_2} />}
    keyExtractor={(i) => String(Math.random())}
    contentContainerStyle={styles.flatList}
    showsHorizontalScrollIndicator={false}
    nestedScrollEnabled={true}
    horizontal={horizontal}
    renderItem={({item}) => {
      color = color === data[0] ? data[1] : data[0];
      console.log("color",color)
      return (
        <View style={[styles.container, {backgroundColor: color}, !horizontal && {width: width(90)}]}>
          <View style={[styles.row, styles.between]}>
            <View>
              <View style={styles.row}>
                <Text style={styles.text}>{item && item.plan ? Capitalize(item.plan) : ""}</Text>
                {/* <Image
                  resizeMode="contain"
                  source={rightIcon}
                  style={styles.icon}
                /> */}
              </View>
              <Text style={styles.text1}>{item && item.provider ? Capitalize(item.provider) : ""}</Text>
            </View>
            <Button
              title="Visit Website"
              textStyle={styles.buttonText}
              containerStyle={styles.button}
              onPress={()=>{
                let url = item && item.website ? item.website : ""
                if(url === "") return;
                if(!Linking.canOpenURL(url)){
                  return;
                }
                if(!goToWeb) return
                goToWeb(url)
              }}
            />
          </View>
          <View style={styles.line} />
          <View style={[styles.row, styles.between, styles.margin1]}>
            
            <View>
              <Text style={styles.ttext1}>Type</Text>
              <Text style={styles.ttext}>{item && item.category ? Capitalize(item.category) : ""}</Text>
            </View>
            {
              item && item.category !== "pension" ? <View style={styles.row}>
              <Image
                resizeMode="contain"
                source={twoMenIcon}
                style={[styles.icon, styles.margin2]}
              />
              <Text style={styles.text1}>{item && item.num_dependants ? item.num_dependants : 0} Dependents</Text>
            </View> : null
            }
          </View>
        </View>
      );
    }}
  />
  );
};

export default BenifitList;
