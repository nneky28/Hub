import { View, Keyboard, Image, FlatList, TouchableOpacity, Platform, Text } from 'react-native'
import Modal from 'react-native-modal';
import moment from 'moment';
import React, { useState } from 'react'
import styles from './style'
import { Container, P, CustomCalender } from '../../utills/components'
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button'
import { Field, Formik } from 'formik';
import CustomInput from '../../components/CustomInput/index';
import { validationSchema } from '../../utills/validationSchema';
import { Capitalize, getData, storeData } from '../../utills/Methods';
import { showFlashMessage } from '../../components/SuccessFlash';
import CustomListModal from '../../components/CustomListModal/Index'
import { APIFunction, } from '../../utills/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMutation, useQueryClient } from 'react-query';
import { Images } from '../../component2/image/Image';
import CommonStyles from '../../utills/CommonStyles';
import { height } from 'react-native-dimension';
import { TextInput } from "react-native-paper"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { setLoaderVisible } from '../../Redux/Actions/Config';
import { useNavigation } from '@react-navigation/native';


const Index = ({ visible, onHide, item }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const queryClient = useQueryClient()
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [display, setDisplay] = useState(false)
    const [subTask, setSubtask] = useState([])
    const [subData, setSubdata] = useState({})
    const [count, setCount] = React.useState(0)
    const [showDiscard, setShowDiscard] = useState(false)
    const [assignTo, setAssignTo] = useState({})


    const [data, setData] = useState({
        title: item?.title ?? '',
        description: item?.description ?? '',
        due_date: "Today"
    })


    const { mutateAsync, isLoading } = useMutation(APIFunction.post_task)

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

    if (item) {

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

            let employee = await getData("about_me")

            let fd = {
                ...data,
                due_date: data?.due_date === 'Today' ? moment().toISOString(true) : moment(data.due_date).toISOString(true), created_by: employee?.id,
                assigned_to: assignTo?.type === "Employee" ? assignTo.id : assignTo?.type === "Departments" ? assignTo.id : employee.id,
                department: assignTo?.type === "Departments" ? assignTo.id : null,
                status: "To-do",

                sub_tasks: Object.values(subData).map(item => {
                    return {
                        title: item,
                        assigned_by: employee?.id,
                    }
                })
            }
            let res = await mutateAsync(fd)
            await storeData('tasks', res)
            queryClient.invalidateQueries()
            dispatch(setLoaderVisible(false));
            onHide()
            navigation.navigate("Task")
            showFlashMessage({ title: `Task created successfully` })
        } catch (err) {
            console.log('err', err)
            showFlashMessage({
                title: "Something went wrong. Please retry",
                type: 'error'
            })
        }
    }

    const pressHandler = () => {
        setShowDiscard(false)
    }


    return (
        <Modal
            onBackButtonPress={onHide}
            onModalHide={onHide}
            onBackdropPress={() => setShowDiscard(true)}
            animationInTiming={500}
            animationOutTiming={10}
            backdropOpacity={0.8}
            animationIn="fadeInUp"
            animationOut="fadeInDown"
            swipeThreshold={0.3}
            backdropColor={AppColors.black}
            isVisible={visible}
            style={{ justifyContent: 'center', margin: 0, }}>

            {
                showDiscard ? <View style={styles.btnContainer}>
                    <Button
                        title="Discard"
                        containerStyle={styles.buttonStyle}
                        textStyle={styles.buttonText}
                        onPress={() => onHide()}
                    />
                    <Button
                        title="Continue Editing"
                        containerStyle={styles.buttonStyle1}
                        textStyle={styles.buttonText1}
                        onPress={pressHandler}
                    />
                </View> :
                    <View style={styles.mainViewContainer}>
                        <KeyboardAwareScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ marginBottom: height(10) }}
                            behavior={Platform.OS === "ios" ? "padding" : "height"} >
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
                                        {!assignTo?.name && <Ionicons name='person-add' size={15} color={AppColors.black3} />}
                                        <P style={styles.btnIcon}>{!item?.assigned_to && !assignTo?.name ? "You" : item?.assigned_to ? item?.assigned_to?.first_name : assignTo?.name && !item?.assigned_to ? assignTo?.name : "Me"}</P>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.dueDate}>
                                    <P color={AppColors.black3}>Due Date</P>
                                    <View style={CommonStyles.row}>
                                        <TouchableOpacity
                                            onPress={() => setShow(true)}
                                            style={styles.button1}>
                                            <Text numberOfLines={1} style={styles.date}>
                                                {item?.due_date ? moment(item?.due_date).format("dddd D, MMM YYYY") : data?.due_date === 'Today' ? `Today, ${moment().format("ddd D, MMM YYYY")}` : moment(data?.due_date).format("dddd D, MMM YYYY")}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => null}>
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
                                            renderItem={({ item }) =>
                                                <View style={styles.subRow}>
                                                    <Image
                                                        resizeMode={'contain'}
                                                        source={{ uri: Images.subTaskIcon }}
                                                        style={styles.downIcon2} />

                                                    <Field
                                                        component={CustomInput}
                                                        name={item}
                                                        placeholder="Add subtasks"
                                                        keyboardType={'default'}
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


                            }
                            <Container style={styles.addSubtask}>
                                <TouchableOpacity
                                    onPress={_subTask}
                                    style={styles.addBtn}>
                                    <Ionicons name='add' size={15} color={AppColors.green} />
                                    <P color={AppColors.green}>Add subtask</P>
                                </TouchableOpacity>
                            </Container>

                            {/* <Container>
                                <View style={styles.row}>
                                    <View>
                                        <Image
                                            resizeMode={'contain'}
                                            source={{ uri: Images.Attach }}
                                            style={styles.attachIcon} />
                                    </View>

                                    <TouchableOpacity
                                        onPress={submitHandler}>
                                        <Ionicons name='send' size={22} color={AppColors.black2} />
                                    </TouchableOpacity>
                                </View>
                            </Container> */}
                            <Button
                                title="Send"
                                containerStyle={styles.buttonStyle1}
                                textStyle={styles.buttonText1}
                                onPress={pressHandler}
                            />
                        </KeyboardAwareScrollView>

                    </View>

            }

            {
                open ?
                    <CustomListModal
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




        </Modal >

    )
}

export default Index
