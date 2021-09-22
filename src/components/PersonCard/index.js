import React from 'react';
import {
  Image,
  Text, TouchableOpacity
} from 'react-native';
import CommonStyles from '../../utills/CommonStyles';
import styles from './styles';


const PersonCard = ({item, onPressHandle, containerStyle, titleStyle, subtitleStyle}) => {    
    return (
      <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPressHandle}>
        <Image source={item.avatar} style={styles.avatarStyle}/>
        <Text numberOfLines={1} style={[styles.nameText, titleStyle]}>{item.title}</Text>
        <Text numberOfLines={1} style={[styles.designationText, subtitleStyle]}>{item.designation}</Text>            
      </TouchableOpacity>
    );
  };
export default PersonCard;
