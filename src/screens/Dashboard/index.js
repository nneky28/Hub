import { useFocusEffect, useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, Text, TouchableOpacity, View, Platform, Linking } from 'react-native';
import { height, width } from 'react-native-dimension';
import { ScrollView } from 'react-native-gesture-handler';
import { rightIcon } from '../../assets/images';
import AnimatedView from '../../components/AnimatedView';
import AssetsList from '../../components/AssetsList';
import BenifitList from '../../components/BenifitList';
import { ReportModal, RestrictionModal, TimeoffModal, WarningModal } from '../../components/ContactModal';
import ScreenWrapper from '../../components/ScreenWrapper';
import { showFlashMessage } from '../../components/SuccessFlash';
import TasksList from '../../components/TasksList';
import Timeoff from '../../components/Timeoff';
import Todo from '../../components/Todo';
import { APIFunction, deleteAPIs, useFetchAssets, useFetchBenefits, useFetchWhosOut, useFetchBirthdays, useFetchAnniversary, useFetchTasks, useFetchEmployeeTimeOff, useFetchEmployeeTimeOffTaken, useFetchEmployeeTimeOffReqs } from '../../utills/api';
import AppColors, { ColorList } from '../../utills/AppColors';
import { ClockINContainer, Container, CustomWebView, H1, ImageWrap, P, PageLoader, Reload, Rounded, SizedBox, TouchWrap } from '../../utills/components';
import tasksData from '../../utills/data/tasksData';
import { Capitalize, getData, getGreetingTime, getStoredBusiness, getTimeOffsFunction, ToastError, ToastSuccess } from '../../utills/Methods';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../../component2/image/Image';
import { setLoaderVisible } from '../../Redux/Actions/Config';
import { useQueryClient } from 'react-query';
const LocationEnabler = Platform.OS === "android" ? require('react-native-location-enabler') : {};



export default function Dashboard({ navigation: { navigate, toggleDrawer } }) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const [margin, setMargin] = useState(0.1);
  const [index, setIndex] = useState(0);
  const [business, setBusiness] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [available, setAvailable] = React.useState([]);
  const [active, setActive] = React.useState([]);
  const [requests, setRequests] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [current, setCurrent] = useState(null);
  const [show, setShow] = useState(false);
  const [del, setDelete] = useState(null);
  const [cancel, setCancel] = useState(false);
  const [text, setText] = useState("");
  const [tab, setTab] = React.useState("Leave")
  const [web, setWeb] = React.useState(false)
  const [web_url, setWebUrl] = React.useState(null)
  const [report, setReport] = React.useState(false)
  const [asset, setAsset] = React.useState(null)
  const [tasks, setTasks] = React.useState([])
  const [task, setTask] = React.useState(null)
  const auth = useSelector(state => state.Auth)
  const [processing, setProcessing] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  const [employee_pk, setEmployeePK] = React.useState(null)
  const [category, setCategory] = React.useState("timeoff")
  const isSecurityVisible = useSelector(state=>state.Config.isSecurityVisible)

  const {
    data: activeBD,
    isLoading: activeBDLoading
  } = useFetchBirthdays("active")

  const {
    data: activeANN,
    isLoading: activeANNLoading
  } = useFetchAnniversary("active")

  const {
    data: outData,
    isLoading: whosoutLoading
  } = useFetchWhosOut(category)

  const {
    data: upcomingBD,
    isLoading: upcomingBDLoading
  } = useFetchBirthdays("upcoming")

  const {
    data: assets,
    isLoading: assetLoading
  } = useFetchAssets(employee_pk)

  const {
    data: benefits,
    isLoading: benefitLoading
  } = useFetchBenefits(employee_pk)

  const {
    data : timeoffData,
    isLoading : loadingTimeoff
  } = useFetchEmployeeTimeOff(employee_pk)

  const {
    data : activeData,
    isLoading : loadingActive
  } = useFetchEmployeeTimeOffTaken(employee_pk,"active")

  const {
    data : upcomingData,
    isLoading : loadingUpcoming
  } = useFetchEmployeeTimeOffTaken(employee_pk,"upcoming")

  const {
    data : historyData,
    isLoading : loadingHistory
  } = useFetchEmployeeTimeOffTaken(employee_pk,"history")

  const {
    data : reqData,
    isLoading : loadingReq
  } = useFetchEmployeeTimeOffReqs(employee_pk)

  const {
    data: taskData,
    isLoading: taskLoading
  } = useFetchTasks(employee_pk)

  const mapDataToState = () => {
    if (taskLoading && taskData?.results && Array.isArray(taskData?.results)) {
      setTasks(taskData?.results)
    }
  }

  useEffect(() => {
    mapDataToState()
  }, [taskData])

  useEffect(() => {
    if (assetLoading || benefitLoading || activeBDLoading ||
      upcomingBDLoading || activeANNLoading ||
      loadingTimeoff || loadingActive ||
      loadingHistory || loadingReq ||
      loadingUpcoming
      ) {
      dispatch(setLoaderVisible(true))
      return setLoading(true)
    }
    dispatch(setLoaderVisible(false))
    setLoading(false)
  }, [
    assetLoading, benefitLoading, activeBDLoading,
    upcomingBDLoading,
    activeANNLoading, loading,
    loadingTimeoff,loadingActive,
    loadingHistory,loadingReq,
    loadingUpcoming
  ])



  const goToWeb = (url) => {
    setWebUrl(url)
    setWeb(true)
  }

  const getWhosOut = (param) => {
    try {
      if (param === "Training") {
        return setTab(param)
      }
      let categ = param == "Remote Work" ? "work_from_home" : "timeoff";
      setCategory(categ)
      setTab(param)
    } catch (err) {
      ToastError(err.msg)
    }
  }

  const markAsCompleted = async () => {
    try {
      let about = await getData("about_me")
      setProcessing(true)
      await APIFunction.toggle_completed(about.id, task.id, { is_completed: !task.is_completed })
      let arr = [...tasks].filter(item => item.id !== task.id)
      setProcessing(false)
      setShow(false)
      setTasks([...arr])
      showFlashMessage({ title: "Marked as done" })
    } catch (err) {
      showFlashMessage({ title: "Marked as done", type: "error" })
    }
  }

  const openWarningModal = (data) => {
    try {
      setTask(data)
      setText(`Are you sure you have completed "${data?.title}"?`)
      setShow(true)
    } catch (err) {
    }
  }

  const cancelRequest = async () => {
    try {
      setCancel(true)
      let about = await getData("about_me")
      let biz = await getStoredBusiness();
      let cancel_url = APIFunction.delete_timeoff(biz.business_id, about.id, del.id);
      let res = await deleteAPIs(cancel_url);
      let filtered = requests.filter(item => item.id !== del.id);
      setRequests(filtered)
      setShow(false);
      setCancel(false);
      return ToastSuccess("Request has been canceled");
    } catch (err) {
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
  const closeAndRefresh = () => {
    queryClient.invalidateQueries("employee_timeoff")
    queryClient.invalidateQueries("employee_timeoff_taken")
    queryClient.invalidateQueries("employee_timeoff_reqs")
  }

  const getInfo = async () => {
    try {
      let about_me = await getData("about_me");
      setEmployeePK(about_me?.id)
      let biz = await getStoredBusiness();
      setBusiness(biz);
    } catch (err) {

    }
  }

  const refreshDashboard = () => {
    getInfo()
    queryClient.invalidateQueries("")
  }

  const openReport = (item) => {
    try {
      setReport(true)
      setAsset(item)
    } catch (err) {
      ToastError(err.msg)
    }
  }

  const timeoffResponseHandler = () => {

    var margin = 30;
    setMargin(width(margin));
    setIndex(1)
    
    if(timeoffData?.results && Array.isArray(timeoffData?.results)){
      setAvailable(timeoffData?.results)
    }
    if(activeData?.results && Array.isArray(activeData?.results)){
      setActive(activeData?.results)
    }
    if(reqData?.results && Array.isArray(reqData?.results)){
      setRequests(reqData?.results)
    }

    if (activeData?.results && Array.isArray(activeData?.results) && activeData?.results.length > 0) {
      setIndex(0)
      setMargin(width(0.1))
    }
  }
  useEffect(()=>{
    timeoffResponseHandler()
  },[timeoffData,activeData,reqData,historyData])

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <ScreenWrapper scrollEnabled={false}
      statusBarColor={AppColors.lightGreen}
    >
      {
        web ? <CustomWebView show={web} setShow={closeWeb} web_url={web_url} /> : (
          <React.Fragment>
            <Container
              backgroundColor={AppColors.lightGreen}
            >
              <View style={styles.header}>
                <View style={styles.row}>
                  <TouchableOpacity onPress={() => toggleDrawer()}>
                    {
                      business && business.logo ? (
                        <Image resizeMode="contain" source={{ uri: business.logo }} style={styles.logo} />
                      ) : (
                        <Rounded size={10} backgroundColor={ColorList[Math.floor(Math.random() * 4)]}>
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
                <TouchableOpacity
                  onPress={() => {
                    navigate("Notifications")
                  }}
                >
                  <React.Fragment>
                    {
                      auth && auth.notifications > 0 ? <Container
                        position="absolute"
                        backgroundColor={"transparent"}
                        style={{
                          top: 5,
                          left: 5,
                          zIndex: 10
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
            {
              loading && !isSecurityVisible ? (
                <PageLoader />
              ) : (
                <ScrollView
                  horizontal={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={false}
                      onRefresh={refreshDashboard}
                    />
                  }
                >
                  <React.Fragment>

                    <ClockINContainer />

                    {
                      tasks && Array.isArray(tasks) && tasks.length > 0 ?
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
                            <Todo data={[...tasks].splice(0, 2)}
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
                        ['Active', 'Available', 'Requests'].map((item, i) => (
                          <TouchableOpacity
                            onPress={() => setButtons(i)}
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
                        showModal={(timeoff_id, item, tab_name) => {
                          if (tab_name == "active") {
                            setText("Are you sure you want to end this leave?")
                            setDelete(item);
                            return setShow(true);
                          }
                          if (tab_name === "request") {
                            setDelete(item);
                            setText("Are you sure you want to cancel this request?")
                            return setShow(true);
                          }

                          if (item && item.max_days_allowed &&
                            item.total_days_taken >= 0 &&
                            item.total_days_taken <
                            item.max_days_allowed) {
                            setCurrent(timeoff_id)
                            return setModal(true)
                          }
                        }}
                      />
                    </View>
                    {
                      assets?.results && Array.isArray(assets?.results) && assets?.results.length > 0 ? (
                        <React.Fragment>
                          <Text style={styles.heading}>
                            Asset
                            {assets?.results && Array.isArray(assets?.results) && assets?.results.length > 1 ? `(${assets?.results.length})` : ""}
                          </Text>
                          <View>
                            <AssetsList data={assets?.results}
                              onPressHandler={openReport}
                            />
                          </View>
                        </React.Fragment>
                      ) : null
                    }
                    {
                      benefits?.results && Array.isArray(benefits?.results) && benefits?.results.length > 0 ? (
                        <React.Fragment>
                          <Text style={styles.heading}>Benefit</Text>
                          <BenifitList
                            data={['#C2D4FF', '#99E6FF']}
                            horizontal={benefits?.results.length === 1 ? false : true}
                            benefits={benefits?.results}
                            goToWeb={goToWeb}
                          />
                        </React.Fragment>
                      ) : null
                    }
                    <TasksList data={tasksData}
                      whos_out={tab !== "Training" && outData?.results && Array.isArray(outData?.results) ? outData?.results : []}
                      birthdays={activeBD?.results && Array.isArray(activeBD?.results) ? activeBD?.results : []}
                      upcoming_birthdays={upcomingBD?.results && Array.isArray(upcomingBD?.results) ? upcomingBD?.results : []}
                      anniversary={activeANN?.results && Array.isArray(activeANN?.results) ? activeANN?.results : []}
                      tab={tab}
                      navigate={navigate}
                      getWhosOut={getWhosOut}
                      fetch={whosoutLoading}
                    />
                  </React.Fragment>
                </ScrollView>
              )
            }
            <TimeoffModal
              isVisible={modal}
              onHide={() => setModal(false)}
              closeAndRefresh={closeAndRefresh}
              timeoff_id={current} active={active}
            />
            <WarningModal
              isVisible={show}
              onHide={() => {
                setCancel(false)
                setProcessing(false)
                setShow(false)
              }}
              question={text}
              performAction={["Are you sure you want to end this leave?", "Are you sure you want to cancel this request?"].includes(text) ? cancelRequest : markAsCompleted}
              loading={cancel || processing}
              btnText={["Are you sure you want to end this leave?", "Are you sure you want to cancel this request?"].includes(text) ? "Cancel Request" : "Mark as Completed"}
            />

            <ReportModal
              isVisible={report}
              onHide={() => {
                setReport(false)
                setAsset(null)
              }}
              asset={asset}
              btnText={"Submit Report"}
            />
          </React.Fragment>
        )
      }

    </ScreenWrapper>
  );
}



