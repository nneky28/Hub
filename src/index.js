import React, {useEffect} from 'react';
import Routes from './Routes/index';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './Redux/index';
import FlashMessage from 'react-native-flash-message';
import {LogBox} from 'react-native';
import {DefaultTheme,Provider as PaperProvider} from 'react-native-paper';


LogBox.ignoreAllLogs(true);
export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primaryButton: '#2898A4',
      whiteColor: '#ffffff',
      darkColor: '#3E3E3E',
      fadeDarkColor: '#717171',
      fadeDarkColor2: '#8F8F8F',
      // primaryButton: 'green',
      secondaryButon: 'yellow',
      primaryText: '#000',
      secondaryText: 'red'
  }
}
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
         <Routes />
      </PaperProvider>
      <FlashMessage position="bottom" icon="auto" />
    </Provider>
  );
}

/* */
