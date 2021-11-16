import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Platform, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import { categoryIcon1, downIcon, filterIcon, leftIcon, listingIcon } from '../../assets/images'
import { FilterModal } from '../../components/ContactModal'
import PersonCard from '../../components/PersonCard'
import PersonListComp from '../../components/PersonListComp'
import ScreenWrapper from '../../components/ScreenWrapper'
import SearchBox, { SearchBoxIOS } from '../../components/SearchBox'
import TrainingList from '../../components/TrainingList'
import { APIFunction, getAPIs } from '../../utills/api'
import AppColors from '../../utills/AppColors'
import CommonStyles from '../../utills/CommonStyles'
import { Container, H1, LottieIcon, PageLoader } from '../../utills/components'
import { celebrations, whosOut } from '../../utills/data/celebrations'
import { persons } from '../../utills/data/persons'
import tasksData from '../../utills/data/tasksData'
import { getData, ToastError } from '../../utills/Methods'
import styles from './styles'
import Empty from '../../assets/lottie/empty.json'







export default function Training({navigation}) {
    var [selected, setSelected] = useState('Overview');
    const [loading,setLoading] = useState(true);
    const [histories,setHistories] = useState(null);
    const [trainings,setTrainings] = useState(null);
   const getTraining = async () => {
        try{
            setLoading(true)
            let token = await getData("token");
            let user =  await getData("user");
            let about_me = await getData("about_me")
            let biz = user.employee_user_memberships &&
            Array.isArray(user.employee_user_memberships) && user.employee_user_memberships[0]
            && user.employee_user_memberships[0].business_id ? user.employee_user_memberships[0] : null;
            let train_url = APIFunction.trainings(biz.business_id,about_me.id)
            let hist_url = APIFunction.training_hist(biz.business_id,about_me.id)
            let hist_res = await getAPIs(hist_url,token)
            let train_res = await getAPIs(train_url,token)
            setHistories(hist_res.results);
            setTrainings(train_res.results)
            setLoading(false);
        }catch(err){
            let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : "Something went wrong. Please retry"
            //ToastError(msg)
        }
    }
    useFocusEffect(
        React.useCallback(()=>{
            getTraining()
        },[])
    )
    
    return (
        <ScreenWrapper scrollEnabled={selected === "Available" && trainings && 
        Array.isArray(trainings) && trainings.length === 0 ? false : true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                  <Text numberOfLines={1} style={styles.screenTitle}>
                  Training
                  </Text>
                </View>
            </View>
            <View style={styles.line} />
            <View style={styles.mainViewContainer}>
                <Container 
                    style={{
                        flexDirection : "row"
                    }}
                    paddingTop={2}
                    paddingHorizontal={5}
                >
                    {['Overview', 'Available'].map((item) => (
                        <TouchableOpacity 
                        onPress={() => setSelected(item)}
                        >
                            <Text style={[styles.heading, selected == item && styles.selectedHeading]}>{item}</Text>
                            {selected == item && <View style={styles.animated} />}
                        </TouchableOpacity>
                        ))}
                </Container>
                <View style={styles.line2} />
                {/* <React.Fragment>
                    <ScrollView
                        nestedScrollEnabled={true}
                        contentContainerStyle={styles.scrollViewContainer}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}>
                        {['Overview', 'Available'].map((item) => (
                        <TouchableOpacity 
                        onPress={() => setSelected(item)}
                        >
                            <Text style={[styles.heading, selected == item && styles.selectedHeading]}>{item}</Text>
                            {selected == item && <View style={styles.animated} />}
                        </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View style={styles.line2} />
                </React.Fragment> */}
                {
                    loading ? (
                        <PageLoader />
                    ) : (
                        <React.Fragment>
                    {
                        selected === 'Overview' &&
                        <>
                        {
                            Platform.OS === "android" ? (
                                <SearchBox title="Search for Training"/>
                            ) : (
                                <SearchBoxIOS title="Search for Training"/>
                            )
                        }
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>Upcoming</Text>
                        </View>
                        {
                            trainings && Array.isArray(trainings) && trainings.length > 0 ? (
                                <TrainingList data={trainings}/>
                            ) : (
                                <Container
                                    style={{
                                        justifyContent : "center",
                                        alignItems : "center"
                                    }}
                                >
                                    <LottieIcon icon={Empty}/>
                                    <H1
                                        color={AppColors.black3}
                                    >You have no Upcoming Training</H1>
                                </Container>
                            )
                        }
                        <React.Fragment>
                            {
                                trainings && Array.isArray(trainings) && trainings.length > 0 &&  histories && Array.isArray(histories) && histories.length >= 0 ? (
                                    <View style={styles.headingContainer}>
                                        <Text style={styles.heading}>History</Text>
                                    </View>
                                ) : null
                            }
                            {
                                histories && Array.isArray(histories) && histories.length > 0 ? (
                                    <TrainingList data={histories}/>
                                ) : null
                            }
                            {
                                trainings && Array.isArray(trainings) && trainings.length > 0 &&  histories && Array.isArray(histories) && histories.length === 0 ? (
                                    <LottieIcon icon={Empty}/>
                                ) : null
                            }
                        </React.Fragment>
                        </>
                    }
                    {
                        selected === "Available" ? (
                            <React.Fragment>
                                {
                                        trainings && Array.isArray(trainings) 
                                        && trainings.length > 0 ? (
                                            <TrainingList data={trainings}/>
                                        ) : (
                                            <Container
                                                style={{
                                                    justifyContent : "center",
                                                    alignItems : "center",
                                                    flex:1
                                                }}
                                            >
                                                <LottieIcon icon={Empty}/>
                                                <H1
                                                    color={AppColors.black3}
                                                >You have no available training yet</H1>
                                                
                                            </Container>
                                        )
                                }
                            </React.Fragment> 
                        )  : (
                            null
                        )
                        
                       
                    }
                        </React.Fragment>
                    )
                }
            </View>
        </ScreenWrapper>
    )
}

