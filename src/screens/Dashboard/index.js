import { useFocusEffect, useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Modal } from 'react-native-paper';
import WebView from 'react-native-webview';
import { logoIcon, questionMarkIcon, rightIcon } from '../../assets/images';
import AnimatedView from '../../components/AnimatedView';
import AssetsList from '../../components/AssetsList';
import BenifitList from '../../components/BenifitList';
import { ReportModal, RestrictionModal, TimeoffModal, WarningModal } from '../../components/ContactModal';
import ScreenWrapper from '../../components/ScreenWrapper';
import { showFlashMessage } from '../../components/SuccessFlash';
import TasksList from '../../components/TasksList';
import Timeoff from '../../components/Timeoff';
import Todo from '../../components/Todo';
import { APIFunction, getAPIs,deleteAPIs } from '../../utills/api';
import AppColors, { ColorList } from '../../utills/AppColors';
import { ClockINContainer, Container, CustomWebView, H1, ImageWrap, P, PageLoader, Reload, Rounded, SizedBox, TouchWrap } from '../../utills/components';
import tasksData from '../../utills/data/tasksData';
import { smallListUnCompleteTodo } from '../../utills/data/todoData';
import { Capitalize, getData, getGreetingTime, getStoredBusiness, getTimeOffsFunction, ToastError, ToastSuccess } from '../../utills/Methods';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../../component2/image/Image';
import { setLoaderVisible } from '../../Redux/Actions/Config';
import GetLocation from 'react-native-get-location';
import LocationEnabler from 'react-native-location-enabler';



export default function Dashboard({navigation: {navigate, toggleDrawer}}) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
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
  const [remote,setRemote] = React.useState(null)
  const [training,setTraining] = React.useState(null)
  const [tab,setTab] = React.useState("Leave")
  const [fetching,setFetching] = React.useState(false)
  const [web,setWeb] = React.useState(false)
  const [web_url,setWebUrl] = React.useState(null)
  const [report,setReport] = React.useState(false)
  const [asset,setAsset] = React.useState(null)
  const [tasks,setTasks] = React.useState([])
  const [task,setTask]  = React.useState(null)
  const auth = useSelector(state=>state.Auth)
  const [processing,setProcessing] = React.useState(false)
  const [visible,setVisible] = React.useState(false)

  const goToWeb = (url) => {
    setWebUrl(url)
    setWeb(true)
  }

  const getWhosOut = async (param) => {
    try{
      let about = await getStoredBusiness();
      let category = param == "Remote Work" ? "work_from_home" : "timeoff";
      setTab(param)
      setFetching(true)
      let whos_url = APIFunction.whos_out(about.business_id,category)
      let res = await getAPIs(whos_url)
      if(param === "Remote Work"){
        res && res.results && Array.isArray(res.results) ? setRemote(res.results) : setRemote([])
      }
      if(param === "Leave"){
        res && res.results && Array.isArray(res.results) ? setWhosOut(res.results) : setWhosOut([])
      }
      if(param === "Training"){
        setTraining([])
        //res && res.results && Array.isArray(res.results) ? setTraining(res.results) : setTraining([])
      }
      setFetching(false)
    }catch(err){
      ToastError(err.msg)
    }
  }

  const markAsCompleted = async () =>{
    try{
      let about = await getData("about_me")
      setProcessing(true)
      await APIFunction.toggle_completed(about.id,task.id,{is_completed : !task.is_completed})
      let arr = [...tasks].filter(item=> item.id !== task.id)
      setProcessing(false)
      setShow(false)
      setTasks([...arr])
      showFlashMessage({title : "Marked as done"})
    }catch(err){
      showFlashMessage({title : "Marked as done",type : "error"})
    }
  }

  const openWarningModal = (data) => {
    try{
      setTask(data)
      setText(`Are you sure you have completed "${data?.title}"?`)
      setShow(true)
    }catch(err){
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

  const setButtons = (i) => {
    setIndex(i);
    var margin = i * 30;
    if (margin == 0) margin = 0.1;
    setMargin(width(margin));
  };
  const closeWeb = () => {
    setWeb(false)
  }
  const getInfo = async () => {
    try{
      dispatch(setLoaderVisible(true));
      setProcess(true);
      setFetching(true)
      let token = await getData("token");
      let user =  await getData("user");
      let about_me = await getData("about_me");
      let biz = await getStoredBusiness();
      let assets_url = APIFunction.my_business_assests(biz.business_id,about_me.id);
      let benefits_url = APIFunction.benefits(biz.business_id,about_me.id);
      let whos_out_url = APIFunction.whos_out(biz.business_id)
      let active_birthdays_url = APIFunction.birthdays(biz.business_id,"active");
      let upcoming_birthdays_url = APIFunction.birthdays(biz.business_id,"upcoming");
      let ann_url = APIFunction.job_anniversary("active",biz.business_id);
      let asset_res = await getAPIs(assets_url,token);
      let benefits_res = await getAPIs(benefits_url,token)
      let whos_out_res = await getAPIs(whos_out_url,token)
      let upcoming_res = await getAPIs(upcoming_birthdays_url,token);
      let active_res = await getAPIs(active_birthdays_url,token);
      let active_ann = await getAPIs(ann_url,token);
      let task_res = await APIFunction.employee_tasks(about_me.id);
      task_res && task_res.results && Array.isArray(task_res.results) ? setTasks(task_res.results) : setTasks([])
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
      var margin = 30;
      setMargin(width(margin));
      setIndex(1)
      if(res.active.length === 0){
        var margin = 30;
        setMargin(width(margin));
        setIndex(1)
      }else{
        setIndex(0)
        setMargin(width(0.1))
      }
      setFetching(false)
      setLoading(false);
      setProcess(false);
      dispatch(setLoaderVisible(false));
    }catch(err){
      // let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : "Something went wrong. Please retry"
      // ToastError(msg)
    }
  }
  const openReport = (item) => {
    try{
      setReport(true)
      setAsset(item)
    }catch(err){
      ToastError(err.msg)
    }
  }

  const {
    PRIORITIES: { HIGH_ACCURACY },
    addListener,
    checkSettings,
    requestResolutionSettings,
    useLocationSettings
  } = LocationEnabler
  
  const [enabled, requestResolution] = useLocationSettings({
    priority: HIGH_ACCURACY, // optional: default BALANCED_POWER_ACCURACY
    alwaysShow: true, // optional: default false
    needBle: true, // optional: default false
  });

  // useEffect(()=>{
  //   restrictionCheck()
  // },[config,status])

  // useEffect(()=>{
  //   listener = addListener(({ locationEnabled }) => {
  //     restrictionCheck()
  //   })
  //   return () => {
  //     listener.remove();
  //   }
  // },[later])

  useEffect(()=>{
    getInfo()
  },[])

  return (
    <ScreenWrapper scrollEnabled={false}
      statusBarColor={AppColors.lightGreen}
    >
      {
                                web ? <CustomWebView show={web} setShow={closeWeb} web_url={web_url}/> : (
                                        <React.Fragment>
                                                  <Container
        backgroundColor={AppColors.lightGreen}
      >
      <View style={styles.header}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => toggleDrawer()}>
            {
              business && business.logo ? (
                <Image resizeMode="contain" source={{uri : business.logo}} style={styles.logo} />
              ) : (
                <Rounded  size={10} backgroundColor={ColorList[Math.floor(Math.random()*4)]}>
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
        {
          process ? (
          <ActivityIndicator 
            size={10}
            color={AppColors.green}
          />
          ) : null
        }
        <TouchableOpacity
          onPress={()=>{
            navigate("Notifications")
          }}
        >
             <React.Fragment>
               {
                  auth && auth.notifications > 0 ? <Container
                 position="absolute"
                 backgroundColor={"transparent"}
                 style={{
                   top : 5,
                   left : 5,
                   zIndex : 10
                 }}
               >
                 <Rounded size={4} 
                    backgroundColor={AppColors.pink}

                 ></Rounded>
               </Container> : null
               }
                <ImageWrap 
                  url={Images.BellIcon}
                  height={5}
                  fit={"contain"}
                  width={5}
                />
             </React.Fragment>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      </Container>
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
                 <ScrollView
                  horizontal={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={false}
                      onRefresh={getInfo}
                    />
                  }
                 >
                             <React.Fragment>

                               <ClockINContainer setVisible={setVisible} />
                
                {
                  tasks && Array.isArray(tasks) && tasks.length >  0 ? 
                  (
                    <View style={styles.toDoContainer}>
                      <View style={styles.row1}>
                      <Text numberOfLines={1} style={styles.text3}>
                        Tasks
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          navigate("Todos")
                        }}
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
                    <Todo data={[...tasks].splice(0,2)} 
                      openWarningModal={openWarningModal}
                    />
                  </View>
                  ) : null
                }
                <Container marginTop={tasks && Array.isArray(tasks) && tasks.length > 1 ? 2 : 0}>
                  <Text numberOfLines={1} style={styles.timeOffText}>
                    Time Off
                  </Text>
                </Container>
                <View style={styles.threeButtonCont}>
                  {
                    ['Active', 'Available','Requests'].map((item,i)=>(
                      <TouchableOpacity
                        onPress={() =>setButtons(i)}
                        style={styles.button}
                        activeOpacity={0.8}
                        key={i}
                      >
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
                          <AssetsList data={assets} 
                            onPressHandler={openReport}
                          />
                        </View>
                      </React.Fragment>
                  ) : null
                }
                {
                  benefits && Array.isArray(benefits) && benefits.length > 0 ? (
                    <React.Fragment>
                      <Text style={styles.heading}>Benefit</Text>
                      <BenifitList 
                        data={['#C2D4FF', '#99E6FF']} 
                        horizontal={benefits.length === 1 ? false : true}
                        benefits={benefits}
                        goToWeb={goToWeb}
                      />
                    </React.Fragment>
                  ) : null
                }

                {/* <Text style={[styles.heading, {marginTop: 0}]}>Who's Out</Text> */}
                <TasksList data={tasksData} 
                  whos_out={tab === "Leave" ? whos_out : tab === "Remote Work" ? remote  : tab === "Training"  ? training : []}
                  birthdays={active_birthdays}
                  upcoming_birthdays={upcoming_birthdays}
                  anniversary={anniversary}
                  tab={tab}
                  navigate={navigate}
                  getWhosOut={getWhosOut}
                  fetch={fetching}
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
            />  
            <WarningModal 
              isVisible={show}
              onHide={()=>{
                setCancel(false)
                setProcessing(false)
                setShow(false)
              }}
              question={text}
              performAction={["Are you sure you want to end this leave?","Are you sure you want to cancel this request?"].includes(text) ? cancelRequest : markAsCompleted}
              loading={cancel || processing}
              btnText={["Are you sure you want to end this leave?","Are you sure you want to cancel this request?"].includes(text) ? "Cancel Request" : "Mark as Completed"}
            />

            <ReportModal
              isVisible={report}
              onHide={()=>{
                setReport(false)
                setAsset(null)
              }}
              asset={asset}
              btnText={"Submit Report"}
            />
            
            <RestrictionModal isVisible={visible} onHide={()=>setVisible()} onPressHandler={requestResolution}/>
                                        </React.Fragment>
                                )
                              }
      
    </ScreenWrapper>
  );
}



