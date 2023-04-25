import React from "react"
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreenList } from "./types";
import Dashboard from "../screens/Dashboard";
import Notifications from "../screens/Notifications";

const HomeStackNavigator = () => {
    const Stack = createStackNavigator<HomeScreenList>(); 
    return(
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{ headerShown : false }}
        >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Notifications" component={Notifications} />
        </Stack.Navigator>
    )
}

export default HomeStackNavigator