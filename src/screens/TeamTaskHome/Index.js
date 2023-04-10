import {
    View, Text, TouchableOpacity, Image, ScrollView, FlatList, ImageBackground
} from 'react-native'
import React, { useState, useEffect } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { H1, BackHandler, Container, TouchableWrapper, PageLoader, P } from '../../utills/components'
import { height, width } from 'react-native-dimension';
import styles from './styles';
import TodoContent from '../../components/TodoContent/Index'
import AppColors from '../../utills/AppColors';
import {
    useFetchPeopleStatics,
    useFetchPersonalTask,
    useFetchPersonalDue,
    useFetchPersonalUpcoming,
    useFetchPersonalOverdue,
    useFetchTeamTask,
    useFetchTeamStatistics,
    useFetchTeamDuetoday,
    useFetchMyTeamOverdue,
    useFetchMyTeamUpcoming
} from '../../utills/api';
import { Capitalize } from '../../utills/Methods';
import numeral from 'numeral'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Images } from '../../component2/image/Image';
import CommonStyles from '../../utills/CommonStyles';




const TeamTaskHome = ({ route }) => {
    const { item, departments } = route.params || {}
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
    const [tasks, setTasks] = useState([])
    const [teamData, setTeamData] = useState([]);
    const [teamPage, setTeamPage] = useState(1);
    const [teamDueData, setTeamDueData] = useState([]);
    const [teamDuePage, setTeamDuePage] = useState(1);
    const [teamUpcomingData, setTeamUpcomingData] = useState([]);
    const [teamUpcomingPage, setTeamUpcomingPage] = useState(1);
    const [teamOverdueData, setTeamOverdueData] = useState([]);
    const [teamOverduePage, setTeamOverduePage] = useState(1);

    const {
        data: counts
    } = useFetchPeopleStatics(item?.id)

    const {
        data: teamCount
    } = useFetchTeamStatistics(item?.id);


    const {
        data: allTeamData,
        isLoading: loadingAllTeamTask
    } = useFetchTeamTask(tab, item?.id);

    const {
        data: allTeamDue,
        isLoading: loadingAllTeamDue
    } = useFetchTeamDuetoday(tab, item?.id);

    const {
        data: allTeamUpcoming,
        isLoading: loadingAllTeamUpcoming
    } = useFetchMyTeamUpcoming(tab, item?.id);


    const { data: allTeamOverdue,
        isLoading: loadingAllTeamOverdue
    } = useFetchMyTeamOverdue(tab, item?.id);

    const {
        data: allEmployeeTask,
        isLoading: loadingAllTask,
        isFetchingNextPage,
        hasNextPage
    } = useFetchPersonalTask(tab, item?.id)

    const {
        data: dueTask,
        isLoading: loadingDue
    } = useFetchPersonalDue(tab, item?.id)

    const {
        data: upcomingTask,
        isLoading: loadingUpcoming
    } = useFetchPersonalUpcoming(tab, item?.id)

    const {
        data: overdueTask,
        isLoading: loadingOverdue
    } = useFetchPersonalOverdue(tab, item?.id)


    const RenderItems = ({ item }) => {
        return (
            <TodoContent
                item={item}
                count={count}
                title={actionTitle}
                user
                id={item.id}
            />
        );
    };

    const footerLoader = () => {
        return (
            <Container alignSelf={'center'} width={30} marginTop={3}>
                <ActivityIndicator size={width(10)} color={AppColors.green} />
            </Container>
        );
    };
    const EmptyState = () => {
        return (
            <View style={styles.emptyState}>
                <View>
                    <P style={styles.emptyText}>{departments ? (`${item?.name}`) : item?.first_name}</P>
                    <P style={styles.emptyText}> has no {actionTitle === "To-Do" && tab === 'All' ? ' task To-Do.' : actionTitle === "To-Do" && tab ? (`task ${tab.toLowerCase()}`) : (actionTitle === "In Progress" ? "task In Progress." : `${actionTitle.toLowerCase()} Task.`)}</P>
                </View>
            </View>
        );
    };



    const __flattenArr = () => {
        let flattenedArr = []
        if (allEmployeeTask && allEmployeeTask?.pages && Array.isArray(allEmployeeTask?.pages)) {
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
        if (departments && tab === "All" && allTeamData && allTeamData?.pages && Array.isArray(allTeamData?.pages)) {
            flattenedArr = allTeamData?.pages
        }
        if (departments && tab === 'Due Today' && allTeamDue && allTeamDue?.pages && Array.isArray(allTeamDue?.pages)) {
            flattenedArr = allTeamDue?.pages;
        }
        if (departments && tab === 'Upcoming' && allTeamUpcoming && allTeamUpcoming?.pages && Array.isArray(allTeamUpcoming?.pages)) {
            flattenedArr = allTeamUpcoming?.pages;
        }
        if (departments && tab === 'Overdue' && allTeamOverdue && allTeamOverdue?.pages && Array.isArray(allTeamOverdue?.pages))
            flattenedArr = allTeamOverdue?.pages;

        flattenedArr = flattenedArr.map((res) => {
            if (!res) return {}
            return res.results
        })
        let arr = flattenedArr.flat()

        const state = {
            data: [],
            dueItems: [],
            upcomingItems: [],
            overdueItems: [],
            teamData: [],
            teamDueData: [],
            teamUpcomingData: [],
            teamOverdueData: [],
        };

        if (data)
            state.data = page > 1 ? [...data, ...arr] : arr;

        if (actionTitle === "To-Do" && tab === "Due Today")
            state.dueItems = dueTodayPage > 1 ? [...dueItems, ...arr] : arr

        if (actionTitle === "To-Do" && tab === "Upcoming")
            state.upcomingItems = upcomingPage > 1 ? [...upcomingItems, ...arr] : arr

        if (actionTitle === "To-Do" && tab === "Overdue")
            state.overdueItems = overduepage > 1 ? [...overdueItems, ...arr] : arr

        if (departments && tab === 'All')
            state.teamData = teamPage > 1 ? [...teamData, ...arr] : arr;
        if (departments && tab === 'Due Today')
            state.teamDueData = teamDuePage > 1 ? [...teamDueData, ...arr] : arr;
        if (departments && tab === 'Upcoming')
            state.teamUpcomingData = teamUpcomingPage > 1 ? [...teamUpcomingData, ...arr] : arr;
        if (departments && tab === 'Overdue')
            state.teamOverdueData = teamOverduePage > 1 ? [...teamOverdueData, ...arr] : arr;



        return state;
    }

    const MapToState = ({ data, dueItems, upcomingItems, overdueItems, teamData, }) => {
        if (actionTitle === 'To-Do' && tab === 'All') {
            let arr = Object.values(data).filter((item) => item.status !== 'Completed' && item.status !== 'In-progress');
            return setTasks(arr);
        }

        if (actionTitle === 'To-Do' && tab === 'Due Today') {
            let arr = Object.values(dueItems).filter((item) => item.status !== 'In-progress');
            return setTasks(arr);
        }
        if (actionTitle === 'To-Do' && tab === 'Upcoming') {
            let arr = Object.values(upcomingItems).filter((item) => item.status !== 'In-progress');
            return setTasks(arr);
        }
        if (actionTitle === 'To-Do' && tab === 'Overdue') {
            let arr = Object.values(overdueItems).filter((item) => item.status !== 'In-progress');
            return setTasks(arr);
        }
        if (actionTitle === 'To-Do' && tab === 'No Date') {
            let arr = Object.values(data).filter((item) => item?.due_date === null);
            return setTasks(arr);
        }
        if (actionTitle === 'In Progress') {
            let arr = Object.values(data).filter((item) => item.status === "In-progress");
            return setTasks(arr);
        }
        if (actionTitle === 'Completed') {
            let arr = Object.values(data).filter((item) => item.status !== 'To-do' && item.status !== 'In-progress');
            return setTasks(arr);
        }
        if (departments && actionTitle === 'To-Do' && tab === 'Due Today') {
            let arr = Object.values(teamData).filter((item) => item.status !== 'In-progress');
            return setTasks(arr);
        }

        if (departments && actionTitle === 'To-Do' && tab === 'No Date') {
            let arr = Object.values(teamData).filter((item) => item?.due_date === null);
            return setTasks(arr);
        }
        if (departments && actionTitle === 'In Progress') {
            let arr = Object.values(teamData).filter((item) => item.status == 'In-progress');
            return setTasks(arr);
        }
        if (departments && actionTitle === 'Completed') {
            let arr = Object.values(teamData).filter((item) => item.status !== 'To-do' && item.status !== 'In-progress');
            return setTasks(arr);
        }
    }


    useEffect(() => {
        MapToState(__flattenArr())
    }, [actionTitle, tab, allEmployeeTask, dueTask, upcomingTask, overdueTask, allTeamData, departments])

    const peopleCount = actionTitle === 'To-Do' ? counts?.todo_count : actionTitle === 'In Progress' ? counts?.inprogress_count : actionTitle === 'Completed' ? counts?.completed_count : 0;
    const deptCount = actionTitle === 'To-Do' ? teamCount?.todo_count : actionTitle === 'In Progress' ? teamCount?.inprogress_count : actionTitle === 'Completed' ? teamCount?.completed_count : 0;


    return (
        <ScreenWrapper >
            <View style={styles.header}>
                <BackHandler position={'center'} />
                {
                    departments ? <Text numberOfLines={1} style={styles.screenTitle}>
                        {Capitalize(`${item?.name}  `)}
                    </Text> : <Text numberOfLines={1} style={styles.screenTitle}>
                        {Capitalize(`${item.first_name} ${item.last_name} `)}
                    </Text>
                }
                <View style={{ width: width(5) }} />
            </View>
            <View style={styles.line} />

            <ScrollView style={styles.scroll}
                showsVerticalScrollIndicator={false}>

                <View style={styles.boxContainer}>
                    {[
                        {
                            selected: 'To-Do',
                            // colorUp: AppColors.blue1,
                            selected_image: Images.clippedBlue,
                            image: Images.blueBox,
                            count: departments && teamCount ? numeral(teamCount?.todo_count).format("0,0") : counts ? numeral(counts?.todo_count).format("0,0") : 0,
                            borderWidth: 0.5,
                            borderColor: '#5182F6',
                        },

                        {
                            selected: 'In Progress',
                            image: Images.yellowBox,
                            selected_image: Images.clippedYellow,
                            count: departments && teamCount ? numeral(teamCount?.inprogress_count).format("0,0") : counts ? numeral(counts?.inprogress_count).format("0,0") : 0,
                            borderWidth: 1,
                            borderColor: '#FBBC3E',
                        },
                        {
                            selected: 'Completed',
                            image: Images.greenBox,
                            selected_image: Images.clippedGreen,
                            count: departments && teamCount ? numeral(teamCount?.completed_count).format("0,0") : counts ? numeral(counts?.completed_count).format("0,0") : 0,
                            borderWidth: 0.5,
                            borderColor: '#2898A4',
                        },
                    ].map((item, i) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => {
                                setActionTitle(item.selected);
                                setCount(item.count);
                                setTab(tab);
                            }}>
                            <ImageBackground
                                source={{ uri: item.image }}
                                resizeMode='cover'
                                imageStyle={{
                                    borderRadius: width(3),
                                    borderWidth: item.selected === actionTitle ? item.borderWidth : null,
                                    borderColor: item.selected === actionTitle ? item.borderColor : null,
                                }}
                                style={{
                                    width: width(29),
                                    height: height(15),
                                    marginTop: height(2),
                                }}>
                                <View>
                                    <View style={styles.titleCon}>
                                        <H1 style={styles.title}>{item.selected}</H1>
                                        {item.selected === actionTitle && (
                                            <Ionicons
                                                name="checkbox"
                                                size={14}
                                                color={AppColors.black1}
                                            />
                                        )}
                                    </View>
                                    <View>
                                        {item.selected === actionTitle && (
                                            <View style={styles.clippedCon}>
                                                <ImageBackground
                                                    source={{ uri: item.selected_image }}
                                                    style={styles.clipped}
                                                    resizeMode='cover'
                                                    imageStyle={{
                                                        borderRadius: width(4),
                                                    }}
                                                />
                                            </View>
                                        )}
                                        <H1
                                            color={AppColors.black1}
                                            fontSize={7}
                                            style={styles.count}>
                                            {item.count}
                                        </H1>
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.container}>
                    <H1 color={AppColors.black1}>
                        {actionTitle}{' '}({departments && deptCount || peopleCount})
                    </H1>
                </View>

                {
                    actionTitle === "To-Do" &&
                    <View style={styles.scrollViewCon}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            {
                                ['All', 'Due Today', 'Upcoming', 'Overdue', 'No Date'].map((item, i) => (
                                    <TouchableWrapper

                                        onPress={() => setTab(item)}
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
                    loadingAllTask || loadingAllTeamTask || loadingDue || loadingOverdue || loadingUpcoming ? <PageLoader /> : null
                }


                <FlatList
                    data={tasks}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={RenderItems}
                    ItemSeparatorComponent={() => <View style={styles.line} />}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    contentContainerStyle={[
                        CommonStyles.marginTop_2,
                        { paddingBottom: height(5) },
                    ]}
                    onEndReachedThreshold={0.1}
                    refreshing={false}
                    ListEmptyComponent={EmptyState}
                    ListFooterComponent={
                        isFetchingNextPage || hasNextPage ? footerLoader : null
                    }
                />
            </ScrollView>
        </ScreenWrapper>
    )
}
export default TeamTaskHome;