import {
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Container, P, Rounded, H1, ImgPlaceholder, TouchableWrapper } from '../../utills/components'
import styles from './styles'
import Button from '../Button/index';
import AppColors, { ColorList } from '../../utills/AppColors';
import { width, height } from 'react-native-dimension';
import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';
import { APIFunction, } from '../../utills/api';
import { storeData, getData, Capitalize } from '../../utills/Methods';
import { showFlashMessage } from '../SuccessFlash/index';
import Entypo from 'react-native-vector-icons/Entypo';
import { Images } from '../../component2/image/Image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonStyles from '../../utills/CommonStyles';
import { UnCompletedModal, ActionModal } from '../ContactModal';
import TaskDetails from '../TaskDetails/Index'


const Index = ({ __flattenArr, item, title, team, index, mapToState }) => {

    const queryClient = useQueryClient()
    const [modal, setModal] = useState(false)
    const [display, setDisplay] = useState(false)
    const [subTask, setSubTask] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [watch, setWatch] = useState(false)
    const [show, setShow] = useState(false)

    const hideModal = () => {
        setSubTask(false)
    }

    const {
        mutateAsync,
        isLoading,
    } = useMutation(APIFunction.update_status)
    const deleteTask = useMutation(APIFunction.delete_task)

    const onPressHandler = async (action) => {

        let employee = await getData("about_me")

        let fd = {
            assigned_to: employee?.id,
            id: item.id,
            due_date: moment().toISOString(true),
            status: action,
        }

        let res = await mutateAsync(fd)
        console.log('res', res)
        await storeData('task claim', res)
        queryClient.invalidateQueries('get_team_tasks')
        showFlashMessage({ title: `Task claimed successfully` })
        setWatch(!watch)
        setCompleted(false)

    }

    const handleDelete = async (id) => {
        try {
            await deleteTask.mutateAsync(id)
            queryClient.invalidateQueries()
            showFlashMessage({ title: `Task deleted` })
            setModal(false)
            setSent(false)
        } catch (error) {
            //console.log('err', error)
        }

    }


    const overDue = moment(item?.due_date).isBefore(new Date())
    const dueToday = moment(item?.due_date).isSame(new Date(), 'day');
    const noDate = item?.due_date === null



    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
                <View style={CommonStyles.row}>
                    {
                        item?.department?.id !== item?.assigned_to?.id ?
                            <Image
                                source={{ uri: item?.assigned_to?.photo }}
                                style={styles.avatarStyle}
                            /> :
                            item?.department?.id !== item?.assigned_to?.id && !item?.assigned_to?.photo ?
                                <ImgPlaceholder text={item && item?.assigned_to?.first_name && item?.assigned_to?.first_name.length > 0 ? Capitalize([...item?.assigned_to?.first_name][0]) : ""} size={12} />
                                :
                                (
                                    <ImgPlaceholder text={'?'} size={12} />
                                )

                    }

                    <View style={{ marginLeft: width(4), marginTop: height(0.5) }}>
                        <TouchableOpacity onPress={() => setShow(true)}>
                            <H1 numberOfLines={1} style={styles.title}>{item?.title}</H1>
                        </TouchableOpacity>
                        <P fontSize={3} style={styles.author}>
                            {item?.department?.id === item?.assigned_to?.id ? `To: ${item?.assigned_to?.first_name ? item?.assigned_to?.first_name : ""} `
                                : `Claimed: ${item.created_by?.first_name ? item.created_by?.first_name : ""} ${item.created_by?.last_name ? item.created_by?.last_name : ''}`
                            }
                        </P>
                        <View>

                            {
                                title === "Completed" || title === 'In Progress' ? null :
                                    <View style={styles.row1}>
                                        {dueToday ? <React.Fragment>
                                            <Image source={{ uri: Images.DueFlag }} style={styles.flag} />
                                            <P style={styles.flagText}>DueToday</P>
                                        </React.Fragment> : overDue ? <React.Fragment>
                                            <Ionicons name="calendar-outline" size={12} color={AppColors.black3} />
                                            <P style={styles.date}>{moment(item?.due_date).format("MMM D, YYYY")}</P>
                                            <Entypo name="dot-single" size={18} color={AppColors.red} />
                                            <P color={AppColors.red} fontSize={3.1}>Overdue</P>
                                        </React.Fragment> : noDate ? null :
                                            <React.Fragment>
                                                <Ionicons name="calendar-outline" size={12} color={AppColors.black3} />
                                                <P style={styles.date}>{moment(item?.due_date).format("MMMM D, YYYY")}</P>
                                                <Entypo name="dot-single" size={18} color={AppColors.yellow} />
                                                <P color={AppColors.yellow} fontSize={3.1}>Upcoming</P>
                                            </React.Fragment>}
                                    </View>
                            }

                        </View>
                    </View>
                </View>

                <View>
                    {
                        title === "Completed" ? <TouchableWrapper size={4} onPress={() => setCompleted(true)}>
                            <Ionicons name="ellipsis-vertical" size={15} color={AppColors.black3} />
                        </TouchableWrapper> : title === "In Progress"
                            ? <View style={styles.btn}>
                                <TouchableOpacity
                                    onPress={() => onPressHandler('Completed')}
                                    style={styles.newButton}>
                                    <Text numberOfLines={1} style={styles.buttonText}>{'Complete task'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        setModal(true)
                                        item.id
                                    }}
                                    style={styles.btnPart}>
                                    <Ionicons name="chevron-down-outline" size={15} color={AppColors.black3} />
                                </TouchableOpacity>
                            </View> :
                            item?.department?.id === item?.assigned_to?.id ?
                                <Button
                                    title="Claim task"
                                    textStyle={styles.buttonText}
                                    containerStyle={styles.button}
                                    onPress={() => onPressHandler('In-progress')}
                                /> : null
                    }
                </View>
            </View>
            <View style={styles.subRow}>
                {
                    title === "Completed" ? null :
                        <>
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

                        </>
                }
            </View>
            <View style={styles.line1} />
            <UnCompletedModal isVisible={completed} onHide={() => setCompleted(false)} onPressHandle={onPressHandler} />
            <TaskDetails isVisible={show}
                onHide={() => setShow(false)} item={item} title={title} />
            <ActionModal isVisible={modal} onHide={() => setModal(false)} item={item}
                onPressHandle={onPressHandler}
                deleteHandler={() => handleDelete(item.id)}
                loading={isLoading}
                title={title}
            />

        </View>


    )
}

export default Index