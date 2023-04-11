import React from 'react';
import {
  Image,
  Text, TouchableOpacity
} from 'react-native';
import { ImgPlaceholder } from '../../utills/components';
import { Capitalize } from '../../utills/Methods';
import styles from './styles';
import { PersonCardProps } from './types';


const PersonCard = (props : PersonCardProps) => {    
    return (
      <TouchableOpacity style={[styles.container, props?.containerStyle]} onPress={props?.onPressHandler}>
        {
          props?.item?.photo ? (
            <Image source={{uri : props?.item?.photo}} style={styles.avatarStyle}/>
          ) : (
            <ImgPlaceholder 
              text={`${props?.item?.first_name?.[0] ? Capitalize(props?.item?.first_name?.[0]) : ""}${props?.item?.last_name?.[0] ? Capitalize(props?.item?.last_name?.[0]) : ""}`.trim()}
              size={15}
              radius={20}
            />
          )
        }
        
        <Text numberOfLines={1} style={[styles.nameText, props?.titleStyle]}>
        {props?.item?.first_name ? Capitalize(props?.item?.first_name) : ""} {" "}
                    {props?.item?.last_name ? Capitalize(props?.item?.last_name) : ""}
        </Text>
        <Text numberOfLines={1} style={[styles.designationText, props?.subtitleStyle]}>
          {props?.item?.job?.title ? Capitalize(props?.item?.job?.title) : ""}
        </Text>            
      </TouchableOpacity>
    );
  };
export default PersonCard;
