import React from 'react';
import {
  Image,
  Text, TouchableOpacity
} from 'react-native';
import CommonStyles from '../../utills/CommonStyles';
import { Capitalize } from '../../utills/Methods';
import styles from './styles';


const PersonCard = ({item, onPressHandle, containerStyle, titleStyle, subtitleStyle}) => {    
    return (
      <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPressHandle}>
        {
          item.photo ? (
            <Image url={item && item.photo ? item.photo : null} style={styles.avatarStyle}/>
          ) : (
            <Image source={require('../../assets/images/dummy/placeholder.png')} style={styles.avatarStyle}/>
          )
        }
        
        <Text numberOfLines={1} style={[styles.nameText, titleStyle]}>
        {item && item.first_name ? Capitalize(item.first_name) : ""} {" "}
                    {item && item.last_name ? Capitalize(item.last_name) : ""}
        </Text>
        <Text numberOfLines={1} style={[styles.designationText, subtitleStyle]}>
          {item.job && item.job.title ? Capitalize(item.job.title) : ""}
        </Text>            
      </TouchableOpacity>
    );
  };
export default PersonCard;
