import React, { useEffect } from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useIsFocused} from '@react-navigation/native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
const ScreenWrapper = ({
  children,
  statusBarColor = AppColors.white,
  transclucent = false,
  scrollEnabled = false,
  headerUnScrollable = () => null,
  footerUnScrollable = () => null,
  barStyle = 'dark-content',
  backgroundColor = AppColors.white,
}) => {
  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
  }
  const content = () => {
    const scrollRef = useRef(null);
    const scrollPosition = useSelector(state => state.Config.scrollPosition);

    scrollRef.current?.scrollToPosition(0, scrollPosition.y, true)
    return (
      <View style={styles.container}>
        <FocusAwareStatusBar
          barStyle={barStyle}
          backgroundColor={statusBarColor}
          translucent={transclucent}
        />
        {!transclucent && (
          <SafeAreaView
            style={(styles.container, {backgroundColor: statusBarColor})}
          />
        )}
        {headerUnScrollable()}
        {scrollEnabled ? (
          <KeyboardAwareScrollView
            ref={scrollRef}
            style={[styles.container, {backgroundColor: backgroundColor}]}
            contentContainerStyle={[
              styles.contentContainer,
              {paddingVertical: height(2)},
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            >
            {children}
          </KeyboardAwareScrollView>
        ) : (
          <View
            style={{
              backgroundColor: backgroundColor,
              flex: 1,
            }}>
            {children}
          </View>
        )}
        {footerUnScrollable()}
      </View>
    );
  };
  return content();
};

export default ScreenWrapper;
