/**
 * @format
 */

import { AppRegistry, Text } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { notifeeEventHandler, onDisplayNotification } from './src/utills/push_functions';
import { PushNotificationData } from './src/Routes/types';
import notifee, { EventType } from '@notifee/react-native';
import { Images } from './src/component2/image/Image';
import { storeData } from './src/utills/Methods';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

notifee.onBackgroundEvent(async ({type,detail})=>{
    if(type === EventType.PRESS){
        return storeData("backgroundEventDetails",detail)
    }
    await notifeeEventHandler(type,detail)
  })
  
  messaging().setBackgroundMessageHandler(async (message)=>{
    onDisplayNotification(msg)
  })
AppRegistry.registerComponent(appName, () => App);
