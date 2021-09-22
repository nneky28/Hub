import React, {useEffect} from 'react';
import Routes from './Routes/index';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './Redux/index';
import FlashMessage from 'react-native-flash-message';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs(true);
export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <Provider store={store}>
      <Routes />
      <FlashMessage position="bottom" icon="auto" />
    </Provider>
  );
}

/* */
