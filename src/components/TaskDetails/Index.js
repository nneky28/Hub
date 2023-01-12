import {
    View, Text, Image, SectionList, FlatList, TouchableOpacity, Keyboard,
    Animated,
    Easing,
    LayoutAnimation,
} from 'react-native'
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react'
import styles from './styles';
import Button from '../Button/index';
import { P, H1, Container, Rounded, CloseHandler } from '../../utills/components';
import { Images } from '../../component2/image/Image';
import { CompletedModal, SubTaskActionModal } from '../ContactModal';
import { ICON_BUTTON_SIZE } from '../../utills/Constants';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useFetchActivities, useUpdate, updateSubTask, useFetchComments } from '../../utills/api';
import ActivityCard from '../ActivityCard/Index'
import AppColors from '../../utills/AppColors';
import { Field, Formik } from 'formik';
import { TextInput } from "react-native-paper"
import CustomInput from '../CustomInput/index';
import CommonStyles from '../../utills/CommonStyles';
import { Capitalize, __flatten, getData } from '../../utills/Methods';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMutation, useQueryClient } from 'react-query';
import { APIFunction } from '../../utills/api';
import { storeData } from '../../utills/Methods';
import { showFlashMessage } from '../SuccessFlash/index';
import Entypo from 'react-native-vector-icons/Entypo';
import { downIcon, } from '../../assets/images';
import { height } from 'react-native-dimension';
import ScreenWrapper from '../ScreenWrapper/index';
// import CommentTask from '../CommentTask/Index'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';


const Index = ({ isVisible, onHide, item, title, navigation }) => {
    const spinValue = new Animated.Value(0);
    const [selectedIDs, setSelectedIDs] = useState([])
    const [addBtn, setAddBtn] = useState(true)
    const [log, setLog] = useState([])
    const [page, setPage] = useState(1)
    const [subTask, setSubtask] = useState([])
    const [subData, setSubdata] = useState({})
    const [count, setCount] = useState(0)
    const [modal, setModal] = useState(false)
    const [show, setShow] = useState(false);
    const [action, setAction] = useState(false)
    const queryClient = useQueryClient()
    const [pag, setPag] = useState(1)
    const [comment, setComment] = useState([])
    const [checked, setChecked] = useState(false)

    const {
        data: logs,
        isFetchingNextPage,
        hasNextPage,
        isLoading: loading
    } = useFetchActivities()

    const {
        data: comments,
        isLoading: loadingComments
    } = useFetchComments()

    const toFlat = () => {
        let flattened = []
        if (comments && comments?.pages && Array.isArray(comments?.pages)) {
            flattened = comments?.pages
        }

        flattened = flattened.map((res) => {
            if (!res) return {}
            return res.results
        }).map((item, i) => {
            return {
                key: i,
                data: Object.values(item)?.[0]
            }
        })
        setComment(flattened)
    }

    const __flattenArr = () => {
        let flattenedArr = []
        if (logs && logs?.pages && Array.isArray(logs?.pages)) {
            flattenedArr = logs?.pages
        }

        flattenedArr = flattenedArr.map((res) => {
            if (!res) return {}
            return res.results
        }).map((item, i) => {
            return {
                key: i,
                title: Object.keys(item)?.[0],
                data: Object.values(item)?.[0]
            }
        })
        setLog(flattenedArr)

    }
    const hide = () => {
        setShow((show) => {
            if (show) {
                animate(['0deg', '180deg']);
            } else {
                animate(['180deg', '0deg']);
            }
            return !show;
        });
    };

    const [spin, setSpin] = useState(
        spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
        }),
    );

    const animate = (deg) => {
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear, // Easing is an additional import from react-native
            useNativeDriver: true, // To make use of native drimport AppColors from '../../utills/AppColors';
        }).start();




        setSpin(
            spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: deg,
            }),
        );
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    };

    const {
        mutateAsync,
        isLoading,
    } = useMutation(APIFunction.post_sub_Task)

    // console.log('arr', item)
    // console.log('---', item?.sub_tasks_tasksapp[0]?.id)
    // const submitHandler = async (id) => {
    //     try {
    //         Keyboard.dismiss()
    //         let employee = await getData("about_me")
    //         let fd = Object.values(subData).map(item => {
    //             return {
    //                 title: item,
    //                 assigned_by: employee?.id,
    //                 assigned_by: employee?.id,
    //             task: id,
    //             due_date: moment().toISOString(true)
    //             }
    //         })
    //         let res = await mutateAsync(fd)
    //         console.log('----', res)
    //         // onHide()
    //         // showFlashMessage({ title: "sub Task successfully assigned" })
    //     } catch (err) {
    //         console.log('err', err)
    //         showFlashMessage({
    //             title: "Something went wrong. Please retry",
    //             type: 'error'
    //         })
    //     }
    // }


    const {
        mutate: mutateUpdate,
        isLoading: loadingSubTask,
    } = updateSubTask()

    const onPress = async (action) => {

        let fd = {
            status: action,
            task: item?.id,
            id: item?.sub_tasks_tasksapp[0]?.id,
            due_date: moment().toISOString(true)
        }
        let res = mutateUpdate(fd)
        queryClient.invalidateQueries()
        setAction(false)
        showFlashMessage({ title: `Sub task marked as completed` })
    }

    const { mutate: mutatePut,
        isLoading: loadEdit
    } = useUpdate()

    const onPressHandler = async (action) => {
        let fd = {
            status: action,
            id: item?.id,
            due_date: moment().toISOString(true)
        }
        let res = mutatePut(fd)
        await storeData('task update', res)
        queryClient.invalidateQueries()
        setModal(false)
        onHide()
        showFlashMessage({ title: `${title} status changed` })
    }


    useEffect(() => {
        __flattenArr()
    }, [logs]);

    useEffect(() => {
        toFlat()
    }, [comments]);

    const RenderItem = ({ item }) => {
        return (
            <View>
                <ActivityCard item={item} />
            </View>
        )
    }

    const renderItem = ({ item }) => {

        <View
            style={[styles.listContainer1]} >
            <View style={CommonStyles.rowJustifySpaceBtw}>
                {
                    item.comment_by?.photo ? (
                        <Image source={{ uri: item.comment_byphoto }} style={styles.avatarStyle} />
                    ) : (
                        <Rounded backgroundColor={AppColors.lightPink} size={12}>
                            <H1>
                                {item.comment_by?.first_name[0]}
                                {item.comment_by?.last_name[0]}
                            </H1>
                        </Rounded>
                    )
                }

                <View style={styles.textContainer1}>
                    <P>hello</P>
                    <P numberOfLines={1} style={styles.titleText}>
                        {item && item?.comment}
                    </P>
                </View>
            </View>
        </View>

    }

    const handleChecked = (item) => {
        setSelectedIDs((prev) => [...prev, item.id])
    }

    const handleUncomplete = (item) => {
        const filtered = selectedIDs.filter((id) => id !== item.id)
        setSelectedIDs(filtered)
    }

    const _subTask = () => {
        let text = "task" + count
        setSubtask([...subTask, text])
        setCount(count + 1)
    }
    const handleDelete = (index) => {
        let arr = [...subTask]
        arr.splice(index, 1)
        setSubtask(arr)
    }


    const overDue = moment(item?.due_date).isBefore(new Date())
    const dueToday = moment(item?.due_date).isSame(new Date(), 'day');
    return (

        <Modal
            onBackButtonPress={onHide}
            onModalHide={onHide}
            animationInTiming={500}
            animationOutTiming={10}
            backdropOpacity={0.2}
            onBackdropPress={onHide}
            animationIn="fadeInUp"
            animationOut="fadeInDown"
            swipeThreshold={0.3}
            style={styles.genContainer}
            isVisible={isVisible}>
            <ScreenWrapper scrollEnabled={true}>
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <View>
                                <H1>{Capitalize(item?.title)}</H1>
                            </View>
                            {/* <Ionicons name="close-outline" size={15} color={AppColors.black3} /> */}
                            <CloseHandler position={'center'} onPress={onHide} />
                        </View>

                        <View style={styles.row1}>
                            <P style={styles.flagText}>Due: </P>
                            {dueToday ? <React.Fragment>
                                <P style={styles.date}>{moment(item?.due_date).format("MMMM D, YYYY")}</P>
                                <Entypo name="dot-single" size={18} color={AppColors.black3} />
                                <P style={styles.flagText}>DueToday</P>
                            </React.Fragment> : overDue ? <React.Fragment>
                                <P style={styles.date}>{moment(item?.due_date).format("MMMM D, YYYY")}</P>
                                <Entypo name="dot-single" size={18} color={AppColors.red} />
                                <P color={AppColors.red} fontSize={3.1}>Overdue</P>
                            </React.Fragment> : <React.Fragment>
                                <P style={styles.date}>{moment(item?.due_date).format("MMMM D, YYYY")}</P>
                                <Entypo name="dot-single" size={18} color={AppColors.yellow} />
                                <P color={AppColors.yellow} fontSize={3.1}>Upcoming</P>
                            </React.Fragment>}
                        </View>
                        <View style={styles.line} />

                        <View style={styles.descriptionCon}>
                            <H1 color={AppColors.black1}>Task Description</H1>
                            <View style={styles.con}>
                                <Text style={styles.description}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={styles.container1}>
                            <View style={styles.assign}>
                                <P color={AppColors.black3}>Assigned To</P>
                                <View style={styles.button}>
                                    <Text style={styles.name}>{item?.assigned_to?.first_name ? item?.assigned_to?.first_name : ""} {item?.assigned_to?.last_name ? item?.assigned_to?.last_name : ''}</Text>
                                </View>
                            </View>
                            <View style={styles.dueDate}>
                                <P color={AppColors.black3}>Due Date</P>
                                <View style={styles.button}>
                                    <Text style={styles.name} numberOfLines={1}>
                                        {item?.due_date && moment(item?.due_date).format("dddd D, MMM YYYY")}</Text>
                                </View>
                            </View>
                        </View>

                        <View>


                            {item?.sub_tasks_tasksapp.length !== 0 ?
                                <>
                                    <View style={[CommonStyles.rowJustifySpaceBtw, { paddingVertical: height(2) }]}>
                                        <H1 color={AppColors.black1}>Subtasks</H1>
                                        <TouchableOpacity
                                            onPress={_subTask}
                                            style={styles.addBtn}>
                                            <Ionicons name='add' size={15} color={AppColors.green} />
                                            <P color={AppColors.green}>Add subtask</P>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.subTaskContainer}>
                                        <View style={CommonStyles.row}>
                                            <FlatList
                                                data={Object.values(item?.sub_tasks_tasksapp)}
                                                renderItem={({ item, index }) =>
                                                    <>
                                                        <View style={CommonStyles.row}>
                                                            {selectedIDs.includes(item.id) ? <TouchableOpacity onPress={() => handleUncomplete(item)}>
                                                                <Ionicons name="checkbox-outline" size={18} color={AppColors.black} />
                                                            </TouchableOpacity> :
                                                                <TouchableOpacity onPress={() => handleChecked(item)}>
                                                                    <Ionicons name="tablet-portrait-outline" size={18} color={AppColors.black} />
                                                                </TouchableOpacity>}

                                                            <Text
                                                                numberOfLines={1}
                                                                style={[styles.subTitle, { textDecorationLine: selectedIDs.includes(item.id) ? "line-through" : null }]}>{item.title}</Text>
                                                        </View>
                                                        {index <= 1 ? <View style={styles.line1} /> : null}
                                                    </>
                                                }
                                                keyExtractor={(item, index) => index.toString()}
                                            />
                                        </View>

                                        {
                                            subTask ?
                                                <View>
                                                    <KeyboardAvoidingScrollView>
                                                        <Formik>
                                                            {({ submitHandler }) => (

                                                                <FlatList
                                                                    data={subTask}
                                                                    keyExtractor={(item, index) => index.toString()}
                                                                    renderItem={({ item }) =>
                                                                        <View>
                                                                            <Image
                                                                                resizeMode={'contain'}
                                                                                source={{ uri: Images.subTaskIcon }}
                                                                                style={styles.downIcon2} />

                                                                            <Field
                                                                                component={CustomInput}
                                                                                placeholder="Add subtasks here"
                                                                                keyboardType={'default'}
                                                                                style={styles.input}
                                                                                multiline={true}
                                                                                value={subData?.[item]}
                                                                                onChangeData={(value) => {
                                                                                    setSubdata({ ...subData, [item]: value })
                                                                                }}
                                                                                right={<TextInput.Icon name={"close"}
                                                                                    style={CommonStyles.marginTop_2}
                                                                                    color={AppColors.darkGray}
                                                                                    onPress={() => handleDelete(item.index)}
                                                                                />}
                                                                            />
                                                                        </View>
                                                                    }
                                                                    showsVerticalScrollIndicator={false}
                                                                    showsHorizontalScrollIndicator={false}
                                                                />
                                                            )}
                                                        </Formik>
                                                        {/* <TouchableOpacity
                                                        onPress={() => submitHandler(item.id)}
                                                        style={styles.newBtn}>
                                                        <Ionicons name='send' size={15} color={AppColors.green} />
                                                    </TouchableOpacity> */}

                                                    </KeyboardAvoidingScrollView>
                                                </View> : null
                                        }




                                    </View>
                                </> :
                                <View style={styles.addSubtask}>
                                    <TouchableOpacity
                                        onPress={_subTask}
                                        style={styles.addBtn}>
                                        <Ionicons name='add' size={15} color={AppColors.green} />
                                        <P color={AppColors.green}>Add subtask</P>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>



                        <View style={styles.descriptionCon}>
                            <H1 color={AppColors.black1}>Created By</H1>
                            <Text style={styles.description}>
                                {item?.created_by?.first_name ? item?.created_by?.first_name : ""} {item?.created_by?.last_name ? item?.created_by?.last_name : ''}
                            </Text>
                        </View>

                    </View>

                </View>

                <TouchableOpacity onPress={hide} style={styles.sections}>
                    <H1 style={styles.logText}>Activity log</H1>
                    <Animated.Image
                        resizeMode="contain"
                        source={downIcon}
                        style={[styles.leftIcon, { transform: [{ rotate: spin }] }]}
                    />
                </TouchableOpacity>
                {
                    show &&
                    <View>
                        <SectionList
                            sections={log}
                            renderItem={RenderItem}
                            keyExtractor={item => item.id}
                            renderSectionHeader={({ section: { title } }) => {
                                return (
                                    <H1 style={styles.stickyDate}>
                                        {moment(title).calendar().split(" at")[0]}
                                        <P style={styles.point}>.</P>
                                        <P style={styles.day}> {(moment(title).format('dddd, '))} </P>
                                        <P style={styles.day}>{(moment(title).format("MMMM Do"))}</P>
                                    </H1>
                                )
                            }} />
                    </View>
                }

                {/* <FlatList
                        data={comment}
                        renderItem={renderItem}
                    /> */}
                {/* <CommentTask item={item} />
                    <ActionModal isVisible={modal} onHide={() => setModal(false)} item={item} onPressHandle={onPressHandler}
                        loading={loadEdit} />
                    <SubTaskActionModal isVisible={action} onHide={() => setAction(false)} item={item} onPressHandle={onPress}
                        loading={loadingSubTask} /> */}
            </ScreenWrapper>
        </Modal>


    )
}

export default Index
