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
    // useFetchDueToday,
    // useFetchUpcoming,
    // useFetchOverDue,
    useFetchTeamTask,
    // useFetchTeamDuetoday,
    // useFetchMyTeamUpcoming,
    // useFetchMyTeamOverdue,
    // useFetchAllSent,
    // useFetchAllSentDue,
    // useFetchAllSentUpcoming,
    // useFetchAllSentOverdue,
} from '../../utills/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { __flatten, useAppSelector, getStoreAboutMe } from '../../utills/Methods';
import { setCurrentTabIndex } from '../../Redux/Actions/Config';
import { useDispatch } from 'react-redux';
import { RootScreenProps } from '../../Routes/types';
import { HomePageHeader } from '../../components/Headers/CustomHeader';
import { AddButtonProps, ProgressCardType, RenderItemProps, TaskTabType, useFetchStatisticsProps, useFetchTodosData, useFetchTodosProps } from './types';
import { TaskDueDateFilter, TaskProgressStatus, TaskStatisticFilter } from '../../utills/payload';
import { Coordinates } from '../Profile/types';



const TaskHome = ({ navigation } : RootScreenProps) => {
    const [department_id, setDepartmentID] = useState<number>();
    const [tab, setTab] = useState<TaskTabType>('All');
    const [count, setCount] = useState("0");
    const [actionTitle, setActionTitle] = useState('To-Do');
    const [progress,setProgress] = React.useState<TaskProgressStatus>("To-do")
    const [tasks, setTasks] = useState<useFetchTodosData[]>([]);
    const index = useAppSelector(state => state.Config.currentTaskTabIndex)
    const dispatch = useDispatch()
    const [characters,setCharacters] = React.useState<string[]>([]) 
    const [filter,setFilter] = React.useState<TaskStatisticFilter>("")
    const [coordinates,setCoordinates] = React.useState<Coordinates>({})
    const ref = useRef<ScrollView>()
    const [overdue_status,setOverDueStatus] = React.useState<TaskDueDateFilter>("")
    const menu = ['My Tasks', 'Sent Tasks', 'My Team']
    const tabs : TaskTabType[] = ['All', 'Due Today', 'Upcoming', 'Overdue', 'No Date']
    const [page,setPage] = React.useState(1)
    const [loading,setLoading] = React.useState(true)


    const setButtons = (i : number) => {
        dispatch(setCurrentTabIndex(i));
        setActionTitle('To-Do');
        setTab('All');
        setLoading(true)
        setPage(1)
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

    const {
        data: statistics,
        isLoading
    } = useFetchStatistics(filter) as useFetchStatisticsProps
    
    // TODOS
    const {
        data: taskData,
        isFetching,
        hasNextPage,
    } = useFetchTodos(
        index !== 2 ? filter : "",
        index !== 2 ? overdue_status : "",
        index !== 2 ? progress : ""
    ) as useFetchTodosProps


    const {
        data: allTeamData,
    } = useFetchTeamTask(index === 2 ? "My Team" : "", department_id,overdue_status,progress);

    console.log("allTeamData",allTeamData)

    const progressCards : ProgressCardType[] = [
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
    ]

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


    const TaskRenderItem = ({ item } : {item : useFetchTodosData}) => {
        if(item?.is_menu) return (
            <React.Fragment>
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
                        {progressCards.map((item, i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={() => cardPressHandler(item)}>
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
                            {tabs.map(
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
                                )
                            )}
                        </ScrollView>
                    </View>
                ) : null
            }
            {!isFetching && tasks && Array.isArray(tasks) && tasks.length === 0 ? <ListEmptyComponent /> : null}
            {isFetching && page === 1 ? <Container marginTop={10}>
                    <ActivityIndicator size={width(8)} color={AppColors.green}/>
                </Container> : null
            }
            </React.Fragment>
        )
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

    const pressTabHandler = (selected : TaskTabType) => {
        setTab(selected)
        let type : TaskDueDateFilter = ""
        if(selected === "Due Today") type = "duetoday"
        if(selected === "Overdue") type = "overdue"
        if(selected === "Upcoming") type = "upcoming"
        if(selected === "No Date") type = "nodate"
        setOverDueStatus(type)
        ref?.current?.scrollTo({x : coordinates?.[tab]?.x,y : coordinates?.[tab]?.y, animated : true})
    }

    const onLayout = (event : LayoutChangeEvent,tab : string) =>{
        setCoordinates({...coordinates,[tab] : event.nativeEvent.layout})
    }
    const getInfo = async () => {
        try {
            let about_me = await getStoreAboutMe();
            setDepartmentID(about_me?.department?.id);
        } catch (err) { }
    };


    const onEndReached = () => {

    }

    const cardPressHandler = (item : ProgressCardType) => {
        setActionTitle(item.selected);
        setPage(1)
        setCount(item.count);
        setTab("All");
        setLoading(true)
    }

    const KeyExtractor = (item : useFetchTodosData, index : number) => `${item}${index}`.toString()

    const mapDataToState = () => {
        if(taskData?.pages?.[0]?.results && Array.isArray(taskData?.pages?.[0]?.results)){
            let arr : useFetchTodosData[] = []
            page > 1 ? setTasks([...tasks,...arr]) : setTasks(taskData?.pages?.[0]?.results)
            setLoading(false)
        }
    }

    const ListFooterComponent = () => {
        if(isFetching && page > 1){
            return(
                <Container alignSelf={'center'} width={30} marginTop={3}>
                    <ActivityIndicator size={width(10)} color={AppColors.green} />
                </Container>
            )
        }
        return <React.Fragment></React.Fragment>                               
    }

    useEffect(()=>{
        mapDataToState()
    },[taskData])

    useEffect(()=> {
        let  type : TaskStatisticFilter = ""
        if(index === 0) type = "assigned_to_me"
        if(index === 1) type = "created_by_me_and_sent"
        setFilter(type)
    },[index])

    useEffect(()=>{
        if(actionTitle === "To-Do") return setProgress("To-do")
        if(actionTitle === "In Progress") return setProgress("In-progress")
        setProgress("Completed")
    },[actionTitle])

    useEffect(() => {
      //  getInfo()
    }, [])

    useEffect(() => {
        dispatch(setCurrentTabIndex(0));
    }, [])

    useEffect(()=>{
        setCharacters([...Array(26).keys()].map((i) => i + 65).map((x) => String.fromCharCode(x)))
    },[])

    return (
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
                <React.Fragment>
                    <HomePageHeader 
                        image={Images.TaskLogo}
                        header="Tasks"
                    />
                    <View style={styles.threeButtonCont}>
                        {menu.map((item, i) => (
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
                        isLoading || loading ? <PageLoader /> : <React.Fragment>

                            <FlatList
                                data={isFetching && page === 1 ? [{is_menu : true}] : [{is_menu : true},...tasks]}
                                keyExtractor={KeyExtractor}
                                renderItem={TaskRenderItem}
                                ItemSeparatorComponent={() => <View style={styles.line} />}
                                showsVerticalScrollIndicator={false}
                                nestedScrollEnabled={true}
                                contentContainerStyle={styles.contentContainerStyle}
                                onEndReachedThreshold={0.1}
                                ListEmptyComponent={ListEmptyComponent}
                                onEndReached={onEndReached}
                                ListFooterComponent={ListFooterComponent}
                            />
                        </React.Fragment>
                    }
                   
                    {/* {
                        isLoading ? <PageLoader /> : <React.Fragment>
                               
                            {
                                    loadingTasks || loading ? (
                                    <PageLoader />
                                ) : null
                            }
                            
                            {
                                !isLoading && !loading ? <React.Fragment>
                                   
                                </React.Fragment> : null
                            }

                            
                        </React.Fragment>
                    } */}
                    {/* {index === 2 ? (
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
                            ) : null} */}
                    </React.Fragment>
            </ScreenWrapper>
    );
};
export default TaskHome;
