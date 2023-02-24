import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native'
import React, { useState, useEffect, } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { H1, Container, Rounded, PageLoader, TouchableWrapper, EmptyStateWrapper, ImgPlaceholder } from '../../utills/components'
import { width } from 'react-native-dimension';
import CommonStyles from '../../utills/CommonStyles';
import MyTeamCard from '../../components/MyTeamCard/Index'
import styles from './styles';
import TodoContent from '../../components/TodoContent/Index';
import TeamTodoContent from '../../components/TeamTodoContent/Index'
import { Images } from "../../component2/image/Image"
import numeral from 'numeral'
import AppColors, { ColorList } from '../../utills/AppColors';
import {
    useFetchStatistics,
    useFetchSentStatistics,
    useFetchTodos,
    useFetchDueToday,
    useFetchUpcoming,
    useFetchOverDue,
    useFetchTeamStatistics,
    useFetchTeamTask,
    useFetchTeamDuetoday,
    useFetchMyTeamUpcoming,
    useFetchMyTeamOverdue,
    useFetchAllSent,
    useFetchAllSentDue,
    useFetchAllSentUpcoming,
    useFetchAllSentOverdue
} from '../../utills/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { __flatten, } from '../../utills/Methods';
import CreateTask from '../CreateTask/Index'
import AnimatedView from '../../components/AnimatedView';


const Index = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const [tab, setTab] = useState("All");
    const [count, setCount] = useState(0);
    const [actionTitle, setActionTitle] = useState("To-Do");
    const [data, setData] = useState([])
    const [taskpage, setTaskPage] = useState(1)
    const [dueTodayPage, setDueTodayPage] = useState(1)
    const [dueItems, setDueItems] = useState([])
    const [upcomingPage, SetupcomingPage] = useState(1)
    const [upcomingItems, setUpcomingItems] = useState([])
    const [overduepage, setOverduePage] = useState(1)
    const [overdueItems, setOverdueItems] = useState([])
    const [sentItems, setSentItems] = useState([])
    const [sentPage, setSentPage] = useState(1)
    const [sentDueItem, setSentDueItems] = useState([])
    const [sentUpcomingItem, setSentUpcomingItems] = useState([])
    const [sentOverdueItem, setSentOverdueItems] = useState([])
    const [people, setPeople] = useState(true)
    const [margin, setMargin] = useState(0.1);
    const [visible, setVisible] = useState(false);
    const [teamData, setTeamData] = useState([])
    const [teamPage, setTeamPage] = useState(1)
    const [teamDueData, setTeamDueData] = useState([])
    const [teamDuePage, setTeamDuePage] = useState(1)
    const [teamUpcomingData, setTeamUpcomingData] = useState([])
    const [teamUpcomingPage, setTeamUpcomingPage] = useState(1)
    const [teamOverdueData, setTeamOverdueData] = useState([])
    const [teamOverduePage, setTeamOverduePage] = useState(1)

    const setButtons = (i) => {
        setIndex(i);
        var margin = i * 30;
        if (margin == 0) margin = 0.1;
        setMargin(width(margin));
    };

    const {
        data: statistics,
    } = useFetchStatistics()

    const {
        data: teamCount,
    } = useFetchTeamStatistics()
    const total = teamCount?.todo_count + teamCount?.inprogress_count + teamCount?.completed_count

    const {
        data: sentStatistics,
    } = useFetchSentStatistics()

    // my task here 

    const {
        data: allTasks,
        isLoading: loadingAllTask,
    } = useFetchTodos(tab)

    const {
        data: dueTasks,
        isLoading: loadingDueTask
    } = useFetchDueToday(tab)

    const {
        data: upcomingTasks,
        isLoading: loadingUpcoming
    } = useFetchUpcoming(tab)

    const {
        data: overdueTasks,
        isLoading: loadingOverdue
    } = useFetchOverDue(tab)

    // all sent here
    const {
        data: allSentTasks,
        isLoading: loadingAllSentTask,
    } = useFetchAllSent(tab, index)

    const {
        data: allSentDues,
        isLoading: loadingAllSentDues,
    } = useFetchAllSentDue(tab, index)
    const {
        data: allSentUpcoming,
        isLoading: loadingAllSentUpcoming,
    } = useFetchAllSentUpcoming(tab, index)
    const {
        data: allSentOverdue,
        isLoading: loadingAllSentOverdue,
    } = useFetchAllSentOverdue(tab, index)

    // all team starts 
    const {
        data: allTeamData,
        isLoading: loadingAllTeamTask,
    } = useFetchTeamTask(tab, index)


    const {
        data: allTeamDue,
        isLoading: loadingAllTeamDue,
    } = useFetchTeamDuetoday(tab, index)

    const {
        data: allTeamUpcoming,
        isLoading: loadingAllTeamUpcoming,
    } = useFetchMyTeamUpcoming(tab, index)

    const {
        data: allTeamOverdue,
        isLoading: loadingAllTeamOverdue,
    } = useFetchMyTeamOverdue(tab, index)

    // console.log('all', allTeamData)
    const __flattenArr = () => {
        let flattenedArr = []
        if (index === 0 && allTasks && allTasks?.pages && Array.isArray(allTasks?.pages)) {
            flattenedArr = allTasks?.pages
        }
        if (index === 0 && actionTitle === "To-Do" && tab === "Due Today" && dueTasks && dueTasks?.pages && Array.isArray(dueTasks?.pages)) {
            flattenedArr = dueTasks?.pages
        }
        if (index === 0 && actionTitle === "To-Do" && tab === 'Upcoming' && upcomingTasks && upcomingTasks?.pages && Array.isArray(upcomingTasks?.pages)) {
            flattenedArr = upcomingTasks?.pages
        }
        if (index === 0 && actionTitle === "To-Do" && tab === "Overdue" && overdueTasks && overdueTasks?.pages && Array.isArray(overdueTasks?.pages)) {
            flattenedArr = overdueTasks?.pages
        }
        if (index === 0 && actionTitle === "To-Do" && tab === "Overdue" && overdueTasks && overdueTasks?.pages && Array.isArray(overdueTasks?.pages)) {
            flattenedArr = overdueTasks?.pages
        }
        if (index === 1 && allSentTasks && allSentTasks?.pages && Array.isArray(allSentTasks?.pages)) {
            flattenedArr = allSentTasks?.pages
        }
        if (index === 1 && actionTitle === "To-Do" && tab === "Due Today" && allSentDues && allSentDues?.pages && Array.isArray(allSentDues?.pages)) {
            flattenedArr = allSentDues?.pages
        }
        if (index === 1 && actionTitle === "To-Do" && tab === "Upcoming" && allSentUpcoming && allSentUpcoming?.pages && Array.isArray(allSentUpcoming?.pages)) {
            flattenedArr = allSentUpcoming?.pages
        }
        if (index === 1 && actionTitle === "To-Do" && tab === "Overdue" && allSentOverdue && allSentOverdue?.pages && Array.isArray(allSentOverdue?.pages)) {
            flattenedArr = allSentOverdue?.pages
        }
        if (index === 2 && allTeamData && allTeamData?.pages && Array.isArray(allTeamData?.pages)) {
            flattenedArr = allTeamData?.pages
        }
        if (index === 2 && actionTitle === "To-Do" && tab === "Due Today" && allTeamDue && allTeamDue?.pages && Array.isArray(allTeamDue?.pages)) {
            flattenedArr = allTeamDue?.pages
        }
        if (index === 2 && actionTitle === "To-Do" && tab === "Upcoming" && allTeamUpcoming && allTeamUpcoming?.pages && Array.isArray(allTeamUpcoming?.pages)) {
            flattenedArr = allTeamUpcoming?.pages
        }
        if (index === 2 && actionTitle === "To-Do" && tab === "Overdue" && allTeamOverdue && allTeamOverdue?.pages && Array.isArray(allTeamOverdue?.pages)) {
            flattenedArr = allTeamOverdue?.pages
        }
        let arr = __flatten(flattenedArr)

        if (index === 0 && tab === "All")
            return taskpage > 1 ? setData([...data, ...arr]) : setData(arr)
        if (index === 0 && actionTitle === "To-Do" && tab === "Due Today")
            return dueTodayPage > 1 ? setDueItems([...dueItems, ...arr]) : setDueItems(arr)
        if (index === 0 && actionTitle === "To-Do" && tab === "Upcoming")
            return upcomingPage > 1 ? setUpcomingItems([...upcomingItems, ...arr]) : setUpcomingItems(arr)
        if (index === 0 && actionTitle === "To-Do" && tab === "Overdue")
            return overduepage > 1 ? setOverdueItems([...overdueItems, ...arr]) : setOverdueItems(arr)

        if (index === 1 && tab === "All")
            return sentPage > 1 ? setSentItems([...sentItems, ...arr]) : setSentItems(arr)
        if (index === 1 && actionTitle === "To-Do" && tab === "Due Today")
            return sentPage > 1 ? setSentDueItems([...sentDueItem, ...arr]) : setSentDueItems(arr)
        if (index === 1 && actionTitle === "To-Do" && tab === "Upcoming")
            return sentPage > 1 ? setSentUpcomingItems([...sentUpcomingItem, ...arr]) : setSentUpcomingItems(arr)
        if (index === 1 && actionTitle === "To-Do" && tab === "Overdue")
            return sentPage > 1 ? setSentOverdueItems([...sentOverdueItem, ...arr]) : setSentOverdueItems(arr)

        if (index === 2 && tab === "All")
            return teamPage > 1 ? setTeamData([...teamData, ...arr]) : setTeamData(arr)
        if (index === 2 && actionTitle === "To-Do" && tab === "Due Today")
            return teamDuePage > 1 ? setTeamDueData([...teamDueData, ...arr]) : setTeamDueData(arr)
        if (index === 2 && actionTitle === "To-Do" && tab === "Upcoming")
            return teamUpcomingPage > 1 ? setTeamUpcomingData([...teamUpcomingData, ...arr]) : setTeamUpcomingData(arr)
        if (index === 2 && actionTitle === "To-Do" && tab === "Overdue")
            return teamOverduePage > 1 ? setTeamOverdueData([...teamOverdueData, ...arr]) : setTeamOverdueData(arr)
    }

    const only_Todos = Object.values(data).filter((item) => item.status !== "Completed" && item.status !== "In-progress");
    const only_inProgress = Object.values(data).filter((item) => item.status !== "Completed" && item.status !== "To-do")
    const only_completed = Object.values(data).filter((item) => item.status !== "To-do" && item.status !== "In-progress")
    const only_overdue = Object.values(overdueItems).filter((item) => item.status !== "In-progress");
    const only_duetoday = Object.values(dueItems).filter((item) => item.status !== "In-progress");
    const no_date = Object.values(data).filter((item) => item?.due_date === null);

    // sent tasks 
    const sent_Todos = Object.values(sentItems).filter((item) => item.status !== "Completed" && item.status !== "In-progress");
    const sent_inProgress = Object.values(sentItems).filter((item) => item.status !== "Completed" && item.status !== "To-do")
    const sent_completed = Object.values(sentItems).filter((item) => item.status !== "To-do" && item.status !== "In-progress")
    const sent_overdue = Object.values(sentOverdueItem).filter((item) => item.status !== "In-progress");
    const no_date_sent = Object.values(sentItems).filter((item) => item?.due_date === null);

    //team card
    const team_todos = Object.values(teamData).filter((item) => item.status !== "Completed" && item.status !== "In-progress");
    const team_overdue = Object.values(teamOverdueData).filter((item) => item.status !== "In-progress");
    const team_inProgress = Object.values(teamData).filter((item) => item.status !== "Completed" && item.status !== "To-do")
    const team_completed = Object.values(teamData).filter((item) => item.status !== "To-do" && item.status !== "In-progress")
    const no_date_team = Object.values(teamData).filter((item) => item?.due_date === null);

    const AddButton = ({ onPress, style }) => (
        <TouchableOpacity
            style={style}
            onPress={onPress}>
            <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
    );
    const RenderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('search', { people })} >
                <ImgPlaceholder text={item} size={15} />
            </TouchableOpacity>
        )
    }
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));


    useEffect(() => {
        __flattenArr()
    }, [allTasks, upcomingTasks, dueTasks, overdueTasks]);

    useEffect(() => {
        __flattenArr()
    }, [allTeamData, allTeamDue, allTeamUpcoming, allTeamOverdue]);

    useEffect(() => {
        __flattenArr()
    }, [allSentTasks, allSentDues, allSentOverdue, allSentUpcoming]);


    return (
        <React.Fragment>
            <ScreenWrapper scrollEnabled={false}
                footerUnScrollable={() => {
                    return (
                        <AddButton
                            style={styles.addButton}
                            onPress={() => setVisible(true)}
                        />

                    )
                }}>

                <View style={styles.mainViewContainer}>
                    <View style={styles.header}>
                        <View style={styles.logoBox}>
                            <Image source={{ uri: Images.TaskLogo }} style={styles.logo} />
                        </View>
                        <Text numberOfLines={1} style={styles.screenTitle}>
                            Tasks
                        </Text>

                    </View>
                    <View style={styles.line} />
                </View>
                <ScrollView
                    style={[styles.scroll, CommonStyles.paddingBottom_8]}
                    showsVerticalScrollIndicator={false}>

                    <View style={styles.threeButtonCont}>
                        {
                            ['My Tasks', 'Sent Tasks', 'My Team'].map((item, i) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setButtons(i)
                                        setActionTitle("To-Do")
                                        setTab("All")
                                    }}
                                    style={styles.button}
                                    activeOpacity={0.8}
                                    key={i}>
                                    <Text style={[styles.buttonText, index === i && styles.buttonText1]}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                        <AnimatedView marginLeft={margin} styles={styles.animatedView} />
                    </View>


                    {
                        index === 0 ?
                            <React.Fragment>
                                <View style={styles.boxContainer}>
                                    {
                                        [
                                            {
                                                selected: "To-Do",
                                                colorUp: AppColors.newBlue,
                                                image: Images.clippedBlue,
                                                count: statistics ? numeral(statistics?.todo_count).format("0,0") : 0,
                                            },

                                            {
                                                selected: "In Progress",
                                                colorUp: AppColors.yellow,
                                                image: Images.clippedYellow,
                                                count: statistics ? numeral(statistics?.inprogress_count).format("0,0") : 0,

                                            },
                                            {
                                                selected: "Completed",
                                                colorUp: AppColors.green,
                                                image: Images.clippedGreen,
                                                count: statistics ? numeral(statistics?.completed_count).format("0,0") : 0,

                                            }
                                        ].map((item, i) => <TouchableOpacity key={i} onPress={() => {
                                            setActionTitle(item.selected)
                                            setCount(item.count)
                                            setTab(tab)

                                        }}>
                                            <Container
                                                backgroundColor={item.colorUp}
                                                height={130}
                                                width={28}
                                                style={styles.mainContainer}>
                                                <View>
                                                    <View style={styles.titleCon}>
                                                        <H1 style={styles.title}>{item.selected}</H1>
                                                        {item.selected === actionTitle && <Ionicons name="checkbox" size={12} color={AppColors.white} />}
                                                    </View>
                                                    <View>
                                                        {item.selected === actionTitle && <Image source={{ uri: item.image }} style={styles.clipped} />}
                                                        <H1 color={AppColors.white} fontSize={7} style={styles.count}>{item.count}</H1>
                                                    </View>
                                                </View>
                                            </Container>
                                        </TouchableOpacity>)
                                    }
                                </View>
                                <View style={styles.container}>
                                    <H1 color={AppColors.black1}>{actionTitle}{' '}({
                                        actionTitle === 'To-Do' ? statistics?.todo_count : actionTitle === 'In Progress' ? statistics?.inprogress_count : actionTitle === 'Completed' ? statistics?.completed_count : null
                                    })
                                    </H1>
                                </View>

                                {
                                    (
                                        (actionTitle === "In Progress") && only_inProgress && Array.isArray(only_inProgress) &&
                                        only_inProgress.length === 0 && !loadingAllTask
                                    ) ? (
                                        <EmptyStateWrapper
                                            icon={Images.EmptyTeams}
                                            header_1={"No task here"}
                                            sub_text={"When you have, they will show up here."}
                                            backgroundColor={'#F5F5F5'}
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
                                            backgroundColor={'#F5F5F5'}
                                        />
                                    ) : null
                                }


                                {
                                    index === 0 && actionTitle === 'To-Do' ?

                                        <React.Fragment>

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
                                            {/* loading state  for all tabs */}
                                            {
                                                loadingAllTask || loadingDueTask || loadingUpcoming || loadingOverdue || loadingAllTeamTask || loadingAllTeamDue || loadingAllTeamUpcoming || loadingAllTeamOverdue || loadingAllSentDues || loadingAllSentOverdue || loadingAllSentUpcoming || loadingAllSentTask ? <PageLoader /> : null
                                            }
                                            <View>
                                                {
                                                    index === 0 && actionTitle === 'To-Do' && tab === "All" && !loadingAllTask ? only_Todos.map((item, i) => (
                                                        <TodoContent
                                                            key={i}
                                                            count={count}
                                                            item={item}
                                                            title={actionTitle}
                                                            __flattenArr={__flattenArr}
                                                            allTasks
                                                        />
                                                    )) : null
                                                }
                                            </View>

                                            <View>
                                                {
                                                    index === 0 && actionTitle === 'To-Do' && tab === "Due Today" && !loadingDueTask ? only_duetoday.map((item, i) => (
                                                        <TodoContent
                                                            key={i}
                                                            count={count}
                                                            item={item}
                                                            title={actionTitle}
                                                            __flattenArr={__flattenArr}
                                                            allTasks
                                                        />
                                                    )) : null
                                                }
                                            </View>

                                            <View>
                                                {
                                                    index === 0 && actionTitle === 'To-Do' && tab === "Upcoming" && !loadingUpcoming ? upcomingItems.map((item, i) => (
                                                        <TodoContent
                                                            key={i}
                                                            count={count}
                                                            item={item}
                                                            title={actionTitle}
                                                            __flattenArr={__flattenArr}
                                                            allTasks
                                                        />
                                                    )) : null
                                                }
                                            </View>

                                            <View>
                                                {
                                                    index === 0 && actionTitle === 'To-Do' && tab === "Overdue" && !loadingOverdue ? only_overdue.map((item, i) => (
                                                        <TodoContent
                                                            key={i}
                                                            count={count}
                                                            item={item}
                                                            title={actionTitle}
                                                            __flattenArr={__flattenArr}
                                                            allTasks
                                                        />
                                                    )) : null
                                                }
                                            </View>
                                            <View>
                                                {
                                                    index === 0 && actionTitle === 'To-Do' && tab === "No Date" && !loadingAllTask ? no_date.map((item, i) => (
                                                        <TodoContent
                                                            key={i}
                                                            count={count}
                                                            item={item}
                                                            title={actionTitle}
                                                            __flattenArr={__flattenArr}
                                                            allTasks
                                                        />
                                                    )) : null
                                                }
                                            </View>
                                        </React.Fragment>
                                        : null
                                }

                                {/* empty state for other boxes  */}
                                {/* empty state  for all tabs */}
                                {
                                    (
                                        (index === 0 && actionTitle === 'To-Do' && tab === "All") && only_Todos && Array.isArray(only_Todos) &&
                                        only_Todos.length === 0 && !loadingAllTask
                                    ) ? (
                                        <EmptyStateWrapper
                                            icon={Images.EmptyTeams}
                                            header_1={"No task here"}
                                            sub_text={"When you have, they will show up here."}
                                            backgroundColor={'#F5F5F5'}
                                        />
                                    ) : null
                                }
                                {
                                    (
                                        (index === 0 && tab === "Due Today") && dueItems && Array.isArray(dueItems) &&
                                        dueItems.length === 0 && !loadingDueTask
                                    ) ? (
                                        <EmptyStateWrapper
                                            icon={Images.EmptyTeams}
                                            header_1={"No task here"}
                                            sub_text={"When you have, they will show up here."}
                                            backgroundColor={'#F5F5F5'}

                                        />
                                    ) : null
                                }
                                {
                                    (
                                        (index === 0 && tab === "Upcoming") && upcomingItems && Array.isArray(upcomingItems) &&
                                        upcomingItems.length === 0 && !loadingUpcoming
                                    ) ? (
                                        <EmptyStateWrapper
                                            icon={Images.EmptyTeams}
                                            header_1={"No task here"}
                                            sub_text={"When you have, they will show up here."}
                                            backgroundColor={'#F5F5F5'}

                                        />
                                    ) : null
                                }
                                {
                                    (
                                        (index === 0 && tab === "Overdue") && only_overdue && Array.isArray(only_overdue) &&
                                        only_overdue.length === 0 && !loadingOverdue
                                    ) ? (
                                        <EmptyStateWrapper
                                            icon={Images.EmptyTeams}
                                            header_1={"No task here"}
                                            sub_text={"When you have, they will show up here."}
                                            backgroundColor={'#F5F5F5'}
                                        />
                                    ) : null
                                }


                                <View>
                                    {
                                        index === 0 && actionTitle === "In Progress" ? only_inProgress.map((item, i) => (
                                            <TodoContent
                                                key={i}
                                                count={count}
                                                item={item}
                                                title={actionTitle}
                                                __flattenArr={__flattenArr}
                                                allTasks
                                            />
                                        )) : null
                                    }
                                </View>

                                <View>
                                    {
                                        index === 0 && actionTitle === "Completed" ? only_completed.map((item, i) => (
                                            <TodoContent
                                                key={i}
                                                count={count}
                                                item={item}
                                                title={actionTitle}
                                                __flattenArr={__flattenArr}
                                                allTasks
                                            />
                                        )) : null
                                    }
                                </View>


                            </React.Fragment>

                            : null
                    }


                    {/* sent task starts here  */}
                    {
                        index === 1 &&
                        <React.Fragment>
                            <View style={styles.boxContainer}>
                                {
                                    [
                                        {
                                            selected: "To-Do",
                                            colorUp: AppColors.newBlue,
                                            image: Images.clippedBlue,
                                            count: sentStatistics ? numeral(sentStatistics?.todo_count).format("0,0") : 0,
                                        },

                                        {
                                            selected: "In Progress",
                                            colorUp: AppColors.yellow,
                                            image: Images.clippedYellow,
                                            count: sentStatistics ? numeral(sentStatistics?.inprogress_count).format("0,0") : 0,

                                        },
                                        {
                                            selected: "Completed",
                                            colorUp: AppColors.green,
                                            image: Images.clippedGreen,
                                            count: sentStatistics ? numeral(sentStatistics?.completed_count).format("0,0") : 0,

                                        }
                                    ].map((item, i) => <TouchableOpacity key={i} onPress={() => {
                                        setActionTitle(item.selected)
                                        setCount(item.count)
                                        setTab(tab)

                                    }}>
                                        <Container
                                            backgroundColor={item.colorUp}
                                            height={130}
                                            width={28}
                                            style={styles.mainContainer}>
                                            <View>
                                                <View style={styles.titleCon}>
                                                    <H1 style={styles.title}>{item.selected}</H1>
                                                    {item.selected === actionTitle && <Ionicons name="checkbox" size={12} color={AppColors.white} />}
                                                </View>
                                                <View>
                                                    {item.selected === actionTitle && <Image source={{ uri: item.image }} style={styles.clipped} />}
                                                    <H1 color={AppColors.white} fontSize={7} style={styles.count}>{item.count}</H1>
                                                </View>
                                            </View>
                                        </Container>
                                    </TouchableOpacity>)
                                }
                            </View>
                            <View style={styles.container}>
                                <H1 color={AppColors.black1}>{actionTitle}{' '}({
                                    actionTitle === 'To-Do' ? sentStatistics?.todo_count : actionTitle === 'In Progress' ? sentStatistics?.inprogress_count : actionTitle === 'Completed' ? sentStatistics?.completed_count : null
                                })
                                </H1>
                            </View>

                            {
                                (
                                    (index === 1 && actionTitle === "In Progress") && sent_inProgress && Array.isArray(sent_inProgress) &&
                                    sent_inProgress.length === 0 && !loadingAllSentTask
                                ) ? (
                                    <EmptyStateWrapper
                                        icon={Images.EmptyTeams}
                                        header_1={"No task here"}
                                        sub_text={"When you have, they will show up here."}
                                        backgroundColor={'#F5F5F5'}
                                    />
                                ) : null
                            }
                            {
                                (
                                    (index === 1 && actionTitle === "Completed") && sent_completed && Array.isArray(sent_completed) &&
                                    sent_completed.length === 0 && !loadingAllTeamTask
                                ) ? (
                                    <EmptyStateWrapper
                                        icon={Images.EmptyTeams}
                                        header_1={"No task here"}
                                        sub_text={"When you have, they will show up here."}
                                        backgroundColor={'#F5F5F5'}
                                    />
                                ) : null
                            }

                            {
                                index == 1 && actionTitle == "To-Do" ?
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
                                    </View> : null
                            }
                            {/* empty state  for all tabs */}
                            {
                                (
                                    (index === 1 && actionTitle === "To-Do" && tab === "All") && sentItems && Array.isArray(sentItems) &&
                                    sentItems.length === 0 && !loadingAllSentTask
                                ) ? (
                                    <EmptyStateWrapper
                                        icon={Images.EmptyTeams}
                                        header_1={"No task here"}
                                        sub_text={"When you have, they will show up here."}
                                        marginTop={1}
                                        backgroundColor={'#F5F5F5'}
                                    />
                                ) : null
                            }
                            {

                                (
                                    (index === 1 && tab === "Due Today") && sentDueItem && Array.isArray(sentDueItem) &&
                                    sentDueItem.length === 0 && !loadingAllSentDues
                                ) ? (
                                    <EmptyStateWrapper
                                        icon={Images.EmptyTeams}
                                        header_1={"No task here"}
                                        sub_text={"When you have, they will show up here."}
                                        backgroundColor={'#F5F5F5'}

                                    />
                                ) : null
                            }
                            {
                                (
                                    (index === 1 && tab === "Upcoming") && sentUpcomingItem && Array.isArray(sentUpcomingItem) &&
                                    sentUpcomingItem.length === 0 && !loadingAllSentUpcoming
                                ) ? (
                                    <EmptyStateWrapper
                                        icon={Images.EmptyTeams}
                                        header_1={"No task here"}
                                        sub_text={"When you have, they will show up here."}
                                        backgroundColor={'#F5F5F5'}

                                    />
                                ) : null
                            }
                            {
                                (
                                    (index === 1 && tab === "Overdue") && sentOverdueItem && Array.isArray(sentOverdueItem) &&
                                    sentOverdueItem.length === 0 && !loadingAllSentOverdue
                                ) ? (
                                    <EmptyStateWrapper
                                        icon={Images.EmptyTeams}
                                        header_1={"No task here"}
                                        sub_text={"When you have, they will show up here."}
                                        backgroundColor={'#F5F5F5'}
                                    />
                                ) : null
                            }


                            <View>
                                {
                                    index === 1 && actionTitle === 'To-Do' && tab === "All" && !loadingAllSentTask ? sent_Todos.map((item, i) => (
                                        <TodoContent
                                            key={i}
                                            count={count}
                                            item={item}
                                            title={actionTitle}
                                            index={index}
                                            isSent
                                            __flattenArr={__flattenArr}
                                        />
                                    )) : null
                                }
                            </View>
                            <View>
                                {
                                    index === 1 && actionTitle === 'To-Do' && tab === "Due Today" && !loadingAllSentDues ? sentDueItem.map((item, i) => (
                                        <TodoContent
                                            key={i}
                                            count={count}
                                            item={item}
                                            title={actionTitle}
                                            index={index}
                                            isSent
                                            __flattenArr={__flattenArr}
                                        />
                                    )) : null
                                }
                            </View>
                            <View>
                                {
                                    index === 1 && actionTitle === 'To-Do' && tab === "Upcoming" && !loadingAllSentUpcoming ? sentUpcomingItem.map((item, i) => (
                                        <TodoContent
                                            key={i}
                                            count={count}
                                            item={item}
                                            title={actionTitle}
                                            index={index}
                                            isSent
                                            __flattenArr={__flattenArr}
                                        />
                                    )) : null
                                }
                            </View>

                            <View>
                                {
                                    index === 1 && actionTitle === 'To-Do' && tab === "Overdue" && !loadingAllSentOverdue ? sent_overdue.map((item, i) => (
                                        <TodoContent
                                            key={i}
                                            count={count}
                                            item={item}
                                            title={actionTitle}
                                            index={index}
                                            isSent
                                            __flattenArr={__flattenArr}
                                        />
                                    )) : null
                                }
                            </View>
                            <View>
                                {
                                    index === 1 && actionTitle === 'To-Do' && tab === "No Date" && !loadingAllSentTask ? no_date_sent.map((item, i) => (
                                        <TodoContent
                                            key={i}
                                            count={count}
                                            item={item}
                                            title={actionTitle}
                                            __flattenArr={__flattenArr}
                                            allTasks
                                        />
                                    )) : null
                                }
                            </View>
                            <View>
                                {
                                    index === 1 && actionTitle === 'In Progress' && !loadingAllSentTask ? sent_inProgress.map((item, i) => (
                                        <TodoContent
                                            key={i}
                                            count={count}
                                            item={item}
                                            title={actionTitle}
                                            index={index}
                                            isSent
                                            __flattenArr={__flattenArr}
                                        />
                                    )) : null
                                }
                            </View>
                            <View>
                                {
                                    index === 1 && actionTitle === 'Completed' && !loadingAllSentTask ? sent_completed.map((item, i) => (
                                        <TodoContent
                                            key={i}
                                            count={count}
                                            item={item}
                                            title={actionTitle}
                                            index={index}
                                            isSent
                                            __flattenArr={__flattenArr}
                                        />
                                    )) : null
                                }
                            </View>
                        </React.Fragment>

                    }


                    {/* Teams section starts here  */}
                    {
                        index === 2 &&
                        <React.Fragment>

                            <View><Text numberOfLines={1} style={styles.headerTitle}>Find People</Text></View>

                            <View style={styles.search}>

                                <TouchableOpacity style={styles.searchView}
                                    onPress={() => navigation.navigate('search', { people })} >
                                    <Image source={{ uri: Images.SearchIcon }} style={styles.searchBoxStyle} />
                                </TouchableOpacity>

                                <FlatList
                                    data={alphabet}
                                    horizontal
                                    renderItem={RenderItem}
                                    ItemSeparatorComponent={() => <View style={[CommonStyles.marginRight_3]} />}
                                    showsHorizontalScrollIndicator={false}
                                    nestedScrollEnabled={true}
                                    style={styles.team}
                                />
                            </View>


                            <View>
                                <MyTeamCard />
                            </View>

                            <View style={styles.container}>
                                <H1 color={AppColors.black1}>Team Tasks{' '}({total})
                                </H1>
                            </View>

                            <View style={styles.boxContainer}>
                                {
                                    [
                                        {
                                            selected: "To-Do",
                                            colorUp: AppColors.newBlue,
                                            image: Images.clippedBlue,
                                            count: teamCount ? numeral(teamCount?.todo_count).format("0,0") : 0,
                                        },

                                        {
                                            selected: "In Progress",
                                            colorUp: AppColors.yellow,
                                            image: Images.clippedYellow,
                                            count: teamCount ? numeral(teamCount?.inprogress_count).format("0,0") : 0,

                                        },
                                        {
                                            selected: "Completed",
                                            colorUp: AppColors.green,
                                            image: Images.clippedGreen,
                                            count: teamCount ? numeral(teamCount?.completed_count).format("0,0") : 0,

                                        }
                                    ].map((item, i) => <TouchableOpacity key={i} onPress={() => {
                                        setActionTitle(item.selected)
                                        setCount(item.count)
                                        setTab(tab)

                                    }}>
                                        <Container
                                            backgroundColor={item.colorUp}
                                            height={130}
                                            width={28}
                                            style={styles.mainContainer}>
                                            <View>
                                                <View style={styles.titleCon}>
                                                    <H1 style={styles.title}>{item.selected}</H1>
                                                    {item.selected === actionTitle && <Ionicons name="checkbox" size={12} color={AppColors.white} />}
                                                </View>
                                                <View>
                                                    {item.selected === actionTitle && <Image source={{ uri: item.image }} style={styles.clipped} />}
                                                    <H1 color={AppColors.white} fontSize={7} style={styles.count}>{item.count}</H1>
                                                </View>
                                            </View>
                                        </Container>
                                    </TouchableOpacity>)
                                }
                            </View>
                            {
                                index === 2 && actionTitle === "To-Do" ? null :
                                    <View style={styles.container}>
                                        <H1 color={AppColors.black1}>{actionTitle}{' '}({
                                            actionTitle === 'In Progress' ? teamCount?.inprogress_count : actionTitle === 'Completed' ? teamCount?.completed_count : null
                                        })
                                        </H1>
                                    </View>
                            }
                            {
                                (
                                    (index === 2 && actionTitle === "Completed") && team_completed && Array.isArray(team_completed) &&
                                    team_completed.length === 0 && !loadingAllSentDues
                                ) ? (
                                    <EmptyStateWrapper
                                        icon={Images.EmptyTeams}
                                        header_1={"No task here"}
                                        sub_text={"When you have, they will show up here."}
                                        backgroundColor={'#F5F5F5'}

                                    />
                                ) : null
                            }
                            {
                                index === 2 && actionTitle === "To-Do" ?
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
                                    </View> : null

                            }
                            {/* empty state  for all team tabs */}
                            {
                                (
                                    (index === 2 && actionTitle === "To-Do" && tab === "All") && teamData && Array.isArray(teamData) &&
                                    teamData.length === 0 && !loadingAllTeamTask
                                ) ? (
                                    <EmptyStateWrapper
                                        icon={Images.EmptyTeams}
                                        header_1={"No task here"}
                                        sub_text={"When you have, they will show up here."}
                                        marginTop={1}
                                        backgroundColor={'#F5F5F5'}
                                    />
                                ) : null
                            }
                            {
                                (
                                    (index === 2 && tab === "Due Today") && teamDueData && Array.isArray(teamDueData) &&
                                    teamDueData.length === 0 && !loadingAllTeamDue
                                ) ? (
                                    <EmptyStateWrapper
                                        icon={Images.EmptyTeams}
                                        header_1={"No task here"}
                                        sub_text={"When you have, they will show up here."}
                                        backgroundColor={'#F5F5F5'}

                                    />
                                ) : null
                            }
                            {
                                (
                                    (index === 2 && tab === "Upcoming") && teamUpcomingData && Array.isArray(teamUpcomingData) &&
                                    teamUpcomingData.length === 0 && !loadingAllTeamUpcoming
                                ) ? (
                                    <EmptyStateWrapper
                                        icon={Images.EmptyTeams}
                                        header_1={"No task here"}
                                        sub_text={"When you have, they will show up here."}
                                        backgroundColor={'#F5F5F5'}
                                    />
                                ) : null
                            }
                            {
                                (
                                    (index === 2 && tab === "Overdue") && team_overdue && Array.isArray(team_overdue) &&
                                    team_overdue.length === 0 && !loadingOverdue
                                ) ? (
                                    <EmptyStateWrapper
                                        icon={Images.EmptyTeams}
                                        header_1={"No task here"}
                                        sub_text={"When you have, they will show up here."}
                                        backgroundColor={'#F5F5F5'}
                                    />
                                ) : null
                            }
                            <View style={CommonStyles.marginTop_2}>
                                {
                                    index === 2 && actionTitle === 'To-Do' && tab === "All" ? team_todos.map((item, i) => (
                                        <TeamTodoContent
                                            key={i}
                                            count={count}
                                            item={item}
                                            title={actionTitle}
                                            __flattenArr={__flattenArr}
                                        />
                                    )) : null
                                }

                                <View>
                                    {
                                        index === 2 && actionTitle === 'To-Do' && tab === "Due Today" && !loadingAllTeamDue ? teamDueData.map((item, i) => (
                                            <TeamTodoContent
                                                key={i}
                                                count={count}
                                                item={item}
                                                title={actionTitle}
                                                __flattenArr={__flattenArr}
                                            />
                                        )) : null
                                    }
                                </View>

                                <View>
                                    {
                                        index === 2 && actionTitle === 'To-Do' && tab === "Upcoming" && !loadingAllTeamUpcoming ? teamUpcomingData.map((item, i) => (
                                            <TeamTodoContent
                                                key={i}
                                                count={count}
                                                item={item}
                                                title={actionTitle}
                                                __flattenArr={__flattenArr}
                                            />
                                        )) : null
                                    }
                                </View>

                                <View>
                                    {
                                        index === 2 && actionTitle === 'To-Do' && tab === "Overdue" && !loadingAllTeamOverdue ? team_overdue.map((item, i) => (
                                            <TeamTodoContent
                                                key={i}
                                                count={count}
                                                item={item}
                                                title={actionTitle}
                                                __flattenArr={__flattenArr}
                                            />
                                        )) : null
                                    }
                                </View>
                                <View>
                                    {
                                        index === 2 && actionTitle === 'To-Do' && tab === "No Date" && !loadingAllTeamTask ? no_date_team.map((item, i) => (
                                            <TeamTodoContent
                                                key={i}
                                                count={count}
                                                item={item}
                                                title={actionTitle}
                                                __flattenArr={__flattenArr}
                                                allTasks
                                            />
                                        )) : null
                                    }
                                </View>


                            </View>
                            <View >
                                {
                                    index === 2 && actionTitle === "In Progress" ? team_inProgress.map((item, i) => (
                                        <TeamTodoContent
                                            key={i}
                                            count={count}
                                            item={item}
                                            title={actionTitle}
                                            __flattenArr={__flattenArr}
                                        />
                                    )) : null
                                }
                            </View>
                            <View>
                                {
                                    index === 2 && actionTitle === "Completed" ? team_completed.map((item, i) => (
                                        <TeamTodoContent
                                            key={i}
                                            count={count}
                                            item={item}
                                            title={actionTitle}
                                            __flattenArr={__flattenArr}
                                        />
                                    )) : null
                                }
                            </View>


                        </React.Fragment>

                    }


                </ScrollView>
            </ScreenWrapper>

            {
                visible &&
                <CreateTask
                    visible={visible}
                    onHide={() => setVisible(false)}
                />
            }


        </React.Fragment>
    )
}
export default Index;
// git remote add myTasks https://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@github.com/Bizedge/myedge-mobile.git;
// it pull myTasks dev  --allow-unrelated-histories   

// npm install --save react-native-video --legacy-peer

// git remote set - url origin https://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@github.com/Bizedge/myedge-mobile.git 