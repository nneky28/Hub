import React, { useEffect } from 'react';
import Routes from './Routes/index';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './Redux/index';
import FlashMessage from 'react-native-flash-message';
import { LogBox } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';


LogBox.ignoreAllLogs(true);
const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        //cacheTime: 1000 * 250 * 60, //cache expires in 5 minutes
        staleTime: 1000 * 0.5 * 60 //fetch new records every 0.5 minutes for stale records.
      },
    },
  }
)
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
    <NavigationContainer>
      {console.log("APP.js")}
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PaperProvider theme={theme}>
            <Routes />
          </PaperProvider>
          <FlashMessage position="top" icon="auto" />
        </Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

/* */
