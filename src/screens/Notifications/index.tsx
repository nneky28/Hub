import React, { useEffect } from 'react'
import { View, Text, Image, SectionList } from 'react-native'
import ScreenWrapper from '../../components/ScreenWrapper'
import styles from './styles'
import CommonStyles from '../../utills/CommonStyles';
import { width } from 'react-native-dimension'
import AppColors, { ColorList } from '../../utills/AppColors'
import { ToastError } from '../../utills/Methods'
import { APIFunction, useFetchNotifications } from '../../utills/api';
import { EmptyStateWrapper, H1, PageLoader, Rounded } from '../../utills/components'
import {Capitalize} from '../../utills/Methods';
import moment from 'moment'
import Swipeable from 'react-native-swipeable';
import { showFlashMessage } from '../../components/SuccessFlash'
import { Images } from '../../component2/image/Image'
import { HeaderWithBackButton } from '../../components/Headers/CustomHeader';
import { RootScreenProps } from '../../Routes/types';
import { FormattedData, GroupedFormattedData, NotificationData, NotificationItemProps, useFetchNotificationData, useFetchNotificationProps } from './types';



export default function Notifications({navigation} : RootScreenProps) {
    const [notifications,setNotification] = React.useState<readonly NotificationData[]>([]);
    const [loading,setLoading] = React.useState(true);
    const [page] = React.useState(1)
    const {
        data
    } = useFetchNotifications(page) as useFetchNotificationProps
    
    let background  = "pink";

    const load = (item : useFetchNotificationData) : FormattedData | false => {
        background = background === "pink" ? "green" : "pink"
        
        if(item?.type && ["timeoff-request","timeoff-request-approval","timeoff-request-dismissal"].includes(item.type) && item.created_at){
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
                avatar : item &&item.image ? item.image : "",
                subtitle : "",
                title : title,
                icon : require('../../assets/images/icons/list.png'),
                type : item.type,
                date :  item.created_at,
                placeholder : "Success",
                background : ""
            }
        }
        if(item && item.type === "birthday" && item.created_at){
            return {
                id : item.id,
                avatar : item && item.image ? item.image : "",
                subtitle : "",
                title : `Wish ${item && item.data && item.data.employee_first_name ? Capitalize(item.data.employee_first_name) : ""} a happy birthday (${item && item?.data?.date ? moment(item.data.date).format("MMM DD") : ""})`,
                icon : require('../../assets/images/icons/cake.png'),
                type : "birthday",
                date :  item.created_at,
                background : background,
                placeholder : "Birthday"
            }
        }
        if(item && item.type === "work-anniversary" && item.created_at){
            return {
                id : item.id,
                avatar : item && item.image ? item.image : "",
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

            await APIFunction.seen_all()
            let other_data = data?.pages?.[0]?.results && Array.isArray(data?.pages?.[0]?.results) ? 
            data?.pages?.[0]?.results.map((item)=>(load(item))).filter((item) : item is FormattedData =>!!item) : []
            
            const grp_notif = other_data.reduce((groups : GroupedFormattedData, game) => {
                const date = game?.date?.split('T')[0];
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

            let grpData = groupArray.map((grp,index)=>{
               return {
                    key: index.toString(),
                    date: grp.date,
                    data: grp.notifications
               }
            })
            setNotification(grpData)
            setLoading(false)
        }catch(err : any){
            ToastError(err.msg)
        }
    }

    useEffect(()=>{
        if(!data) return setLoading(true)
        getNotifications()  
    },[data])

    const markAsRead = async (id : number,index : number) => {
        let holders = [...notifications]
        let arr = [...notifications]
        try{
            arr.splice(index,1)
            setNotification([...arr])
            await APIFunction.read_notification(id)
           showFlashMessage({title : "Notification has been deleted"})
        }catch(err : any){
            setNotification([...holders])
            ToastError(err.msg)
        }
    }

    const NotificationItem = ({item, section,index} : NotificationItemProps) => {
        let bgColor, borderColor;
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
        const rightContent = <React.Fragment />
        return(
            <Swipeable
                rightContent={rightContent}
                onRightActionRelease={()=>{
                    if(!item.id) return
                    markAsRead(item.id,index)
                }}
            >
                <View 
                    style={[section?.key && Number(section?.key) != 2 ?  styles.listItemContainer : styles.listItemContainer2, {backgroundColor: bgColor, borderColor: borderColor}]}
                    >
                        <View style={CommonStyles.rowJustifySpaceBtw}>
                            {
                                item && item.avatar ? (
                                    <Image source={{uri : item.avatar}} style={styles.avatarStyle} />
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

    const onPressHandler = () => {
        navigation.goBack()
    }

    const ItemSeperatorComponent = () => <View style={{margin: width(1)}} />

    const KeyExtractor = (item : FormattedData,index : number) => `${item}${index}`.toString()


    return (
        <ScreenWrapper>
            <HeaderWithBackButton 
                headerText='Notifications'
                onPressHandler={onPressHandler}
            />
            {
                loading ? (
                    <PageLoader />
                ) : (
                    <React.Fragment>
                        <View style={styles.mainViewContainer}>
                            <SectionList
                            sections={notifications}
                            keyExtractor={KeyExtractor}
                            renderItem={NotificationItem}
                            ItemSeparatorComponent={ItemSeperatorComponent}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={CommonStyles.paddingTop_1}
                            renderSectionHeader={({ section }) => {
                                return (
                                <View style={styles.headingContainer}>
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
                            notifications && Array.isArray(notifications) && notifications.length === 0 ? (
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

