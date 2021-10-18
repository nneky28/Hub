import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { width } from 'react-native-dimension';
import { logoIcon, questionMarkIcon, rightIcon } from '../../assets/images';
import AnimatedView from '../../components/AnimatedView';
import AssetsList from '../../components/AssetsList';
import BenifitList from '../../components/BenifitList';
import { TimeoffModal } from '../../components/ContactModal';
import ScreenWrapper from '../../components/ScreenWrapper';
import TasksList from '../../components/TasksList';
import Timeoff from '../../components/Timeoff';
import Todo from '../../components/Todo';
import { APIFunction, getAPIs } from '../../utills/api';
import { PageLoader, Reload } from '../../utills/components';
import tasksData from '../../utills/data/tasksData';
import { smallListUnCompleteTodo } from '../../utills/data/todoData';
import { Capitalize, getData, getGreetingTime, getTimeOffsFunction, ToastError, ToastSuccess } from '../../utills/Methods';
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

  const setButtons = (i) => {
    setIndex(i);
    var margin = i * 30;
    if (margin == 0) margin = 0.1;
    setMargin(width(margin));
  };
  const getInfo = async () => {
    try{
      setProcess(true);
      let token = await getData("token");
      let user =  await getData("user");
      let about_me = await getData("about_me");
      let biz = user.employee_user_memberships &&
      Array.isArray(user.employee_user_memberships) && user.employee_user_memberships[0]
      && user.employee_user_memberships[0].business_id ? user.employee_user_memberships[0] : null;
      let assets_url = APIFunction.my_business_assests(biz.business_id,about_me.id);
      let benefits_url = APIFunction.benefits(biz.business_id,about_me.id);
      let whos_out_url = APIFunction.whos_out(biz.business_id,about_me.id)
      let active_birthdays_url = APIFunction.birthdays(biz.business_id,"active");
      let upcoming_birthdays_url = APIFunction.birthdays(biz.business_id,"upcoming");
      let asset_res = await getAPIs(assets_url,token);
      let benefits_res = await getAPIs(benefits_url,token)
      let whos_out_res = await getAPIs(whos_out_url,token)
      let upcoming_res = await getAPIs(upcoming_birthdays_url,token);
      let active_res = await getAPIs(active_birthdays_url,token);
      let res = await getTimeOffsFunction();
      setAvailable(res.available)
      setTabs(res.tabs);
      if(res.active.length === 0){
        var margin = 30;
        setMargin(width(margin));
        setIndex(1)
      }else{
        setIndex(0)
        setMargin(width(0.1))
      }
      setActive(res.active);
      setRequests(res.requests);
      setBusiness(biz);
      setAbout(about_me);
      setAssets(asset_res.results)
      setBenefits(benefits_res.results);
      setUpcomingBirthDay(upcoming_res.results);
      setActiveBirthDay(active_res.results);
      setWhosOut(whos_out_res.results)
      setLoading(false);
      setProcess(false);
    }catch(err){
      console.log("Err--",err);
      let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : "Something went wrong. Please retry"
      console.log("err|||",err,msg)
      ToastError(msg)
    }
  }
  useEffect(()=>{
    getInfo()
  },[])
  return (
    <ScreenWrapper scrollEnabled={true}>
      <View style={styles.header}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => toggleDrawer()}>
            <Image resizeMode="contain" source={logoIcon} style={styles.logo} />
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
      <View style={styles.nameContainer}>
        <Text style={styles.text2}>{getGreetingTime()}</Text>
        <Text numberOfLines={1} style={styles.text3}>
        {about && about.first_name ? Capitalize(about.first_name) : ""}
        </Text>
      </View>
          {
            loading ? (
              <PageLoader />
            ) : ( 
                  <React.Fragment>
                   {
                     process ? (
                      <Reload />
                     ) : null
                   }
                                   <View style={styles.toDoContainer}>
                  <View style={styles.row1}>
                    <Text numberOfLines={1} style={styles.text3}>
                      To do
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
                    showModal={(timeoff_id)=>{
                      setCurrent(timeoff_id)
                      return setModal(true)
                    }}
                  />
                </View>
                 <View style={[styles.row, styles.center]}>
                  <Text style={styles.text4}>See all time off</Text>
                  <Image resizeMode="contain" source={rightIcon} style={styles.icon} />
                </View>
                {
                  assets && Array.isArray(assets) && assets.length > 0 ? (
                      <React.Fragment>
                        <Text style={styles.heading}>
                          Asset (
                            {assets && Array.isArray(assets) ? assets.length : 0 }
                          )
                        </Text>
                        <View>
                          <AssetsList data={assets} />
                        </View>
                      </React.Fragment>
                  ) : null
                }
               <Text style={[styles.heading, {marginTop: 0}]}>Benefit</Text>
                <BenifitList data={['#C2D4FF', '#99E6FF']} horizontal={true}
                  benefits={benefits}
                />
                <TasksList data={tasksData} 
                  whos_out={whos_out}
                  birthdays={active_birthdays}
                  upcoming_birthdays={upcoming_birthdays}
                  navigate={navigate}
                />
                  </React.Fragment>
            )
          }
              <TimeoffModal 
                isVisible={modal} 
                onHide={()=>setModal(false)}
                closeAndRefresh={() => {
                    setModal(false)
                    ToastSuccess("Request has been submitted for processing")
                    //getInfo();
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
  );
}
