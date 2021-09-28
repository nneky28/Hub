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
import { PageLoader } from '../../utills/components'
import { celebrations, whosOut } from '../../utills/data/celebrations'
import { persons } from '../../utills/data/persons'
import tasksData from '../../utills/data/tasksData'
import { getData, ToastError } from '../../utills/Methods'
import styles from './styles'








export default function TimeOff({navigation}) {
    
    var [selected, setSelected] = useState('Active');
    const [requests,setRequests] = useState(null);
    const [available,setAvailable] = useState(null);
    const [active,setActive] = useState(null);
    const [history,setHistory] = useState(null);
    const [tabs,setTabs] = useState([]);
    const [loading,setLoading] = useState(true);
    const [modal,setModal] = useState(false);
    const [current,setCurrent] = useState(null);
    const getTimeOffs = async () => {
        try{
           setLoading(true);
           let token = await getData("token");
           let user =  await getData("user");
           let about_me = await getData("about_me")
           let biz = user.employee_user_memberships &&
           Array.isArray(user.employee_user_memberships) && user.employee_user_memberships[0]
           && user.employee_user_memberships[0].business_id ? user.employee_user_memberships[0] : null;
           let timeoff_url = APIFunction.timeoff(biz.business_id,about_me.id);
           let active_url = APIFunction.timeoff_taken(biz.business_id,about_me.id,"active");
           let upcoming_url = APIFunction.timeoff_taken(biz.business_id,about_me.id,"upcoming");
           let hist_url = APIFunction.timeoff_taken(biz.business_id,about_me.id,"history")
           let req_url  = APIFunction.timeoff_reqs(biz.business_id,about_me.id);

           let timeoff_res = await getAPIs(timeoff_url,token);
           let active_res = await getAPIs(active_url,token);
           let upcoming_res = await getAPIs(upcoming_url,token);
           let hist_res = await getAPIs(hist_url,token);
           let req_res = await getAPIs(req_url,token);

           console.log("timeoff_res",timeoff_res)
           console.log("active_res",active_res)
           console.log("upcoming_res",upcoming_res)
           console.log("hist_res",hist_res)
           console.log("req_res",req_res)


           let tabs = [];
            if(
                timeoff_res && timeoff_res.results && 
                Array.isArray(timeoff_res.results) &&
                timeoff_res.results.length > 0
            ){
                tabs.push("Available")
                setAvailable(timeoff_res.results)
            }
            let active = []
            if(
                active_res && active_res.results && 
                Array.isArray(active_res.results) &&
                active_res.results.length > 0
            ){
                tabs.push("Active")
                active = [...active,...active_res.results];
            }
            if(
                upcoming_res && upcoming_res.results && 
                Array.isArray(upcoming_res.results) &&
                upcoming_res.results.length > 0
            ){
                !tabs.includes("Active") ? tabs.push("Active") : null
                active = [...active,...upcoming_res.results];
            }
            if(
                hist_res && hist_res.results && 
                Array.isArray(hist_res.results) &&
                hist_res.results.length > 0
            ){
                tabs.push("History")
                setHistory(hist_res.results)
            }
            if(
                req_res && req_res.results && 
                Array.isArray(req_res.results) &&
                req_res.results.length > 0
            ){
                tabs.push("Request")
                setRequests(requests)
            }
            console.log("Tabs---",tabs)
            setActive(active);
            setTabs(tabs)
            setLoading(false);
        }catch(err){
            console.log("Err---",err)
            let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : "Something went wrong. Please retry"
            ToastError(msg)
        }
      }
       useEffect(() => {
         getTimeOffs();
       },[])
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
                loading ? (
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
                                    data={'balance'}
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
                                        console.log("id---",id)
                                        setCurrent(id)
                                        setModal(true)
                                    }}
                                />
                            </React.Fragment>
                        }
                    </View>
                )
            }
            <TimeoffModal isVisible={modal} onHide={() => setModal(false)} timeoff_id={current}/>
        </ScreenWrapper>
    )
}

