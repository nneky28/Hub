import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import EditPhoto from "../screens/EditPhoto"
import Emergency from "../screens/Emergency"
import LandingPage from "../screens/LandingPage"
import NextKin from "../screens/NextKin"
import PensionInfo from "../screens/PensionInfo"
import PersonalInfo from "../screens/PersonalInfo"

const OnboardingStackNavigator = () => {
    const Stack = createStackNavigator()
    return(
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
    )
}

export default OnboardingStackNavigator