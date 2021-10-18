import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import { categoryIcon1, downIcon, filterIcon, leftIcon, listingIcon } from '../../assets/images'
import { TimeoffModal } from '../../components/ContactModal'
import PersonCard from '../../components/PersonCard'
import PersonListComp from '../../components/PersonListComp'
import ScreenWrapper from '../../components/ScreenWrapper'
import SearchBox from '../../components/SearchBox'
import { TimeoffVertical } from '../../components/Timeoff'
import TrainingList from '../../components/TrainingList'
import { APIFunction, getAPIs } from '../../utills/api'
import AppColors from '../../utills/AppColors'
import CommonStyles from '../../utills/CommonStyles'
import { PageLoader, Reload } from '../../utills/components'
import { celebrations, whosOut } from '../../utills/data/celebrations'
import { persons } from '../../utills/data/persons'
import tasksData from '../../utills/data/tasksData'
import { getData, getTimeOffsFunction, ToastError, ToastSuccess } from '../../utills/Methods'
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
            console.log("Err---",err)
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                  <Text numberOfLines={1} style={styles.screenTitle}>
                    Time Off
                  </Text>
                </View>
            </View>
            <View style={styles.line} />
            {
                loading && tabs && Array.isArray(tabs) && tabs.length === 0 ? (
                    <PageLoader />
                ) : (
                    <View style={styles.mainViewContainer}>
                        <ScrollView
                            nestedScrollEnabled={true}
                            contentContainerStyle={styles.scrollViewContainer}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}>
                            {['Active', 'Available','Request', 'History'].filter(tab=>{
                                return tabs.includes(tab)
                            }).map((item) => (
                            <TouchableOpacity 
                            onPress={() => setSelected(item)}
                            >
                                <Text style={[styles.heading, selected == item && styles.selectedHeading]}>{item}</Text>
                                {selected == item && <View style={styles.animated} />}
                            </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <View style={styles.line2} />
                        {
                            process ? (
                                <Reload />
                            ) : null
                        }
                        {selected === 'Active' &&
                            <>
                                <View style={styles.headingContainer}>
                                    <Text style={styles.heading}>Active and upcoming</Text>
                                </View>
                                <TimeoffVertical
                                    data={'active'}
                                    load={active}
                                />
                            </>
                        }
                        {selected === 'Request' &&
                            <React.Fragment>
                                <View style={styles.headingContainer}>
                                    <Text style={styles.heading}></Text>
                                </View>
                                <TimeoffVertical
                                    data={'request'}
                                    load={requests}
                                />
                            </React.Fragment>
                        }
                        {selected === "History" &&
                            <React.Fragment>
                                <View style={styles.headingContainer}>
                                    <Text style={styles.heading}></Text>
                                </View>
                                <TimeoffVertical
                                    // data={
                                    //     ['balance', 'fewDays', 'balance', 'balance']
                                    // }
                                    data={'fewDays'}
                                    load={history}
                                    setModal={(id)=>{
                                        console.log("id---",id)
                                        setCurrent(id)
                                        setModal(true)
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
                                    setModal={(id)=>{
                                        setCurrent(id)
                                        setModal(true)
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
                hideAndOpen={(msg)=>{
                    setModal(false);
                    ToastError(msg)
                    setTimeout(()=>{
                        setModal(true);
                    },1000)
                }}
            />
        </ScreenWrapper>
    )
}

