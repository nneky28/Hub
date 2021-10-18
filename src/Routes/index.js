import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Benefits from '../screens/Benefits';
import Compensation from '../screens/Compensation';
import Dashboard from '../screens/Dashboard';
import Documents from '../screens/Documents';
import EditPhoto from '../screens/EditPhoto';
import EditProfile from '../screens/EditProfile';
import Login from '../screens/Login';
import MemberProfile from '../screens/MemberProfile';
import Notifications from '../screens/Notifications';
import Payslips from '../screens/Payslips';
import People from '../screens/People';
import PersonalInfo from '../screens/PersonalInfo';
import Profile from '../screens/Profile';
import ScreenTemplate from '../screens/ScreenTemplate';
import TimeOff from '../screens/TimeOff';
import Todos from '../screens/Todos';
import Splash from '../screens/Splash';
import Onboard from '../screens/Onboard/onboard';
import Training from '../screens/Training';
import Drawer from './Drawer';
import TabBar from './TabBar';
import { getData } from '../utills/Methods';
import codePush from 'react-native-code-push';

const Stack = createStackNavigator();
const DrawerStack = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Routes = () => {
  const route = useSelector((state) => state.Auth.route);
  return (
    <NavigationContainer>
      <Loader />
      {console.log("route---",route)}
      {
        route === "splash" ? (
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{headerMode: false}}>
              <Stack.Screen name="Splash" component={Splash}/>
              <Stack.Screen name="Onboard" component={Onboard}/>
          </Stack.Navigator>
        ) : 
      route === "main" ? 
      (
        <DrawerStack.Navigator
          drawerContent={(props) => <Drawer {...props} />}
          // initialRouteName="Dashboard"
          screenOptions={{headerShown: false}}>
          <DrawerStack.Screen name="App">
            {() => {
              return (
                <Tab.Navigator
                  tabBar={(props) => <TabBar {...props} />}
                  screenOptions={{
                    headerShown: false, 
                    tabBarHideOnKeyboard:true
                    }}
                  >
                  <Tab.Screen name="Home">
                    {() => (
                      <Stack.Navigator
                        initialRouteName="Dashboard"
                        screenOptions={{headerMode: false}}>
                        <Stack.Screen name="Dashboard" component={Dashboard} />
                        <Stack.Screen name="Todos" component={Todos} />
                        <Stack.Screen name="People" component={People} />
                        <Stack.Screen name="MemberProfile" component={MemberProfile} />
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="Modules">
                  {() => (
                      <Stack.Navigator
                        screenOptions={{headerMode: false}}>
                          <Stack.Screen name="People" component={People} />
                        <Stack.Screen name="Time off" component={TimeOff} />
                        <Stack.Screen name="Payslip" component={Payslips} />
                        <Stack.Screen name="Benefits" component={Benefits} />
                        <Stack.Screen name="Documents" component={Documents} />
                        <Stack.Screen name="MemberProfile" component={MemberProfile} />
                        <Stack.Screen name="Trainings" component={Training} />
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="Notifications" component={Notifications} />
                  <Tab.Screen name="Profile">
                  {() => (
                      <Stack.Navigator
                        initialRouteName="Profile"
                        screenOptions={{headerMode: false}}>
                        <Stack.Screen name="temp" component={ScreenTemplate} />
                        <Stack.Screen name="Profile" component={Profile} />
                        <Stack.Screen name="EditProfile" component={EditProfile} />
                        <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
                        <Stack.Screen name="EditPhoto" component={EditPhoto} />
                        <Stack.Screen name="Compensation" component={Compensation} />
                      </Stack.Navigator>
                    )}
                    </Tab.Screen>
                </Tab.Navigator>
              );
            }}
          </DrawerStack.Screen>
        </DrawerStack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{headerMode: false}}>
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};
export default codePush(codePushOptions)(Routes);