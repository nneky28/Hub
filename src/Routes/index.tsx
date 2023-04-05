import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
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
import TaskMainPage from '../screens/TaskMainPage/Index'
import OnboardingTask from '../screens/OnboardingTask/Index'
import HomeScreen from '../screens/OnboardingTask/HomeScreen';
import Drawer from './Drawer';
import TabBar from './TabBar';
import { getData, ToastSuccess, storeData, useAppSelector, useAppDispatch } from '../utills/Methods';
import codePush from 'react-native-code-push';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../Redux/Actions/Auth';
import NextKin from '../screens/NextKin';
import Emergency from '../screens/Emergency';
import PensionInfo from '../screens/PensionInfo';
import { APIFunction, useFetchAboutMe, useFetchAttendanceConfig, useFetchAttendanceStatus } from '../utills/api';
import { CustomFallBackScreen } from '../utills/components';
import { AppState, Linking, Platform } from 'react-native';
import LandingPage from '../screens/LandingPage';
import { setLoaderVisible, setSecurityVisible } from '../Redux/Actions/Config';
import { focusManager,useQueryClient } from 'react-query';
import ErrorBoundary from 'react-native-error-boundary'
import Crashes from 'appcenter-crashes';
import SpInAppUpdates, {
  IAUUpdateKind, StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import PayslipHistory from '../screens/PayslipHistory';
import PayslipBreakDown from '../screens/PayslipBreakDown';
import SecurityModal from '../components/SecurityModal';
import Config from "react-native-config"
import { notifeeEventHandler, onCreateScheduledNotification, onDisplayNotification, requestUserPermission, screenDeterminant } from '../utills/push_functions';
import { CLOCK_IN_ALERT, PushNotificationData } from './types';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventDetail, EventType } from '@notifee/react-native';
import { useFetchAttendanceConfigProps, useFetchAttendanceStatusProps } from '../components/ClockInComponent/types';
import { useFetchAboutMeProps } from '../components/TimeoffModal/types';
import { Images } from '../component2/image/Image';

const inAppUpdates = new SpInAppUpdates(
  false // isDebug
);
const Stack = createStackNavigator();
const DrawerStack = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const Routes = () => {
  const route = useAppSelector((state) => state.Auth.route);
  const auth = useAppSelector((state) => state.Auth)
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient()
  const [backgroundEventDetails,setBackgroundEventDetails] = React.useState<EventDetail>()
  const {
    data : config,
  } = useFetchAttendanceConfig(route) as useFetchAttendanceConfigProps
  const {
    data : about
  } = useFetchAboutMe(route) as useFetchAboutMeProps

  const {
    data : status,
  } = useFetchAttendanceStatus(route) as useFetchAttendanceStatusProps

  const logoutMethod = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys()
      //keys.splice(keys.indexOf(`@${auth?.user?.email}`), 1)
      AsyncStorage.multiRemove(keys);
      dispatch(setLoaderVisible(false))
      queryClient.invalidateQueries("")
      dispatch(setSecurityVisible(false))
      dispatch(login({ ...auth, route: "auth", isLogin: false }));
      ToastSuccess("Successfully logged out")
    } catch (err) {
    }
  };



  const getDeepLinkInfo = async () => {
    let url = await Linking.getInitialURL()
    if (route === "main" || !url || ! Config?.IOS_DEEP_LINK || !Config?.ANDROID_DEEP_LINK) return
    let split = Platform.OS === "ios" ? url.split(Config?.IOS_DEEP_LINK) : url.split(Config?.ANDROID_DEEP_LINK)
    let load = { ...auth, onboard: true, url: split.length > 1 ? split[1] : null }
    await storeData("auth", load)
    dispatch(login(load))
  }
  const deepLinkListener = () => {
    Linking.addEventListener('url', async ({ url }) => {
      if (route === "main" || !url || !Config.IOS_DEEP_LINK || !Config.ANDROID_DEEP_LINK) return
      let split = Platform.OS === "ios" ? url.split(Config.IOS_DEEP_LINK) : url.split(Config.ANDROID_DEEP_LINK)
      let load = { ...auth, onboard: true, url: split.length > 1 ? split[1] : null }
      await storeData("auth", load)
      dispatch(login(load))
    })
  }

  const notifeeBackgroundEventHandler = () => {
    return AppState.addEventListener("change",async nextAppState =>{
      if (nextAppState === "active" && auth?.route === "main") {
        let detail : EventDetail | null | false | string = await getData("backgroundEventDetails")
        if(typeof detail === "string" || !detail || !detail?.notification) return
        let resp = screenDeterminant(detail)
        await storeData("backgroundEventDetails",{})
        setBackgroundEventDetails(detail)
        navigation.navigate(resp?.stack,{screen : resp?.screen,params : resp?.params})
      }
    })
  }

  const AppStateListener = () => {
    return AppState.addEventListener("change", async nextAppState => {
      if (nextAppState === "active" && auth?.route === "main") {
        let token = await getData("token")
        let res = await getData("lastActiveMoment")
        if(typeof res !== "string") return
        focusManager.setFocused(true)
        if (!token || !moment().isAfter(moment(res).add(1, "minute"))) return
        dispatch(setSecurityVisible(true))
      }
    })
  }

  const pushNotificationInit = async () => {
    try{
      await requestUserPermission()
      if(
        !config?.data?.start_date || 
        !moment(config?.data?.start_date).isBefore(moment()) || 
        !about?.employee_job?.arrival_time 
      ){
        return
      }
      if(
        moment().isAfter(moment(about?.employee_job?.arrival_time,"HH:mm:ss").subtract(5,"minutes"))
      ){
        //IF IT IS PAST THE CLOCK IN TIME, SET A REMINDER FOR TOMORROW
        let time = moment(about?.employee_job?.arrival_time,"HH:mm:ss").add(24,"hours").subtract(5,"minutes").valueOf()
        return onCreateScheduledNotification(time,"Now is a good time to Clock In",`It’s almost ${moment(about?.employee_job?.arrival_time,"HH:mm:ss").format("hh:mm a")}, don’t forget to clock in.`,CLOCK_IN_ALERT,Images.ClockIn) 
      }
      if(!status?.is_clocked_in && !moment().isAfter(moment(about?.employee_job?.arrival_time,"HH:mm:ss").subtract(5,"minutes"))){
        //IF USER IS NOT CLOCKED IN AND IT IS NOT YET TIME
        //NOTIFEE ON IOS IGNORES THE START DATE OF TRIGGERED NOTIFICATION
        let time = moment(about?.employee_job?.arrival_time,"HH:mm:ss").subtract(5,"minutes").valueOf()
        onCreateScheduledNotification(time,"Now is a good time to Clock In",`It’s almost ${moment(about?.employee_job?.arrival_time,"HH:mm:ss").format("hh:mm a")}, don’t forget to clock in.`,CLOCK_IN_ALERT,Images.ClockIn)
      }
    }catch(err){

    }
  }
  useEffect(()=>{
    if(route !== "main") return
    pushNotificationInit()
  },[route,about,config,status])

  useEffect(()=>{
    const unsubscribe = notifee.onForegroundEvent(async ({type,detail})=>{
      if(route !== "main") return
      if(type === EventType.PRESS){
        let resp = screenDeterminant(detail)
        if(!resp?.stack) return
        return navigation.navigate(resp?.stack,{screen : resp?.screen,params : resp?.params})
      }
      await notifeeEventHandler(type,detail)
    })
    return unsubscribe
  },[route])
  
  useEffect(()=>{
    const unsubscribe = messaging().onMessage(async (message : PushNotificationData)=>{
      onDisplayNotification(message)
    })
    return unsubscribe
  },[])

  useEffect(() => {
    AppStateListener()
    notifeeBackgroundEventHandler()
  }, [route,backgroundEventDetails])

  useEffect(() => {
    getDeepLinkInfo()
    deepLinkListener()
  }, [])

  const inAppUpdatesCheck = async () => {
    try {
      let result = await inAppUpdates.checkNeedsUpdate()
      if (!result.shouldUpdate) {
        return
      }
      const updateOptions : StartUpdateOptions | undefined = Platform.select({
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
      if(!updateOptions) return
      inAppUpdates.startUpdate(updateOptions);
    } catch (err) {
    }
  }

  useEffect(() => {
    inAppUpdatesCheck()
    Crashes.setListener({
      shouldProcess: function () {
        return true; // return true if the crash report should be processed, otherwise false.
      },
      // Other callbacks must also be defined at the same time if used.
      // Default values are used if a method with return parameter isn't defined.
    });
  }, [])

  return (
    <ErrorBoundary FallbackComponent={CustomFallBackScreen}>
    <Loader />
    <SecurityModal />
    {
      route === "splash" ? (
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown : false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Onboard" component={Onboard} />
        </Stack.Navigator>
      ) : route === "main" ?
        (
          <DrawerStack.Navigator
            screenListeners={{
              state: async () => {
                let timeout = await getData("logout_time")
                //It takes about 15 days before token expires.
                if (timeout && (moment(timeout).diff(moment(), "days") > 15)) return logoutMethod()
                let check = timeout ? moment(new Date()).isAfter(timeout) : true;
                if (check) {
                  return logoutMethod()
                }
                storeData("lastActiveMoment", moment().toISOString())
                let res = await APIFunction.unseen_count() as {count? : number}
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
                      unmountOnBlur: true
                    }}
                  >
                    <Tab.Screen name="Home">
                      {() => (
                        <Stack.Navigator
                          initialRouteName="Dashboard"
                          screenOptions={{ headerShown : false }}>
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
                          screenOptions={{ headerShown : false }}
                        >
                          <Stack.Screen name="Task" component={Task} />
                          <Stack.Screen name="Time off" component={TimeOff} />
                          <Stack.Screen name="Payslip" component={PayslipHistory} />
                          <Stack.Screen name="PayslipBreakDown" component={PayslipBreakDown} />
                          <Stack.Screen name="Benefits" component={Benefits} />
                          <Stack.Screen name="Documents" component={Documents} />
                          <Stack.Screen name="Trainings" component={Training} />
                          <Stack.Screen name="TaskOnboarding" component={OnboardingTask} />
                          <Stack.Screen name="onBoardHome" component={HomeScreen} />
                          <Stack.Screen name="CreateTask" component={CreateTask} />
                          <Stack.Screen name="search" component={SearchScreen} />
                          <Stack.Screen name="profile" component={TeamProfile} />
                          <Stack.Screen name="TaskView" component={TaskMainPage} />
                        </Stack.Navigator>
                      )}
                    </Tab.Screen>
                    <Tab.Screen name="People">
                      {() => (
                        <Stack.Navigator
                          initialRouteName="People"
                          screenOptions={{ headerShown : false }}>
                          <Stack.Screen name="People" component={People} />
                          <Stack.Screen name="MemberProfile" component={MemberProfile} />
                        </Stack.Navigator>
                      )}
                    </Tab.Screen>
                    <Tab.Screen name="Profile">
                      {() => (
                        <Stack.Navigator
                          initialRouteName="Profile"
                          screenOptions={{ headerShown : false }}>
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
            screenOptions={{ headerShown : false }}
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
              screenOptions={{ headerShown : false }}>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
          )}
      </ErrorBoundary>
  );
}
let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.ON_NEXT_RESUME,
  rollbackRetryOptions: {
    delayInHours: (1 / 60),
    maxRetryAttempts: 3
  }
};
export default codePush(codePushOptions)(Routes);