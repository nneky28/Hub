import {
    View, Text, TouchableOpacity, Image, ScrollView,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { H1, BackHandler, Container, TouchableWrapper, PageLoader, EmptyStateWrapper } from '../../utills/components'
import { height, width } from 'react-native-dimension';
import styles from './styles';
import TodoContent from '../../components/TodoContent/Index'
import AppColors from '../../utills/AppColors';
import { useFetchPeopleStatics, useFetchPersonalTask, useFetchPersonalDue, useFetchPersonalUpcoming, useFetchPersonalOverdue } from '../../utills/api';
import { Capitalize } from '../../utills/Methods';
import numeral from 'numeral'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Images } from '../../component2/image/Image';




const Index = ({ route }) => {

    const { item } = route.params
    const [tab, setTab] = useState('All');
    const [show, setShow] = useState(false);
    const [count, setCount] = useState(0);
    const [actionTitle, setActionTitle] = useState("To-Do");
    const [dueTodayPage, setDueTodayPage] = useState(1)
    const [dueItems, setDueItems] = useState([])
    const [upcomingPage, SetupcomingPage] = useState(1)
    const [upcomingItems, setUpcomingItems] = useState([])
    const [overduepage, setOverduePage] = useState(1)
    const [overdueItems, setOverdueItems] = useState([])
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])


    const {
        data: counts
    } = useFetchPeopleStatics(item.id)


    const {
        data: allEmployeeTask,
        isLoading: loadingAllTask,
    } = useFetchPersonalTask(tab, item.id)

    const {
        data: dueTask,
        isLoading: loadingDue
    } = useFetchPersonalDue(tab, item.id)

    const {
        data: upcomingTask,
        isLoading: loadingUpcoming
    } = useFetchPersonalUpcoming(tab, item.id)

    const {
        data: overdueTask,
        isLoading: loadingOverdue
    } = useFetchPersonalOverdue(tab, item.id)

    const __flattenArr = () => {
        let flattenedArr = []
        if (tab === "All" && allEmployeeTask && allEmployeeTask?.pages && Array.isArray(allEmployeeTask?.pages)) {
            flattenedArr = allEmployeeTask?.pages
        }
        if (actionTitle === "To-Do" && tab === "Due Today" && dueTask && dueTask?.pages && Array.isArray(dueTask?.pages)) {
            flattenedArr = dueTask?.pages
        }
        if (actionTitle === "To-Do" && tab === 'Upcoming' && upcomingTask && upcomingTask?.pages && Array.isArray(upcomingTask?.pages)) {
            flattenedArr = upcomingTask?.pages
        }
        if (actionTitle === "To-Do" && tab === "Overdue" && overdueTask && overdueTask?.pages && Array.isArray(overdueTask?.pages)) {
            flattenedArr = overdueTask?.pages
        }

        flattenedArr = flattenedArr.map((res) => {
            if (!res) return {}
            return res.results
        })

        let arr = flattenedArr.flat()
        if (actionTitle === "To-Do" && tab === "All")
            return page > 1 ? setData([...data, ...arr]) : setData(arr)

        if (actionTitle === "To-Do" && tab === "Due Today")
            return dueTodayPage > 1 ? setDueItems([...dueItems, ...arr]) : setDueItems(arr)

        if (actionTitle === "To-Do" && tab === "Upcoming")
            return upcomingPage > 1 ? setUpcomingItems([...upcomingItems, ...arr]) : setUpcomingItems(arr)

        if (actionTitle === "To-Do" && tab === "Overdue")
            return overduepage > 1 ? setOverdueItems([...overdueItems, ...arr]) : setOverdueItems(arr)


    }


    const only_Todos = Object.values(data).filter((item) => item.status !== "Completed" && item.status !== "In-progress");
    const only_inProgress = Object.values(data).filter((item) => item.status !== "Completed" && item.status !== "To-do")
    const only_completed = Object.values(data).filter((item) => item.status !== "To-do" && item.status !== "In-progress")
    const only_overdue = Object.values(overdueItems).filter((item) => item.status !== "In-progress");



    useEffect(() => {
        __flattenArr()
    }, [allEmployeeTask, dueTask, upcomingTask, overdueTask]);





    return (
        <ScreenWrapper scrollEnabled={false} >
            <View style={styles.header}>
                <BackHandler position={'center'} />
                <Text numberOfLines={1} style={styles.screenTitle}>
                    {Capitalize(`${item.first_name} ${item.last_name} `)}
                </Text>
                <View style={{ width: width(5) }} />
            </View>
            <View style={styles.line} />


            <View style={styles.boxContainer}>
                {
                    [
                        {
                            selected: "To-Do",
                            colorUp: AppColors.newBlue,
                            image: Images.clippedPart,
                            count: counts ? numeral(counts?.todo_count).format("0,0") : 0,
                        },

                        {
                            selected: "In Progress",
                            colorUp: AppColors.yellow,
                            image: Images.clippedPart,
                            count: counts ? numeral(counts?.inprogress_count).format("0,0") : 0,

                        },
                        {
                            selected: "Completed",
                            colorUp: AppColors.green,
                            image: Images.clippedPart,
                            count: counts ? numeral(counts?.completed_count).format("0,0") : 0,

                        }
                    ].map((item, i) => <TouchableOpacity key={i} onPress={() => {
                        setActionTitle(item.selected)
                        setCount(item.count)
                        setTab(tab)

                    }}>
                        <Container
                            backgroundColor={item.colorUp}
                            style={styles.mainContainer}>
                            <View>
                                <View style={styles.titleCon}>
                                    <H1 style={styles.title}>{item.selected}</H1>
                                    {item.selected === actionTitle && <Ionicons name="checkbox" size={12} color={AppColors.white} />}
                                </View>
                                <View>
                                    <Image source={{ uri: Images.clippedPart }} style={styles.clipped} />
                                    <H1 color={AppColors.white} fontSize={7} style={styles.count}>{item.count}</H1>
                                </View>
                            </View>
                        </Container>
                    </TouchableOpacity>)
                }
            </View>
            <View style={styles.container}>
                <H1 color={AppColors.black1}>{actionTitle}{' '}({
                    actionTitle === 'To-Do' ? counts?.todo_count : actionTitle === 'In Progress' ? counts?.inprogress_count : actionTitle === 'Completed' ? counts?.completed_count : null
                })
                </H1>
            </View>
            {/* empty states  */}

            {
                (
                    (actionTitle === "In Progress") && only_inProgress && Array.isArray(only_inProgress) &&
                    only_inProgress.length === 0 && !loadingAllTask
                ) ? (
                    <EmptyStateWrapper
                        icon={Images.EmptyTeams}
                        header_1={"No task here"}
                        sub_text={"When you have, they will show up here."}
                        marginTop={1}
                    />
                ) : null
            }
            {
                (
                    (actionTitle === "Completed") && only_completed && Array.isArray(only_completed) &&
                    only_completed.length === 0 && !loadingAllTask
                ) ? (
                    <EmptyStateWrapper
                        icon={Images.EmptyTeams}
                        header_1={"No task here"}
                        sub_text={"When you have, they will show up here."}
                        marginTop={1}
                    />
                ) : null
            }


            {
                actionTitle === "To-Do" &&
                <View style={styles.scrollViewContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {
                            ['All', 'Due Today', 'Upcoming', 'Overdue', 'No Date'].map((item, i) => (
                                <TouchableWrapper
                                    onPress={() => setTab(item)}
                                    isText
                                    width={25}
                                    style={tab === item ? styles.currentTab : styles.defaultTab}
                                    key={i}>
                                    <H1 fontSize={3.3} style={tab === item ? styles.selectedTab : styles.tab}>{item}</H1>
                                </TouchableWrapper>
                            ))
                        }
                    </ScrollView>
                </View>
            }
            {
                (
                    (actionTitle === "To-Do") && data && Array.isArray(data) &&
                    data.length === 0 && !loadingAllTask
                ) ? (
                    <EmptyStateWrapper
                        icon={Images.EmptyTeams}
                        header_1={"No task here"}
                        sub_text={"When you have, they will show up here."}
                        marginTop={1}
                    />
                ) : null
            }
            {
                (
                    (tab === "Due Today") && dueItems && Array.isArray(dueItems) &&
                    dueItems.length === 0 && !loadingDue
                ) ? (
                    <EmptyStateWrapper
                        icon={Images.EmptyTeams}
                        header_1={"No task here"}
                        sub_text={"When you have, they will show up here."}

                    />
                ) : null
            }
            {
                (
                    (tab === "Upcoming") && upcomingItems && Array.isArray(upcomingItems) &&
                    upcomingItems.length === 0 && !loadingUpcoming
                ) ? (
                    <EmptyStateWrapper
                        icon={Images.EmptyTeams}
                        header_1={"No task here"}
                        sub_text={"When you have, they will show up here."}

                    />
                ) : null
            }
            {
                (
                    (tab === "Overdue") && overdueItems && Array.isArray(overdueItems) &&
                    overdueItems.length === 0 && !loadingOverdue
                ) ? (
                    <EmptyStateWrapper
                        icon={Images.EmptyTeams}
                        header_1={"No task here"}
                        sub_text={"When you have, they will show up here."}
                    />
                ) : null
            }


            {
                loadingAllTask || loadingDue || loadingOverdue || loadingUpcoming ? <PageLoader /> : null
            }

            {
                actionTitle === "To-Do" && tab === "All" ? only_Todos.map((item, i) => (
                    <TodoContent
                        key={i}
                        show={show}
                        title={actionTitle}
                        count={count}
                        item={item}
                        __flattenArr={__flattenArr}
                    />
                )) : null
            }
            <View>
                {
                    actionTitle === 'To-Do' && tab === "Due Today" && !loadingDue ? dueItems.map((item, i) => (
                        <TodoContent
                            key={i}
                            count={count}
                            item={item}
                            title={actionTitle}
                            isSent
                            __flattenArr={__flattenArr}
                        />
                    )) : null
                }
            </View>

            <View>
                {
                    actionTitle === 'To-Do' && tab === "Upcoming" && !loadingUpcoming ? upcomingItems.map((item, i) => (
                        <TodoContent
                            key={i}
                            count={count}
                            item={item}
                            title={actionTitle}
                            isSent
                            __flattenArr={__flattenArr}
                        />
                    )) : null
                }
            </View>

            <View>
                {
                    actionTitle === 'To-Do' && tab === "Overdue" && !loadingOverdue ? only_overdue.map((item, i) => (
                        <TodoContent
                            key={i}
                            count={count}
                            item={item}
                            title={actionTitle}
                            isSent
                            __flattenArr={__flattenArr}
                        />
                    )) : null
                }
            </View>


            {
                actionTitle === "In Progress" ? only_inProgress.map((item, i) => (
                    <TodoContent
                        key={i}
                        show={show}
                        title={actionTitle}
                        count={count}
                        item={item}
                        __flattenArr={__flattenArr}
                    />
                )) : null
            }

            {
                actionTitle === "Completed" ? only_completed.map((item, i) => (
                    <TodoContent
                        key={i}
                        show={show}
                        title={actionTitle}
                        count={count}
                        item={item}
                        __flattenArr={__flattenArr}
                    />
                )) : null
            }



        </ScreenWrapper>
    )
}
export default Index;