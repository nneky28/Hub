import {
    ActivityIndicator,
} from 'react-native'
import React from 'react'
import { Container, H1, P, TouchableWrapper} from '../../utills/components'
import styles from './styles'
import AppColors from '../../utills/AppColors';
import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';
import { APIFunction, } from '../../utills/api';
import { Capitalize, ToastError } from '../../utills/Methods';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { DUE_STATUS, MenuListItem, TodoContentProps } from './types';
//import { RootNavigationProps } from '../../Routes/types';
import { width } from 'react-native-dimension';
import CustomMenu from '../CustomMenu';
import CustomIconButton from '../CustomIconButton';
import { useDispatch } from 'react-redux';
import { setCurrentTaskItem } from '../../Redux/Actions/Config';
import { GET_TASKS, GET_TASK_STATISTICS } from '../../utills/payload';
import { RootNavigationProps } from '../../Routes/types';



const TodoContent = ({ item, index, title } : TodoContentProps) => {
    const queryClient = useQueryClient()
    const navigation = useNavigation<RootNavigationProps>();
    // const [watch, setWatch] = useState<boolean>(false)
    // const [sentModal, setSent] = useState<boolean>(false)
    // const [loading, setLoading] = useState<boolean>(false);
    const [visible,setVisible] = React.useState(false)
    const [list,setList] = React.useState<MenuListItem[]>([])
    const dispatch = useDispatch()
    

    const {
        mutateAsync,
        isLoading
    } = useMutation(APIFunction.update_task_status)

   // const deleteTask = useMutation(APIFunction.delete_task)

    // const onPressHandler = async (action:string) => {
    //     // try {
    //     //   let fd = {
    //     //     status: action,
    //     //       id: item.id
    //     //   };
    //     //   setLoading(true)
    //     //   let res = await mutateAsync(fd);
    //     //   if (res) {
    //     //     await storeData('task updated', res);
    //     //       queryClient.invalidateQueries();
    //     //       setLoading(false)
    //     //     setModal(false);
    //     //     setCompleted(false);
    //     //     setSent(false);
    //     //     showFlashMessage({
    //     //       title: `${' '} Task moved to ${action.toUpperCase()} ${' '} `,
    //     //       duration: 5000,
    //     //       type: 'task',
    //     //       statusBarHeight: Platform.OS === "android" ? 7 : Platform.OS === "ios" ? 10 : null,
    //     //       backgroundColor: AppColors.newYellow,
    //     //       actionType:"task",
    //     //       action:()=>unDo(action==="Completed"?"In-progress":action==="In-progress"?"To-do":'To-do')
    //     //     });
    //     //     setWatch(!watch);
    //     //   }
    //     // } catch (error) {
       
    //     // }
    // }

    // const handleDelete = async (id:number) => {
    //     try {
    //          await deleteTask.mutateAsync(id)
    //         queryClient.invalidateQueries()
    //         showFlashMessage({
    //             title: `${' '} Task Deleted`,
    //             duration: 8000,
    //             type: 'task',
    //             statusBarHeight: Platform.OS === "android" ? 7 : Platform.OS === "ios" ? 13 : null,
    //             backgroundColor: AppColors.newYellow
    //         })
    //         ///setModal(false)
    //         //setSent(false)
    //     } catch (error) {
    //     }

    // }

    let due_status : DUE_STATUS = ""
    if(moment(item?.due_date).isBefore(new Date())) due_status = "OVER_DUE"
    if(moment(item?.due_date).isSame(new Date(), 'day')) due_status = "DUE_TODAY"
    if(moment(item?.due_date).isAfter(new Date())) due_status = "UPCOMING"
    if(!!!item?.due_date) due_status = "NO_DATE"
  

    const navigationHandler = () => {
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
    }

    const menuItemPressHandler = async (param : MenuListItem) => {
        try{
            setVisible(false)
            if(param === "Edit task"){
                return  navigation.navigate("Menu",{screen : "CreateTask", params : { item }})
            }
            if(param === "View task"){
                return navigation.navigate("Menu",{screen : "TaskDetails",params : {id : item?.id}})
            }
            let status = "To-do"
            if(param === "Undo completed" || param === "Mark task as started") status = "In-progress"
            if(param === "Mark task as not started") status = "To-do"
            if(param === "Mark task as completed") status = "Completed"
            if(!item?.id) return
            let fd = {
                status : status,
                id : item?.id
            }
            
            await mutateAsync(fd)
            queryClient.invalidateQueries(GET_TASKS)
            queryClient.invalidateQueries(GET_TASK_STATISTICS)
            dispatch(setCurrentTaskItem({...item,status : status}))
        }catch(err : any){
            ToastError(err?.msg)
        }
    }
    
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
                    <P color={AppColors.black3} fontSize={3.1} marginBottom={1} numberOfLines={1}>
                        {`${index === 0 ? "By" : "To"}: ${item?.created_by?.first_name ? Capitalize(item?.created_by?.first_name) : ""} ${item?.created_by?.last_name ? Capitalize(item?.created_by?.last_name) : ""}`.trim()}
                    </P>
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
                   {/* <Container horizontalAlignment="flex-end" marginTop={2} backgroundColor={AppColors.transparent}>
                       {
                           [..."1234"].map(()=><Container width={50} direction="row"
                           verticalAlignment='center'
                            marginBottom={2}
                            backgroundColor={AppColors.transparent}
                          >
                               <Ionicons name={"ellipse"} 
                                   color={AppColors.black2}
                                   size={width(1.5)}
                               />
                               <Container width={48} marginLeft={1} backgroundColor={AppColors.transparent}>
                                   <P numberOfLines={1} color={AppColors.black3} fontSize={3}>Asset Managment page Asset Managment page Asset Managment page</P>
                               </Container>
                          </Container>)
                       }
                   </Container> */}
                </Container>
                {
                     title === "To-Do" ?  <Container backgroundColor={AppColors.transparent} width={30} direction="row" horizontalAlignment='space-between'>
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
            </Container>        
        </TouchableWrapper>
            
            
    )
}


{/* <View style={styles.wrapper}>
                <View style={styles.row}>
                    <>
                        <TouchableWrapper onPress={navigationHandler}>
                            <H1 numberOfLines={1} style={styles.title}>{item?.title ? Capitalize(item?.title) : ""}</H1>
                        </TouchableWrapper>
                        <View>
                        {
                            index === 1 && title === "In Progress" || index === 1 && title === "Completed" || user? null :
                            index === 1 && title === "To-Do" || title === "Completed" ?
                                <TouchableWrapper
                                    size={4} 
                                    style={CommonStyles.marginTop_1}
                                    onPress={() => {
                                        if (title === "Completed") {
                                        return setCompleted(true)
                                    }
                                    setSent(true)    
                                }}>
                                    <Ionicons name="ellipsis-vertical" size={15} color={AppColors.black3} />
                                </TouchableWrapper> :
                                <View style={styles.btn}>
                                    
                                        <TouchableOpacity   
                                        onPress={() => {
                                            if (title === 'In Progress') {
                                                onPressHandler("Completed")
                                            }
                                            onPressHandler('In-progress')
                                        }}
                                        style={styles.button}>
                                        <H1 numberOfLines={1} style={styles.buttonText}>{`${title === 'In Progress' ? 'Complete task' : 'Start task'}`}</H1>
                                    </TouchableOpacity>

                                    <TouchableWrapper
                                        onPress={() => {
                                            setModal(true)
                                            item.id
                                        }}
                                        style={styles.btnPart}>
                                        <Ionicons name="chevron-down-outline" size={15} color={AppColors.black} />
                                    </TouchableWrapper>
                                </View>

                        }
                    </View>
                        </>

                </View>
                <TouchableOpacity
                onPress={() => navigation.navigate("TaskView" as never, {id,title, }as never)}
                    style={styles.author}>
                    <P color={AppColors.black3} >

                        {
                            index === 1 ? 'To: ' : 'By: '
                        }
                        {
                            !item?.assigned_to ? item?.department?.name:item?.assigned_to?.first_name ? item.assigned_to.first_name : ""} {item.assigned_to?.last_name ? item.assigned_to?.last_name : ''
                        } 
                
                    </P>
                </TouchableOpacity>

                {
                    title === "Completed" ? null :
                        <TouchableOpacity
                        onPress={navigationHandler}
                            style={styles.row1}>
                            {dueToday ? <React.Fragment>            
                                <Image source={{ uri: Images.DueFlag }} style={styles.flag} />
                                <P style={styles.flagText}>DueToday</P>
                            </React.Fragment> : overDue ? <React.Fragment>
                                <Ionicons name="calendar-outline" size={12} color={AppColors.black3} />
                                <P style={styles.date}>{moment(item?.due_date).format("MMMM D, YYYY")}</P>
                                <Entypo name="dot-single" size={18} color={AppColors.red} />
                                <P color={AppColors.red} fontSize={3.1}>Overdue</P>
                            </React.Fragment> : noDate ? null :
                                <React.Fragment>
                                    <Ionicons name="calendar-outline" size={12} color={AppColors.black3} />
                                    <P style={styles.date}>{moment(item?.due_date).format("MMMM D, YYYY")}</P>
                                    <Entypo name="dot-single" size={18} color={AppColors.yellow} />
                                    <P color={AppColors.yellow} fontSize={3.1}>Upcoming</P>
                                </React.Fragment>
                            }
                        </TouchableOpacity>
                }


                <View style={styles.subTaskRow}>
                    {
                        !item?.sub_tasks_tasksapp?.title ? null :
                            item?.sub_tasks_tasksapp?.length > 0 ?
                                <FlatList
                                    data={Object.values(item?.sub_tasks_tasksapp)}
                                    renderItem={({ item }) =>
                                        <View style={styles.content}>
                                            <Entypo name="dot-single" size={30} color={AppColors.darkGray} />
                                            <Text numberOfLines={1}
                                                style={styles.sub}>{item?.title}</Text>
                                        </View>
                                    }
                                    keyExtractor={(index) => index.toString()}
                                />
                                : null
                    }
                </View>
                <View style={styles.line1} />
                {
                    modal ? <ActionModal isVisible={modal} onHide={() => setModal(false)} item={item}
                        onPressHandle={onPressHandler}
                        deleteHandler={() => handleDelete(item.id)}
                        loading={loading} title={title} 
                    /> : null
                }
                {
                    completed ? <UnCompletedModal isVisible={completed} 
                        onHide={() => setCompleted(false)} onPressHandle={onPressHandler} 
                    /> : null
                }
                {
                        sentModal ?  <SentActionModal isVisible={sentModal} onHide={() => setSent(false)} item={item} onPressHandle={onPressHandler} 
                        deleteHandler={() => handleDelete(item.id)}
                        loading={loading}
                        title={title} 
                    /> : null
                }
            </View> */}

export default TodoContent