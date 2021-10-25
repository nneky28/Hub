import React from 'react';
import {
  Image,
  Text, TouchableOpacity
} from 'react-native';
import { width } from 'react-native-dimension';
import { alignItems, borderRadius, height, justifyContent } from 'styled-system';
import AppColors, { ColorList } from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import { Container, H1, P, Rounded } from '../../utills/components';
import { Capitalize } from '../../utills/Methods';
import styles from './styles';


const PersonCard = ({item, onPressHandle, containerStyle, titleStyle, subtitleStyle}) => {    
    return (
      <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPressHandle}>
        {
          item.photo ? (
            <Image source={{uri : item.photo}} style={styles.avatarStyle}/>
          ) : (
            <Rounded backgroundColor={ColorList[Math.floor(Math.random()*4)]}>
              <H1>
                {item && item.first_name && item.first_name.length > 0 ? Capitalize([...item.first_name][0]) : ""}
                {item && item.last_name && item.first_name.length > 0 ? `${Capitalize([...item.last_name][0])}` : ""}
              </H1>
            </Rounded>
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
