import React from 'react'
import { View, Text, Image, FlatList, SectionList } from 'react-native'
import { downIcon, leftIcon } from '../../assets/images'
import ScreenWrapper from '../../components/ScreenWrapper'
import { todaysData } from '../../utills/data/notificationsData'
import styles from './styles'
import CommonStyles from '../../utills/CommonStyles';
import { totalSize } from 'react-native-dimension'
import AppColors from '../../utills/AppColors'
import { getData, getStoredBusiness, ToastError } from '../../utills/Methods'
import { APIFunction, getAPIs } from '../../utills/api';
import { PageLoader, Reload } from '../../utills/components'
import { useFocusEffect } from '@react-navigation/core'



export default function Notifications({navigation}) {
    const [notifications,setNotification] = React.useState([]);
    const [loading,setLoading] = React.useState(true);
    const [process,setProcess] = React.useState(true);
    const getNotifications =  async () => {
        try{
            setProcess(true)
            let about = await getData("about_me");
            let biz = await getStoredBusiness();
            let token = await getData("token");
            let url = await APIFunction.notifications(biz.business_id)
            let res = await getAPIs(url,token);
            console.log("getNotifications",url,res)
            let data = [
                {
                    key: '1',
                    date: 'Aug 9',
                    data: [
                        {
                        title: 'Naomi Ashley’s birthday is today',
                        avatar: require('../../assets/images/dummy/placeholder.png'),
                        subtitle: 'Tech Support',
                        icon: require('../../assets/images/icons/cake.png'),
                        background: 'pink',
                        },
                        {
                        title: 'Naomi Ashley’s birthday is today',
                        avatar: require('../../assets/images/dummy/placeholder.png'),
                        subtitle: 'Tech Support',
                        icon: require('../../assets/images/icons/bag.png'),
                        background: 'green',
                        }
                        
                    ]
                },
                {
                    key: '2',
                    date: 'Aug 28',
                    data: [
                        {
                        title: 'July Payslip is avaliable',
                        avatar: require('../../assets/images/dummy/placeholder.png'),
                        subtitle: 'Tech Support',
                        icon: require('../../assets/images/icons/document2.png')
                        },
                        {
                        title: 'ABC12KJA is due for service ',
                        avatar: require('../../assets/images/dummy/placeholder.png'),
                        subtitle: 'Tech Support',
                        icon: require('../../assets/images/icons/car.png')
                        },
                        {
                        title: 'Onboarding task due in a day ',
                        avatar: require('../../assets/images/dummy/placeholder.png'),
                        subtitle: 'Tech Support',
                        icon: require('../../assets/images/icons/list.png')
                        },
                        {
                        title: 'Dr Drey birthday in 3 days ',
                        date: 'Aug 28',
                        avatar: require('../../assets/images/dummy/placeholder.png'),
                        subtitle: 'Tech Support',
                        icon: require('../../assets/images/icons/cake1.png')
                        }
                    ]
                    
                },
            ]
            setNotification(data)
            setLoading(false)
            setProcess(true)
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
        <View 
        style={[styles.listItemContainer, {backgroundColor: bgColor, borderColor: borderColor}]}
        >
            <View style={CommonStyles.rowJustifySpaceBtw}>
                <Image source={item.avatar} style={styles.avatarStyle} />
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.subText}>{item.subtitle}</Text>
                </View>
            </View>
            <View style={styles.iconAndTextContainer}>
                <Image source={item.icon} style={styles.flatListIcon} />
                <Text style={styles.subText}>{date}</Text>
            </View>
        </View>
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
                            sections={todaysData}
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
                                    <Text numberOfLines={1} style={styles.heading2}>{section.date}</Text>
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

