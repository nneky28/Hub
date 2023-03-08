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
import { APIFunction } from '../../utills/api';
import { getData, storeData } from '../../utills/Methods';



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
    const queryClient = useQueryClient()
    const { mutateAsync, isLoading } = useMutation(APIFunction.post_onboarding)



    const handleNavigation = async () => {
        navigation.navigate("onBoardHome")
    }

    const handleCompletion = async () => {
        let employee_id = await getData("about_me")
        let fd = {
            type: 'Task',
            employee: employee_id.id,
            has_completed_mobile_navigation: true,
            has_completed_mobile_onboarding: true
        }

        let res = await mutateAsync(fd)
        queryClient.invalidateQueries("get_onboarding")
        await storeData('onboard completion', res)
        navigation.navigate("onBoardHome")

    }

    return (
        <ScreenWrapper
            scrollEnabled={false}>
            <View style={styles.container}>
                <Swiper
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
                    title="Continue"
                    textStyle={styles.buttonText}
                    containerStyle={styles.button}
                    onPress={() => {
                        if (swiperRef?.current?.state?.index === 2) {
                            return handleCompletion()
                        }
                        swiperRef.current.scrollBy(1)
                    }}
                />
                <Button
                    title="Skip"
                    textStyle={styles.btnText}
                    containerStyle={styles.btn}
                    onPress={handleNavigation}
                />
            </View>
        </ScreenWrapper>
    )
}

export default Index