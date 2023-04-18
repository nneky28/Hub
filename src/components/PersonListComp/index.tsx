import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CommonStyles from '../../utills/CommonStyles';
import { ImgPlaceholder} from '../../utills/components';
import { Capitalize } from '../../utills/Methods';
import styles from './styles';
import { PersonListCompProps } from './types';

const PersonListComp: React.FC<PersonListCompProps> = ({
  item,
  onPressHandler,
}) => {
  return (
    <TouchableOpacity
      style={[styles.listItemContainer]}
      onPress={onPressHandler}
    >
      <View style={CommonStyles.rowJustifySpaceBtw}>
        {item.photo ? (
          <Image source={{ uri: item?.photo }} style={styles.avatarStyle} />
        ) : (
          <ImgPlaceholder
            text={`${item?.first_name?.[0] ? Capitalize(item?.first_name?.[0]) : ''}${
              item?.last_name?.[0] ? `${Capitalize(item?.last_name?.[0])}` : ''
            }`.trim()}
            size={12}
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            {item?.first_name ? Capitalize(item.first_name) : ''}{' '}
            {item?.last_name ? Capitalize(item.last_name) : ''}
          </Text>
          <Text style={styles.subText}>
            {item?.job?.title ? Capitalize(item?.job?.title) : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PersonListComp;
