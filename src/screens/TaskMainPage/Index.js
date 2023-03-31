import {
    View, Text, Image, SectionList, FlatList, TouchableOpacity, Keyboard,
    Animated,
    Easing,
    LayoutAnimation,
    TextInput,
    ScrollView,
    Platform
} from 'react-native'
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react'
import styles from './styles';
import Button from '../../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { P, H1, Container, Rounded, CloseHandler, ImgPlaceholder, SizedBox } from '../../utills/components';
import { Images } from '../../component2/image/Image';
import { CompletedModal, SubTaskActionModal } from '../../components/ContactModal';
import { ICON_BUTTON_SIZE } from '../../utills/Constants';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useFetchActivities, useUpdate, updateSubTask, useFetchComments, useFetchAllTask } from '../../utills/api';
import ActivityCard from '../../components/ActivityCard/Index'
import AppColors from '../../utills/AppColors';
import { Field, Formik } from 'formik';
import CommonStyles from '../../utills/CommonStyles';
import { Capitalize, __flatten, getData } from '../../utills/Methods';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMutation, useQueryClient } from 'react-query';
import { APIFunction } from '../../utills/api';
import { storeData } from '../../utills/Methods';
import { showFlashMessage } from '../../components/SuccessFlash/index';
import Entypo from 'react-native-vector-icons/Entypo';
import { downIcon, } from '../../assets/images';
import { height, width, totalSize } from 'react-native-dimension';
import ScreenWrapper from '../../components/ScreenWrapper/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



const Index = ({ route }) => {
    const { id, title } = route?.params
    const navigation = useNavigation();
    const spinValue = new Animated.Value(0);
    const [selectedIDs, setSelectedIDs] = useState([])
    const [addBtn, setAddBtn] = useState(true)
    const [log, setLog] = useState([])
    const [page, setPage] = useState(1)
    const [subTask, setSubtask] = useState([])
    const [subData, setSubdata] = useState({})
    const [count, setCount] = useState(0)
    const [show, setShow] = useState(false);
    const [action, setAction] = useState(false)
    const queryClient = useQueryClient()
    const [pag, setPag] = useState(1)
    const [comment, setComment] = useState('')
    const [checked, setChecked] = useState(false)
    const [data, setData] = useState(null)
    const [addctrlBtn, setAddCtrlBtn] = useState(true)
    const [subContainer, setSubContainer] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [myComment, setMyComment] = useState(null)
    const [item, setItem] = useState({})
    const [subTasks, setSubTasks] = useState([])
    const [employee_pk, setEmployeePK] = useState(null);


    const {
        data: logs,
        isLoading: loading
    } = useFetchActivities(id)

    const {
        data: allComments,
        isLoading: loadingComments
    } = useFetchComments(id)

    const {
        mutateAsync: subTaskEditHandler,
        isLoading: isLoadingSubtask
    } = useMutation(APIFunction.update_sub_task)


    const {
        data: allTask,
        isLoading: loadingAllTask,
    } = useFetchAllTask(id)

    const __flattenArr = () => {
        if (allTask?.pages) {
            const flattenedArray = Object.values(allTask.pages).flatMap(item => {
                return item;
            });
            setItem(flattenedArray[0]);

        }
    };

    const flattenAndMapData = (data) => {
        let flattenedArr = [];
        if (data && data?.pages && Array.isArray(data?.pages)) {
            flattenedArr = data.pages;
        }
        flattenedArr = flattenedArr.map((res) => {
            if (!res) return {};
            return res.results;
        })
            .map((item, i) => {
                return {
                    key: i,
                    title: Object.keys(item)?.[0] ?? [],
                    data: Object.values(item)?.[0] ?? [],
                };
            });
        return flattenedArr;
    };

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.rowSection}>
                <View style={CommonStyles.rowJustifySpaceBtw}>
                    {item?.comment_by?.photo ? (
                        <Image
                            source={{ uri: item?.comment_by?.photo }}
                            style={styles.avatarStyle}
                        />
                    ) : (
                        <ImgPlaceholder
                            text={`${item ? item.comment_by?.first_name[0] : ''} ${item ? item.comment_by?.last_name[0] : ''
                                }`}
                            size={10}
                        />
                    )}
                    <View style={styles.textCon}>
                        <P numberOfLines={1} style={styles.titleText}>
                            {item && item?.comment}
                        </P>
                    </View>
                </View>
            </View>
        )
    }

    const handleSubmit = async () => {
        try {
            Keyboard.dismiss()
            let employee = await getData("about_me")
            let fd = {
                comment: comment,
                comment_by: employee?.id,
                task: item?.id,
                due_date: moment().toISOString(true)
            }
            let res = await mutateAsync(fd)
            queryClient.invalidateQueries()
            setComment("")
            showFlashMessage({ title: "comment sent" })
        } catch (err) {
            showFlashMessage({
                title: "Something went wrong. Please retry",
                type: 'error'
            })
        }
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

    const RenderItem = ({ item }) => {
        return (
            <View>
                <ActivityCard item={item} />
            </View>
        )
    }
    const {
        mutateAsync,
        isLoading,
    } = useMutation(APIFunction.post_comment)


    const handleComplete = async (subtaskId) => {
        const subtasks = Object.values(item?.sub_tasks_tasksapp).map((obj, i) => {
            return {
                id: item?.sub_tasks_tasksapp[i]?.id,
            };
        });
        const fd = {
            id: subtaskId,
            assigned_by: item?.created_by?.id,
            task: item.id,
            status: "Completed",
        };

        let res = await subTaskEditHandler(fd)
        queryClient.invalidateQueries()
        if (res) {
            await storeData("selectedIDS", res)
            const checked = [...selectedIDs, subtaskId]
            setSelectedIDs(checked);
            showFlashMessage({
                title: ` sub Task marked as Succesfull `,
                duration: 3000,
                type: 'task',
                statusBarHeight: Platform.OS === "android" ? 7 : Platform.OS === "ios" ? 10 : null,
                backgroundColor: AppColors.newYellow,
            });
        }
    }

    const handleUncomplete = (id) => {
        setSelectedIDs(selectedIDs.filter((selectedID) => selectedID !== id));
    };


    const formattedTitle = (title) => {
        if (!title) return '';
        const momentTitle = moment(title);
        const date = momentTitle.calendar().split(" at")[0];
        const dayOfWeek = momentTitle.format('dddd, ');
        const monthDay = momentTitle.format("MMMM Do");
        return (
            <Text>
                {date}
                <Text style={styles.point}>.</Text>
                <P style={styles.day}> {dayOfWeek} </P>
                <P style={styles.day}>{monthDay}</P>
            </Text>
        );
    };


    useEffect(() => {
        const flattenedLogs = flattenAndMapData(logs);
        setLog(flattenedLogs);
    }, [logs]);

    useEffect(() => {
        const flattenedComments = flattenAndMapData(allComments);
        setData(flattenedComments);
    }, [allComments]);

    useEffect(() => {
        __flattenArr()
    }, [allTask])

    useEffect(() => {
        handleComplete()
    }, [])
    const getInfo = async () => {
        try {
            let about_me = await getData('about_me');
            setEmployeePK(about_me);
        } catch (err) { }
    };

    useEffect(() => {
        const loadSelectedIDs = async () => {
            const storedIDs = await getData("selectedIDS");
            setSelectedIDs(storedIDs || []);
        };

        loadSelectedIDs();
    }, []);

    useEffect(() => {
        const saveSelectedIDs = async () => {
            await storeData('selectedIDS', selectedIDs);
        };

        saveSelectedIDs();
    }, [selectedIDs]);

    const overDue = moment(item?.[0]?.due_date).isBefore(new Date())
    const dueToday = moment(item?.[0]?.due_date).isSame(new Date(), 'day');

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={{ width: width(70) }}>
                        <H1 numberOfLines={1}>{item?.title}</H1>
                    </View>
                    <View style={{ paddingHorizontal: width(5) }}>
                        <CloseHandler position={'center'} onPress={() => navigation.goBack()} size={ICON_BUTTON_SIZE} />
                    </View>
                </View>

                <View style={styles.row1}>
                    <P style={styles.flagText}>Due: </P>
                    {dueToday ? <React.Fragment>
                        <P style={styles.date}>{moment(item?.due_date).format("MMMM D, YYYY")}</P>
                        <Entypo name="dot-single" size={18} color={AppColors.black} />
                        <P style={styles.flagText}>DueToday</P>
                    </React.Fragment> : overDue ? <React.Fragment>
                        <P style={styles.date}>{moment(item?.due_date).format("MMMM D, YYYY")}</P>
                        <Entypo name="dot-single" size={18} color={AppColors.black} />
                        <P color={AppColors.red} fontSize={3.1}>Overdue</P>
                    </React.Fragment> : <React.Fragment>
                        <P style={styles.date}>{moment(item?.due_date).format("MMMM D, YYYY")}</P>
                        <Entypo name="dot-single" size={18} color={AppColors.black} />
                        <P color={AppColors.yellow} fontSize={3.1}>Upcoming</P>
                    </React.Fragment>}
                </View>
                <View style={styles.addBtn}>
                    {
                        title === 'Completed' ? null :
                            <Button
                                title="Edit Task"
                                containerStyle={styles.buttonStyle}
                                textStyle={styles.buttonText}
                                onPress={() => {
                                    navigation.navigate("CreateTask", { item })
                                }}
                            />
                    }
                </View>
                <View style={styles.line} />
            </View>
            <ScreenWrapper scrollEnabled={true}>
                <View style={styles.genContainer}>
                    <View>

                        {
                            !item?.description ? <View style={{ paddingVertical: height(2) }}>
                                <H1 >No Description for this Task</H1>
                            </View> :
                                <View style={styles.descriptionCon}>
                                    <H1 color={AppColors.black1}>Task Description</H1>
                                    <View style={styles.con}>
                                        <P style={styles.description}>
                                            {item?.description}
                                        </P>
                                    </View>
                                </View>
                        }
                        <View
                            style={styles.container1}>
                            <View style={styles.assign}>
                                <P color={AppColors.black3}>Assigned To</P>
                                <View style={styles.button}>
                                    <Text style={styles.name}>{!item?.assigned_to ? item?.department?.name : item?.assigned_to?.first_name ? item?.assigned_to?.first_name : ""} {item?.assigned_to?.last_name ? item?.assigned_to?.last_name : ''}</Text>
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
                            {
                                !item?.sub_tasks_tasksapp ? null :
                                    item?.sub_tasks_tasksapp?.length !== 0 &&
                                    <>
                                        <H1 style={{ marginTop: height(2) }}>SubTasks</H1>
                                        <View style={styles.subTaskContainer}>
                                            <View style={CommonStyles.row}>
                                                <FlatList
                                                    data={Object.values(item?.sub_tasks_tasksapp ?? {}) ?? []}
                                                    renderItem={({ item, index }) => (
                                                        <>
                                                            <View style={CommonStyles.row}>
                                                                {selectedIDs.includes(item.id) ? (
                                                                    <TouchableOpacity onPress={() => handleUncomplete(item.id)}>
                                                                        <Ionicons name="checkbox-outline" size={18} color={AppColors.black} />
                                                                    </TouchableOpacity>
                                                                ) : (
                                                                    <TouchableOpacity onPress={() => handleComplete(item.id)}>
                                                                        <Image source={{ uri: Images.SubTaskBox }} style={styles.leftIcon} />
                                                                    </TouchableOpacity>
                                                                )}
                                                                <TouchableOpacity onPress={() => handleComplete(item.id)}>
                                                                    <Text
                                                                        numberOfLines={1}
                                                                        style={[
                                                                            styles.subTitle,
                                                                            { textDecorationLine: selectedIDs.includes(item.id) ? "line-through" : null },
                                                                        ]}
                                                                    >
                                                                        {item.title}
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            {index <= 15 ? <View style={styles.line1} /> : null}
                                                        </>
                                                    )}
                                                    keyExtractor={(item, index) => item.id.toString()}
                                                />

                                            </View>


                                        </View>
                                    </>
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
                        source={{ uri: Images.ArrowDown }}
                        style={[styles.leftIcon, { transform: [{ rotate: spin }] }]}
                    />
                </TouchableOpacity>
                {/* <ScrollView></ScrollView> */}
                {
                    show &&
                    <View>
                        <SectionList
                            sections={log}
                            renderItem={RenderItem}
                            keyExtractor={item => item.id}
                            renderSectionHeader={({ section: { title } }) => {
                                return (
                                    <P style={styles.stickyDate}>
                                        {formattedTitle(title)}
                                    </P>
                                )
                            }} />

                        {data && Array.isArray(data) && !loadingComments ? (
                            <SectionList
                                sections={data}
                                renderItem={renderItem}
                                renderSectionHeader={({ section: { title } }) => (
                                    data[0]?.title ? (
                                        <P style={styles.stickyDate}>{formattedTitle(data[0].title)}</P>
                                    ) : null
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        ) : null}

                        <KeyboardAwareScrollView
                            resetScrollToCoords={{ x: 0, y: 0 }}
                            scrollEnabled={true}
                            extraScrollHeight={8}>
                            <View style={styles.listContainer1}>
                                <View style={CommonStyles.rowJustifySpaceBtw}>
                                    <View >
                                        {employee_pk?.job?.photo ? (
                                            <Image
                                                source={{ uri: employee_pk?.photo }}
                                                style={styles.avatarStyle}
                                            />
                                        ) : (
                                            <ImgPlaceholder
                                                text={`${employee_pk ? employee_pk?.first_name[0] : ''}${employee_pk ? employee_pk?.last_name[0] : ''
                                                    }`}
                                                size={10}
                                            />
                                        )}
                                    </View>

                                    <View style={styles.textContainer1}>
                                        <TextInput
                                            style={styles.Input}
                                            placeholder={"Add a comment"}
                                            value={comment}
                                            onSubmitEditing={handleSubmit}
                                            onChangeText={text => setComment(text)}
                                        />
                                    </View>
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                }
            </ScreenWrapper>
        </View>
    )
}

export default Index

