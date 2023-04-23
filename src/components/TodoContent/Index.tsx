import {
    ActivityIndicator,
} from 'react-native'
import React, { useEffect } from 'react'
import { Container, H1, P, TouchableWrapper} from '../../utills/components'
import styles from './styles'
import AppColors from '../../utills/AppColors';
import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';
import { APIFunction, } from '../../utills/api';
import { Capitalize, getStoreAboutMe, ToastError, ToastSuccess } from '../../utills/Methods';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { DUE_STATUS, MenuListItem, TodoContentProps } from './types';
import { width } from 'react-native-dimension';
import CustomMenu from '../CustomMenu';
import CustomIconButton from '../CustomIconButton';
import { useDispatch } from 'react-redux';
import { setCurrentTaskItem } from '../../Redux/Actions/Config';
import { GET_TASKS, GET_TASK_STATISTICS, GET_TEAM_TASKS, TaskProgressLoad } from '../../utills/payload';
import { RootNavigationProps } from '../../Routes/types';
import WarningModal from '../WarningModal';
import { useFetchAboutMeData } from '../TimeoffModal/types';



const TodoContent = ({ item, index, title } : TodoContentProps) => {
    const queryClient = useQueryClient()
    const navigation = useNavigation<RootNavigationProps>();
    const [visible,setVisible] = React.useState(false)
    const [list,setList] = React.useState<MenuListItem[]>([])
    const dispatch = useDispatch()
    const [show,setShow] = React.useState(false)
    const [about,setAbout] = React.useState<useFetchAboutMeData>()
    

    const {
        mutateAsync,
        isLoading
    } = useMutation(APIFunction.update_task_status)

   const {
       mutateAsync : deleteTask,
       isLoading : isDeleting
   } = useMutation(APIFunction.delete_task)

    const handleDelete = async () => {
        try {
            if(!item?.id) return
            await deleteTask(item?.id)
            queryClient.invalidateQueries(GET_TASKS)
            queryClient.invalidateQueries(GET_TASK_STATISTICS)
            queryClient.invalidateQueries(GET_TEAM_TASKS)
            setShow(false)
            ToastSuccess("Task has been deleted.")
        } catch (error : any) {
            ToastError(error?.msg)
        }

    }

    let due_status : DUE_STATUS = ""
    if(moment(item?.due_date).isBefore(new Date())) due_status = "OVER_DUE"
    if(moment(item?.due_date).isSame(new Date(), 'day')) due_status = "DUE_TODAY"
    if(moment(item?.due_date).isAfter(new Date())) due_status = "UPCOMING"
    if(!!!item?.due_date) due_status = "NO_DATE"
  

    const navigationHandler = () => {
        if(!item?.id && typeof item?.id !== "number") return
        navigation.navigate("Menu",{screen : "TaskDetails",params : {id : item?.id}})
    }

    const openMenuHandler = () => {
        if(title === "Completed") setList(["Undo completed"])
        if(title === "To-Do") setList(["View task","Mark task as completed","Edit task","Delete task"])
        if(title === "In Progress") setList(["View task","Mark task as completed","Mark task as not started","Edit task","Delete task"])
        setVisible(true)
    }

    const onDismiss = () => {
        setVisible(false)
        setShow(false)
    }

    const getAboutUser = async () => {
        let user = await getStoreAboutMe()
        if(!user) return
        setAbout(user)
    }

    const menuItemPressHandler = async (param : MenuListItem | "Claim task") => {
        try{
            setVisible(false)
            if(param === "Delete task") return setShow(true)
            if(param === "Edit task" && typeof item?.id === "number"){
                return  navigation.navigate("Menu",{screen : "CreateTask", params : { task_id : item?.id }})
            }
            if(param === "View task" && typeof item?.id === "number"){
                return navigation.navigate("Menu",{screen : "TaskDetails",params : {id : item?.id}})
            }
            let assigned_to = item?.assigned_to?.id
            let status : TaskProgressLoad = "To-do"
            if(param === "Undo completed" || param === "Mark task as started") status = "In-progress"
            if(param === "Mark task as not started") status = "To-do"
            if(param === "Mark task as completed") status = "Completed"
            if(param === "Claim task"){
                status = "To-do"
                assigned_to = about?.id
            }
            if(!item?.id || !item?.created_by?.id) return
            let fd = {
                title : item?.title || "",
                created_by : item?.created_by?.id,
                status : status,
                id : item?.id,
                assigned_to : assigned_to
            }
            
            await mutateAsync(fd)
            queryClient.invalidateQueries(GET_TASKS)
            queryClient.invalidateQueries(GET_TASK_STATISTICS)
            queryClient.invalidateQueries(GET_TEAM_TASKS)
            dispatch(setCurrentTaskItem({...item,
                status : status,
                old_status : item?.status
            }))
        }catch(err : any){
            ToastError(err?.msg)
        }
    }

    useEffect(()=>{
        getAboutUser()
    },[])

    return (

        <TouchableWrapper onPress={navigationHandler}
            style={styles.row}
        >
            <Container width={90} backgroundColor={AppColors.transparent}
                alignSelf="center"
                direction="row"
                horizontalAlignment='space-between'
            >
                <Container width={58} backgroundColor={AppColors.transparent}>
                    <H1 color={AppColors.black1} bold="110" marginBottom={1}
                        fontSize={3.3}
                        numberOfLines={1}
                    >{item?.title ? Capitalize(item?.title) : ""}</H1>
                    {
                        //TASK ASSIGNED TO ME OR TASK FOR MY TEAM SHOULD SHOW CREATED BY
                        (index  === 0 || index  === 2 || index === undefined) && item?.created_by ? <P color={AppColors.black3} fontSize={3.1} marginBottom={1} numberOfLines={1}>
                        {`By: ${item?.created_by?.first_name ? Capitalize(item?.created_by?.first_name) : ""} ${item?.created_by?.last_name ? Capitalize(item?.created_by?.last_name) : ""}`.trim()}
                    </P> : null
                    }
                     {
                         //TASKS I SENT SHOULD SHOW ASSIGN TO (DEPARTMENT NAME OR EMPLOYEE NAME)
                        index  === 1 && item?.assigned_to ? <P color={AppColors.black3} fontSize={3.1} marginBottom={1} numberOfLines={1}>
                        {`To: ${item?.assigned_to?.first_name ? Capitalize(item?.assigned_to?.first_name) : ""} ${item?.assigned_to?.last_name ? Capitalize(item?.assigned_to?.last_name) : ""}`.trim()}
                    </P> : null
                    }
                    {
                        //TASKS I SENT SHOULD SHOW ASSIGN TO (DEPARTMENT NAME OR EMPLOYEE NAME)
                      index  === 1 && item?.department?.name && !item?.assigned_to ? <P color={AppColors.black3} fontSize={3.1} marginBottom={1} numberOfLines={1}>
                        {`${"To"}: ${item?.department?.name ? Capitalize(item?.department?.name) : ""}`.trim()}
                    </P> : null
                    }
                    {
                        due_status === "DUE_TODAY" && title !== "Completed" ? <Container backgroundColor={AppColors.transparent} direction="row"
                            verticalAlignment='center'
                        >
                            <Ionicons name={"flag"} 
                                color={AppColors.pink}
                            />
                            <P color={AppColors.black3} fontSize={3} marginLeft={3}>Due Today</P>
                        </Container> : null
                    }
                   {
                        due_status === "UPCOMING" && title !== "Completed"  ?  <Container backgroundColor={AppColors.transparent} 
                        direction="row"
                        verticalAlignment='center'
                    >
                        <Ionicons name={"calendar-outline"} 
                            color={AppColors.black1}
                        />
                        <P 
                            color={AppColors.black3} 
                            fontSize={3} 
                            marginLeft={2}
                            marginRight={1}
                        >{item?.due_date ? moment(item?.due_date).format("MMM DD, YYYY") : ""}</P>
                        <Ionicons name={"ellipse"} 
                            color={AppColors.yellow}
                            size={width(1.5)}
                        />
                        <P color={AppColors.yellow} fontSize={3} marginLeft={1}>Upcoming</P>
                    </Container> : null
                   }
                   {
                        due_status === "OVER_DUE" && title !== "Completed" ?  <Container backgroundColor={AppColors.transparent} 
                        direction="row"
                        verticalAlignment='center'
                    >
                        <Ionicons name={"calendar-outline"} 
                            color={AppColors.pink}
                        />
                        <P 
                            color={AppColors.black3} 
                            fontSize={3} 
                            marginLeft={2}
                            marginRight={1}
                        >{item?.due_date ? moment(item?.due_date).format("MMM DD, YYYY") : ""}</P>
                        <Ionicons name={"ellipse"} 
                            color={AppColors.pink}
                            size={width(1.5)}
                        />
                        <P color={AppColors.pink} fontSize={3} marginLeft={1}>Overdue</P>
                    </Container> : null
                   }
                   {
                        item?.sub_tasks_tasksapp && Array.isArray(item?.sub_tasks_tasksapp) ? <Container horizontalAlignment="flex-end" marginTop={2} backgroundColor={AppColors.transparent}>
                        {
                            item?.sub_tasks_tasksapp.map((sub_task,i)=><Container width={50} direction="row"
                                verticalAlignment='center'
                                marginBottom={2}
                                backgroundColor={AppColors.transparent}
                                key={i}
                            >
                                <Ionicons name={"ellipse"} 
                                    color={AppColors.black2}
                                    size={width(1.5)}
                                />
                                <Container width={48} marginLeft={1} backgroundColor={AppColors.transparent}>
                                    <P numberOfLines={1} color={AppColors.black3} fontSize={3}>{sub_task?.title || sub_task?.description}</P>
                                </Container>
                            </Container>)
                        }
                    </Container> : null
                   }
                </Container>
                {
                    index !== undefined ? <React.Fragment>
                            {
                                title === "To-Do" && index === 0 ?  <Container backgroundColor={AppColors.transparent} width={30} direction="row" horizontalAlignment='space-between'>
                                <Container width={23} backgroundColor={AppColors.transparent}>
                                    <TouchableWrapper onPress={()=>menuItemPressHandler("Mark task as started")} style={styles.start_task_btn}
                                        disabled={isLoading}
                                    >
                                        {
                                            isLoading ? <ActivityIndicator color={AppColors.green} size={width(4)} /> : <H1 color={AppColors.black3} fontSize={3} textAlign='center'>Start task</H1>
                                        }
                                    </TouchableWrapper>
                                </Container>
                                <CustomMenu 
                                    visible={visible}
                                    onDismiss={onDismiss}
                                    anchor={<Container backgroundColor={AppColors.transparent} width={6}>
                                            <TouchableWrapper onPress={openMenuHandler} style={styles.menu_button} disabled={isLoading}>
                                            <Ionicons name={"chevron-down-outline"} color={AppColors.black3}/>
                                            </TouchableWrapper>
                                        </Container>}
                                    listItem={list}
                                    onPressHandler={menuItemPressHandler}
                                />
                                </Container> : index === 2 && !item?.assigned_to?.id ? <Container verticalAlignment="center" width={23}>
                                    <TouchableWrapper onPress={()=>menuItemPressHandler("Claim task")} style={styles.claim_task_btn}
                                            disabled={isLoading}
                                        >
                                            {
                                                isLoading ? <ActivityIndicator color={AppColors.green} size={width(4)} /> : <H1 color={AppColors.black3} fontSize={3} textAlign='center'>Claim task</H1>
                                            }
                                        </TouchableWrapper>
                                </Container> : <CustomMenu 
                                    visible={visible}
                                    onDismiss={onDismiss}
                                    anchor={isLoading ? <ActivityIndicator color={AppColors.green} size={width(4)} /> : <CustomIconButton 
                                            icon={"dots-vertical"}
                                            onPress={openMenuHandler}
                                            color={AppColors.black3}
                                            size={5}
                                        />}
                                    listItem={list}
                                    onPressHandler={menuItemPressHandler}
                                />
                            }                        
                    </React.Fragment> : null
                }
                {
                show ?  <WarningModal
                    isVisible={show}
                    onHide={onDismiss}
                    title={"Delete Task?"}
                    sub_title={"Are you sure you want to delete this task?"}
                    onPressHandler={handleDelete}
                    loading={isDeleting}
                    submitBtnText={"Yes, I am sure"}
                    cancelBtnText={"No, go back"}
                    icon={'alert-circle'}
                    iconColor={AppColors.red2}
              />  : null
            }
            </Container>        
        </TouchableWrapper>
            
            
    )
}

export default TodoContent