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
    // let msg = {
    //     data : {
    //       message_body : "Grace is requesting for a 3 day Sick Leave",
    //       message_icon : Images.EmptyTimeoff,
    //       message_title : "Time Off Request",
    //       type : "time_off_request",
    //       type_id : "34"
    //   }
    // }
    onDisplayNotification(message)
  })
AppRegistry.registerComponent(appName, () => App);
