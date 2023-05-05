import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import Dashboard from '../screens/Dashboard';
import DetailsScreen from '../screens/DetailsScreen';
import CartScreen from '../screens/CartScreen';
import Login from '../screens/Login';
import TabBar from './TabBar';
import {getData} from '../utills/Methods';
import codePush from 'react-native-code-push';
import LandingPage from '../screens/LandingPage';
import Settings from '../screens/Settings';
import Loader from '../components/Loader';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  const [isDataPresent, setIsDataPresent] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDataPresence = async () => {
      try {
        const value = await getData('sign up details');
        if (value !== null) {
          setIsDataPresent(true);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    checkDataPresence();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Loader />

      <Stack.Navigator
        initialRouteName="LandingPage"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Dashboard} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        {isDataPresent && (
          <Stack.Screen
            name="Dashboard"
            component={() => (
              <Tab.Navigator
                tabBar={(props) => <TabBar {...props} />}
                screenOptions={{
                  headerShown: false,
                  tabBarHideOnKeyboard: true,
                  unmountOnBlur: true,
                }}>
                <Tab.Screen name="Home" component={Dashboard} />
                <Tab.Screen
                  name="Saved"
                  component={Dashboard}
                  initialParams={{liked: true}}
                />

                <Tab.Screen name="Cart" component={CartScreen} />
                <Tab.Screen name="Settings" component={Settings} />
              </Tab.Navigator>
            )}
          />
        )}
      </Stack.Navigator>
    </>
  );
};
let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  rollbackRetryOptions: {
    delayInHours: 1 / 60,
    maxRetryAttempts: 3,
  },
};
export default codePush(codePushOptions)(Routes);
