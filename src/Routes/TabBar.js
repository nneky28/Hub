import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import {
  categoryFillIcon,
  categoryIcon, homeFillIcon,
  homeIcon, notificationFillIcon,
  notificationIcon,
  profileFillIcon,
  profileIcon
} from '../assets/images';
import SelectionModal from '../components/SelectionModal';
import AppColors from '../utills/AppColors';
import { FontFamily } from '../utills/FontFamily';


function TabBar({state, descriptors, navigation}) {
  const isBottomTabBarVisible = useSelector(state => state.Config.isBottomTabBarVisible);
  const [modal, setModal] = useState(false);

  if (!isBottomTabBarVisible)
    return null;
  else
    return (
      <>
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === 'Menu')
            setModal(true);
          else {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        var image;
        var image1;
        if (index == 0) {
          image = homeIcon;
          image1 = homeFillIcon;
        }
        if (index == 1) {
          image = categoryIcon;
          image1 = categoryFillIcon;
        }
        if (index == 2) {
          image = notificationIcon;
          image1 = notificationFillIcon;
        }
        if (index == 3) {
          image = profileIcon;
          image1 = profileFillIcon;
        }
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            activeOpacity={1}
            onLongPress={onLongPress}
            style={styles.container}>
            <Image
              resizeMode="contain"
              source={isFocused ? image1 : image}
              style={styles.image}
            />
            <Text
              style={[
                {color: isFocused ? AppColors.green : AppColors.black2},
                styles.text,
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
    <SelectionModal navigation={navigation} isVisible={modal} onHide={() => setModal(false)} />
    </>

  );
}

export default TabBar;

const styles = StyleSheet.create({
  text: {
    fontSize: width(3.5),
    fontFamily: FontFamily.BlackSansRegular,
  },
  image: {
    width: width(5),
    height: height(4),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height(0.5),
    backgroundColor: AppColors.white,
    ...AppColors.shadowStyles,
  },
});
