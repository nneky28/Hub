import React, { useRef } from 'react'
import { View, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import { Images } from '../../utills/Image';
import { height } from 'react-native-dimension';
import ScreenWrapper from '../../components/ScreenWrapper';
import { H1, P } from '../../utills/components';
import Button from '../../components/Button'
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { setLoaderVisible } from '../../Redux/Actions/Config';
import { APIFunction, useFetchOnboarding } from '../../utills/api';
import { getStoreAboutMe, ToastError } from '../../utills/Methods';
import { RootScreenProps } from '../../Routes/types';
import { useFetchAppOnboardingProps } from '../../components/SelectionModal/types';
import styles from "./styles"
import { GET_ONBOARDING, OnboardingLoad, UpdateOnboardingLoad } from '../../utills/payload';


const TaskOnboarding = ({ navigation } : RootScreenProps) => {

    const swiperRef = useRef(null);
    const dispatch = useDispatch();
    const Task_Name = "Task"
    const queryClient = useQueryClient()
    const { 
        mutateAsync,
        isLoading
    } = useMutation(APIFunction.post_onboarding)
    const { 
        mutateAsync: editHandler,
        isLoading : isUpdating
     } = useMutation(APIFunction.update_onboarding)
    const {
        data: onboarding,
    } = useFetchOnboarding(Task_Name) as useFetchAppOnboardingProps

    const handleCompletion = async () => {
        try {
            let about = await getStoreAboutMe()
            if(!about?.id) return
            let fd : UpdateOnboardingLoad | OnboardingLoad = {
                type: 'Task',
                employee: about.id,
                has_completed_mobile_navigation: true,
                has_completed_mobile_onboarding: true
            }
            if (onboarding[0]?.id) {
                fd = {
                    ...fd,
                    id : onboarding?.[0]?.id
                };
                await editHandler(fd)
                queryClient.invalidateQueries(GET_ONBOARDING)
                dispatch(setLoaderVisible(false));
                return navigation.navigate("Menu",{screen : "TaskHome"})
            }
            await mutateAsync(fd)
            queryClient.invalidateQueries(GET_ONBOARDING)
            dispatch(setLoaderVisible(false));
            navigation.navigate("Menu",{screen : "TaskHome"})
        } catch (err : any) {
           ToastError(err?.msg)
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
                    isLoading={isUpdating || isLoading}
                    disabled={isUpdating || isLoading}
                />
            </View>
        </ScreenWrapper>
    )
}

export default TaskOnboarding