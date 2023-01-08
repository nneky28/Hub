import {
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Container, P, Rounded, H1 } from '../../utills/components'
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
import { UnCompletedModal } from '../ContactModal';


const Index = ({ __flattenArr, item, title, team }) => {

    const queryClient = useQueryClient()
    const [modal, setModal] = useState(false)
    const [display, setDisplay] = useState(false)
    const [subTask, setSubTask] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [watch, setWatch] = useState(false)


    const hideModal = () => {
        setSubTask(false)
    }

    const {
        mutateAsync,
        isLoading,
    } = useMutation(APIFunction.update_status)

    const onPressHandler = async (action) => {
        let employee = await getData("about_me")
        let fd = {
            assigned_to: employee?.id,
            id: item.id,
            due_date: moment().toISOString(true),
            status: action,
        }

        let res = await mutateAsync(fd)
        await storeData('task claim', res)
        queryClient.invalidateQueries()
        showFlashMessage({ title: `task updated` })
        setWatch(!watch)
        setCompleted(false)
    }


    const overDue = moment(item?.due_date).isBefore(new Date())
    const dueToday = moment(item?.due_date).isSame(new Date(), 'day');

    useEffect(() => {
        __flattenArr()
    }, [watch]);


    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
                <View style={CommonStyles.row}>
                    {
                        item?.department !== item?.assigned_to?.id ?
                            <Rounded backgroundColor='#BCEFFF' size={12}>
                                <H1>
                                    {item && item?.assigned_to?.first_name && item?.assigned_to?.first_name.length > 0 ? Capitalize([...item?.assigned_to?.first_name][0]) : ""}
                                </H1>
                            </Rounded>
                            :
                            (
                                <Rounded backgroundColor='#E1E1E1' size={12}>
                                    <H1 color={AppColors.black1}>?</H1>
                                </Rounded>
                            )

                    }

                    <View style={{ marginLeft: width(3), marginTop: height(0.5) }}>
                        <H1 numberOfLines={1} style={styles.title}>{item?.title}</H1>
                        <P fontSize={3} style={styles.author}>
                            {item?.department === item?.assigned_to?.id ? `To: ${item?.assigned_to?.first_name ? item?.assigned_to?.first_name : ""} `
                                : `Claimed by: ${item.created_by?.first_name ? item.created_by?.first_name : ""} ${item.created_by?.last_name ? item.created_by?.last_name : ''}`
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
                                        </React.Fragment> : <React.Fragment>
                                            <Ionicons name="calendar-outline" size={12} color={AppColors.black3} />
                                            <P style={styles.date}>{moment(item?.due_date).format("MMM D, YYYY")}</P>
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
                        title === "Completed" ? <TouchableOpacity style={CommonStyles.marginTop_1} onPress={() => setCompleted(true)}>
                            <Ionicons name="ellipsis-vertical" size={15} color={AppColors.black3} />
                        </TouchableOpacity> : title === "In Progress"
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
                            item?.department === item?.assigned_to?.id ?
                                <Button
                                    title="claim task"
                                    textStyle={styles.buttonText}
                                    containerStyle={styles.button}
                                    onPress={() => onPressHandler('assign_to')}
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
        </View>


    )
}

export default Index