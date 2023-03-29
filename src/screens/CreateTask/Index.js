import { View, Keyboard, Image, FlatList, TouchableOpacity, Platform, Text, Animated } from 'react-native'
import Modal from 'react-native-modal';
import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react'
import styles from './style'
import { Container, P, CustomCalender, KeyboardAwareWrapper, CloseHandler, H1, GenerateIsoDates } from '../../utills/components'
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button'
import { Field, Formik } from 'formik';
import CustomInput from '../../components/CustomInput/index';
import { validationSchema } from '../../utills/validationSchema';
import { Capitalize, getData, storeData } from '../../utills/Methods';
import { showFlashMessage } from '../../components/SuccessFlash';
import CustomList from '../../components/CustomList/Index'
import { APIFunction, } from '../../utills/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMutation, useQueryClient } from 'react-query';
import { Images } from '../../component2/image/Image';
import CommonStyles from '../../utills/CommonStyles';
import { height, width } from 'react-native-dimension';
import { TextInput } from "react-native-paper"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { setCurrentTabIndex, setLoaderVisible } from '../../Redux/Actions/Config';
import { useNavigation } from '@react-navigation/native';
import { scrollToPosition } from '../../Redux/Actions/Config';
import { CordType } from '../../utills/types';
import ScreenWrapper from '../../components/ScreenWrapper';



const Index = ({ route }) => {
    const { item } = route?.params || {}
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const queryClient = useQueryClient()
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [subTask, setSubtask] = useState(() => item?.sub_tasks_tasksapp?.map((item, i) => "task" + i) ?? [])
    const [subData, setSubdata] = useState(() => item?.sub_tasks_tasksapp?.reduce((acc, curr, index) => { return { ...acc, ["task" + index]: curr.title } }, {}) ?? {})
    const [count, setCount] = useState(item?.sub_tasks_tasksapp?.length ?? 0)
    const [showDiscard, setShowDiscard] = useState(false)
    const [assignTo, setAssignTo] = useState({})
    const [disabled, setDisabled] = useState(false)
    const [scrollable, setScrollable] = useState(true)


    const scrollY = useRef(new Animated.Value(0)).current;
    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true },
    );

    const [data, setData] = useState({
        title: item?.title ?? '',
        description: item?.description ?? '',
        due_date: "Today",
    })

    const {
        mutateAsync,
        isLoading
    } = useMutation(APIFunction.post_task)

    const {
        mutateAsync: editHandler,
        isLoading: isLoadingEdit
    } = useMutation(APIFunction.update_status)

    const {
        mutateAsync: subTaskEditHandler,
        isLoading: isLoadingSubtask
    } = useMutation(APIFunction.post_sub_Task)


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



    const submitHandler = async () => {
        try {
            Keyboard.dismiss()
            let required = ["title"]
            let msg = ""
            for (let req of required) {
                if (!data[req] || data[req].toString().trim() === "") {
                    msg = `"${Capitalize(req.replaceAll("_", " "))}" is required`
                    break;
                }
            }
            if (msg !== "") {
                return showFlashMessage({
                    title: msg,
                    type: 'error'
                })
            }
            dispatch(setLoaderVisible(true));
            let employee = await getData("about_me");

            let fd = {
                ...data,
                due_date: data?.due_date === 'Today' ? moment().toISOString(true) : moment(data?.due_date).format('YYYY-MM-DD[T]HH:mm:ss.SSS'),
                created_by: item?.created_by?.id || employee?.id,
                assigned_to: assignTo?.type === "Employee" ? assignTo?.assigned_to : employee?.id,
                department: assignTo?.type === "Departments" ? assignTo?.assigned_to : null,
                // assigned_to: !assignTo?.assigned_to_id && assignTo?.type === "Employee" ? assignTo?.id : assignTo?.assigned_to_id && assignTo?.type === "Employee" ? assignTo?.assigned_to_id : assignTo?.assigned_to_id && assignTo?.type === "Departments" ? assignTo?.assigned_to_id : employee?.id,
                // department: assignTo?.assigned_to_id && assignTo?.type === "Departments" ? assignTo?.assigned_to_id : null,
                status: "To-do",
                sub_tasks: Object.values(subData).map(item => {
                    return {
                        title: item,
                        assigned_by: employee?.id,
                    }
                })
            }
            if (assignTo?.type === "Departments") delete fd["assigned_to"]
            if (data?.due_date === "No Date" || item) delete fd["due_date"]
            if (item) delete fd["status"]
            if (item) {
                const subtasks = Object.values(subData).map((obj, i) => {
                    return {
                        title: obj,
                        assigned_by: employee?.id,
                        id: item?.sub_tasks_tasksapp[i]?.id,
                        task: item?.id
                    }
                })
                fd["sub_tasks"] = subtasks
            }

            if (item) {
                fd["id"] = item?.id;
                let res = await editHandler(fd)
                setDisabled(false)
                await storeData('edited tasks', res)
                queryClient.invalidateQueries()
                dispatch(setLoaderVisible(false));
                navigation.goBack()
                showFlashMessage({
                    title: "Task Edited successfully",
                    duration: 5000,
                    type: 'task',
                    statusBarHeight: Platform.OS === "android" ? 7 : Platform.OS === "ios" ? 10 : null,
                    backgroundColor: AppColors.newYellow
                })
            } else {
                let res = await mutateAsync(fd)
                setDisabled(false)
                await storeData('tasks', res)
                queryClient.invalidateQueries()
                dispatch(setLoaderVisible(false));
                if (assignTo?.type === "Employee" || assignTo?.type === "Departments") {
                    dispatch(setCurrentTabIndex(1));
                }
                navigation.navigate("Task")
                showFlashMessage({
                    title: "Task created successfully",
                    duration: 5000,
                    type: 'task',
                    statusBarHeight: Platform.OS === "android" ? 7 : Platform.OS === "ios" ? 10 : null,
                    backgroundColor: AppColors.newYellow
                })
            }
        } catch (err) {
            showFlashMessage({
                title: "Something went wrong. Please retry",
                type: 'error'
            })
        }
    }



    useEffect(() => {
        if (!item?.id) return
        setAssignTo({
            id: item?.id,
            type: item?.department?.id ? "Departments" : "Employee",
            name: item?.assigned_to?.first_name,
            assigned_to: item?.department?.id || item?.assigned_to?.id
        })
        setData({ ...data, due_date: item?.due_date })
    }, [item])


    return (
        <ScreenWrapper
            scrollEnabled={false}>
            <View style={styles.mainViewContainer}>
                <View style={styles.formRow}>
                    {
                        item ? <H1 marginTop={2}>Edit Task</H1> :
                            <H1 marginTop={2}>Create New Task</H1>
                    }
                    <CloseHandler position={'center'} onPress={() => navigation.goBack()} />
                </View>
                <View style={styles.line} />
                <KeyboardAwareWrapper
                    showsVerticalScrollIndicator={false} >
                    <Formik
                        initialValues={{
                            due_Date: '',
                            title: '',
                            description: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={showFlashMessage}
                    >
                        {({ submitHandler }) => (
                            <>
                                <Field
                                    component={CustomInput}
                                    name="title"
                                    placeholder="Enter Task Title"
                                    keyboardType={'default'}
                                    autoFocus={true}
                                    value={data.title}
                                    onChangeData={(value) => {
                                        setData({ ...data, title: value })
                                    }}

                                />
                                <Field
                                    name="description"
                                    component={CustomInput}
                                    placeholder="Enter Task description here"
                                    keyboardType={'default'}
                                    multiline={true}
                                    minHeight={5}
                                    value={data.description}
                                    onChangeData={(value) => {
                                        setData({ ...data, description: value })
                                    }}
                                />
                            </>
                        )}
                    </Formik>

                    <View
                        style={styles.container}>
                        <View style={styles.assign}>
                            <P color={AppColors.black3}>Assign To</P>
                            <TouchableOpacity
                                onPress={() => setOpen(true)}
                                style={styles.button}>
                                {!assignTo?.assigned_to && <Ionicons name='person-add' size={15} color={AppColors.black3} />}
                                <P style={styles.btnIcon}>
                                    {
                                        !assignTo?.assigned_to ? "You" : Capitalize(assignTo?.name ?? item?.department?.name)
                                    }
                                </P>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dueDate}>
                            <P color={AppColors.black3}>Due Date</P>
                            <View style={CommonStyles.row}>
                                <TouchableOpacity
                                    onPress={() => {
                                        Keyboard.dismiss()
                                        setShow(true)
                                    }}
                                    style={styles.button1}>
                                    <Text numberOfLines={1} style={styles.date}>
                                        {data?.due_date === "No Date" ? 'No Date' : data?.due_date === 'Today' ? `Today, ${moment().format("ddd D, MMM YYYY")}` : moment(data?.due_date).format("ddd D, MMM YYYY")}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setData({ ...data, due_date: "No Date" })}>
                                    <Ionicons name='close-outline' size={18} color={AppColors.black1} style={styles.close} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    {
                        subTask &&
                        <Formik>
                            {({ submitHandler }) => (

                                <FlatList
                                    data={subTask}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) =>
                                        <View>
                                            <Field
                                                component={CustomInput}
                                                name={item}
                                                keyboardType={'default'}
                                                multiline={true}
                                                mode={'flat'}
                                                autoCorrect={false}
                                                autoFocus={true}
                                                value={subData?.[item]}
                                                onChangeData={(value) => {
                                                    setSubdata({ ...subData, [item]: value })
                                                }}
                                                right={<TextInput.Icon name={"close"}
                                                    style={[CommonStyles.marginTop_1, CommonStyles.marginRight_8]}
                                                    color={AppColors.darkGray}
                                                    onPress={() => handleDelete(index)}
                                                />}
                                            />
                                        </View>

                                    }
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                />

                            )}
                        </Formik>
                    }

                    <View
                        style={styles.btnContainer}>

                        <TouchableOpacity
                            onPress={_subTask}
                            style={styles.addBtn}>
                            <Ionicons name='add' size={15} color={AppColors.green} />
                            <H1 color={AppColors.green}>Add subtask</H1>
                        </TouchableOpacity>


                        <View>
                            <TouchableOpacity
                                onPress={submitHandler}
                                disabled={isLoading || isLoadingEdit} >
                                <H1 color={AppColors.green}>{item ? "Save" : "Create"}</H1>
                            </TouchableOpacity>
                        </View>
                    </View>



                </KeyboardAwareWrapper>
                {
                    open ?
                        <CustomList
                            setOpen={setOpen}
                            open={open}
                            onPressHandler={(item) => {
                                if (item.type === "Departments") {
                                    setAssignTo({ ...item, name: `${item.name ? Capitalize(item.name) : null}` })
                                    return setOpen(false)
                                }
                                if (item.type === "Employee") {
                                    setAssignTo({ ...item, name: `${item.first_name ? Capitalize(item.first_name) : ""} ${item.last_name ? Capitalize(item.last_name) : ''}` })
                                    return setOpen(false)
                                }
                                if (item.type === "Me") {
                                    setAssignTo({ name: item.name })
                                    return setOpen(false)
                                }
                            }}
                        />
                        : null
                }
                {
                    show ? <CustomCalender
                        date={data.due_date ? data.due_date : ''}
                        setShow={(date) => {
                            setData({ ...data, due_date: date.dateString })
                            setShow(false)
                        }}
                        show={show}
                        enabled
                    />
                        : null
                }

            </View>
        </ScreenWrapper>
    )
}



{/* {item?.due_date ? moment(item?.due_date).format("dddd D, MMM YYYY") :
  data?.due_date === 'No Date' ? 'No Date' : data?.due_date === 'Today' ? `Today, ${moment().format("ddd D, MMM YYYY")}` : 
  moment(data?.due_date).format("dddd D, MMM YYYY")  } */}
{/* {!item?.assigned_to && !assignTo?.name ? "You" : 
     item?.assigned_to ? item?.assigned_to?.first_name :
      assignTo?.name && !item?.assigned_to ? assignTo?.name : "Me"} */}





export default Index


