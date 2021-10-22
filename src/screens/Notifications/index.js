import React from 'react'
import { View, Text, Image, FlatList, SectionList, Touchable } from 'react-native'
import { downIcon, leftIcon } from '../../assets/images'
import ScreenWrapper from '../../components/ScreenWrapper'
import { todaysData } from '../../utills/data/notificationsData'
import styles from './styles'
import CommonStyles from '../../utills/CommonStyles';
import { totalSize } from 'react-native-dimension'
import AppColors from '../../utills/AppColors'
import { getData, getStoredBusiness, ToastError } from '../../utills/Methods'
import { APIFunction, getAPIs } from '../../utills/api';
import { Container, P, PageLoader, Reload, TouchWrap } from '../../utills/components'
import { useFocusEffect} from '@react-navigation/core'
import {Capitalize} from '../../utills/Methods';
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler'



export default function Notifications({navigation}) {
    const [notifications,setNotification] = React.useState([]);
    const [loading,setLoading] = React.useState(true);
    const [process,setProcess] = React.useState(true);
    let background  = "pink";
    const load = (item) => {
        background = background === "pink" ? "green" : "pink"
        if(item && item.type === "timeoff_request_approval"){
            return {
                avatar : item && item.actor && item.actor.avatar ? item.actor.avatar : require('../../assets/images/dummy/placeholder.png'),
                subtitle : "Tech Support",
                title : `Your request for ${item.action_object && item.action_object.timeoff_policy ? Capitalize(item.action_object.timeoff_policy) : null} for ${item.action_object && item.action_object.days_requested ? item.action_object.days_requested : null} day(s) has been accepted`,
                icon : require('../../assets/images/icons/list.png'),
                type : "timeoff_request_approval",
                date :  item && item.created_at ? moment(item.created_at).format("MMM DD") : null,
            }
        }
        if(item && item.type === "employee_birthday"){
            return {
                avatar : item && item.actor && item.actor.photo ? item.actor.photo : require('../../assets/images/dummy/placeholder.png'),
                subtitle : "Tech Support",
                title : `${item && item.actor && item.actor.first_name ? Capitalize(item.actor.first_name) : null}'s birthday is today`,
                icon : require('../../assets/images/icons/cake.png'),
                type : "employee_birthday",
                date :  item && item.created_at ? moment(item.created_at).format("MMM DD") : null,
                background : background
            }
        }
        return false
    }
    const getNotifications =  async () => {
        try{
            setProcess(true)
            let about = await getData("about_me");
            let biz = await getStoredBusiness();
            let token = await getData("token");
            let url = APIFunction.notifications(biz.business_id)
            let res = await getAPIs(url,token);
            console.log("getNotifications",url,res)
            const icons = [{
                cake : require('../../assets/images/icons/cake.png'),
                bag : require('../../assets/images/icons/bag.png'),
                document : require('../../assets/images/icons/document2.png'),
                list : require('../../assets/images/icons/list.png'),
                up_cake : require('../../assets/images/icons/cake1.png')
            }]
            let other_data = res && res.results && Array.isArray(res.results) && res.results.length > 0 ? 
            res.results.map((item)=>(
                load(item)
            )) : []
            console.log("load|||",load)
            let data = [
                {
                    key: '1',
                    date: 'Aug 9',
                    data: other_data.filter(item=>item !== false && item.type == "employee_birthday")
                },
                {
                    key: '2',
                    date: 'Aug 28',
                    data: other_data.filter(item=>item !== false && item.type !== "employee_birthday")
                    
                },
            ]

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
                    if(item && item.type === "employee_birthday"){
                        return navigation.navigate("People",{tab : "Celebrations"})
                    }
                    if(item && item.type === "timeoff_request_approval"){
                        return navigation.navigate("People",{tab : "Who's out"})
                    }
                }}
            >
                <View 
                style={[section && section.key != 2 ?  styles.listItemContainer : styles.listItemContainer2, {backgroundColor: bgColor, borderColor: borderColor}]}
                >
                    <View style={CommonStyles.rowJustifySpaceBtw}>
                        <Image source={item.avatar} style={styles.avatarStyle} />
                        <View style={styles.textContainer}>
                            <Text style={styles.titleText} numberOfLines={2}>{item.title}</Text>
                            {/* <Text style={styles.subText}>{item.subtitle}</Text> */}
                        </View>
                    </View>
                    <View style={styles.iconAndTextContainer}>
                        <Image source={item.icon} style={styles.flatListIcon} />
                        <Text style={styles.subText}>{item.date}</Text>
                    </View>
                </View>
            </TouchWrap>
        );
    }
    return (
        <ScreenWrapper scrollEnabled={true}>
            <View style={styles.header}>
                <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon} />
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
                            sections={notifications}
                            keyExtractor={(item) => item.key}
                            renderItem={NotificationItem}
                            ItemSeparatorComponent={() => <View style={{margin: totalSize(1)}} />}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={CommonStyles.paddingTop_1}
                            renderSectionHeader={({ section }) => {
                                return (
                                <View style={[styles.headingContainer]}>
                                {
                                    section.date === 'Aug 9'? <Text numberOfLines={1} style={styles.heading}>Today</Text>:
                                    <Text numberOfLines={1} style={styles.heading2}>{/**section.date */}</Text>
                                }
                                    <Image resizeMode="contain" source={downIcon} style={styles.downIcon} />
                                </View>
                                )}}
                            />
                        </View>
                    </React.Fragment>
                )
            }
        </ScreenWrapper>
    )
}

