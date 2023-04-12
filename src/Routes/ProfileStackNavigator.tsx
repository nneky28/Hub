import React from "react"
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreenList } from "./types";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
import PersonalInfo from "../screens/PersonalInfo";
import EditPhoto from "../screens/EditPhoto";
import Compensation from "../screens/Compensation";
import Setting from "../screens/Settings";
import NextKin from "../screens/NextKin";
import Emergency from "../screens/Emergency";

const ProfileStackNavigator = () => {
    const Stack = createStackNavigator<ProfileScreenList>(); 
    return(
        <Stack.Navigator
            initialRouteName="ProfileHome"
            screenOptions={{ headerShown : false }}>
            <Stack.Screen name="ProfileHome" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
            <Stack.Screen name="EditPhoto" component={EditPhoto} />
            <Stack.Screen name="Compensation" component={Compensation} />
            <Stack.Screen name="Settings" component={Setting} />
            <Stack.Screen name="NextKin" component={NextKin} />
            <Stack.Screen name="Emergency" component={Emergency} />
            <Stack.Screen name="PensionInfo" component={PersonalInfo} />
        </Stack.Navigator>
    )
}

export default ProfileStackNavigator



