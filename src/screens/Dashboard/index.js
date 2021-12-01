import { useFocusEffect } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { width } from 'react-native-dimension';
import { ScrollView } from 'react-native-gesture-handler';
import { logoIcon, questionMarkIcon, rightIcon } from '../../assets/images';
import AnimatedView from '../../components/AnimatedView';
import AssetsList from '../../components/AssetsList';
import BenifitList from '../../components/BenifitList';
import { TimeoffModal, WarningModal } from '../../components/ContactModal';
import ScreenWrapper from '../../components/ScreenWrapper';
import TasksList from '../../components/TasksList';
import Timeoff from '../../components/Timeoff';
import Todo from '../../components/Todo';
import { APIFunction, getAPIs,deleteAPIs } from '../../utills/api';
import AppColors, { ColorList } from '../../utills/AppColors';
import { Container, H1, P, PageLoader, Reload, Rounded } from '../../utills/components';
import tasksData from '../../utills/data/tasksData';
import { smallListUnCompleteTodo } from '../../utills/data/todoData';
import { Capitalize, getData, getGreetingTime, getStoredBusiness, getTimeOffsFunction, ToastError, ToastSuccess } from '../../utills/Methods';
import styles from './styles';
export default function Dashboard({navigation: {navigate, toggleDrawer}}) {
  const [margin, setMargin] = useState(0.1);
  const [index, setIndex] = useState(0);
  const [user,setUser] = React.useState(null);
  const [bizs,setBiz] = React.useState(null);
  const [about,setAbout] = React.useState(null);
  const [business,setBusiness] = React.useState(null);
  const [loading,setLoading] = React.useState(true);
  const [assets,setAssets] = React.useState(null)
  const [benefits,setBenefits] = React.useState(null)
  const [whos_out,setWhosOut] = React.useState(null)
  const [active_birthdays,setActiveBirthDay] = React.useState(null)
  const [upcoming_birthdays,setUpcomingBirthDay] = React.useState(null)
  const [process,setProcess] = React.useState(true)
  const [available,setAvailable] = React.useState([]);
  const [tabs,setTabs] = React.useState([]);
  const [active,setActive] = React.useState([]);
  const [requests,setRequests] = React.useState([]);
  const [modal,setModal] = React.useState(false);
  const [current,setCurrent] = useState(null);
  const [show,setShow] = useState(false);
  const [del,setDelete] = useState(null);
  const [cancel,setCancel] =  useState(false);
  const [text,setText] = useState("");
  const [anniversary,setAnniversary] = React.useState(null);
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

  const setButtons = (i) => {
    setIndex(i);
    var margin = i * 30;
    if (margin == 0) margin = 0.1;
    setMargin(width(margin));
  };
  const getInfo = async () => {
    try{
      setProcess(true);
      console.log("setProcess---")
      let token = await getData("token");
      let user =  await getData("user");
      let about_me = await getData("about_me");
      let biz = await getStoredBusiness();
      let assets_url = APIFunction.my_business_assests(biz.business_id,about_me.id);
      let benefits_url = APIFunction.benefits(biz.business_id,about_me.id);
      let whos_out_url = APIFunction.whos_out(biz.business_id,about_me.id)
      let active_birthdays_url = APIFunction.birthdays(biz.business_id,"active");
      let upcoming_birthdays_url = APIFunction.birthdays(biz.business_id,"upcoming");
      let ann_url = APIFunction.job_anniversary("active",biz.business_id);
      let asset_res = await getAPIs(assets_url,token);
      let benefits_res = await getAPIs(benefits_url,token)
      let whos_out_res = await getAPIs(whos_out_url,token)
      let upcoming_res = await getAPIs(upcoming_birthdays_url,token);
      let active_res = await getAPIs(active_birthdays_url,token);
      let active_ann = await getAPIs(ann_url,token);
      let res = await getTimeOffsFunction();
      setAvailable(res.available)
      setTabs(res.tabs);
      setActive(res.active);
      setRequests(res.requests);
      setBusiness(biz);
      setAbout(about_me);
      setAssets(asset_res.results)
      setBenefits(benefits_res.results);
      setUpcomingBirthDay(upcoming_res.results);
      setActiveBirthDay(active_res.results);
      setWhosOut(whos_out_res.results)
      setAnniversary(active_ann.results);
      if(res.active.length === 0){
        var margin = 30;
        setMargin(width(margin));
        setIndex(1)
      }else{
        setIndex(0)
        setMargin(width(0.1))
      }
      setLoading(false);
      setProcess(false);
    }catch(err){
      let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : "Something went wrong. Please retry"
      ToastError(msg)
    }
  }
  useFocusEffect(
    React.useCallback(()=>{
      getInfo()
    },[])
  )
  return (
    <ScreenWrapper scrollEnabled={false}>
      <View style={styles.header}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => toggleDrawer()}>
            {
              business && business.logo ? (
                <Image resizeMode="contain" source={{uri : business.logo}} style={styles.logo} />
              ) : (
                <Rounded  size={10} backgroundColor={AppColors.gray}>
                  <H1>
                      {business && business.business_name && business.business_name.length > 0 ? Capitalize([...business.business_name][0]) : ""}
                  </H1>
              </Rounded>
              )
            }
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.text1}>
            {business && business.business_name ? business.business_name : ""}
          </Text>
        </View>
        {/* <TouchableOpacity>
          <Image
            resizeMode="contain"
            source={questionMarkIcon}
            style={styles.logo1}
          />
        </TouchableOpacity> */}
      </View>
      <View style={styles.line} />
      {/*<View style={styles.nameContainer}>
         <Text style={styles.text2}>{getGreetingTime()}</Text> 
        <Text numberOfLines={1} style={styles.text3}>
        {about && about.first_name ? Capitalize(about.first_name) : ""}
        </Text>
      </View>*/}
          {
            loading ? (
              <PageLoader />
            ) : ( 
                 <ScrollView>
                             <React.Fragment>
                   {
                     process ? (
                      <Reload />
                     ) : null
                   }
                <Container
                  marginTop={3}
                  marginBottom={3}
                >
                   <P textAlign="center">Hello.</P>
                   <H1 textAlign="center">Welcome back</H1>
                </Container>
                <View style={styles.toDoContainer}>
                   <View style={styles.row1}>
                    <Text numberOfLines={1} style={styles.text3}>
                      Tasks
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigate('Todos')}
                      style={styles.row}>
                      <Text style={styles.text4}>See all task</Text>
                      <Image
                        resizeMode="contain"
                        source={rightIcon}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View> 
                  <View style={styles.line} />
                  <Todo data={smallListUnCompleteTodo} />
                </View>
                <Text numberOfLines={1} style={styles.timeOffText}>
                  Time Off
                </Text>
                <View style={styles.threeButtonCont}>
                  {
                    ['Active', 'Available','Request'].map((item,i)=>(
                      <TouchableOpacity
                        onPress={() =>setButtons(i)}
                        style={styles.button}
                        activeOpacity={0.8}>
                        <Text style={[styles.buttonText, index == i && styles.buttonText1]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))
                  }
                  <AnimatedView marginLeft={margin} styles={styles.animatedView} />
                </View>
                <View>
                <Timeoff
                    data={
                      index == 0
                        ? active && Array.isArray(active) ? active : []
                        : index == 1
                        ? available && Array.isArray(available) ? available : []
                        : requests && Array.isArray(requests) ? requests : []
                    }
                    tab={index === 0 ? "active" : index === 1 ? "available" : "request"}
                    showModal={(timeoff_id,item,tab_name)=>{
                      if(tab_name == "active"){
                        setText("Are you sure you want to end this leave?")
                        setDelete(item);
                        return setShow(true);
                      }
                      if(tab_name === "request"){
                        setDelete(item);
                        setText("Are you sure you want to cancel this request?")
                        return setShow(true);
                      }
                      
                      if(item && item.max_days_allowed && 
                        item.total_days_taken >= 0 && 
                        item.total_days_taken < 
                        item.max_days_allowed){
                        setCurrent(timeoff_id)
                        return setModal(true)
                      }
                    }}
                  />
                </View>
                {/* <TouchableOpacity
                  onPress={()=>navigate("Time off")}
                >
                  <View style={[styles.row, styles.center]}>
                    <Text style={styles.text4}>See all time off</Text>
                    <Image resizeMode="contain" source={rightIcon} style={styles.icon} />
                  </View>
                </TouchableOpacity> */}
                {
                  assets && Array.isArray(assets) && assets.length > 0 ? (
                      <React.Fragment>
                        <Text style={styles.heading}>
                          Asset
                            {assets && Array.isArray(assets) && assets.length > 1 ? `(${assets.length})` : "" }
                        </Text>
                        <View>
                          <AssetsList data={assets} />
                        </View>
                      </React.Fragment>
                  ) : null
                }
                {
                  benefits && Array.isArray(benefits) && benefits.length > 0 ? (
                    <React.Fragment>
                      <Text style={[styles.heading, {marginTop: 0}]}>Benefit</Text>
                      <BenifitList 
                        data={['#C2D4FF', '#99E6FF']} 
                        horizontal={benefits.length === 1 ? false : true}
                        benefits={benefits}
                      />
                    </React.Fragment>
                  ) : null
                }
                {/* <Text style={[styles.heading, {marginTop: 0}]}>Who's Out</Text> */}
                <TasksList data={tasksData} 
                  whos_out={whos_out}
                  birthdays={active_birthdays}
                  upcoming_birthdays={upcoming_birthdays}
                  anniversary={anniversary}
                  navigate={navigate}
                />
              </React.Fragment>
                 </ScrollView>
            )
          }
              <TimeoffModal 
                isVisible={modal} 
                onHide={()=>setModal(false)}
                closeAndRefresh={() => {
                    setModal(false)
                    ToastSuccess("Request has been submitted for processing")
                   getInfo();
                }} 
                timeoff_id={current} active={active}
                hideAndOpen={(msg)=>{
                    setModal(false);
                    ToastError(msg)
                    setTimeout(()=>{
                        setModal(true);
                    },2500)
                }}
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
  );
}
