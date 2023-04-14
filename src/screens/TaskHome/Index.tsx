import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    ImageBackground,
    LayoutChangeEvent,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
    H1,
    Container,
    PageLoader,
    ImgPlaceholder,
    EmptyStateWrapper,
    TouchableWrapper,
} from '../../utills/components';
import { width, height } from 'react-native-dimension';
import CommonStyles from '../../utills/CommonStyles';
import styles from './styles';
import TodoContent from '../../components/TodoContent/Index';
import TeamTodoContent from '../../components/TeamTodoContent/Index';
import { Images } from '../../utills/Image';
import numeral from 'numeral';
import AppColors from '../../utills/AppColors';
import {
    useFetchStatistics,
    useFetchTodos,
    useFetchDueToday,
    useFetchUpcoming,
    useFetchOverDue,
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
import { __flatten, getData, useAppSelector } from '../../utills/Methods';
import { setCurrentTabIndex } from '../../Redux/Actions/Config';
import { useDispatch } from 'react-redux';
import { RootScreenProps } from '../../Routes/types';
import { HomePageHeader } from '../../components/Headers/CustomHeader';
import { AddButtonProps, RenderItemProps, useFetchStatisticsProps } from './types';
import { TaskStatisticFilter } from '../../utills/payload';
import { Coordinates } from '../Profile/types';



const TaskHome = ({ navigation } : RootScreenProps) => {
    const [employee_pk, setEmployeePK] = useState();
    const [tab, setTab] = useState('All');
    const [count, setCount] = useState("0");
    const [actionTitle, setActionTitle] = useState('To-Do');
    const [data] = useState([]);
    const [taskpage] = useState(1);
    const [dueTodayPage] = useState(1);
    const [dueItems] = useState([]);
    const [upcomingPage] = useState(1);
    const [upcomingItems] = useState([]);
    const [overduepage] = useState(1);
    const [overdueItems] = useState([]);
    const [sentItems] = useState([]);
    const [sentPage] = useState(1);
    const [sentDueItem] = useState([]);
    const [sentUpcomingItem] = useState([]);
    const [sentOverdueItem] = useState([]);
    const [teamData] = useState([]);
    const [teamPage] = useState(1);
    const [teamDueData] = useState([]);
    const [teamDuePage] = useState(1);
    const [teamUpcomingData] = useState([]);
    const [teamUpcomingPage] = useState(1);
    const [teamOverdueData] = useState([]);
    const [teamOverduePage] = useState(1);
    const [tasks, setTasks] = useState([]);
    const [teamTask, setTeamTask] = useState([]);
    const [aboutMe, setAboutMe] = useState(null)
    const index = useAppSelector(state => state.Config.currentTaskTabIndex)
    const dispatch = useDispatch()
    const [characters,setCharacters] = React.useState<string[]>([]) 
    const [filter,setFilter] = React.useState<TaskStatisticFilter>("")
    const [coordinates,setCoordinates] = React.useState<Coordinates>({})
    const ref = useRef<ScrollView>()


    const tabs = ['My Tasks', 'Sent Tasks', 'My Team']

    const setButtons = (i : number) => {
        dispatch(setCurrentTabIndex(i));
        setActionTitle('To-Do');
        setTab('All');
    };

    const AddButton = ({ onPress, style } : AddButtonProps) => (
        <TouchableOpacity style={style} onPress={onPress}>
            <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
    );
    const RenderItem = ({ item } : RenderItemProps) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("Menu", { screen: "TaskPeopleList" })}>
                <ImgPlaceholder text={item} size={15} />
            </TouchableOpacity>
        );
    };
    

    const ListEmptyComponent = () => {
        let  msg = 'todo task.'
        return (
            <EmptyStateWrapper 
                marginTop={1}
                icon={Images.EmptyTraining}
                header_1='You have no'
                header_2={msg}
                backgroundColor={AppColors.transparent}
                sub_text='They will show up here when you do.'
            />
        );
    }


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

    const {
        data: statistics,
        isLoading
    } = useFetchStatistics(filter) as useFetchStatisticsProps
    
    // ALL MY TASKS
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

    const pressTabHandler = (selected : string) => {
        setTab(selected)
        ref?.current?.scrollTo({x : coordinates?.[tab]?.x,y : coordinates?.[tab]?.y, animated : true})
    }

    const onLayout = (event : LayoutChangeEvent,tab : string) =>{
        setCoordinates({...coordinates,[tab] : event.nativeEvent.layout})
    }
    const getInfo = async () => {
        try {
            let about_me = await getData('about_me');
            setEmployeePK(about_me?.department?.id);
            setAboutMe(about_me)
        } catch (err) { }
    };

    useEffect(()=> {
        let  type : TaskStatisticFilter = ""
        if(index === 0) type = "assigned_to_me"
        if(index === 1) type = "created_by_me_and_sent"
        setFilter(type)
    },[index])

    useEffect(() => {
        getInfo()
    }, [])

    useEffect(() => {
        dispatch(setCurrentTabIndex(0));
    }, [])

    useEffect(()=>{
        setCharacters([...Array(26).keys()].map((i) => i + 65).map((x) => String.fromCharCode(x)))
    },[])

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
                    <HomePageHeader 
                        image={Images.TaskLogo}
                        header="Tasks"
                    />
                    <View style={styles.threeButtonCont}>
                        {tabs.map((item, i) => (
                            <TouchableWrapper
                                onPress={() => {
                                    setButtons(i);
                                }}
                                style={index === i ? styles.animatedView : styles.button}
                                key={i}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        index === i && styles.buttonText1,
                                    ]}>
                                    {item}
                                </Text>
                            </TouchableWrapper>
                        ))}
                    </View>

                    {
                        isLoading ? <PageLoader /> : <React.Fragment>
                            {
                                index === 2 ? (
                                    <View>
                                        <Text numberOfLines={1} style={styles.headerTitle}>
                                            Find People
                                        </Text>

                                        <View style={styles.search}>
                                            <TouchableOpacity
                                                style={styles.searchView}
                                                onPress={() =>
                                                    navigation.navigate("Menu", { screen: "TaskPeopleList" })
                                                }>
                                                <Image
                                                    source={{ uri: Images.SearchIcon }}
                                                    style={styles.searchBoxStyle}
                                                />
                                            </TouchableOpacity>
                                            <FlatList
                                                data={characters}
                                                horizontal
                                                renderItem={RenderItem}
                                                ItemSeparatorComponent={() => (
                                                    <View style={[CommonStyles.marginRight_3]} />
                                                )}
                                                showsHorizontalScrollIndicator={false}
                                                nestedScrollEnabled={true}
                                            />
                                        </View>
                                    </View>
                                ) : null
                            }
                            <View style={styles.boxContainer}>
                                    {[
                                        {
                                            selected: 'To-Do',
                                            selected_image: Images.clippedBlue,
                                            image: Images.blueBox,
                                            count: statistics?.todo_count ? numeral(statistics?.todo_count).format('0,0') : "0",
                                            borderWidth: 0.5,
                                            borderColor: '#5182F6',
                                        },

                                        {
                                            selected: 'In Progress',
                                            image: Images.yellowBox,
                                            // colorUp: AppColors.newYellow,
                                            selected_image: Images.clippedYellow,
                                            count: statistics?.inprogress_count ? numeral(statistics?.inprogress_count).format('0,0') : "0",
                                            borderWidth: 1,
                                            borderColor: '#FBBC3E',
                                        },
                                        {
                                            selected: 'Completed',
                                            image: Images.greenBox,
                                            // colorUp: AppColors.lightGreen,
                                            selected_image: Images.clippedGreen,
                                            count: statistics?.completed_count ? numeral(statistics?.completed_count).format('0,0') : "0",
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
                                                    borderWidth: item.selected === actionTitle ? item.borderWidth : undefined,
                                                    borderColor: item.selected === actionTitle ? item.borderColor : undefined,
                                                }}
                                                style={styles.bg_img}>
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
                                {
                                    index === 2 && actionTitle === 'To-Do' ? null : (
                                        <View style={styles.container}>
                                            <H1 color={AppColors.black1}>
                                                {actionTitle} ({count})
                                            </H1>
                                        </View>
                                    )
                                }
                                {
                                    actionTitle === "To-Do" ? (
                                    <View style={styles.scrollViewContainer}>
                                        <ScrollView 
                                            horizontal 
                                            showsHorizontalScrollIndicator={false}
                                            ref={ref}
                                        >
                                            {['All', 'Due Today', 'Upcoming', 'Overdue', 'No Date'].map(
                                                (item, i) => (
                                                    <TouchableWrapper
                                                        onPress={()=>pressTabHandler(item)}
                                                        style={
                                                            tab === item ? styles.currentTab : styles.defaultTab
                                                        }
                                                        onLayout={(event)=>onLayout(event,item)}
                                                        key={i}
                                                    >
                                                        <H1
                                                            fontSize={3.3}
                                                            style={tab === item ? styles.selected_tab_text : styles.tab_text}>
                                                            {item}
                                                        </H1>
                                                    </TouchableWrapper>
                                                ),
                                            )}
                                        </ScrollView>
                                    </View>
                                ) : null
                            }
                            {
                                    loadingAllTask ||
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
                                ) : null
                            }
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
                                    ListEmptyComponent={ListEmptyComponent}
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
                                    ListEmptyComponent={ListEmptyComponent}
                                />
                            ) : null}
                        </React.Fragment>
                    }
            </ScreenWrapper>
        </React.Fragment>
    );
};
export default TaskHome;
