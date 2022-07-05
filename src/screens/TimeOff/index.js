import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import { categoryIcon1, downIcon, filterIcon, leftIcon, listingIcon } from '../../assets/images'
import { TimeoffModal, WarningModal } from '../../components/ContactModal'
import PersonCard from '../../components/PersonCard'
import PersonListComp from '../../components/PersonListComp'
import ScreenWrapper from '../../components/ScreenWrapper'
import SearchBox from '../../components/SearchBox'
import { TimeoffVertical } from '../../components/Timeoff'
import TrainingList from '../../components/TrainingList'
import { APIFunction, deleteAPIs, getAPIs } from '../../utills/api'
import AppColors from '../../utills/AppColors'
import CommonStyles from '../../utills/CommonStyles'
import { BackHandler, Container, LottieIcon, PageLoader, Reload, SizedBox } from '../../utills/components'
import { celebrations, whosOut } from '../../utills/data/celebrations'
import { persons } from '../../utills/data/persons'
import tasksData from '../../utills/data/tasksData'
import { getData, getStoredBusiness, getTimeOffsFunction, ToastError, ToastSuccess } from '../../utills/Methods'
import styles from './styles'
//import Emptyjson from '../../assets/lottie/empty.json'








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

    const getTimeOffs = async () => {
        try{
            setLoading(true);
            setProcess(true);
            let res = await getTimeOffsFunction();
            setHistory(res.history)
            setAvailable(res.available)
            setTabs(res.tabs);
            setActive(res.active);
            setRequests(res.requests);
            setLoading(false);
            setProcess(false)
        }catch(err){
            let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : "Something went wrong. Please retry"
            ToastError(msg)
        }
      }
      useFocusEffect(
          React.useCallback(()=>{
            getTimeOffs()
          },[])
      )
    return (
        <ScreenWrapper scrollEnabled={true}>
            <View style={styles.header}>
                <BackHandler />
                <Text numberOfLines={1} style={styles.screenTitle}>
                    Time Off
                </Text>
            </View>
            <View style={styles.line} />
            {
                loading && tabs && Array.isArray(tabs) && tabs.length === 0 ? (
                    <PageLoader />
                ) : (
                    <View style={{...styles.mainViewContainer,height : tabs && Array.isArray(tabs) && tabs.length > 0 ? null : height(60)}}>
                        {
                            tabs.length > 0 && <ScrollView
                            nestedScrollEnabled={true}
                            contentContainerStyle={styles.scrollViewContainer}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}>
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
                        </ScrollView>
                        }
                        {
                            tabs && Array.isArray(tabs) && tabs.length > 0 && <View style={styles.line2} />
                        }
                        {
                            process ? (
                                <Reload />
                            ) : null
                        }
                        {/* {
                            tabs && Array.isArray(tabs) && tabs.length === 0 ? (
                                <Container style={{
                                    alignItems : "center"
                                }}>
                                    <LottieIcon 
                                        icon={Emptyjson}
                                    />
                                </Container>
                            ) : null
                        } */}
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
                    </View>
                )
            }
            <TimeoffModal 
                isVisible={modal} 
                onHide={()=>setModal(false)}
                closeAndRefresh={() => {
                    setModal(false)
                    ToastSuccess("Request has been submitted for processing")
                    getTimeOffs();
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

