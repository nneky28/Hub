import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
    ImageBackground,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
    H1,
    Container,
    Rounded,
    PageLoader,
    TouchableWrapper,
    ImgPlaceholder,
    P,
} from '../../utills/components';
import { width, height } from 'react-native-dimension';
import CommonStyles from '../../utills/CommonStyles';
import MyTeamCard from '../../components/MyTeamCard/Index';
import styles from './styles';
import TodoContent from '../../components/TodoContent/Index';
import TeamTodoContent from '../../components/TeamTodoContent/Index';
import { Images } from '../../utills/Image';
import numeral from 'numeral';
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
    useFetchAllSentOverdue,
} from '../../utills/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { __flatten, getData, getStoredBusiness } from '../../utills/Methods';
import CreateTask from '../CreateTask/Index';
import AnimatedView from '../../components/AnimatedView';
import { useQueryClient } from 'react-query';
import { setCurrentTabIndex } from '../../Redux/Actions/Config';
import { useSelector, useDispatch } from 'react-redux';



const TaskHome = ({ navigation, route }) => {
    const [employee_pk, setEmployeePK] = useState(null);
    const [business, setBusiness] = useState(null);
    const [tab, setTab] = useState('All');
    const [count, setCount] = useState(0);
    const [actionTitle, setActionTitle] = useState('To-Do');
    const [moveTask, setMoveTask] = useState('My Tasks');
    const [data, setData] = useState([]);
    const [taskpage, setTaskPage] = useState(1);
    const [dueTodayPage, setDueTodayPage] = useState(1);
    const [dueItems, setDueItems] = useState([]);
    const [upcomingPage, SetupcomingPage] = useState(1);
    const [upcomingItems, setUpcomingItems] = useState([]);
    const [overduepage, setOverduePage] = useState(1);
    const [overdueItems, setOverdueItems] = useState([]);
    const [sentItems, setSentItems] = useState([]);
    const [sentPage, setSentPage] = useState(1);
    const [sentDueItem, setSentDueItems] = useState([]);
    const [sentUpcomingItem, setSentUpcomingItems] = useState([]);
    const [sentOverdueItem, setSentOverdueItems] = useState([]);
    const [margin, setMargin] = useState(0.1);
    const [visible, setVisible] = useState(false);
    const [teamData, setTeamData] = useState([]);
    const [teamPage, setTeamPage] = useState(1);
    const [teamDueData, setTeamDueData] = useState([]);
    const [teamDuePage, setTeamDuePage] = useState(1);
    const [teamUpcomingData, setTeamUpcomingData] = useState([]);
    const [teamUpcomingPage, setTeamUpcomingPage] = useState(1);
    const [teamOverdueData, setTeamOverdueData] = useState([]);
    const [teamOverduePage, setTeamOverduePage] = useState(1);
    const queryClient = useQueryClient();
    const [tasks, setTasks] = useState([]);
    const [teamTask, setTeamTask] = useState([]);
    const [aboutMe, setAboutMe] = useState(null)
    const index = useSelector(state => state.Config.currentTaskTabIndex)
    const dispatch = useDispatch()

    const setButtons = (i) => {
        dispatch(setCurrentTabIndex(i));
    };

    const AddButton = ({ onPress, style }) => (
        <TouchableOpacity style={style} onPress={onPress}>
            <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
    );
    const RenderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("Menu", { screen: "TaskPeopleList" })}>
                <ImgPlaceholder text={item} size={15} />
            </TouchableOpacity>
        );
    };
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));

    const {
        data: statistics
    } = useFetchStatistics();

    const {
        data: teamCount
    } = useFetchTeamStatistics(employee_pk);

    const {
        data: sentStatistics
    } = useFetchSentStatistics();



    const EmptyState = React.memo(() => {
        return (
            <View style={styles.emptyState}>
                <View>
                    <Text style={styles.emptyText}>
                        {index === 2 ? `${aboutMe?.department?.name}`
                            : index === 0 ? "You" : null}
                    </Text>

                    <Text style={styles.emptyText}>
                        {index === 0 && actionTitle === "To-Do" && tab === "All"
                            ? "have no task in your To-Do."
                            : index === 0 && actionTitle === "To-Do" && tab === "Upcoming"
                                ? "have no Upcoming task."
                                : index === 0 && actionTitle === "To-Do" && tab
                                    ? `have no task ${tab.toLowerCase()}.`
                                    : index === 0 ? "have no Completed task." : null}

                        {index === 1 && actionTitle === "To-Do" && tab === "All"
                            ? "No sent task TO-DO"
                            : index === 1 && actionTitle === "To-Do" && tab
                                ? `No sent task is ${tab.toLowerCase()}`
                                : index === 1 && actionTitle === "Completed"
                                    ? `No sent task is ${actionTitle.toLowerCase()}`
                                    : null}

                        {index === 2 && actionTitle === "To-Do" && tab === "All"
                            ? "no task To-Do"
                            : index === 2 && actionTitle === "To-Do" && tab
                                ? `has no task ${tab.toLowerCase()}`
                                : index === 2 ? `no task ${actionTitle.toLowerCase()}` : null}
                    </Text>
                </View>
            </View>
        );
    });


    const RenderItems = ({ item }) => {
        return (
            <TodoContent
                item={item}
                count={count}
                title={actionTitle}
                index={index}
                id={item.id}
            />
        );
    };
    const TeamRenderItem = ({ item }) => {
        return (
            <TeamTodoContent
                count={count}
                item={item}
                title={actionTitle}
                index={index}
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


    // my task here
    const {
        data: allTasks,
        isLoading: loadingAllTask,
        isFetchingNextPage,
        hasNextPage,
    } = useFetchTodos(tab, index);

    const {
        data: dueTasks,
        isLoading: loadingDueTask
    } = useFetchDueToday(tab, index);

    const {
        data: upcomingTasks,
        isLoading: loadingUpcoming
    } = useFetchUpcoming(tab, index);

    const {
        data: overdueTasks,
        isLoading: loadingOverdue
    } = useFetchOverDue(tab, index);
    console.log("OverdueTasks", overdueTasks,)
    // all sent here
    const {
        data: allSentTasks,
        isLoading: loadingAllSentTask
    } = useFetchAllSent(tab, index, index);

    const { data: allSentDues,
        isLoading: loadingAllSentDues
    } = useFetchAllSentDue(tab, index);

    const {
        data: allSentUpcoming,
        isLoading: loadingAllSentUpcoming
    } =
        useFetchAllSentUpcoming(tab, index);

    const {
        data: allSentOverdue,
        isLoading: loadingAllSentOverdue
    } =
        useFetchAllSentOverdue(tab, index);

    // all team starts
    const {
        data: allTeamData,
        isLoading: loadingAllTeamTask
    } = useFetchTeamTask(tab, employee_pk);

    const {
        data: allTeamDue,
        isLoading: loadingAllTeamDue
    } = useFetchTeamDuetoday(tab, employee_pk);

    const {
        data: allTeamUpcoming,
        isLoading: loadingAllTeamUpcoming
    } = useFetchMyTeamUpcoming(tab, employee_pk);


    const { data: allTeamOverdue,
        isLoading: loadingAllTeamOverdue
    } = useFetchMyTeamOverdue(tab, employee_pk);



    const __flattenArr = () => {
        let flattenedArr = [];
        if (index === 0 && allTasks && allTasks?.pages && Array.isArray(allTasks?.pages)) {
            flattenedArr = allTasks?.pages;
        }
        if (
            index === 0 &&
            tab === 'Due Today' &&
            dueTasks &&
            dueTasks?.pages &&
            Array.isArray(dueTasks?.pages)
        ) {
            flattenedArr = dueTasks?.pages;
        }
        if (
            index === 0 &&
            tab === 'Upcoming' &&
            upcomingTasks &&
            upcomingTasks?.pages &&
            Array.isArray(upcomingTasks?.pages)
        ) {
            flattenedArr = upcomingTasks?.pages;
        }
        if (
            index === 0 &&
            tab === 'Overdue' &&
            overdueTasks &&
            overdueTasks?.pages &&
            Array.isArray(overdueTasks?.pages)
        ) {
            flattenedArr = overdueTasks?.pages;
        }
        if (
            index === 0 &&
            tab === 'Upcoming' &&
            upcomingTasks &&
            upcomingTasks?.pages &&
            Array.isArray(upcomingTasks?.pages)
        ) {
            flattenedArr = upcomingTasks?.pages;
        }
        if (
            index === 1 &&
            allSentTasks &&
            allSentTasks?.pages &&
            Array.isArray(allSentTasks?.pages)
        ) {
            flattenedArr = allSentTasks?.pages;
        }
        if (
            index === 1 &&
            tab === 'Due Today' &&
            allSentDues &&
            allSentDues?.pages &&
            Array.isArray(allSentDues?.pages)
        ) {
            flattenedArr = allSentDues?.pages;
        }
        if (
            index === 1 &&
            tab === 'Upcoming' &&
            allSentUpcoming &&
            allSentUpcoming?.pages &&
            Array.isArray(allSentUpcoming?.pages)
        ) {
            flattenedArr = allSentUpcoming?.pages;
        }
        if (
            index === 1 &&
            tab === 'Overdue' &&
            allSentOverdue &&
            allSentOverdue?.pages &&
            Array.isArray(allSentOverdue?.pages)
        ) {
            flattenedArr = allSentOverdue?.pages;
        }
        if (
            index === 2 &&
            allTeamData &&
            allTeamData?.pages &&
            Array.isArray(allTeamData?.pages)
        ) {
            flattenedArr = allTeamData?.pages;
        }
        if (
            index === 2 &&
            tab === 'Due Today' &&
            allTeamDue &&
            allTeamDue?.pages &&
            Array.isArray(allTeamDue?.pages)
        ) {
            flattenedArr = allTeamDue?.pages;
        }
        if (
            index === 2 &&
            tab === 'Upcoming' &&
            allTeamUpcoming &&
            allTeamUpcoming?.pages &&
            Array.isArray(allTeamUpcoming?.pages)
        ) {
            flattenedArr = allTeamUpcoming?.pages;
        }
        if (
            index === 2 &&
            tab === 'Overdue' &&
            allTeamOverdue &&
            allTeamOverdue?.pages &&
            Array.isArray(allTeamOverdue?.pages)
        ) {
            flattenedArr = allTeamOverdue?.pages;
        }
        let arr = __flatten(flattenedArr);

        const state = {
            data: [],
            dueItems: [],
            upcomingItems: [],
            overdueItems: [],
            sentItems: [],
            sentDueItem: [],
            sentUpcomingItem: [],
            sentOverdueItem: [],
            teamData: [],
            teamDueData: [],
            teamUpcomingData: [],
            teamOverdueData: [],
        };
        if (index === 0)
            state.data = taskpage > 1 ? [...data, ...arr] : arr;
        if (index === 0 && tab === 'Due Today')
            state.dueItems = dueTodayPage > 1 ? [...dueItems, ...arr] : arr;
        if (index === 0 && tab === 'Upcoming')
            state.upcomingItems = upcomingPage > 1 ? [...upcomingItems, ...arr] : arr;
        if (index === 0 && tab === 'Overdue')
            state.overdueItems = overduepage > 1 ? [...overdueItems, ...arr] : arr;


        if (index === 1)
            state.sentItems = sentPage > 1 ? [...sentItems, ...arr] : arr;
        if (index === 1 && tab === 'Due Today')
            state.sentDueItem = sentPage > 1 ? [...sentDueItem, ...arr] : arr;
        if (index === 1 && tab === 'Upcoming')
            state.sentUpcomingItem = sentPage > 1 ? [...sentUpcomingItem, ...arr] : arr;
        if (index === 1 && tab === 'Overdue')
            state.sentOverdueItem = sentPage > 1 ? [...sentOverdueItem, ...arr] : arr;


        if (index === 2)
            state.teamData = teamPage > 1 ? [...teamData, ...arr] : arr;
        if (index === 2 && tab === 'Due Today')
            state.teamDueData = teamDuePage > 1 ? [...teamDueData, ...arr] : arr;
        if (index === 2 && tab === 'Upcoming')
            state.teamUpcomingData = teamUpcomingPage > 1 ? [...teamUpcomingData, ...arr] : arr;
        if (index === 2 && tab === 'Overdue')
            state.teamOverdueData = teamOverduePage > 1 ? [...teamOverdueData, ...arr] : arr;

        return state;
    };

    const mapToState = ({
        data,
        dueItems,
        overdueItems,
        upcomingItems,
        sentItems,
        sentDueItem,
        sentUpcomingItem,
        sentOverdueItem,
        teamData,
        teamDueData,
        teamUpcomingData,
        teamOverdueData,
    }) => {
        if (index === 0 && actionTitle === 'To-Do' && tab === 'All') {
            let arr = Object.values(data).filter((item) => item.status !== 'Completed' && item.status !== 'In-progress');
            return setTasks(arr);
        }
        if (index === 0 && actionTitle === 'To-Do' && tab === 'Due Today') {
            let arr = Object.values(dueItems).filter((item) => item.status !== 'In-progress');
            return setTasks(arr);
        }
        if (index === 0 && actionTitle === 'To-Do' && tab === 'Upcoming') {
            let arr = Object.values(upcomingItems).filter((item) => item.status !== 'In-progress');
            return setTasks(arr);
        }
        if (index === 0 && actionTitle === 'To-Do' && tab === 'Overdue') {
            let arr = Object.values(overdueItems).filter((item) => item.status !== 'In-progress');
            return setTasks(arr);
        }
        if (index === 0 && actionTitle === 'To-Do' && tab === 'No Date') {
            let arr = Object.values(data).filter((item) => !item?.due_date);
            return setTasks(arr);
        }
        if (index === 0 && actionTitle === 'In Progress') {
            let arr = Object.values(data).filter((item) => item.status === "In-progress");
            return setTasks(arr);
        }
        if (index === 0 && actionTitle === 'Completed') {
            let arr = Object.values(data).filter((item) => item.status === "Completed")
            return setTasks(arr);
        }

        if (index === 1 && actionTitle === 'To-Do' && tab === 'All') {
            let arr = Object.values(sentItems).filter((item) => item.status !== 'Completed' && item.status !== 'In-progress');
            return setTasks(arr);
        }
        if (index === 1 && actionTitle === 'To-Do' && tab === 'Due Today') {
            let arr = Object.values(sentDueItem).filter((item) => item.status !== 'In-progress');
            return setTasks(arr);
        }
        if (index === 1 && actionTitle === 'To-Do' && tab === 'Upcoming') {
            let arr = Object.values(sentUpcomingItem).filter((item) => item.status !== "In-progress");
            return setTasks(arr);
        }
        if (index === 1 && actionTitle === 'To-Do' && tab === 'Overdue') {
            let arr = Object.values(sentOverdueItem).filter((item) => item.status !== 'In-progress');
            return setTasks(arr);
        }
        if (index === 1 && actionTitle === 'To-Do' && tab === 'No Date') {
            let arr = Object.values(sentItems).filter((item) => item?.due_date === null);
            return setTasks(arr);
        }
        if (index === 1 && actionTitle === 'In Progress') {
            let arr = Object.values(sentItems).filter((item) => item.status === "In-progress");
            return setTasks(arr);
        }
        if (index === 1 && actionTitle === 'Completed') {
            let arr = Object.values(sentItems).filter((item) => item.status === "Completed");
            return setTasks(arr);
        }

        if (index === 2 && actionTitle === 'To-Do' && tab === 'All') {
            let arr = Object.values(teamData).filter((item) => item.status !== "Completed" && item.status !== 'In-progress');
            return setTeamTask(arr);
        }
        if (index === 2 && actionTitle === 'To-Do' && tab === 'Due Today') {
            let arr = Object.values(teamDueData).filter((item) => item.status !== 'Completed');
            return setTeamTask(arr);
        }
        if (index === 2 && actionTitle === 'To-Do' && tab === 'Upcoming') {
            let arr = Object.values(teamUpcomingData).filter((item) => item.status !== 'In-progress');
            return setTeamTask(arr);
        }
        if (index === 2 && actionTitle === 'To-Do' && tab === 'Overdue') {
            let arr = Object.values(teamOverdueData).filter((item) => item.status !== 'In-progress');
            return setTeamTask(arr);
        }
        if (index === 2 && actionTitle === 'To-Do' && tab === 'No Date') {
            let arr = Object.values(teamData).filter((item) => item?.due_date === null);
            return setTeamTask(arr);
        }
        if (index === 2 && actionTitle === 'In Progress') {
            let arr = Object.values(teamData).filter((item) => item.status === "In-progress");
            return setTeamTask(arr);
        }
        if (index === 2 && actionTitle === 'Completed') {
            let arr = Object.values(teamData).filter((item) => item.status === "Completed");
            return setTeamTask(arr);
        }
    };

    useEffect(() => {
        mapToState(__flattenArr());
    }, [index, actionTitle, tab, allTasks, allSentTasks, allTeamData, data]);


    const getInfo = async () => {
        try {
            let about_me = await getData('about_me');
            setEmployeePK(about_me?.department?.id);
            setAboutMe(about_me)
        } catch (err) { }
    };


    useEffect(() => {
        getInfo()
    }, [])

    useEffect(() => {
        dispatch(setCurrentTabIndex(0));
    }, [])

    return (
        <React.Fragment>
            <ScreenWrapper
                scrollEnabled={false}
                footerUnScrollable={() => {
                    return (
                        <AddButton
                            style={styles.addButton}
                            onPress={() => navigation.navigate("Menu", { screen: "CreateTask" })}
                        />
                    );
                }}>
                <View style={styles.mainViewContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => navigation.toggleDrawer()}
                            style={styles.logoBox}>
                            <Image source={{ uri: Images.TaskLogo }} style={styles.logo} />
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={styles.screenTitle}>
                            Tasks
                        </Text>
                    </View>
                    <View style={styles.line} />
                </View>
                <ScrollView
                    style={[styles.scroll, CommonStyles.paddingBottom_10]}
                    showsVerticalScrollIndicator={false}>

                    <View style={styles.threeButtonCont}>
                        {['My Tasks', 'Sent Tasks', 'My Team'].map((item, i) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setButtons(i);
                                    setActionTitle('To-Do');
                                    setTab('All');
                                }}
                                style={index === i ? styles.animatedView : styles.button}
                                activeOpacity={0.8}
                                key={i}>
                                <Text
                                    style={[
                                        styles.buttonText,
                                        index === i && styles.buttonText1,
                                    ]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {index === 2 ? (
                        <View>
                            <Text numberOfLines={1} style={styles.headerTitle}>
                                Find People
                            </Text>

                            <View style={styles.search}>
                                <TouchableOpacity
                                    style={styles.searchView}
                                    onPress={() =>
                                        // navigation.navigate('search')
                                        navigation.navigate("Menu", { screen: "TaskPeopleList" })
                                    }>
                                    <Image
                                        source={{ uri: Images.SearchIcon }}
                                        style={styles.searchBoxStyle}
                                    />
                                </TouchableOpacity>
                                <FlatList
                                    data={alphabet}
                                    horizontal
                                    renderItem={RenderItem}
                                    ItemSeparatorComponent={() => (
                                        <View style={[CommonStyles.marginRight_3]} />
                                    )}
                                    showsHorizontalScrollIndicator={false}
                                    nestedScrollEnabled={true}
                                    style={styles.team}
                                />
                            </View>
                        </View>
                    ) : null}

                    <View style={styles.boxContainer}>
                        {[
                            {
                                selected: 'To-Do',
                                // colorUp: AppColors.blue1,
                                selected_image: Images.clippedBlue,
                                image: Images.blueBox,
                                count:
                                    index === 0 && statistics
                                        ? numeral(statistics?.todo_count).format('0,0')
                                        : index === 1 && sentStatistics
                                            ? numeral(sentStatistics?.todo_count).format('0,0')
                                            : index === 2 && teamCount
                                                ? numeral(
                                                    teamCount?.todo_count
                                                ).format('0,0')
                                                : 0,
                                borderWidth: 0.5,
                                borderColor: '#5182F6',
                            },

                            {
                                selected: 'In Progress',
                                image: Images.yellowBox,
                                // colorUp: AppColors.newYellow,
                                selected_image: Images.clippedYellow,
                                count:
                                    index === 0 && statistics
                                        ? numeral(statistics?.inprogress_count).format('0,0')
                                        : index === 1 && sentStatistics
                                            ? numeral(sentStatistics?.inprogress_count).format('0,0')
                                            : index === 2 && teamCount
                                                ? numeral(teamCount?.inprogress_count).format('0,0')
                                                : 0,
                                borderWidth: 1,
                                borderColor: '#FBBC3E',
                            },
                            {
                                selected: 'Completed',
                                image: Images.greenBox,
                                // colorUp: AppColors.lightGreen,
                                selected_image: Images.clippedGreen,
                                count:
                                    index === 0 && statistics
                                        ? numeral(statistics?.completed_count).format('0,0')
                                        : index === 1 && sentStatistics
                                            ? numeral(sentStatistics?.completed_count).format('0,0')
                                            : index === 2 && teamCount
                                                ? numeral(teamCount?.completed_count).format('0,0')
                                                : 0,
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
                                        borderRadius: width(4),
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
                                                        resizeMode='cover'
                                                        imageStyle={{
                                                            borderRadius: width(4),
                                                            // height: height(8)
                                                        }}
                                                        style={styles.clipped}
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

                    {index === 2 && actionTitle === 'To-Do' ? null : (
                        <View style={styles.container}>
                            {index === 0 ? (
                                <H1 color={AppColors.black1}>
                                    {actionTitle} (
                                    {index === 0 && actionTitle === 'To-Do'
                                        ? statistics?.todo_count
                                        : actionTitle === 'In Progress'
                                            ? statistics?.inprogress_count
                                            : actionTitle === 'Completed'
                                                ? statistics?.completed_count
                                                : 0}
                                    )
                                </H1>
                            ) : index === 1 ? (
                                <H1 color={AppColors.black1}>
                                    {actionTitle} (
                                    {index === 1 && actionTitle === 'To-Do'
                                        ? sentStatistics?.todo_count
                                        : actionTitle === 'In Progress'
                                            ? sentStatistics?.inprogress_count
                                            : actionTitle === 'Completed'
                                                ? sentStatistics?.completed_count
                                                : 0}
                                    )
                                </H1>
                            ) : (
                                <H1 color={AppColors.black1}>
                                    {actionTitle} (
                                    {index === 2 && actionTitle === 'In Progress'
                                        ? teamCount?.inprogress_count
                                        : actionTitle === 'Completed'
                                            ? teamCount?.completed_count
                                            : 0}
                                    )
                                </H1>
                            )}
                        </View>
                    )}


                    {(index === 0 && actionTitle === 'To-Do') ||
                        (index === 1 && actionTitle === 'To-Do') ||
                        (index === 2 && actionTitle === 'To-Do') ? (
                        <View style={styles.scrollViewContainer}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {['All', 'Due Today', 'Upcoming', 'Overdue', 'No Date'].map(
                                    (item, i) => (
                                        <TouchableOpacity
                                            onPress={() => setTab(item)}
                                            style={
                                                tab === item ? styles.currentTab : styles.defaultTab
                                            }
                                            key={i}>
                                            <H1
                                                fontSize={3.3}
                                                style={tab === item ? styles.selectedTab : styles.tab}>
                                                {item}
                                            </H1>
                                        </TouchableOpacity>
                                    ),
                                )}
                            </ScrollView>
                        </View>
                    ) : null}

                    {loadingAllTask ||
                        loadingDueTask ||
                        loadingUpcoming ||
                        loadingOverdue ||
                        loadingAllTeamTask ||
                        loadingAllTeamDue ||
                        loadingAllTeamUpcoming ||
                        loadingAllTeamOverdue ||
                        loadingAllSentDues ||
                        loadingAllSentOverdue ||
                        loadingAllSentUpcoming ||
                        loadingAllSentTask ? (
                        <PageLoader />
                    ) : null}

                    {index === 0 || index === 1 ? (
                        <FlatList
                            data={tasks}
                            keyExtractor={(item, index) => item.id.toString()}
                            renderItem={RenderItems}
                            ItemSeparatorComponent={() => <View style={styles.line} />}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            contentContainerStyle={[
                                CommonStyles.marginTop_1,
                                { paddingBottom: height(10) },
                            ]}
                            onEndReachedThreshold={0.1}
                            refreshing={false}
                            ListEmptyComponent={EmptyState}
                            ListFooterComponent={
                                isFetchingNextPage || hasNextPage ? footerLoader : null
                            }
                        />
                    ) : null}

                    {index === 2 ? (
                        <FlatList
                            data={teamTask}
                            keyExtractor={(item, index) => item.id.toString()}
                            renderItem={TeamRenderItem}
                            ItemSeparatorComponent={() => <View style={styles.line} />}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            contentContainerStyle={[
                                CommonStyles.marginTop_3,
                                { paddingBottom: height(10) },
                            ]}
                            onEndReachedThreshold={0.1}
                            refreshing={false}
                            ListEmptyComponent={EmptyState}
                        />
                    ) : null}
                </ScrollView>
            </ScreenWrapper>
        </React.Fragment>
    );
};
export default TaskHome;
