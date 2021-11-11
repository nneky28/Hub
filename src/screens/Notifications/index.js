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
import { Container, H1, P, PageLoader, Reload, Rounded, TouchWrap } from '../../utills/components'
import { useFocusEffect} from '@react-navigation/core'
import {Capitalize} from '../../utills/Methods';
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../Redux/Actions/Auth'



export default function Notifications({navigation}) {
    const [notifications,setNotification] = React.useState([]);
    const [loading,setLoading] = React.useState(true);
    const [process,setProcess] = React.useState(true);
    const auth = useSelector(state=>state.Auth);
    const dispatch = useDispatch();
    
    let background  = "pink";
    const load = (item) => {
        background = background === "pink" ? "green" : "pink"
        if(item && item.type === "timeoff_request_approval"){
            return {
                id : item.id,
                avatar : item && item.actor && item.actor.avatar ? item.actor.avatar : null,
                subtitle : "Tech Support",
                title : `Your request for ${item.action_object && item.action_object.timeoff_policy ? Capitalize(item.action_object.timeoff_policy) : null} for ${item.action_object && item.action_object.days_requested ? item.action_object.days_requested : null} day(s) has been accepted`,
                icon : require('../../assets/images/icons/list.png'),
                type : "timeoff_request_approval",
                date :  item.created_at,
                placeholder : "Success"
            }
        }
        if(item && item.type === "employee_birthday"){
            return {
                id : item.id,
                avatar : item && item.actor && item.actor.photo ? item.actor.photo : null,
                subtitle : "Tech Support",
                title : `${item && item.actor && item.actor.first_name ? Capitalize(item.actor.first_name) : null}'s birthday is today`,
                icon : require('../../assets/images/icons/cake.png'),
                type : "employee_birthday",
                date :  item.created_at,
                background : background,
                placeholder : "Birthday"
            }
        }
        if(item && item.type === "job_anniversary"){
            return {
                id : item.id,
                avatar : item && item.actor && item.actor && item.actor.photo ? item.actor.photo : null,
                subtitle : "Tech Support",
                title : `${item && item.actor && item.actor.first_name ? Capitalize(item.actor.first_name) : ""}'s ${item.data && item.data.num_years_spent ? item.data.num_years_spent : ""} year(s) anniversary`,
                icon : require('../../assets/images/icons/document2.png'),
                type : "job_anniversary",
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
            let about = await getData("about_me");
            let biz = await getStoredBusiness();
            let token = await getData("token");
            let res = await APIFunction.notifications(1);
            // const icons = [{
            //     cake : require('../../assets/images/icons/cake.png'),
            //     bag : require('../../assets/images/icons/bag.png'),
            //     document : require('../../assets/images/icons/document2.png'),
            //     list : require('../../assets/images/icons/list.png'),
            //     up_cake : require('../../assets/images/icons/cake1.png')
            // }]
            console.log("---RES----",res)
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

            // [
            //     {
            //     title: 'Naomi Ashley’s birthday is today',
            //     avatar: require('../../assets/images/dummy/placeholder.png'),
            //     subtitle: 'Tech Support',
            //     icon: require('../../assets/images/icons/cake1.png'),
            //     background: 'pink',
            //     },
            //     {
            //     title: 'Naomi Ashley’s birthday is today',
            //     avatar: require('../../assets/images/dummy/placeholder.png'),
            //     subtitle: 'Tech Support',
            //     icon: require('../../assets/images/icons/cake.png'),
            //     background: 'green',
            //     }
                
            // ]
            // [
            //     {
            //         title: 'July Payslip is avaliable',
            //         avatar: require('../../assets/images/dummy/placeholder.png'),
            //         subtitle: 'Tech Support',
            //         icon: icons['document']
            //     },
            //     {
            //         title: 'ABC12KJA is due for service ',
            //         avatar: require('../../assets/images/dummy/placeholder.png'),
            //         subtitle: 'Tech Support',
            //         icon: icons['cake']
            //     },
            //     {
            //         title: 'Onboarding task due in a day ',
            //         avatar: require('../../assets/images/dummy/placeholder.png'),
            //         subtitle: 'Tech Support',
            //         icon: icons['list']
            //     },
            //     {
            //         title: 'Dr Drey birthday in 3 days ',
            //         date: 'Aug 28',
            //         avatar: require('../../assets/images/dummy/placeholder.png'),
            //         subtitle: 'Tech Support',
            //         icon: icons['up_cake']
            //     }
            // ]
            setNotification(data)
            setLoading(false)
            setProcess(false)
        }catch(err){
            console.log("err",err);
            ToastError(err.msg)
        }
    }
    useFocusEffect(
        React.useCallback(()=>{
            getNotifications()        
        },[])
    )

    const NotificationItem = ({item, section}) => {
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

        return(
            <TouchWrap
                onPress={()=>{
                    APIFunction.read_notification(item.id);
                    if(item && item.type === "employee_birthday"){
                        return navigation.navigate("People",{tab : "Celebrations"})
                    }
                    if(item && item.type === "timeoff_request_approval"){
                        return navigation.navigate("People",{tab : "Who's out"})
                    }
                    if(item && item.type === "job_anniversary"){
                        return navigation.navigate("People",{tab : "Celebrations"})
                    }
                }}
            >
                <View 
                style={[section && section.key != 2 ?  styles.listItemContainer : styles.listItemContainer2, {backgroundColor: bgColor, borderColor: borderColor}]}
                >
                    <View style={CommonStyles.rowJustifySpaceBtw}>
                        {
                            item && item.avatar ? (
                                <Image source={item.avatar} style={styles.avatarStyle} />
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
                    <View style={styles.iconAndTextContainer}>
                        <Image source={item.icon} style={styles.flatListIcon} />
                        <Text style={styles.subText}>{item.date ? moment(item.date).format("MMM DD") : null}</Text>
                    </View>
                </View>
            </TouchWrap>
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
                                    <Image resizeMode="contain" source={downIcon} style={styles.downIcon} />
                                </View>
                                )}}
                            />
                        </View>
                        {
                            !process && notifications && Array.isArray(notifications) && notifications.length === 0 ?
                            (
                                <Container
                                    flex={1}
                                    style={{
                                        justifyContent : "center",
                                        alignItems : "center"
                                    }}
                                >
                                    <H1
                                        color={AppColors.black3}
                                    >You have no notifications yet.</H1>
                                </Container>
                            ) : null
                        }
                    </React.Fragment>
                )
            }
        </ScreenWrapper>
    )
}

