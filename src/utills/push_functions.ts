import messaging from '@react-native-firebase/messaging';
import { APIFunction } from './api';
import notifee,{AuthorizationStatus, AndroidImportance, AndroidStyle, EventDetail, EventType} from '@notifee/react-native';
import { PushNotificationData } from '../Routes/types';

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

const generateTimeoffNotifeeProperties = async (message : PushNotificationData) => {
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
      let ios = {}
      let android = {}
      if(message?.data?.type === "time_off_request"){
        const properties = await generateTimeoffNotifeeProperties(message)
        ios = properties?.ios || {}
        android = properties?.android || {}
      }
      // Display a notification
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
    if(data?.type === "time_off_request"){
        return {
            screen : "Time off",
            stack : "Menu",
            params : undefined
        }
    }
  }