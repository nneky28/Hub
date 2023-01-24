import {
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { H1, P, } from '../../utills/components'
import styles from './styles'
import { Images } from '../../component2/image/Image';
import AppColors from '../../utills/AppColors';
import { ActionModal, UnCompletedModal, SentActionModal } from '../ContactModal';
import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';
import { APIFunction, } from '../../utills/api';
import { storeData, getData, Capitalize } from '../../utills/Methods';
import { showFlashMessage } from '../SuccessFlash/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import CommonStyles from '../../utills/CommonStyles';
import TaskDetails from '../TaskDetails/Index'

const Index = ({ item, index, title, __flattenArr, isSent, allTasks, user }) => {
    const queryClient = useQueryClient()
    const [modal, setModal] = useState(false)
    const [display, setDisplay] = useState(false)
    const [subTask, setSubTask] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [watch, setWatch] = useState(false)
    const [sentModal, setSent] = useState(false)
    const navigation = useNavigation()

    const {
        mutateAsync,
        isLoading,
    } = useMutation(APIFunction.update_status)

    const deleteTask = useMutation(APIFunction.delete_task)

    const onPressHandler = async (action) => {
        try {
            let fd = {
                status: action,
                id: item.id,
                due_date: moment().toISOString(true)
            }
            let res = await mutateAsync(fd)
            if (res) {
                await storeData('task updated', res)
                queryClient.invalidateQueries()
                setModal(false)
                setCompleted(false)
                setSent(false)
                showFlashMessage({ title: `status changed` })
                setWatch(!watch)
            }

        } catch (error) {
            console.log('err', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            let res = await deleteTask.mutateAsync(id)
            queryClient.invalidateQueries()
            showFlashMessage({ title: `Task deleted` })
            setModal(false)
            setSent(false)
        } catch (error) {
            console.log('err', error)
        }

    }

    useEffect(() => {
        __flattenArr()
    }, [allTasks]);


    const overDue = moment(item?.due_date).isBefore(new Date())
    const dueToday = moment(item?.due_date).isSame(new Date(), 'day');
    const noDate = item?.due_date === null
    return (
        <TouchableOpacity style={styles.wrapper} onPress={() => setDisplay(true)}>
            <View style={styles.row}>
                <View>
                    <H1 numberOfLines={1} style={styles.title}>{Capitalize(item?.title)}</H1>
                </View>
                {
                    index === 1 && title === "In Progress" || index === 1 && title === "Completed" || user ? null :
                        index === 1 && title === "To-Do" || title === "Completed" ?
                            <TouchableOpacity style={CommonStyles.marginTop_2} onPress={() => {
                                title === "Completed" && setCompleted(true)
                                index === 1 && setSent(true)
                            }}>
                                <Ionicons name="ellipsis-vertical" size={15} color={AppColors.black3} />
                            </TouchableOpacity> :
                            <View style={styles.btn}>
                                <TouchableOpacity

                                    onPress={() => {
                                        if (title === 'In Progress') {
                                            onPressHandler("Completed")
                                        }
                                        onPressHandler('In-progress')
                                    }}
                                    style={styles.button}>
                                    <Text numberOfLines={1} style={styles.buttonText}>{`${title === 'In Progress' ? 'Complete task' : 'Start task'}`}</Text>
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

            <View style={styles.by}>
                <P color={AppColors.black3}>
                    {
                        isSent || user ? 'To:' : 'By:'
                    }
                    {" "}
                    {item.assigned_to?.first_name ? item.assigned_to?.first_name : ""} {item.assigned_to?.last_name ? item.assigned_to?.last_name : ''}
                </P>
            </View>

            {
                title !== 'To-Do' ? null :
                    <View style={styles.row1}>
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
                    </View>
            }


            <View style={styles.subTaskRow}>
                {
                    item?.sub_tasks_tasksapp?.length > 0 ?
                        <FlatList
                            data={Object.values(item?.sub_tasks_tasksapp)}
                            renderItem={({ item }) =>
                                <View style={styles.content}>
                                    <Entypo name="dot-single" size={30} color={AppColors.darkGray} />
                                    <Text numberOfLines={1}
                                        style={styles.sub}>{item.title}</Text>
                                </View>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                        : null
                }
            </View>
            <View style={styles.line1} />
            <ActionModal isVisible={modal} onHide={() => setModal(false)} item={item}
                onPressHandle={onPressHandler}
                deleteHandler={() => handleDelete(item.id)}
                loading={isLoading} />
            <UnCompletedModal isVisible={completed} onHide={() => setCompleted(false)} onPressHandle={onPressHandler} />
            <SentActionModal isVisible={sentModal} onHide={() => setSent(false)} item={item}
                onPressHandle={onPressHandler}
                deleteHandler={() => handleDelete(item.id)}
                loading={isLoading} />
            <TaskDetails isVisible={display} onHide={() => setDisplay(false)} item={item} />

        </TouchableOpacity>
    )
}

export default Index