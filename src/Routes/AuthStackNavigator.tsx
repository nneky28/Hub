import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import Login from "../screens/Login"
import Welcome from "../screens/Welcome"
import { AuthScreenList } from "./types"

const AuthStackNavigator = () => {
    const Stack = createStackNavigator<AuthScreenList>()
    return(
        <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown : false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
    )
}

export default AuthStackNavigator;