import messaging from '@react-native-firebase/messaging';

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (!enabled) return
    await messaging().registerDeviceForRemoteMessages();
    // Get the token
    const token = await messaging().getToken();
    console.log("TOKEN--",token)

}