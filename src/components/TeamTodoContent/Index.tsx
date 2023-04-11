import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native'
import React, { useState} from 'react'
import { P,H1, ImgPlaceholder, TouchableWrapper } from '../../utills/components'
import styles from './styles'
import Button from '../Button/index';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension';
import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';
import { APIFunction, useFetchAboutMe, } from '../../utills/api';
import { storeData, Capitalize } from '../../utills/Methods';
import { showFlashMessage } from '../SuccessFlash/index';
import Entypo from 'react-native-vector-icons/Entypo';
import { Images } from '../../utills/Image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonStyles from '../../utills/CommonStyles';
import { UnCompletedModal, ActionModal } from '../ContactModal';
import { useNavigation } from '@react-navigation/native';
import { useFetchAboutMeProps } from '../TimeoffModal/types';



type Props = {
    item: any;
    title: string;
    id: number;
  };

  const Index: React.FC<Props> = ({ item, title,  id }) => {
    const navigation = useNavigation();
    const queryClient = useQueryClient()
    const [modal, setModal] = useState<boolean>(false)
    const [completed, setCompleted] = useState<boolean>(false)
    const [watch, setWatch] = useState<boolean>(false)
  


    const {
        mutateAsync,
        isLoading,
    } = useMutation(APIFunction.update_status)
      const deleteTask = useMutation(APIFunction.delete_task)

      const {
        data : about
      } = useFetchAboutMe("main") as useFetchAboutMeProps

    const onPressHandler = async (action:string) => {

        let fd = {
            assigned_to: about?.id,
            id: item.id,
            status: action,
        }

        let res = await mutateAsync(fd)
        if (res) {
            await storeData('task claim', res)
            queryClient.invalidateQueries()
            showFlashMessage({
                title: `Task Status Updated Successfully`,
                duration: 5000,
                type: 'task',
                statusBarHeight: Platform.OS === "android" ? 7 : Platform.OS === "ios" ? 10 : null,
                backgroundColor: AppColors.newYellow,
            });
        }
        setWatch(!watch)
        setCompleted(false)

    }

    const handleDelete = async (id:number) => {
        try {
            await deleteTask.mutateAsync(id)
            queryClient.invalidateQueries()
            showFlashMessage({
                title: `${' '} Task Deleted`,
                duration: 5000,
                type: 'task',
                statusBarHeight: Platform.OS === "android" ? 7 : Platform.OS === "ios" ? 10 : null,
                backgroundColor: AppColors.newYellow
            })
            setModal(false)
        } catch (error) {
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
                        item?.department?.id !== item?.assigned_to?.id && item?.assigned_to?.photo ?
                            <Image
                                source={{ uri: item?.assigned_to?.photo }}
                                style={styles.avatarStyle}
                            /> : item?.assigned_to?.id && !item?.assigned_to?.photo ?
                                <ImgPlaceholder
                                    text={`${item?.assigned_to?.first_name?.[0] ? Capitalize(item?.assigned_to?.first_name?.[0]) : ''}${item?.assigned_to?.last_name?.[0] ? `${Capitalize(item?.assigned_to?.last_name?.[0])}` : ''
                                        }`}
                                    size={12}
                                /> :

                                <ImgPlaceholder text={'?'} size={12} />

                    }

                    <View style={{ marginLeft: width(4), marginTop: height(0.5) }}>
                        <TouchableOpacity onPress={() => navigation.navigate("TaskView" as never, { id }as never)}>
                            <H1 numberOfLines={1} style={styles.title}>{item?.title}</H1>
                            <P fontSize={3} style={styles.author}>
                                {item?.department?.id && !item?.assigned_to?.id ? `To: ${item?.department?.name ? item?.department?.name : ""} `
                                    : `Claimed: ${item.assigned_to?.first_name ? item.assigned_to?.first_name : ""} ${item.assigned_to?.last_name ? item.assigned_to?.last_name : ''}`
                                }
                            </P>
                        </TouchableOpacity>
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
                            item?.department?.id && !item?.assigned_to?.id ?
                                <Button
                                    title="Claim task"
                                    textStyle={styles.buttonText}
                                    containerStyle={styles.button}
                                    onPress={() => onPressHandler('In-progress')}
                                /> : null
                    }
                </View>
            </View>
            <View style={styles.line1} />
            <UnCompletedModal isVisible={completed} onHide={() => setCompleted(false)} onPressHandle={onPressHandler} />
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