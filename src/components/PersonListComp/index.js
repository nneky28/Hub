import React from 'react';
import {
  Image,
  Text, TouchableOpacity, View
} from 'react-native';
import CommonStyles from '../../utills/CommonStyles';
import styles from './styles';


const PersonListComp = ({item, onPressHandle}) => {    
  
    return(
    <TouchableOpacity 
    style={[styles.listItemContainer]}
    onPress={onPressHandle}
    >
        <View style={CommonStyles.rowJustifySpaceBtw}>
            <Image source={item.avatar} style={styles.avatarStyle} />
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.subText}>{item.designation}</Text>
            </View>
        </View>
    </TouchableOpacity>
    );
}

export default PersonListComp;
