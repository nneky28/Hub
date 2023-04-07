import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { height, width } from 'react-native-dimension';
import SelectionModal from '../components/SelectionModal';
import AppColors from '../utills/AppColors';
import { Container, P } from '../utills/components';
import { FontFamily } from '../utills/FontFamily';
import { useAppSelector } from '../utills/Methods';
import Ionicons from "react-native-vector-icons/Ionicons"


function TabBar({ state, descriptors,navigation} : BottomTabBarProps) {
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(true);
  const isBottomTabBarVisible = useAppSelector(state => state.Config.isBottomTabBarVisible);



  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      //Whenever keyboard did show make it don't visible
      setVisible(false);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setVisible(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  if (!isBottomTabBarVisible)
    return null;
  else
    return (
      <>
        <Container
          style={{
            flexDirection: "row",
            paddingBottom: height(3)
          }}
        >
          {/* tabBarHideOnKeyboard: true, */}
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = route.name;
              // options.tabBarLabel !== undefined
              //   ? options.tabBarLabel
              //   : options.title !== undefined
              //     ? options.title
              //     : 
              //     route.name;

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
                  navigation.navigate(route.name);
                }
              }
            };

            // props.descriptors[route.key].options.tabBarHideOnKeyboard && (

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
            var icon = "";
            var fill = "";
            if (index == 0) {
              icon = "home-outline"
              fill = "home"
            }
            if (index == 1) {
              icon = "grid-outline"
              fill = "grid"
            }
            if (index == 2) {
              icon = "people-outline"
              fill = "people"
            }
            if (index == 3) {
              icon = "person-outline"
              fill = "person"
            }



            return visible && (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                activeOpacity={1}
                onLongPress={onLongPress}
                style={styles.container}
                key={index}
              >
                <Ionicons name={isFocused ? fill : icon} 
                  size={width(5.5)}
                  color={isFocused ? AppColors.green : AppColors.black2}
                />
                <P color={isFocused ? AppColors.green : AppColors.black2}>{label}</P>
              </TouchableOpacity>
            );
          })}
        </Container>
        <SelectionModal isVisible={modal} onHide={() => setModal(false)} />
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
    paddingBottom: height(0.5),
    paddingTop : height(1),
    backgroundColor: AppColors.white,
    ...AppColors.shadowStyles,
  },
});
