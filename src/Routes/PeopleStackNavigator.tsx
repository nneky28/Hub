import React from "react"
import { createStackNavigator } from "@react-navigation/stack";
import { PeopleScreenList } from "./types";
import People from "../screens/People";
import MemberProfile from "../screens/MemberProfile";

const PeopleStackNavigator = () => {
    const Stack = createStackNavigator<PeopleScreenList>(); 
    return(
        <Stack.Navigator
            initialRouteName="People"
            screenOptions={{ headerShown : false }}>
            <Stack.Screen name="People" component={People} />
            <Stack.Screen name="MemberProfile" component={MemberProfile} />
        </Stack.Navigator>
    )
}

export default PeopleStackNavigator

