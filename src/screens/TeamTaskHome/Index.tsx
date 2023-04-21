import {
    View, TouchableOpacity, ScrollView, FlatList, ImageBackground, ActivityIndicator, LayoutChangeEvent
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { H1, Container, TouchableWrapper, PageLoader, EmptyStateWrapper } from '../../utills/components'
import { width } from 'react-native-dimension';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ToastError, ToastSuccess, useAppSelector } from '../../utills/Methods';
import { RootMenuScreenProps } from '../../Routes/types';
import { HeaderWithBackButton } from '../../components/Headers/CustomHeader';
import { ActionTitleType, ProgressCardType, TaskProgressStatus, TaskTabType, useFetchStatisticsProps, useFetchTodosData, useFetchTodosProps } from '../TaskHome/types';
import { Images } from '../../utills/Image';
import numeral from 'numeral';
import { APIFunction, useFetchStatistics, useFetchTeamTask, useFetchTodos } from '../../utills/api';
import { useDispatch } from 'react-redux';
import { GET_TASKS, GET_TASK_STATISTICS, GET_TEAM_TASKS, TaskDueDateFilter, TaskStatisticFilter } from '../../utills/payload';
import { Coordinates } from '../Profile/types';
import { useMutation, useQueryClient } from 'react-query';
import AppColors from '../../utills/AppColors';
import TodoContent from '../../components/TodoContent/Index';
import { setCurrentTaskItem } from '../../Redux/Actions/Config';
import CustomSnackBar from '../../components/CustomSnackBar';




const TeamTaskHome = ({route} : RootMenuScreenProps) => {
    const {
        type,
        name,
        id
    } = route?.params || {}

    const [tab, setTab] = useState<TaskTabType>('All');
    const [actionTitle, setActionTitle] = useState<ActionTitleType>('To-Do');
    const [progress,setProgress] = React.useState<TaskProgressStatus>("To-do")
    const [tasks, setTasks] = useState<useFetchTodosData[]>([]);
    const dispatch = useDispatch()
    const [filter] = React.useState<TaskStatisticFilter>("assigned_to_me")
    const [coordinates,setCoordinates] = React.useState<Coordinates>({})
    const ref = useRef<ScrollView>(null)
    const [overdue_status,setOverDueStatus] = React.useState<TaskDueDateFilter>("")
    const tabs : TaskTabType[] = ['All', 'Due Today', 'Upcoming', 'Overdue', 'No Date']
    const [page,setPage] = React.useState(1)
    const [loading,setLoading] = React.useState(true)
    const [show,setShow] = React.useState(false)
    const [timeoutID,setTimeoutID] = React.useState<NodeJS.Timeout>()
    const currentTask : useFetchTodosData & {
        old_status : TaskProgressStatus
    } = useAppSelector(state=>state?.Config?.task)
    const queryClient = useQueryClient()

    const cardPressHandler = (item : ProgressCardType) => {
        if(actionTitle === item?.selected) return
        setActionTitle(item.selected);
        setPage(1)
        setTab("All");
        setOverDueStatus("")
        setLoading(true)
    }

    const {
        mutateAsync,
        isLoading : updating
    } = useMutation(APIFunction.update_task_status)

    // TODOS
    const {
        data: taskData,
        isFetching,
        hasNextPage
    } = useFetchTodos(
        type === "employee" ? filter : "",
        type === "employee" ? overdue_status : "",
        type === "employee" ? progress : "",
        typeof id === "number" && type === "employee" ? id : ""
    ) as useFetchTodosProps

    const {
        data: teamTaskData,
        isFetching : fetching,
        hasNextPage : hasNextTeamPage
    } = useFetchTeamTask(
        type === "department" ? "My Team" : "", 
        type === "department" && typeof id === "number" ? id : "",
        overdue_status,
        progress
    ) as useFetchTodosProps
    
    const {
        data: statistics
    } = useFetchStatistics(
        filter,
        typeof id === "number" && type === "department" ? id : "",
        typeof id === "number" && type === "employee" ? id : "",
    ) as useFetchStatisticsProps

    const progressCards : ProgressCardType[] = [
        {
            selected: 'To-Do',
            selected_image: Images.SelectedPurpleBg,
            image: Images.blueBox,
            count: statistics?.todo_count ? numeral(statistics?.todo_count).format('0,0') : "0",
            borderWidth: 0.5,
            borderColor: '#5182F6',
        },

        {
            selected: 'In Progress',
            image: Images.yellowBox,
            selected_image: Images.SelectedYellowBg,
            count: statistics?.inprogress_count ? numeral(statistics?.inprogress_count).format('0,0') : "0",
            borderWidth: 1,
            borderColor: '#FBBC3E',
        },
        {
            selected: 'Completed',
            image: Images.greenBox,
            selected_image: Images.SelectedGreenBg,
            count: statistics?.completed_count ? numeral(statistics?.completed_count).format('0,0') : "0",
            borderWidth: 0.5,
            borderColor: '#2898A4',
        },
    ]

    const ListEmptyComponent = () => {
        let  msg = 'todo task.'
        if(overdue_status === "duetoday") msg = "task due today."
        if(overdue_status === "upcoming") msg = "upcoming task."
        if(overdue_status === "overdue") msg = "overdue task."
        if(actionTitle === "In Progress") msg = "task in progress."
        if(actionTitle === "Completed") msg = "completed task."
        return (
            <EmptyStateWrapper 
                marginTop={1}
                icon={Images.EmptyTraining}
                header_1={`${name} has no`}
                header_2={msg}
                backgroundColor={AppColors.transparent}
                sub_text='The tasks will show up here when they do.'
            />
        );
    }


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

    const onEndReached = () => {
        if (
            (type === "employee" && !hasNextPage) ||
            (type === "department" && !hasNextTeamPage) ||
            isFetching || fetching
        ) return
        setPage(page + 1)
    }

    const RenderItem = ({item} : {item : useFetchTodosData}) =>{
        return (
            <TodoContent
                item={item}
                title={actionTitle}
                id={item.id}
            />
        );
    }

    const mapDataToState = () => {
        if(taskData?.pages?.[0]?.results && Array.isArray(taskData?.pages?.[0]?.results)){
            let arr : useFetchTodosData[] = []
            page > 1 ? setTasks([...tasks,...arr]) : setTasks(taskData?.pages?.[0]?.results)
            return setLoading(false)
        }
        if(teamTaskData?.pages?.[0]?.results && Array.isArray(teamTaskData?.pages?.[0]?.results)){
            let arr : useFetchTodosData[] = []
            page > 1 ? setTasks([...tasks,...arr]) : setTasks(teamTaskData?.pages?.[0]?.results)
            return setLoading(false)
        }
    }
    
    const undoChangesHandler = async () => {
        try{    
            clearTimeout(Number(timeoutID))
            if(!currentTask?.id || !currentTask?.created_by?.id || !currentTask?.title) return
            let fd = {
                id : currentTask?.id,
                status : currentTask?.old_status,
                created_by : currentTask?.created_by?.id,
                title : currentTask?.title
            }
            await mutateAsync(fd)
            setShow(false)
            queryClient.invalidateQueries(GET_TASKS)
            queryClient.invalidateQueries(GET_TASK_STATISTICS)
            queryClient.invalidateQueries(GET_TEAM_TASKS)
            ToastSuccess("Your changes have been saved.")
        }catch(err : any){
            setShow(false)
            ToastError(err?.msg)
        }
    }

    const onDismiss = () => {
        
    }

    useEffect(()=>{
        mapDataToState()
    },[taskData,teamTaskData])

    useEffect(()=>{
        if(actionTitle === "To-Do") return setProgress("To-do")
        if(actionTitle === "In Progress") return setProgress("In-progress")
        setProgress("Completed")
    },[actionTitle])

    useEffect(()=>{
        if(Object.values(currentTask).length === 0) return
        setPage(1)
        setShow(true)
    },[currentTask])

    useEffect(()=> {
        if(Object.values(currentTask).length === 0) return 
        let timeout = setTimeout(()=>{
            setShow(false)
            dispatch(setCurrentTaskItem({}))
        },7000)
        setTimeoutID(timeout)
    },[currentTask])

    return (
        <ScreenWrapper>
            <HeaderWithBackButton 
                headerText={typeof name === "string" ? name : ""}
            />
            {
                loading ? <PageLoader /> : <React.Fragment>
                    <FlatList 
                        ListHeaderComponent={<React.Fragment>
                            <View style={styles.boxContainer}>
                                {progressCards.map((item, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() => cardPressHandler(item)}>
                                        <ImageBackground
                                            source={{ uri: item.selected === actionTitle ? item.selected_image : item.image }}
                                            resizeMode='cover'
                                            imageStyle={{
                                                borderRadius: width(4),
                                                borderWidth: item.selected === actionTitle ? item.borderWidth : undefined,
                                                borderColor: item.selected === actionTitle ? item.borderColor : undefined,
                                            }}
                                            style={styles.bg_img}>
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
                                            <Container backgroundColor={AppColors.transparent}
                                                horizontalAlignment="flex-end"
                                                paddingRight={4}
                                                paddingBottom={1}
                                            >
                                                <H1
                                                    color={AppColors.black1}
                                                    fontSize={7} numberOfLines={1}>
                                                    {item.count}
                                                </H1>
                                            </Container>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.container}>
                                <H1 color={AppColors.black1}>
                                    {actionTitle} ({
                                        actionTitle === "Completed" ? numeral(statistics?.completed_count).format("0,0") : 
                                        actionTitle === "In Progress" ? numeral(statistics?.inprogress_count).format("0,0") : 
                                        actionTitle === "To-Do" ? numeral(statistics?.todo_count).format("0,0") : 0
                                    })
                                </H1>
                            </View>
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
                            {!(isFetching || fetching) && tasks && Array.isArray(tasks) && tasks.length === 0 ? <ListEmptyComponent /> : null}
                            {(isFetching || fetching) && page === 1 ? <Container marginTop={10}>
                                    <ActivityIndicator size={width(8)} color={AppColors.green}/>
                                </Container> : null
                            }
                        </React.Fragment>}  
                        data={(isFetching || fetching) && page === 1 ? [] : tasks}
                        onEndReached={onEndReached}
                        renderItem={RenderItem}        
                        ListFooterComponent={isFetching && page > 1 ? <Container alignSelf={'center'} width={30} marginTop={3}>
                        <ActivityIndicator size={width(10)} color={AppColors.green} />
                    </Container> : <React.Fragment />}
                    />
                </React.Fragment>
            }

                    {
                        show ? <CustomSnackBar 
                            visible={show}
                            onDismiss={onDismiss}
                            label="Undo"
                            text={"Your changes have been saved"}
                            onPressHandler={undoChangesHandler}
                            loading={updating}
                            containerStyle={styles.snackbar}
                            labelStyle={styles.snackbar_label}
                            textColor={AppColors.black}
                        /> : null
                    }
        </ScreenWrapper>
    )
}
export default TeamTaskHome;