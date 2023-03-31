import React, { useState, useRef } from 'react'
import { View, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import { Images } from '../../component2/image/Image';
import { height, width } from 'react-native-dimension';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';
import { H1, P } from '../../utills/components';
import Button from '../../components/Button'
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { setLoaderVisible } from '../../Redux/Actions/Config';
import { APIFunction, useFetchOnboarding } from '../../utills/api';
import { getData, storeData } from '../../utills/Methods';
import { showFlashMessage } from '../../components/SuccessFlash/index';



const styles = {
    wrapper: {
        backgroundColor: AppColors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },

    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1

    },
    container: {
        flex: 1,
    },

    image: {
        width: width(15),
        height: height(15),
    },
    title: {
        color: '#171717',
        fontSize: width(5.5),
        textAlign: 'center',
        width: width(55)
    },
    subTitle: {
        color: '#545454',
        fontSize: width(3.3),
        lineHeight: width(5),
        paddingVertical: height(2),
        textAlign: 'center',
        paddingHorizontal: width(15),

    },
    dot: {
        backgroundColor: "#5BCBD7",
        width: height(1.5),
        height: height(1.5),
        marginLeft: width(2),
        marginRight: width(2),
        borderRadius: width(15)
    },

    active: {
        backgroundColor: '#2898A4',
        width: height(1.5),
        height: height(1.5),
        marginLeft: width(2),
        marginRight: width(2),
        borderRadius: width(15)
    },
    button: {
        width: width(90),
        borderRadius: width(3),
        bottom: height(5),
        height: height(5)
    },
    btn: {
        backgroundColor: '#EAF8FA',
        width: width(90),
        borderRadius: width(3),
        bottom: height(5),
        height: height(5)
    },
    btnText: {
        color: AppColors.green,
        fontSize: width(3.5),
        fontFamily: FontFamily.BlackSansBold
    },
    buttonText: {
        fontSize: width(3.5),
        fontFamily: FontFamily.BlackSansBold
    }
}



const Index = ({ navigation }) => {

    const swiperRef = useRef(null);
    const dispatch = useDispatch();
    const Task_Name = "Task"
    const queryClient = useQueryClient()
    const { mutateAsync, isLoading } = useMutation(APIFunction.post_onboarding)
    const { mutateAsync: editHandler } = useMutation(APIFunction.update_onboarding)
    const [toCheck, setToCheck] = useState(true)
    const {
        data: onboarding,
    } = useFetchOnboarding(Task_Name)

    const handleCompletion = async () => {
        try {
            dispatch(setLoaderVisible(true));
            let employee_id = await getData("about_me")

            let fd = {
                type: 'Task',
                employee: employee_id.id,
                has_completed_mobile_navigation: true,
                has_completed_mobile_onboarding: true
            }

            if (onboarding && onboarding?.length) {
                fd["id"] = onboarding[0]?.id;
                let res = await editHandler(fd)

                queryClient.invalidateQueries("get_onboarding")
                dispatch(setLoaderVisible(false));
                navigation.navigate("Task")
            } else {
                let res = await mutateAsync(fd)
                queryClient.invalidateQueries()
                dispatch(setLoaderVisible(false));
                navigation.navigate("Task")
            }
        } catch (error) {
            showFlashMessage({
                title: "Something went wrong. Please retry",
                type: 'error'
            })
        }

    }

    return (
        <ScreenWrapper
            scrollEnabled={false}>
            <View style={styles.container}>
                <Swiper
                    autoplay={true}
                    autoplayTimeout={6}
                    ref={swiperRef}
                    style={styles.wrapper}
                    dot={
                        <View
                            style={styles.dot} />
                    }
                    activeDot={
                        <View
                            style={styles.active} />
                    }
                    paginationStyle={{
                        top: height(40),
                    }}

                    loop={false} >
                    <View style={styles.slide}>
                        <Image
                            style={styles.image}
                            source={{ uri: Images.Checked }}
                            resizeMode="contain"
                        />
                        <H1 style={styles.title}>Welcome to Tasks</H1>
                        <P style={styles.subTitle}>All projects start with a single step.
                            Add every task that comes to mind, stay organized and get more done.</P>

                    </View>


                    <View style={styles.slide}>
                        <Image
                            style={styles.image}
                            source={{ uri: Images.Note }}
                            resizeMode="contain"
                        />
                        <H1 style={styles.title}>Assign Tasks</H1>
                        <P style={styles.subTitle}>Assign tasks to yourself, a colleague or an entire department.</P>
                    </View>
                    <View style={styles.slide}>
                        <Image
                            style={styles.image}
                            source={{ uri: Images.Create }}
                            resizeMode="contain"
                        />
                        <H1 style={styles.title}>Create subtasks and Collaborate</H1>
                        <P style={styles.subTitle}>Add tasks to an already existing task, collaborate with other employees.</P>
                    </View>
                </Swiper>

                <Button
                    title="Explore Tasks"
                    textStyle={styles.buttonText}
                    containerStyle={styles.button}
                    onPress={handleCompletion}

                />
                {/* <Button
                    title="Skip"
                    textStyle={styles.btnText}
                    containerStyle={styles.btn}
                    onPress={handleCompletion}
                /> */}
            </View>
        </ScreenWrapper>
    )
}

export default Index