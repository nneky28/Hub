import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import { useQueryClient } from 'react-query'
import { categoryIcon1, downIcon, filterIcon, leftIcon, listingIcon } from '../../assets/images'
import { TimeoffModal, WarningModal } from '../../components/ContactModal'
import PersonCard from '../../components/PersonCard'
import PersonListComp from '../../components/PersonListComp'
import ScreenWrapper from '../../components/ScreenWrapper'
import SearchBox from '../../components/SearchBox'
import { TimeoffVertical } from '../../components/Timeoff'
import TrainingList from '../../components/TrainingList'
import { APIFunction, deleteAPIs, getAPIs, useFetchEmployeeTimeOff, useFetchEmployeeTimeOffReqs, useFetchEmployeeTimeOffTaken } from '../../utills/api'
import AppColors from '../../utills/AppColors'
import CommonStyles from '../../utills/CommonStyles'
import { BackHandler, Container, CustomRefreshControl, LottieIcon, PageLoader, Reload, SizedBox } from '../../utills/components'
import { celebrations, whosOut } from '../../utills/data/celebrations'
import { persons } from '../../utills/data/persons'
import tasksData from '../../utills/data/tasksData'
import { getData, getStoredBusiness, ToastError, ToastSuccess } from '../../utills/Methods'
import styles from './styles'


export default function TimeOff({navigation}) {
    
    var [selected, setSelected] = useState('Available');
    const [requests,setRequests] = useState(null);
    const [available,setAvailable] = useState(null);
    const [active,setActive] = useState(null);
    const [history,setHistory] = useState(null);
    const [tabs,setTabs] = useState([]);
    const [loading,setLoading] = useState(true);
    const [modal,setModal] = useState(false);
    const [current,setCurrent] = useState(null);
    const [process,setProcess] = useState(true)
    const [show,setShow] = useState(false);
    const [del,setDelete] = useState(null);
    const [cancel,setCancel] =  useState(false);
    const [text,setText] = useState("");
    const [employee_pk, setEmployeePK] = React.useState(null)
    const queryClient = useQueryClient()

    const {
        data : timeoffData,
        isFetching : fetchingTimeoff
      } = useFetchEmployeeTimeOff(employee_pk)
    
      const {
        data : activeData,
        isFetching : fetchingActive
      } = useFetchEmployeeTimeOffTaken(employee_pk,"active")
    
      const {
        data : upcomingData,
        isFetching : fetchingUpcoming
      } = useFetchEmployeeTimeOffTaken(employee_pk,"upcoming")
    
      const {
        data : historyData,
        isFetching : fetchingHistory
      } = useFetchEmployeeTimeOffTaken(employee_pk,"history")
    
      const {
        data : reqData,
        isFetching : fetchingReq
      } = useFetchEmployeeTimeOffReqs(employee_pk)

    const getUserInfo = async () => {
        try {
            let about_me = await getData("about_me");
            setEmployeePK(about_me?.id)
        } catch (err) {

        }
    }

    const cancelRequest = async () => {
        try{
          setCancel(true)
          let about = await getData("about_me")
          let biz = await getStoredBusiness();
          let cancel_url = APIFunction.delete_timeoff(biz.business_id,about.id,del.id);
          let res = await deleteAPIs(cancel_url);
          let filtered = requests.filter(item=>item.id !== del.id);
          setRequests(filtered);
          setShow(false);
          setCancel(false);
          return ToastSuccess("Request has been canceled");
        }catch(err){
          setCancel(false);
          setShow(false);
          ToastError(err.msg)
        }
      }

    const mapArrToState = async () => {
        let menu = []
        let active_arr = []
        if(timeoffData?.results && Array.isArray(timeoffData?.results)){
            setAvailable(timeoffData?.results)
            menu.push("Available")
        }
        if(activeData?.results && Array.isArray(activeData?.results)){
            active_arr = [...active_arr,...activeData?.results]
            menu.push("Active")
        }
        if(upcomingData?.results && Array.isArray(upcomingData?.results)){
            active_arr = [...active_arr,...upcomingData?.results]
            !menu.includes("Active") ?  menu.push("Active") : null
        }
        if(reqData?.results && Array.isArray(reqData?.results)){
            setRequests(reqData?.results)
            menu.push("Requests")
        }
        if(historyData?.results && Array.isArray(historyData?.results)){
            setHistory(history?.results)
            menu.push("History")
        }
        setTabs(menu)
        setActive(active_arr)
    }

    const refreshHandler = () => {
        queryClient.invalidateQueries("employee_timeoff")
        queryClient.invalidateQueries("employee_timeoff_taken")
        queryClient.invalidateQueries("employee_timeoff_reqs")
    }

    useEffect(()=>{
        getUserInfo()
    },[])

    React.useEffect(()=>{
        mapArrToState()
    },[historyData,upcomingData,reqData,activeData,timeoffData])

    return (
        <ScreenWrapper scrollEnabled={false}>
            <View style={styles.header}>
                <BackHandler />
                <Text numberOfLines={1} style={styles.screenTitle}>
                    Time Off
                </Text>
            </View>
            <View style={styles.line} />
            {
                    (
                        fetchingActive || fetchingHistory
                        || fetchingReq || fetchingUpcoming || fetchingTimeoff   
                    ) ? (
                        <PageLoader />
                    ) : (
                        <View
                            style={styles.mainViewContainer}
                        >
                            {
                                tabs.length > 0 && <Container
                                    style={styles.scrollViewContainer}
                                >
                                {['Active', 'Available','Requests', 'History'].filter(tab=>{
                                    return tabs.includes(tab)
                                }).map((item,index) => (
                                <TouchableOpacity 
                                onPress={() => setSelected(item)}
                                key={index}
                                >
                                    <Text style={[styles.heading, selected == item && styles.selectedHeading]}>{item}</Text>
                                    {selected == item && <View style={styles.animated} />}
                                </TouchableOpacity>
                                ))}
                            </Container>
                            }
                            {
                                tabs && Array.isArray(tabs) && tabs.length > 0 && <View style={styles.line2} />
                            }
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                refreshControl={<CustomRefreshControl 
                                    onRefresh={refreshHandler}
                                    loading={fetchingActive}
                                />}
                            >

                                            {selected === 'Active' &&
                                                <>
                                                    <SizedBox height={2} />
                                                    <View style={styles.headingContainer}>
                                                        <Text style={styles.heading}>Active and upcoming</Text>
                                                    </View>
                                                    <SizedBox height={2} />
                                                    <TimeoffVertical
                                                        tab={"active"}
                                                        data={'active'}
                                                        load={active}
                                                        setModal={(item)=>{
                                                            setText("Are you sure you want to end this leave?")
                                                            setDelete(item);
                                                            return setShow(true);
                                                        }}
                                                    />
                                                </>
                                            }
                                            {selected === 'Requests' &&
                                                <React.Fragment>
                                                    <View style={styles.headingContainer}>
                                                        <Text style={styles.heading}></Text>
                                                    </View>
                                                    <TimeoffVertical
                                                        tab={"request"}
                                                        data={'request'}
                                                        load={requests}
                                                        setModal={(item)=>{
                                                            setDelete(item);
                                                            setText("Are you sure you want to cancel this request?")
                                                            return setShow(true);
                                                        }}
                                                    />
                                                </React.Fragment>
                                            }
                                            {selected === "History" &&
                                                <React.Fragment>
                                                    <View style={styles.headingContainer}>
                                                        <Text style={styles.heading}></Text>
                                                    </View>
                                                    <TimeoffVertical
                                                        tab={"history"}
                                                        data={'fewDays'}
                                                        load={history}
                                                        setModal={(id)=>{
                                                            // setCurrent(id)
                                                            // setModal(true)
                                                        }}
                                                    />
                                                </React.Fragment>
                                            }
                                            {selected === "Available" &&
                                                <React.Fragment>
                                                    <View style={styles.headingContainer}>
                                                        <Text style={styles.heading}></Text>
                                                    </View>
                                                    <TimeoffVertical
                                                        data={'balance'}
                                                        load={available}
                                                        tab={"active"}
                                                        setModal={(id,item)=>{
                                                            if(
                                                                item && item.max_days_allowed && 
                                                                item.total_days_taken >= 0 && 
                                                                item.total_days_taken < 
                                                                item.max_days_allowed
                                                            ){
                                                                setCurrent(id)
                                                                setModal(true)
                                                            }
                                                        }}
                                                    />
                                                </React.Fragment>
                                            }
                            </ScrollView>
                        </View>
                    )
                }
            <TimeoffModal 
                isVisible={modal} 
                onHide={()=>setModal(false)}
                closeAndRefresh={() => {
                    setModal(false)
                    ToastSuccess("Request has been submitted for processing")
                    refreshHandler();
                }} 
                timeoff_id={current} active={active}
            />
            <WarningModal 
              isVisible={show}
              onHide={()=>{
                setShow(false)
              }}
              question={text}
              performAction={cancelRequest}
              loading={cancel}
            />
        </ScreenWrapper>
    )
}

