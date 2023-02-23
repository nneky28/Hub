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
import Task from '../screens/Task/Index'
import CreateTask from '../screens/CreateTask/Index'
import SearchScreen from '../screens/SearchScreen/Index'
import TeamProfile from '../screens/TeamProfile/Index'
import OnboardingTask from '../screens/OnboardingTask/Index'
import HomeScreen from '../screens/OnboardingTask/HomeScreen';
import Drawer from './Drawer';
import TabBar from './TabBar';
import { getData, ToastSuccess, storeData } from '../utills/Methods';
import codePush from 'react-native-code-push';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../Redux/Actions/Auth';
import NextKin from '../screens/NextKin';
import Emergency from '../screens/Emergency';
import PensionInfo from '../screens/PensionInfo';
import { APIFunction } from '../utills/api';
import { Container, CustomFallBackScreen } from '../utills/components';
import { AppState, Linking, Platform } from 'react-native';
import { BASE_URL } from '../utills/Constants';
import LandingPage from '../screens/LandingPage';
import { setLoaderVisible, setSecurityVisible } from '../Redux/Actions/Config';
import { focusManager, QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from 'react-native-error-boundary'
import Crashes from 'appcenter-crashes';
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import PayslipHistory from '../screens/PayslipHistory';
import PayslipBreakDown from '../screens/PayslipBreakDown';
import CreatePIN from '../screens/Security/CreatePIN';
import ResetPIN from '../screens/Security/ResetPIN';
import UsePassword from '../screens/Security/UsePassword';
import SecurityModal from '../components/SecurityModal';
import Config from "react-native-config"

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        //refetchOnWindowFocus: false,
        cacheTime: 1000 * 250 * 60, //cache expires in 5 minutes
        staleTime: 1000 * 0.5 * 60 //fetch new records every 0.5 minutes for stale records.
      },
    },
  }
)
const inAppUpdates = new SpInAppUpdates(
  false // isDebug
);
const queryCache = new QueryCache()
const Stack = createStackNavigator();
const DrawerStack = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const Routes = () => {
  const route = useSelector((state) => state.Auth.route);
  const auth = useSelector((state) => state.Auth)
  const dispatch = useDispatch();

  const logoutMethod = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys()
      keys.splice(keys.indexOf(`@${auth?.user?.email}`), 1)
      AsyncStorage.multiRemove(keys);
      dispatch(setLoaderVisible(false))
      queryCache.clear()
      queryClient.invalidateQueries("")
      dispatch(setSecurityVisible(false))
      dispatch(login({ ...auth, route: "auth", isLogin: false }));
      ToastSuccess("Successfully logged out")
    } catch (err) {
    }
  };



  const getDeepLinkInfo = async () => {
    let url = await Linking.getInitialURL()
    if (route === "main" || !url) return
    let split = Platform.OS === "ios" ? url.split(Config.IOS_DEEP_LINK) : url.split(Config.ANDROID_DEEP_LINK)
    let load = { ...auth, onboard: true, url: split.length > 1 ? split[1] : null }
    await storeData("auth", load)
    dispatch(login(load))
  }
  const deepLinkListener = () => {
    Linking.addEventListener('url', async ({ url }) => {
      if (route === "main" || !url) return
      let split = Platform.OS === "ios" ? url.split(Config.IOS_DEEP_LINK) : url.split(Config.ANDROID_DEEP_LINK)
      let load = { ...auth, onboard: true, url: split.length > 1 ? split[1] : null }
      await storeData("auth", load)
      dispatch(login(load))
    })
  }

  let subscription;
  const AppStateListener = () => {
    subscription = AppState.addEventListener("change", async nextAppState => {
      if (nextAppState === "active" && auth?.route === "main") {
        let token = await getData("token")
        let res = await getData("lastActiveMoment")
        focusManager.setFocused(true)
        if (!token || !moment().isAfter(moment(res).add(5, "minute"))) return
        dispatch(setSecurityVisible(true))
      }
    })
  }

  useEffect(() => {
    AppStateListener()
    getDeepLinkInfo()
    deepLinkListener()
    return () => {
      subscription.remove()
    };
  }, [])

  const inAppUpdatesCheck = async () => {
    try {
      let result = await inAppUpdates.checkNeedsUpdate()
      if (!result.shouldUpdate) {
        return
      }
      const updateOptions = Platform.select({
        ios: {
          title: 'Update available',
          message: "There is a new version of MyEdge available on the App Store, do you want to update it?",
          buttonUpgradeText: 'Update',
          buttonCancelText: 'Cancel',
          forceUpgrade: false
        },
        android: {
          updateType: IAUUpdateKind.IMMEDIATE,
        },
      });
      inAppUpdates.startUpdate(updateOptions);
    } catch (err) {
    }
  }

  useEffect(() => {
    inAppUpdatesCheck()
    Crashes.setListener({
      shouldProcess: function (report) {
        return true; // return true if the crash report should be processed, otherwise false.
      },
      // Other callbacks must also be defined at the same time if used.
      // Default values are used if a method with return parameter isn't defined.
    });
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={CustomFallBackScreen}>

        <NavigationContainer>
          <Loader />
          <SecurityModal />
          {
            route === "splash" ? (
              <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{ headerMode: false }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Onboard" component={Onboard} />
              </Stack.Navigator>
            ) : route === "main" ?
              (
                <DrawerStack.Navigator
                  screenListeners={{
                    state: async (e) => {
                      let timeout = await getData("logout_time")
                      //It takes about 15 days before token expires.
                      if (timeout && (moment(timeout).diff(moment(), "days") > 15)) return logoutMethod()
                      let check = timeout ? moment(new Date()).isAfter(timeout) : true;
                      if (check) {
                        return logoutMethod()
                      }
                      storeData("lastActiveMoment", moment().toISOString())
                      let res = await APIFunction.unseen_count()
                      dispatch(login({ ...auth, notifications: res.count }));
                    },
                  }}
                  drawerContent={(props) => <Drawer {...props} />}
                  // initialRouteName="Dashboard"
                  screenOptions={{ headerShown: false }}>
                  <DrawerStack.Screen name="App">
                    {() => {
                      return (
                        <Tab.Navigator
                          tabBar={(props) => <TabBar {...props} />}
                          screenOptions={{
                            headerShown: false,
                            tabBarHideOnKeyboard: true,
                            unmountOnBlur : true
                          }}
                        >
                          <Tab.Screen name="Home">
                            {() => (
                              <Stack.Navigator
                                initialRouteName="Dashboard"
                                screenOptions={{ headerMode: false }}>
                                <Stack.Screen name="Dashboard" component={Dashboard} />
                                <Stack.Screen name="Todos" component={Todos} />
                                <Stack.Screen name="People" component={People} />
                                <Stack.Screen name="MemberProfile" component={MemberProfile} />
                                <Stack.Screen name="Notifications" component={Notifications} />
                              </Stack.Navigator>
                            )}
                          </Tab.Screen>
                          <Tab.Screen name="Menu">
                            {() => (
                              <Stack.Navigator
                                screenOptions={{ headerMode: false }}
                              >
                                <Stack.Screen name="Todos" component={Todos} />
                                <Stack.Screen name="Time off" component={TimeOff} />
                                <Stack.Screen name="Payslip" component={PayslipHistory} />
                                <Stack.Screen name="PayslipBreakDown" component={PayslipBreakDown} />
                                <Stack.Screen name="Benefits" component={Benefits} />
                                <Stack.Screen name="Documents" component={Documents} />
                                <Stack.Screen name="Trainings" component={Training} />
                                <Stack.Screen name="TaskOnboarding" component={OnboardingTask} />
                                <Stack.Screen name="onBoardHome" component={HomeScreen} />
                                <Stack.Screen name="Task" component={Task} />
                                <Stack.Screen name="CreateTask" component={CreateTask} />
                                <Stack.Screen name="search" component={SearchScreen} />
                                <Stack.Screen name="profile" component={TeamProfile} />

                              </Stack.Navigator>
                            )}
                          </Tab.Screen>
                          <Tab.Screen name="People">
                            {() => (
                              <Stack.Navigator
                                initialRouteName="People"
                                screenOptions={{ headerMode: false }}>
                                <Stack.Screen name="People" component={People} />
                                <Stack.Screen name="MemberProfile" component={MemberProfile} />
                              </Stack.Navigator>
                            )}
                          </Tab.Screen>
                          <Tab.Screen name="Profile">
                            {() => (
                              <Stack.Navigator
                                initialRouteName="Profile"
                                screenOptions={{ headerMode: false }}>
                                <Stack.Screen name="temp" component={ScreenTemplate} />
                                <Stack.Screen name="Profile" component={Profile} />
                                <Stack.Screen name="EditProfile" component={EditProfile} />
                                <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
                                <Stack.Screen name="EditPhoto" component={EditPhoto} />
                                <Stack.Screen name="Compensation" component={Compensation} />
                                <Stack.Screen name="Settings" component={Settings} />
                                <Stack.Screen name="NextKin" component={NextKin} />
                                <Stack.Screen name="Emergency" component={Emergency} />
                                <Stack.Screen name="PensionInfo" component={PensionInfo} />
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
              route === "onboard" ? (
                <Stack.Navigator
                  initialRouteName="LandingPage"
                  screenOptions={{ headerMode: false }}
                >
                  <Stack.Screen name="LandingPage" component={LandingPage} />
                  <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
                  <Stack.Screen name="EditPhoto" component={EditPhoto} />
                  <Stack.Screen name="Emergency" component={Emergency} />
                  <Stack.Screen name="NextKin" component={NextKin} />
                  <Stack.Screen name="PensionInfo" component={PensionInfo} />
                </Stack.Navigator>
              ) :
                (
                  <Stack.Navigator
                    initialRouteName="Welcome"
                    screenOptions={{ headerMode: false }}>
                    <Stack.Screen name="Welcome" component={Welcome} />
                    <Stack.Screen name="Login" component={Login} />
                  </Stack.Navigator>
                )}
        </NavigationContainer>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.ON_NEXT_RESUME,
  rollbackRetryOptions: {
    delayInHours: (1 / 60),
    maxRetryAttempts: 2
  }
};
export default codePush(codePushOptions)(Routes);