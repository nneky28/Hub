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
import { BackHandler, Container, H1, ImageWrap, LottieIcon, P, PageLoader, SizedBox } from '../../utills/components'
import { celebrations, whosOut } from '../../utills/data/celebrations'
import { persons } from '../../utills/data/persons'
import tasksData from '../../utills/data/tasksData'
import { getData, ToastError } from '../../utills/Methods'
import styles from './styles'
import Empty from '../../assets/lottie/empty.json'
import { Images } from '../../component2/image/Image'







export default function Training({navigation}) {
    var [selected, setSelected] = useState('Upcoming');
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
                <BackHandler />
                <Text numberOfLines={1} style={styles.screenTitle}>
                    Training
                  </Text>
            </View>
            <View style={styles.line} />
            <View style={styles.mainViewContainer}>
                <Container 
                    style={{
                        flexDirection : "row"
                    }}
                    paddingTop={2}
                    paddingHorizontal={5}
                    width={90}
                >
                    {['Upcoming',"History"].map((item,index) => (
                        <TouchableOpacity 
                            onPress={() => setSelected(item)}
                            key={index}
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
                                selected === 'Upcoming' &&
                                <>
                                {/* {
                                    Platform.OS === "android" ? (
                                        <SearchBox title="Search for Training"/>
                                    ) : (
                                        <SearchBoxIOS title="Search for Training"/>
                                    )
                                } */}
                                {/* <View style={styles.headingContainer}>
                                    <Text style={styles.heading}>Upcoming</Text>
                                </View> */}
                                
                                {
                                    trainings && Array.isArray(trainings) && trainings.length > 0 ? (
                                        <TrainingList data={trainings}/>
                                    ) : (
                                        <Container
                                                        marginTop={8}
                                                    style={{
                                                        //justifyContent : "center",
                                                        alignItems : "center",
                                                        flex:1
                                                    }}
                                                >
                                                    <ImageWrap 
                                                        url={Images.EmptyTraining}
                                                        height={30}
                                                        fit="contain"
                                                    />
                                                <H1
                                                    color={AppColors.black3}
                                                    fontSize={5}
                                                >You have no upcoming</H1>
                                                <H1 color={AppColors.black3}
                                                    fontSize={5}>training.</H1>
                                                    <SizedBox height={2} />
                                                <P color={AppColors.black2}>When you do, they will show up here.</P>
                                                
                                            </Container>
                                    )
                                }
                                </>
                            }
                        </React.Fragment>
                    )
                }


                                    {
                                        selected === "History" ? <React.Fragment>
                                        {
                                                histories && Array.isArray(histories) && histories.length > 0 ? (
                                                    <TrainingList data={histories} opacity={0.5}/>
                                                ) : <Container
                                                        marginTop={8}
                                                    style={{
                                                        //justifyContent : "center",
                                                        alignItems : "center",
                                                        flex:1
                                                    }}
                                                >
                                                    <ImageWrap 
                                                        url={Images.EmptyTraining}
                                                        height={30}
                                                        fit="contain"
                                                    />
                                                <H1
                                                    color={AppColors.black3}
                                                    fontSize={5}
                                                >You have not taken</H1>
                                                <H1 color={AppColors.black3}
                                                    fontSize={5}>any training yet.</H1>
                                                    <SizedBox height={2} />
                                                <P color={AppColors.black2}>When you do, they will show up here.</P>
                                                
                                            </Container>
                                        }
                                    </React.Fragment> : null
                                    }
            </View>
        </ScreenWrapper>
    )
}

