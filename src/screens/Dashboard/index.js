import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { width } from 'react-native-dimension';
import { logoIcon, questionMarkIcon, rightIcon } from '../../assets/images';
import AnimatedView from '../../components/AnimatedView';
import AssetsList from '../../components/AssetsList';
import BenifitList from '../../components/BenifitList';
import ScreenWrapper from '../../components/ScreenWrapper';
import TasksList from '../../components/TasksList';
import Timeoff from '../../components/Timeoff';
import Todo from '../../components/Todo';
import { APIFunction, getAPIs } from '../../utills/api';
import { PageLoader } from '../../utills/components';
import tasksData from '../../utills/data/tasksData';
import { smallListUnCompleteTodo } from '../../utills/data/todoData';
import { Capitalize, getData, getGreetingTime, ToastError } from '../../utills/Methods';
import styles from './styles';
export default function Dashboard({navigation: {navigate, toggleDrawer}}) {
  const [margin, setMargin] = useState(0.1);
  const [index, setIndex] = useState(0);
  const [user,setUser] = React.useState(null);
  const [bizs,setBiz] = React.useState(null);
  const [about,setAbout] = React.useState(null);
  const [business,setBusiness] = React.useState(null);
  const [loading,setLoading] = React.useState(true);
  const setButtons = (i) => {
    setIndex(i);
    var margin = i * 30;
    if (margin == 0) margin = 0.1;
    setMargin(width(margin));
  };
  const getInfo = async () => {
    try{
      setLoading(true);
      let token = await getData("token");
      let user =  await getData("user");
      let about_me = await getData("about_me")
      let biz = user.employee_user_memberships &&
      Array.isArray(user.employee_user_memberships) && user.employee_user_memberships[0]
      && user.employee_user_memberships[0].business_id ? user.employee_user_memberships[0] : null;
      let assets_url = APIFunction.my_business_assests(biz.business_id,about_me.id);
      let benefits_url = APIFunction.benefits(biz.business_id,about_me.id);
      let whos_out_url = APIFunction.whos_out(biz.business_id,about_me.id)
      let birthdays_url = APIFunction.whos_out(biz.business_id);
      let asset_res = await getAPIs(assets_url,token);
      let benefits_res = await getAPIs(benefits_url,token)
      let whos_out_res = await getAPIs(whos_out_url,token)
      let birthdays_res = await getAPIs(birthdays_url,token);
      console.log("birthdays_res",birthdays_res)
      setBusiness(biz);
      setAbout(about_me);
      console.log("about----",about_me)
      setLoading(false);
    }catch(err){
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
            {console.log("business---",business,user)}
            {business && business.business_name ? business.business_name : ""}
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            resizeMode="contain"
            source={questionMarkIcon}
            style={styles.logo1}
          />
        </TouchableOpacity>
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
                  <TouchableOpacity
                    onPress={() => setButtons(0)}
                    style={styles.button}
                    activeOpacity={0.8}>
                    <Text style={[styles.buttonText, index == 0 && styles.buttonText1]}>
                      Active
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setButtons(1)}
                    style={styles.button}
                    activeOpacity={0.8}>
                    <Text style={[styles.buttonText, index == 1 && styles.buttonText1]}>
                      Balance
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setButtons(2)}
                    style={styles.button}
                    activeOpacity={0.8}>
                    <Text style={[styles.buttonText, index == 2 && styles.buttonText1]}>
                      Request
                    </Text>
                  </TouchableOpacity>
                  <AnimatedView marginLeft={margin} styles={styles.animatedView} />
                </View>
                {/* <View>
                  <Timeoff
                    data={
                      index == 0
                        ? ['active', 'active']
                        : index == 1
                        ? ['balance', 'balance']
                        : ['request']
                    }
                  />
                </View> */}
                {/* <View style={[styles.row, styles.center]}>
                  <Text style={styles.text4}>See all time off</Text>
                  <Image resizeMode="contain" source={rightIcon} style={styles.icon} />
                </View>
                <Text style={styles.heading}>Asset (2)</Text>
                <View>
                  <AssetsList data={['', '']} />
                </View>
                <Text style={[styles.heading, {marginTop: 0}]}>Benefit</Text>
                <BenifitList data={['#C2D4FF', '#99E6FF']} horizontal={true}/>
                <TasksList data={tasksData} /> */}
                  </React.Fragment>
            )
          }
               
    </ScreenWrapper>
  );
}
