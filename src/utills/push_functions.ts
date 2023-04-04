import messaging from '@react-native-firebase/messaging';
import { APIFunction } from './api';
import notifee,{AuthorizationStatus, AndroidImportance, AndroidStyle, EventDetail, EventType, TimestampTrigger, TriggerType, RepeatFrequency, NotificationAndroid, NotificationIOS} from '@notifee/react-native';
import { PushNotificationData, TIME_OFF_REQUEST } from '../Routes/types';

export const requestUserPermission = async () => {
    try{
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (!enabled) return
        let setting = await notifee.requestPermission()
        if(setting.authorizationStatus < AuthorizationStatus.AUTHORIZED){
            return
        }
        await messaging().registerDeviceForRemoteMessages();
        // Get the token
        const token = await messaging().getToken();
        console.log("TOKEN",token)
        let fd = {
            user_type : "employee",
            registration_id : token
        } as const 
        await APIFunction.register_device_token(fd)
    }catch(err){

    }

}

const createChannel = async (name : string) => {
    const channelId = await notifee.createChannel({
      id: "important",
      name,
      importance: AndroidImportance.HIGH,
      sound : "bubble"
    });
    return channelId
  }

const generateNotifeeProperties = async (message : PushNotificationData) : Promise<{android : NotificationAndroid,ios : NotificationIOS}> => {
    await notifee.setNotificationCategories([
      {
        id : message?.data?.type || ""
      }
    ])
  
    // Create a channel (required for Android)
   const channelId = await createChannel(message?.data?.type || "")
  
    return {
      ios : {
        sound : "default",
        interruptionLevel: 'timeSensitive',
        categoryId : message?.data?.type || "",
        attachments : [
          {
            url: message?.data?.message_icon || "",
          },
        ]
      },
      android : {
        channelId,
        largeIcon : message?.data?.message_icon,
        sound : "bubble",
        importance : AndroidImportance.HIGH,
        style : {
          type : AndroidStyle.BIGPICTURE, picture : message?.data?.message_icon || ""
        },
        pressAction: {
          id: 'default',
        }
      }
    }
  }
export const  onDisplayNotification = async (message : PushNotificationData) => {
    try{
      const {ios, android} = await generateNotifeeProperties(message)
      await notifee.displayNotification({
        data : message?.data,
        title: message?.data?.message_title,
        body: message?.data?.message_body,
        ios,
        android,
      });
    }catch(err){
    }
  }

  export const notifeeEventHandler = async (type : EventType,detail : EventDetail) => {
    try{
      if(type === EventType.DELIVERED) return
    }catch(err){
    }
  }
  export const screenDeterminant = (detail : EventDetail) => {
    const {data} : PushNotificationData = detail?.notification || {}
    if(data?.type === TIME_OFF_REQUEST){
        return {
            screen : "Time off",
            stack : "Menu",
            params : undefined
        }
    }
  }

  export const onCreateScheduledNotification = async (time : number,title : string,body : string,type : string,icon : string)=> {
    try{
      // Create a time-based trigger
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: time, // fire at 11:10am (10 minutes before meeting)
        repeatFrequency : RepeatFrequency.DAILY
      };
      // Create a trigger notification
      const msg = {
        data : {
          message_body : body,
          message_icon : icon,
          message_title : title,
          type, 
          type_id : type
      }
      }
      const {ios,android} = await generateNotifeeProperties(msg)
      await notifee.createTriggerNotification(
        {
          id : type,
          title,
          body,
          android,
          ios
        },
        trigger,
      );
    }catch(err){
      //console.log("onCreateScheduledNotification Error",err)
    }
  }