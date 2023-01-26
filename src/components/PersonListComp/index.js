import React from 'react';
import {
  Image,
  Text, TouchableOpacity, View
} from 'react-native';
import { ColorList } from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import { H1, ImgPlaceholder, Rounded } from '../../utills/components';
import { Capitalize } from '../../utills/Methods';
import styles from './styles';


const PersonListComp = ({ item, onPressHandle }) => {
  return (
    <TouchableOpacity
      style={[styles.listItemContainer]}
      onPress={onPressHandle}
    >
      <View style={CommonStyles.rowJustifySpaceBtw}>
        {
          item.photo ? (
            <Image source={{ uri: item.photo }} style={styles.avatarStyle} />
          ) : (
            // <Rounded backgroundColor={ColorList[Math.floor(Math.random() * 4)]} size={12}>
            //   <H1>
            //     {item && item.first_name && item.first_name.length > 0 ? Capitalize([...item.first_name][0]) : ""}
            //     {item && item.last_name && item.first_name.length > 0 ? `${Capitalize([...item.last_name][0])}` : ""}
            //   </H1>
            // </Rounded>
            <ImgPlaceholder text={`${item && item.first_name && item.first_name.length > 0 ? Capitalize([...item.first_name][0]) : ""}${item && item.last_name && item.first_name.length > 0 ? `${Capitalize([...item.last_name][0])}` : ""}`}
              size={12} />
          )
        }
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            {item && item.first_name ? Capitalize(item.first_name) : ""} {" "}
            {item && item.last_name ? Capitalize(item.last_name) : ""}
          </Text>
          <Text style={styles.subText}>{item.job && item.job.title ? Capitalize(item.job.title) : ""}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export const DeptListComp = ({ item, onPressHandle }) => {
  return (
    <TouchableOpacity
      style={[styles.listContainer1]}
      onPress={onPressHandle}
    >
      <View style={CommonStyles.rowJustifySpaceBtw}>
        {/* <Rounded backgroundColor={ColorList[Math.floor(Math.random() * 4)]} size={12}>
          <H1 fontSize={4.5}>
            {item && item.name && item.name.length > 0 ? Capitalize([...item.name][0]) : ""}
          </H1>
        </Rounded> */}
        <ImgPlaceholder text={item && item.name && item.name.length > 0 ? Capitalize([...item.name][0]) : ""} size={12} />

        <View style={styles.textContainer1}>
          <H1 style={styles.titleText}>
            {item && item.name ? Capitalize(item.name) : ""} {" "}
          </H1>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default PersonListComp;
