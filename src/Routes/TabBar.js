import moment from 'moment';
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
import { Images } from '../component2/image/Image';
import SelectionModal from '../components/SelectionModal';
import AppColors from '../utills/AppColors';
import { Container, H1, Rounded } from '../utills/components';
import { FontFamily } from '../utills/FontFamily';


function TabBar({state, descriptors, navigation}) {
  const isBottomTabBarVisible = useSelector(state => state.Config.isBottomTabBarVisible);
  const auth = useSelector(state=>state.Auth);
  const [modal, setModal] = useState(false);

  if (!isBottomTabBarVisible)
    return null;
  else
    return (
      <>
      <Container
        paddingVertical={3}
        style={{
          flexDirection : "row"
        }}
      >
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
            image = Images.HomeIcon;
            image1 = Images.HomeFillIcon;
          }
          if (index == 1) {
            image = Images.MenuIcon;
            image1 = Images.MenuFillIcon;
          }
          if (index == 2) {
            image = Images.PeopleIcon;
            image1 = Images.PeopleFillIcon;
          }
          if (index == 3) {
            image = Images.ProfileIcon;
            image1 = Images.ProfileFillIcon;
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
              style={styles.container}
            >
              {/* {
                index === 2  && auth && auth.notifications > 0 && (moment().isAfter(auth.last_checked) || !auth.last_checked) ? (
                  <Container
                    style={{
                      position:"absolute",
                      top : -10,
                      left : 30
                    }}
                    backgroundColor={'transparent'}
                  >
                    <Rounded size={7}>
                      <H1 color={AppColors.white} fontSize={3.5}>{auth.notifications}</H1>
                    </Rounded>
                  </Container>
                ) : null
              } */}
              <Image
                resizeMode="contain"
                source={isFocused ? {uri : image1} : {uri : image}}
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
      </Container>
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
