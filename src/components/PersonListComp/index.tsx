import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CommonStyles from '../../utills/CommonStyles';
import { H1, ImgPlaceholder} from '../../utills/components';
import { Capitalize } from '../../utills/Methods';
import styles from './styles';

type PersonListCompProps = {
  item: {
    photo: string;
    first_name: string;
    last_name: string;
    job: {
      title: string;
    };
  };
  onPressHandle: () => void;
};

type DeptListCompProps = {
  item: {
    name?: string| null
  };
  onPressHandle: () => void;
};

const PersonListComp: React.FC<PersonListCompProps> = ({
  item,
  onPressHandle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.listItemContainer]}
      onPress={onPressHandle}
    >
      <View style={CommonStyles.rowJustifySpaceBtw}>
        {item.photo ? (
          <Image source={{ uri: item?.photo }} style={styles.avatarStyle} />
        ) : (
          <ImgPlaceholder
            text={`${item?.first_name?.[0] ? Capitalize(item?.first_name?.[0]) : ''}${
              item?.last_name?.[0] ? `${Capitalize(item?.last_name?.[0])}` : ''
            }`}
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

export const DeptListComp: React.FC<DeptListCompProps> = ({
  item,
  onPressHandle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.listContainer1]}
      onPress={onPressHandle}>
      <View style={CommonStyles.rowJustifySpaceBtw}>
        <ImgPlaceholder
          text={item?.name && item?.name.length > 0 ? Capitalize([...item?.name][0]) : ''}
          size={12}
        />

        <View style={styles.textContainer1}>
          <H1 style={styles.titleText}>
            {item?.name ? Capitalize(item?.name) : ''}{' '}
          </H1>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PersonListComp;
