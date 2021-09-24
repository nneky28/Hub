import React from 'react';
import {
  Image,
  Text, TouchableOpacity, View
} from 'react-native';
import CommonStyles from '../../utills/CommonStyles';
import { Capitalize } from '../../utills/Methods';
import styles from './styles';


const PersonListComp = ({item, onPressHandle}) => {    
    return(
    <TouchableOpacity 
    style={[styles.listItemContainer]}
    onPress={onPressHandle}
    >
        {console.log("PersonListComp",item)}
        <View style={CommonStyles.rowJustifySpaceBtw}>
            <Image url={item && item.photo ? item.photo : null} style={styles.avatarStyle} />
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

export default PersonListComp;
