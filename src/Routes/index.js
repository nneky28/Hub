import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Benefits from '../screens/Benefits';
import Compensation from '../screens/Compensation';
import Dashboard from '../screens/Dashboard';
import Documents from '../screens/Documents';
import EditPhoto from '../screens/EditPhoto';
import EditProfile from '../screens/EditProfile';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
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
import Settings from '../screens/Settings';
import Drawer from './Drawer';
import TabBar from './TabBar';
import { getData, ToastSuccess,storeData } from '../utills/Methods';
import codePush from 'react-native-code-push';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { login } from '../Redux/Actions/Auth';
import NextKin from '../screens/NextKin';
import Emergency from '../screens/Emergency';
import PensionInfo from '../screens/PensionInfo';
import { APIFunction } from '../utills/api';
import { Container } from '../utills/components';
import { Linking, Platform } from 'react-native';
import { BASE_URL } from '../utills/Constants';
import LandingPage from '../screens/LandingPage';
import { setLoaderVisible } from '../Redux/Actions/Config';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import Crashes from 'appcenter-crashes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime : 1000 * 250 * 60, //cache expires in 250 minutes
      staleTime : 1000 * 250 * 60 //fetch new records every 250 minutes for stale records.
    },
  },
})
const queryCache = new QueryCache()
const Stack = createStackNavigator();
const DrawerStack = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const Routes = () => {
  const route = useSelector((state) => state.Auth.route);
  const auth = useSelector((state)=>state.Auth)
  const dispatch = useDispatch();

  const logoutMethod = async () => {
    try{
      let keys = await AsyncStorage.getAllKeys()
      AsyncStorage.multiRemove(keys);
      dispatch(setLoaderVisible(false))
      queryCache.clear()
      dispatch(login({...auth,route : "auth",isLogin : false}));
      ToastSuccess("Successfully logged out")
    }catch(err){
    }
  };


   
    const getDeepLinkInfo = async () => {
      let url = await Linking.getInitialURL()
      if(route === "main" || !url) return
      let split = Platform.OS === "ios" ?  url.split("myedgeapp:///") : url.split("https://coolowo.com/")
      let load = {...auth,onboard : true,url : split.length > 1 ? split[1] : null}
      await storeData("auth",load)
      dispatch(login(load))
    }
    const deepLinkListener = () => {
      Linking.addEventListener('url', async ({url}) => {
        if(route === "main" || !url) return
        let split = Platform.OS === "ios" ?  url.split("myedgeapp:///") : url.split("https://coolowo.com/")
        let load = {...auth,onboard : true,url : split.length > 1 ? split[1] : null}
        await storeData("auth",load)
        dispatch(login(load))
      })
    }
    useEffect(()=>{
      getDeepLinkInfo()
      deepLinkListener()
    },[])

  useEffect(()=>{
   // throw new Error('This is a test javascript crash!');
    Crashes.setListener({

      shouldProcess: function (report) {
          return true; // return true if the crash report should be processed, otherwise false.
      },
  
      // Other callbacks must also be defined at the same time if used.
      // Default values are used if a method with return parameter isn't defined.
  });
  },[])
  return (
    <QueryClientProvider client={queryClient}>
            <NavigationContainer>
      <Loader />
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
          screenListeners={{
            state: async (e) => {
              let timeout = await getData("logout_time")
              let check = timeout ? moment(new Date()).isAfter(timeout) : true;
              if(check){
                return logoutMethod()
              }
              let res = await APIFunction.unseen_count()
              dispatch(login({...auth,notifications : res.count}));
            },
          }}
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
                        <Stack.Screen name="Time off" component={TimeOff} />
                        <Stack.Screen name="Notifications" component={Notifications} />
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="Menu">
                  {() => (
                      <Stack.Navigator
                        screenOptions={{headerMode: false}}>
                          <Stack.Screen name="Todos" component={Todos} />
                          <Stack.Screen name="Time off" component={TimeOff} />
                        <Stack.Screen name="Payslip" component={Payslips} />
                        <Stack.Screen name="Benefits" component={Benefits} />
                        <Stack.Screen name="Documents" component={Documents} />
                        <Stack.Screen name="Trainings" component={Training} />
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="People">
                  {() => (
                      <Stack.Navigator
                        initialRouteName="People"
                        screenOptions={{headerMode: false}}>
                           <Stack.Screen name="People" component={People} />
                           <Stack.Screen name="MemberProfile" component={MemberProfile} />
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
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
                        <Stack.Screen name="Settings" component={Settings}/>
                        <Stack.Screen name="NextKin" component={NextKin}/>
                        <Stack.Screen name="Emergency" component={Emergency}/>
                        <Stack.Screen name="PensionInfo" component={PensionInfo}/>
                      </Stack.Navigator>
                    )}
                    </Tab.Screen>
                </Tab.Navigator>
              );
            }}
          </DrawerStack.Screen>
          <DrawerStack.Screen name="Settings" component={Settings} />
        </DrawerStack.Navigator>
      ) :
       route === "onboard"  ? (
        <Stack.Navigator
          initialRouteName="LandingPage"
          screenOptions={{headerMode: false}}
        >
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
          <Stack.Screen name="EditPhoto" component={EditPhoto} />
          <Stack.Screen name="Emergency" component={Emergency}/>
          <Stack.Screen name="NextKin" component={NextKin}/>
          <Stack.Screen name="PensionInfo" component={PensionInfo}/>
      </Stack.Navigator>
      ) : 
      (
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{headerMode: false}}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
    </QueryClientProvider>
  );
}
let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};
export default codePush(codePushOptions)(Routes);