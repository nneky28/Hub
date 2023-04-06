import React from 'react';
import {SafeAreaView, StatusBar,StatusBarProps, View} from 'react-native';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useIsFocused} from '@react-navigation/native';
import AppColors from '../../utills/AppColors';
import {height} from 'react-native-dimension';
import { ScreenWrapperProps } from './types';

const ScreenWrapper = ({
  children,
  statusBarColor = AppColors.white,
  transclucent = false,
  scrollEnabled = false,
  headerUnScrollable = () => null,
  footerUnScrollable = () => null,
  barStyle = 'dark-content',
  backgroundColor = AppColors.white,
}:ScreenWrapperProps ) => {
  function FocusAwareStatusBar(props:StatusBarProps) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
  }
  const content = () => {
    // const scrollRef = useRef(null);
    // const scrollPosition = useSelector(state => state.Config.scrollPosition);
    // if(allowScrollToPosition){
    //   scrollRef.current?.scrollToPosition(0, scrollPosition.y, true)
    // }
    // const scrollRef = useRef<null | { scrollToPosition: (x: number, y: number, animated: boolean) => void }>(null);
    // const scrollPosition = useSelector((state: { Config: { scrollPosition: { x: number, y: number } } }) => state.Config.scrollPosition);
    // const allowScrollToPosition = true; // or wherever this value comes from
    // if (allowScrollToPosition) {
    //   scrollRef.current?.scrollToPosition(0, scrollPosition.y, true);
    // }
    return (
      <View style={styles.container}>
        <FocusAwareStatusBar
          barStyle={barStyle}
          backgroundColor={statusBarColor}
          translucent={transclucent}
        />
        <>    
        {!transclucent && (
          <SafeAreaView
            style={(styles.container, {backgroundColor: statusBarColor})}
          />
        )}
        {headerUnScrollable()}
        {scrollEnabled ? (
          <KeyboardAwareScrollView
            // ref={scrollRef}
            style={[styles.container, {backgroundColor: backgroundColor}]}
            contentContainerStyle={[
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
        </>
      </View>
    );
  };
  return content();
};

export default ScreenWrapper;
