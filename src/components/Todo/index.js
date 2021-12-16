import React from 'react';
import {Image, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {height} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import {checkIcon, unCheckIcon} from '../../assets/images';
import styles from './styles';

const Todo = ({data, onPressHandle,openWarningModal}) => {
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={styles.line} />}
      keyExtractor={(i) => String(i.id)}
      contentContainerStyle={{marginTop: height(1.5)}}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      initialNumToRender={10}
      renderItem={({item}) => {
        var checked = item.is_completed;
        return (
          <TouchableOpacity
            key={String(item.id)}
            activeOpacity={0.8}
            style={styles.row1}>
            <View>
              <Text style={[styles.text, checked && {color: AppColors.green, textDecorationLine: 'line-through'}]}>
                {item.title}
              </Text>
              <Text style={styles.text1}>{item.desc}</Text>
            </View>
            <TouchableOpacity onPress={()=>{
              if(item.is_completed) return
              openWarningModal(item)
            }}>
              <Image
                resizeMode="contain"
                source={checked ? checkIcon : unCheckIcon}
                style={[
                  styles.icon,
                  !checked && {tintColor: AppColors.grayBorder},
                ]}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Todo;
