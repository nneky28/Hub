
# ReactNativeBoilerPlate
Follow the steps below to run the project

1.  Clone Master Branch
2.  Open terminal in project's root directory.
3.  Run the command 

>yarn add @react-navigation/native @react-navigation/stack react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view react-redux redux redux-thunk react-native-dimension react-native-keyboard-aware-scrollview

OR

> yarn

4. Run the project

<b>Android</b>
> npx react-native run-android

<b>IOS</b>
> cd ios/

> pod install

> cd ..

> npx react-native run-ios


<b>Added Features</b>

1. Redux Setup for 
    
    1. Auth
        
    2. Config 
        
2. Global Loader Modal Setup (Please Setup UI according to App Theme)
    
3. Bottom Alert for success, failure, warning etc. 
    
   NPM Package used for Alert is <a>https://github.com/lucasferreira/react-native-flash-message#readme</a>.
       
   Read documentation for usage.
   
Following Scripts added 
1. <b>yarn runios</b>

   OR
   
    <b>npm runios</b>
    
   [Which is short form of yarn && cd ios && pod install && cd .. && react-native run-ios]

2. <b>yarn assembleDebug</b> 

    OR
    
    <b>npm assembleDebug</b> 
    
    [Which will create android bundle, clean gradlew and assembleDebug]
    
    Note: Make sure "assets" folder is created at "android/app/src/main"
3. <b>For Deep Links/Universal Links<b/>
    Use the following urls to confirm universal links are correctly configured
    <ul>
        <li>For android https://developers.google.com/digital-asset-links/tools/generator</li>
        <li>For ios https://branch.io/resources/aasa-validator/</li>
        <li>https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://coolowo.com&relation=delegate_permission/common.handle_all_urls
</li>
    </ul>
<em><b>Author<b/>: Shoaib Ahmed <b>[Develo IT Solutions Pvt Ltd.]<b/></em>

4. <b>STEPS TO FOLLOW WHILE PUSHING TO PRODUCTION</b>
    <ul>
        <li>Change the BASE_URL IN api.js</li>
        <li>Change the BASE_URL in constants.js</li>
        <li>For android, change the codepush key in strings.xml</li>
        <li>For ios, change the codepush key in info.plist</li>
    </ul>

[![Build status](https://build.appcenter.ms/v0.1/apps/f08a04e5-4b41-4af6-a57d-1a9ae3da19c1/branches/myEdge/badge)](https://appcenter.ms)
