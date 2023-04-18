import {
    View, Text, Keyboard,
    Animated,
    Easing,
    TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './styles';
import Button from '../../components/Button'
import { P, H1, PageLoader, TouchableWrapper, Container } from '../../utills/components';
import moment from 'moment';
import { useFetchActivities, useFetchComments, useFetchTaskByPK } from '../../utills/api';
import ActivityCard from '../../components/ActivityCard/Index'
import AppColors from '../../utills/AppColors';
import { __flatten, Capitalize, getStoreAboutMe, ToastError, ToastSuccess } from '../../utills/Methods';
import { useMutation, useQueryClient } from 'react-query';
import { APIFunction } from '../../utills/api';
import Entypo from 'react-native-vector-icons/Entypo';
import { height, width } from 'react-native-dimension';
import ScreenWrapper from '../../components/ScreenWrapper/index';
import { RootScreenProps } from '../../Routes/types';
import { TaskAccordionType, TaskActivityData, TaskCommentData, TaskDetailsParams, TaskListSection, useFetchActivitiesData, useFetchActivitiesProps, useFetchCommentsProps, useFetchTaskByPKProps } from './types';
import { HeaderWithBackButton } from '../../components/Headers/CustomHeader';
import { DUE_STATUS } from '../../components/TodoContent/types';
import { Images } from '../../utills/Image';
import Ionicons from "react-native-vector-icons/Ionicons"
import { SubTaskData } from '../TaskHome/types';
import CustomIconButton from '../../components/CustomIconButton';
import { GET_COMMENTS, GET_TASK_BY_PK } from '../../utills/payload';
import { TextInput } from 'react-native-paper';
import CustomInput from '../../components/CustomInput';
import TaskCommentCard from '../../components/TaskCommentCard/Index';
import { KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view';



const TaskDetails = ({ navigation,route } : RootScreenProps) => {
    const { id } = route?.params as TaskDetailsParams || {}
    const spinValue = new Animated.Value(0);
    const [selectedIDs, setSelectedIDs] = useState<number[]>([])
    const [logs, setLogs] = useState<TaskListSection[]>([])
    const [showLog, setShowLog] = useState(false);
    const queryClient = useQueryClient()
    const [comment, setComment] = useState('')
    const [due_status,setDueStatus] = React.useState<DUE_STATUS>("")
    const [selected_sub_task_id,setSelectedSubTaskID] = React.useState<number>()
    const [showComment,setShowComment] = React.useState(false)
    const [comments,setComments] = React.useState<TaskListSection[]>([])
    const [page] = React.useState(1)

    const {
        data: logData
    } = useFetchActivities(showLog && id? id : "",page) as useFetchActivitiesProps

    const {
        data: commentData,
    } = useFetchComments(showComment && id ? id : "",page) as useFetchCommentsProps

    const {
        mutateAsync: subTaskEditHandler
    } = useMutation(APIFunction.update_sub_task)


    const {
        data: task,
        isLoading : loadingTask
    } = useFetchTaskByPK(id) as useFetchTaskByPKProps

    const flattenAndMapData = (data : useFetchActivitiesData) : TaskListSection[] => {
        if(!Object.keys(data)?.[0] || !Object.values(data)?.[0]) return []
        return [
            {
                key: Object.keys(data)?.[0],
                title: Object.keys(data)?.[0] ?? "",
                data: Object.values(data)?.[0] ?? [],
            }
        ]
    };

    const SubTaskRenderItem = ({item,index} : {item : SubTaskData,index : number}) => {
        return(
            <>
                <TouchableWrapper onPress={() => handleComplete(item)}
                    style={[styles.sub_task_button,task?.sub_tasks_tasksapp && (index === (task?.sub_tasks_tasksapp?.length - 1)) ? {borderBottomWidth : undefined} : {}]}
                >
                    <React.Fragment>
                        {
                            <CustomIconButton 
                            icon={item?.id && selectedIDs.includes(item?.id) ?  "loading" : item?.status === "Completed" ? "checkbox-marked-outline" : "checkbox-blank-outline"}
                            onPress={() => handleComplete(item)}
                            color={item?.id && selectedIDs.includes(item?.id) ? AppColors.green : AppColors.black1}
                        />
                        }
                        <Container width={60} marginLeft={2} backgroundColor={AppColors.transparent}>
                            <P style={styles.subTitle} underline={item?.status === "Completed" ? "line-through" : "none"} lineHeight={2}>{item.title}</P>
                        </Container>
                    </React.Fragment>
                </TouchableWrapper>
            </>
        )
    }

    const handleSubmit = async () => {
        try {
            Keyboard.dismiss()
            let about = await getStoreAboutMe()
            if(!comment || comment.toString().trim() === ""){
                return ToastError("Please provide a comment")
            }
            if(!about?.id || !task?.id) return
            let fd = {
                comment: comment,
                comment_by: about?.id,
                task: task?.id,
                due_date: moment().toISOString(true)
            }
            await mutateAsync(fd)
            queryClient.invalidateQueries(GET_COMMENTS)
            setComment("")
            ToastSuccess("Comment sent")
        } catch (err : any) {
            ToastSuccess(err?.msg)
        }
    }


    const [spin, setSpin] = useState(spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    }));
    const [log_spin, setLogSpin] = useState(spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    }));

    const animate = (type : TaskAccordionType,deg : string[]) => {

        Animated.timing(spinValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear, // Easing is an additional import from react-native
            useNativeDriver: true, 
        }).start();
        if(type === "LOG_ACCORDION"){
            return setLogSpin(spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: deg,
            }))
        }
        setSpin(spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: deg,
        }));
        //LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    };

    const onHide = (type : "COMMENT_ACCORDION" | "LOG_ACCORDION") => {
        if(type === "LOG_ACCORDION"){
            setShowLog((showLog) => {
                if (showLog) {
                    animate(type,['180deg', '0deg']);
                } else {
                    animate(type,['0deg', '180deg']);
                }
                return !showLog;
            });
            setShowComment(() => {
                animate("COMMENT_ACCORDION",['180deg', '0deg'])
                return false;
            });
        }
        if(type === "COMMENT_ACCORDION"){
            setShowComment((showComment) => {
                if (showComment) {
                    animate(type,['180deg', '0deg']);
                } else {
                    animate(type,['0deg', '180deg']);
                }
                return !showComment;
            });
            setShowLog(() => {
                animate("LOG_ACCORDION",['180deg', '0deg'])
                return false;
            });
        }
    };

    const RenderItem = ({ item } : {item : TaskActivityData | TaskCommentData}) => {
        if(showComment) return(
           <TaskCommentCard 
                item={item}
           />
        )
        return (
            <ActivityCard item={item} />
        )
    }
    const {
        mutateAsync,
        isLoading,
    } = useMutation(APIFunction.post_comment)


    const handleComplete = async (sub_task : SubTaskData) => {
        if(!sub_task?.id || !task?.created_by?.id || !task?.id) return
        setSelectedIDs([...selectedIDs,sub_task.id])
        const fd = {
            id: sub_task?.id,
            assigned_by: task?.created_by?.id,
            task: task.id,
            status: sub_task.status === "Completed" ? "To-do" : "Completed",
        };

        await subTaskEditHandler(fd)
        setSelectedSubTaskID(sub_task?.id)
        queryClient.invalidateQueries(GET_TASK_BY_PK)
    }

    const FormattedTitle = ({title} : {title? : string}) => {
        if (!title) return <React.Fragment />;
        const momentTitle = moment(title);
        const date = momentTitle.calendar().split(" at")[0];
        const dayOfWeek = momentTitle.format('dddd, ');
        const monthDay = momentTitle.format("MMMM Do");
        return (
            <Container direction="row" marginTop={2} width={90} alignSelf='center'
                verticalAlignment='center'
                borderBottomWidth={1}
                borderColor={AppColors.grayBorder}
                backgroundColor={AppColors.transparent}
                paddingBottom={2}
            >
                <P fontSize={3.3} marginRight={1}>{date}</P>
                <Ionicons name="ellipse" size={width(1)} color={AppColors.black3} />
                <P fontSize={3.3} marginLeft={1}>{dayOfWeek}</P>
                <P fontSize={3.3}>{monthDay}</P>
            </Container>
        );
    };

    const mapDataToState = () => {
        if(showLog && logData?.pages?.[0]?.results){
            const arr = flattenAndMapData(logData?.pages?.[0]?.results);
            page > 1 ? setLogs([...logs,...arr]) : setLogs(arr);
            return
        }

        if(showComment && commentData?.pages?.[0]?.results){
            const arr = flattenAndMapData(commentData?.pages?.[0]?.results);
            page > 1 ? setComments([...comments,...arr]) : setComments(arr);
            return
        }
    }

    useEffect(() => {
        mapDataToState()
    }, [logData,commentData]);

    useEffect(()=>{
        setSelectedSubTaskID(undefined)
    },[task])

    useEffect(() => {
        if(!selected_sub_task_id) return
        let arr = [...selectedIDs]
        arr.splice(arr.indexOf(selected_sub_task_id),1)
        setSelectedIDs(arr)
    }, [selected_sub_task_id])

    useEffect(()=>{
        if(!task) return
        let status : DUE_STATUS = ""
        if(moment(task?.due_date).isBefore(new Date())) status = "OVER_DUE"
        if(moment(task?.due_date).isSame(new Date(), 'day')) status = "DUE_TODAY"
        if(moment(task?.due_date).isAfter(new Date(), 'day')) status = "UPCOMING"
        if(!!!task?.due_date) status = "NO_DATE"
        setDueStatus(status)
    },[task])

    return (
        <ScreenWrapper>
            <View style={styles.mainContainer}>
                <HeaderWithBackButton 
                    headerText={task?.title ? Capitalize(task?.title) : ""}
                />
                {
                    loadingTask ? <PageLoader /> : <KeyboardAwareSectionList 
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={<React.Fragment>
                            {
                                task?.status !== "Completed" ? <View style={styles.container}>
                                <View style={styles.row1}>
                                    <P style={styles.flagText}>Due: </P>
                                    {due_status === "DUE_TODAY" ? <React.Fragment>
                                        <P style={styles.date}>{moment(task?.due_date).format("MMMM D, YYYY")}</P>
                                        <Entypo name="dot-single" size={18} color={AppColors.black} />
                                        <P style={styles.flagText}>Due Today</P>
                                    </React.Fragment> : due_status === "OVER_DUE" ? <React.Fragment>
                                        <P style={styles.date}>{moment(task?.due_date).format("MMMM D, YYYY")}</P>
                                        <Entypo name="dot-single" size={18} color={AppColors.black} />
                                        <P color={AppColors.red} fontSize={3.1}>Overdue</P>
                                    </React.Fragment> : due_status === "UPCOMING" ? <React.Fragment>
                                        <P style={styles.date}>{moment(task?.due_date).format("MMMM D, YYYY")}</P>
                                        <Entypo name="dot-single" size={18} color={AppColors.black} />
                                        <P color={AppColors.yellow} fontSize={3.1}>Upcoming</P>
                                    </React.Fragment> : null}
                                </View>
                                <Button
                                    title="Edit Task"
                                    containerStyle={styles.buttonStyle}
                                    textStyle={styles.buttonText}
                                    onPress={() => {
                                        navigation.navigate("Menu",{screen : "CreateTask", params : { item : task }})
                                    }}
                                />
                                <View style={styles.line} />
                            </View> : null
                            }
                            <View style={styles.genContainer}>
                                <View>
            
                                    {
                                        !task?.description ? <View style={{ paddingVertical: height(2) }}>
                                            <H1 >No Description for this Task</H1>
                                        </View> :
                                        <View style={styles.description_container}>
                                            <H1 color={AppColors.black1} fontSize={3.3}>Task Description</H1>
                                            <View style={styles.con}>
                                                <P style={styles.description}>
                                                    {task?.description}
                                                </P>
                                            </View>
                                        </View>
                                    }
                                    <View
                                        style={styles.container1}>
                                        <View style={styles.assign}>
                                            <P color={AppColors.black3} fontSize={3.1}>Assigned To</P>
                                            <View style={styles.button}>
                                                <Text style={styles.name}>{task?.department?.name ? Capitalize(task?.department?.name) : `${task?.assigned_to?.first_name ? Capitalize(task?.assigned_to?.first_name) : ""} ${task?.assigned_to?.last_name ? Capitalize(task?.assigned_to?.last_name) : ''}`.trim()}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.dueDate}>
                                            <P color={AppColors.black3} fontSize={3.1}>Due Date</P>
                                            <View style={styles.button}>
                                                <Text style={styles.name} numberOfLines={1}>
                                                    {task?.due_date && moment(task?.due_date).format("dddd D, MMM YYYY")}</Text>
                                            </View>
                                        </View>
                                    </View>
            
                                    <View>
                                        {
                                            !task?.sub_tasks_tasksapp ? null :
                                                task?.sub_tasks_tasksapp?.length !== 0 &&
                                                <>
                                                    <H1 marginTop={2} color={AppColors.black1} fontSize={3.3}>Subtasks</H1>
                                                    <View style={styles.subTaskContainer}>
                                                        {
                                                            task?.sub_tasks_tasksapp.map((item,i)=><SubTaskRenderItem 
                                                                key={i}
                                                                item={item}
                                                                index={i}
                                                            />)
                                                        }
                                                    </View>
                                                </>
                                        }
                                    </View>
                                    <View style={styles.description_container}>
                                        <H1 color={AppColors.black1} fontSize={3.3}>Created By</H1>
                                        <P color={AppColors.black3} fontSize={3.3} marginTop={1}>
                                            {`${task?.created_by?.first_name ? task?.created_by?.first_name : ""} ${task?.created_by?.last_name ? task?.created_by?.last_name : ''}`.trim()}
                                        </P>
                                    </View>
                                </View>
                            </View>
                            </React.Fragment>}
                        sections={
                            [
                                {is_accordion : true,type : "LOG_ACCORDION", data : []},
                                ...showLog ? logs : [],
                                {is_accordion : true,type : "COMMENT_ACCORDION",data : []},
                                ...showComment ? comments : []
                            ]
                        }
                            renderItem={RenderItem}
                            keyExtractor={(item,i) => `${item}${i}`.toString()}
                            keyboardShouldPersistTaps="handled"
                            renderSectionHeader={({ section: { title,is_accordion,type } } : {section : TaskListSection}) => {
                                if(is_accordion && type){
                                    return <TouchableOpacity onPress={()=>onHide(type)} style={styles.sections}>
                                    <H1 style={styles.logText}>{type === "LOG_ACCORDION" ? "Activity log" : "Comments"}</H1>
                                    <Animated.Image
                                        resizeMode="contain"
                                        source={{ uri: Images.ArrowDown }}
                                        style={[styles.leftIcon, { transform: [{ rotate: type === "LOG_ACCORDION" ? log_spin : spin}] }]}
                                    />
                                </TouchableOpacity>
                                }
                                return(
                                    <FormattedTitle title={title} />
                                )
                                
                            }}
                            ListFooterComponent={showComment ? <CustomInput 
                                placeholder="Add a comment"
                                value={comment}
                                onChangeData={(value : string)=>setComment(value)}
                                multiline={true}
                                editable={task?.status === "Completed" ? false : true}
                                backgroundColor={task?.status === "Completed" ? AppColors.gray1 : undefined}
                                minHeight={4}
                                right={<TextInput.Icon 
                                    name={isLoading ? "loading" : "send-circle"}
                                    color={AppColors.green}
                                    onPress={handleSubmit}
                                    tvParallaxProperties={undefined}
                                    hasTVPreferredFocus={undefined}
                                    size={width(8)}
                                    forceTextInputFocus={false}
                                  />}
                            /> : <React.Fragment />} 
                        
                    />
                }
            </View>
        </ScreenWrapper>
    )
}

export default TaskDetails

