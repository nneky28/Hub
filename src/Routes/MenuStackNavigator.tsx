import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Benefits from "../screens/Benefits"
import CreateTask from "../screens/CreateTask/Index"
import Documents from "../screens/Documents"
import PayslipBreakDown from "../screens/PayslipBreakDown"
import PayslipHistory from "../screens/PayslipHistory"
import TaskHome from "../screens/TaskHome/Index"
import TaskLandingPage from "../screens/TaskLandingPage"
import TaskOnboarding from "../screens/TaskOnboarding/Index"
import TaskPeopleList from "../screens/TaskPeopleList/Index"
import TeamTaskHome from "../screens/TeamTaskHome/Index"
import Training from "../screens/Training"
import { MenuScreenList } from "./types"
import TimeOff from "../screens/TimeOff"

const MenuStackNavigator = () =>{
    const Stack = createStackNavigator<MenuScreenList>()
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown : false
            }}
        >
            <Stack.Screen name="TaskHome" component={TaskHome} />
            <Stack.Screen name="TimeOff" component={TimeOff} />
            <Stack.Screen name="PayslipHistory" component={PayslipHistory} />
            <Stack.Screen name="PayslipBreakDown" component={PayslipBreakDown} />
            <Stack.Screen name="Benefits" component={Benefits} />
            <Stack.Screen name="Documents" component={Documents} />
            <Stack.Screen name="Trainings" component={Training} />
            <Stack.Screen name="TaskOnboarding" component={TaskOnboarding} />
            <Stack.Screen name="TaskLandingPage" component={TaskLandingPage} />
            <Stack.Screen name="CreateTask" component={CreateTask} />
            <Stack.Screen name="TaskPeopleList" component={TaskPeopleList} />
            <Stack.Screen name="TeamTaskHome" component={TeamTaskHome} />
        </Stack.Navigator>
    )
}

export default MenuStackNavigator;