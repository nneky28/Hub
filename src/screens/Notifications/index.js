import React from 'react'
import { View, Text, Image, FlatList, SectionList, Touchable } from 'react-native'
import { downIcon, leftIcon } from '../../assets/images'
import ScreenWrapper from '../../components/ScreenWrapper'
import { todaysData } from '../../utills/data/notificationsData'
import styles from './styles'
import CommonStyles from '../../utills/CommonStyles';
import { totalSize } from 'react-native-dimension'
import AppColors, { ColorList } from '../../utills/AppColors'
import { getData, getStoredBusiness, ToastError } from '../../utills/Methods'
import { APIFunction, getAPIs } from '../../utills/api';
import { Container, EmptyStateWrapper, H1, P, PageLoader, Reload, Rounded, TouchWrap } from '../../utills/components'
import { useFocusEffect} from '@react-navigation/core'
import {Capitalize} from '../../utills/Methods';
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../Redux/Actions/Auth'
import Swipeable from 'react-native-swipeable';
import Feather from "react-native-vector-icons/Feather"
import { showFlashMessage } from '../../components/SuccessFlash'
import { Images } from '../../component2/image/Image'



export default function Notifications({navigation}) {
    const [notifications,setNotification] = React.useState([]);
    const [loading,setLoading] = React.useState(true);
    const [process,setProcess] = React.useState(true);
    const auth = useSelector(state=>state.Auth);
    const dispatch = useDispatch();
    
    let background  = "pink";
    const load = (item) => {
        background = background === "pink" ? "green" : "pink"
        
        if(item && ["timeoff-request","timeoff-request-approval","timeoff-request-dismissal"].includes(item.type)){
            let title = ""
            if(item.type === "timeoff-request"){
                title = `${item.data && item.data.employee_first_name ? Capitalize(item.data.employee_first_name) : ""} is requesting for a ${item.data && item.data.days ? item.data.days : ""} day(s) ${item.data && item.data.timeoff_policy_title ? Capitalize(item.data.timeoff_policy_title) : ""}`
            }
            if(item.type === "timeoff-request-approval"){
                title = `Your time off request for ${item.data && item.data.timeoff_policy_title ? Capitalize(item.data.timeoff_policy_title) : ""} has been approved.`
            }
            if(item.type === "timeoff-request-dismissal"){
                title = `Your time off request for ${item.data && item.data.timeoff_policy_title ? Capitalize(item.data.timeoff_policy_title) : ""} has been declined.`
            }
            return {
                id : item.id,
                avatar : item &&item.image ? item.image : null,
                subtitle : "",
                title : title,
                icon : require('../../assets/images/icons/list.png'),
                type : item.type,
                date :  item.created_at,
                placeholder : "Success"
            }
        }
        if(item && item.type === "birthday"){
            return {
                id : item.id,
                avatar : item && item.image ? item.image : null,
                subtitle : "",
                title : `Wish ${item && item.data && item.data.employee_first_name ? Capitalize(item.data.employee_first_name) : ""} a happy birthday (${item && item.data.date ? moment(item.data.date).format("MMM DD") : ""})`,
                icon : require('../../assets/images/icons/cake.png'),
                type : "birthday",
                date :  item.created_at,
                background : background,
                placeholder : "Birthday"
            }
        }
        if(item && item.type === "work-anniversary"){
            return {
                id : item.id,
                avatar : item && item.image ? item.image : null,
                subtitle : "",
                title : `Congratulate ${item && item.data && item.data.employee_first_name ? Capitalize(item.data.employee_first_name) : ""} for ${item.data && item.data.years ? item.data.years : 0} year work anniversary`,
                icon : require('../../assets/images/icons/document2.png'),
                type : "work-anniversary",
                date :  item.created_at,
                background : background,
                placeholder : "Job"
            }
        }
        return false
    }
    const getNotifications =  async () => {
        try{
            setProcess(true)
            dispatch(login({...auth,last_checked : moment(new Date())}))
            APIFunction.seen_all()
            let res = await APIFunction.notifications(1);
            let other_data = res && res.results && Array.isArray(res.results) && res.results.length > 0 ? 
            res.results.map((item)=>(
                load(item)
            )).filter(item=>item) : []
            const grp_notif = other_data.reduce((groups, game) => {
                const date = game.date.split('T')[0];
                if (!groups[date]) {
                  groups[date] = [];
                }
                groups[date].push(game);
                return groups;
              }, {});

            const groupArray = Object.keys(grp_notif).map((date) => {
                return {
                  date,
                  notifications: grp_notif[date]
                };
              });

            let data = groupArray.map((grp,index)=>{
               return {
                    key: index,
                    date: grp.date,
                    data: grp.notifications
               }
            })
            setNotification(data)
            setLoading(false)
            setProcess(false)
        }catch(err){
            ToastError(err.msg)
        }
    }
    useFocusEffect(
        React.useCallback(()=>{
            getNotifications()        
        },[])
    )

    const markAsRead = async (id,index) => {
        var holders = [...notifications]
        var arr = [...notifications]
        try{
            arr.splice(index,1)
            setNotification([...arr])
           await APIFunction.read_notification(id)
           showFlashMessage({title : "Notification has been deleted"})
        }catch(err){
            setNotification([...holders])
            ToastError(err.msg)
        }
    }

    const NotificationItem = ({item, section,index}) => {
        let bgColor, borderColor;
        const {date} = section;
        if(item.background === 'pink') {
            bgColor = AppColors.lightPink;
            borderColor = AppColors.pink;
        }
        else if(item.background === 'green') {
            bgColor = AppColors.lightGreen;
            borderColor = AppColors.green;
        }
        else {
            borderColor = AppColors.grayBorder;
            bgColor = AppColors.white;
        }
        const rightContent = <P></P>
        return(
            <Swipeable
                rightContent={rightContent}
                onRightActionRelease={()=>markAsRead(item.id,index)}
            >
                <View 
                    style={[section && section.key != 2 ?  styles.listItemContainer : styles.listItemContainer2, {backgroundColor: bgColor, borderColor: borderColor}]}
                    >
                        <View style={CommonStyles.rowJustifySpaceBtw}>
                            {
                                item && item.avatar ? (
                                    <Image source={item.avatar} style={styles.avatarStyle} />
                                ) : ["timeoff-request","timeoff-request-approval","timeoff-request-dismissal"].includes(item.type) ? (
                                    <View style={styles.iconAndTextContainer}>
                                        <Image source={item.icon} style={styles.flatListIcon} />
                                        <Text style={styles.subText}>{item.date ? moment(item.date).format("MMM DD") : null}</Text>
                                    </View>
                                ) : (
                                    <Rounded backgroundColor={ColorList[Math.floor(Math.random()*4)]} size={10}>
                                        <H1>
                                            {item && item.placeholder && item.placeholder.length > 0 ? Capitalize([...item.placeholder][0]) : ""}
                                        </H1>
                                    </Rounded>
                                )
                            }
                            <View style={styles.textContainer}>
                                <Text style={styles.titleText} numberOfLines={2}>{item.title}</Text>
                                {/* <Text style={styles.subText}>{item.subtitle}</Text> */}
                            </View>
                        </View>
                        
                    </View>
            </Swipeable>
        );
    }
    return (
        <ScreenWrapper 
            scrollEnabled={!process && notifications && Array.isArray(notifications) && notifications.length === 0 ? false : true}
        >
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={()=>navigation.goBack()}
                >
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon} />
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.text1}>
                Notifications
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
                        <View style={styles.line} />
                        <View style={styles.mainViewContainer}>
                            <SectionList
                            sections={
                                notifications
                            }
                            keyExtractor={(item) => item.date}
                            renderItem={NotificationItem}
                            ItemSeparatorComponent={() => <View style={{margin: totalSize(1)}} />}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={CommonStyles.paddingTop_1}
                            renderSectionHeader={({ section }) => {
                                return (
                                <View style={[styles.headingContainer]}>
                                {
                                    section.date && moment(section.date).format("MMM DD") === moment().format("MMM DD") ? <Text numberOfLines={1} style={styles.heading}>Today</Text>:
                                    <Text numberOfLines={1} style={styles.heading2}>{section && section.date ? moment(section.date).format("MMM DD") : null}</Text>
                                }
                                    {/* <Image resizeMode="contain" source={downIcon} style={styles.downIcon} /> */}
                                </View>
                                )}}
                            />
                        </View>
                        {
                            !process && notifications && Array.isArray(notifications) && notifications.length === 0 ?
                            (
                                <EmptyStateWrapper
                                    icon={Images.EmptyNotification} 
                                    header_1={"You have no notifications yet"}
                                    sub_text={"When you do, they will show up here."}
                                />
                            ) : null
                        }
                    </React.Fragment>
                )
            }
        </ScreenWrapper>
    )
}

