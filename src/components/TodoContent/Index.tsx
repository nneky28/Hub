import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native'
import React, { useState} from 'react'
import { H1, P, TouchableWrapper, } from '../../utills/components'
import styles from './styles'
import { Images } from '../../component2/image/Image';
import AppColors from '../../utills/AppColors';
import { ActionModal, UnCompletedModal, SentActionModal } from '../ContactModal';
import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';
import { APIFunction, } from '../../utills/api';
import { storeData, Capitalize } from '../../utills/Methods';
import { showFlashMessage } from '../SuccessFlash/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { FlatList } from 'react-native-gesture-handler';
import { height } from 'react-native-dimension';
import CommonStyles from '../../utills/CommonStyles';
import { useNavigation } from '@react-navigation/native';
interface TaskProps {
    item: any;
    index: number;
    title: string;
    isSent: boolean;
    user: boolean;
    allTasks: any[];
    onPressHandle: () => void;
    action: () => void;  
    unDo: () => void;
}

const Index: React.FC<TaskProps> = ({ item, index, title,user,}) => {
    const queryClient = useQueryClient()
    const navigation = useNavigation();
    const [modal, setModal] = useState <boolean>(false)
    const [completed, setCompleted] = useState<boolean>(false)
    const [watch, setWatch] = useState<boolean>(false)
    const [sentModal, setSent] = useState<boolean>(false)


    const {
        mutateAsync,
        isLoading,
    } = useMutation(APIFunction.update_status)

    const deleteTask = useMutation(APIFunction.delete_task)

    const unDo = async (action: string) => {
        try {
            let fd = {
                status: action,
                id: item.id,
                sub_tasks: []
            };
            let res = await mutateAsync(fd);

            if (res) {
                await storeData('task updated', res);
                queryClient.invalidateQueries();
                }
        } catch (err) {
            
        }
}


    const onPressHandler = async (action:string) => {
        try {
          let fd = {
            status: action,
              id: item.id,
              sub_tasks:[]
          };
          let res = await mutateAsync(fd);
          if (res) {
            await storeData('task updated', res);
            queryClient.invalidateQueries();
            setModal(false);
            setCompleted(false);
            setSent(false);
            showFlashMessage({
              title: `${' '} Task moved to ${action.toUpperCase()} ${' '} `,
              duration: 5000,
              type: 'task',
              statusBarHeight: Platform.OS === "android" ? 7 : Platform.OS === "ios" ? 10 : null,
              backgroundColor: AppColors.newYellow,
              actionType:"task",
              action:()=>unDo(action==="Completed"?"In-progress":action==="In-progress"?"To-do":'To-do')
            });
            setWatch(!watch);
          }
        } catch (error) {
          // Handle error here
        }
      }
      

    const handleDelete = async (id:number) => {
        try {
             await deleteTask.mutateAsync(id)
            queryClient.invalidateQueries()
            showFlashMessage({
                title: `${' '} Task Deleted`,
                duration: 8000,
                type: 'task',
                statusBarHeight: Platform.OS === "android" ? 7 : Platform.OS === "ios" ? 13 : null,
                backgroundColor: AppColors.newYellow
            })
            setModal(false)
            setSent(false)
        } catch (error) {
        }

    }
    const overDue = moment(item?.due_date).isBefore(new Date())
    const dueToday = moment(item?.due_date).isSame(new Date(), 'day');
    const noDate = item?.due_date === null
   
    
    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
                <>  
                    <TouchableOpacity
                        style={{height:height(5),marginBottom:height(1.5)}}
                        onPress={() => navigation.navigate("TaskView" as never, { item ,title, }as never)}
                    >
                        
                    <H1 numberOfLines={1} style={styles.title}>{Capitalize(item?.title)}</H1>
                </TouchableOpacity>
                    <View>
                    {
                    index === 1 && title === "In Progress" || index === 1 && title === "Completed" ||user? null :
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

                                <TouchableOpacity
                                    onPress={() => {
                                        setModal(true)
                                        item.id
                                    }}
                                    style={styles.btnPart}>
                                    <Ionicons name="chevron-down-outline" size={15} color={AppColors.black} />
                                </TouchableOpacity>
                            </View>

                    }
                </View>
                     </>

            </View>
            <TouchableOpacity
               onPress={() => navigation.navigate("TaskView" as never, { item ,title} as never)}
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
                    onPress={() => navigation.navigate("TaskView" as never, { item ,title} as never)}
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
            <ActionModal isVisible={modal} onHide={() => setModal(false)} item={item}
                onPressHandle={onPressHandler}
                deleteHandler={() => handleDelete(item.id)}
                loading={isLoading} title={title} />
            <UnCompletedModal isVisible={completed} onHide={() => setCompleted(false)} onPressHandle={onPressHandler} />

            <SentActionModal isVisible={sentModal} onHide={() => setSent(false)} item={item} onPressHandle={onPressHandler} 
                deleteHandler={() => handleDelete(item.id)}
                loading={isLoading}
                title={title} 
            />
            
            {/* <TaskViewMore isVisible={display} onHide={() => setDisplay(false)} item={item} title={title} setDisplay={setDisplay} /> */}

        </View>
    )
}

export default Index