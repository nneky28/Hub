import React from 'react'
import { View, Text, Image, FlatList, SectionList } from 'react-native'
import { downIcon, leftIcon } from '../../assets/images'
import ScreenWrapper from '../../components/ScreenWrapper'
import { todaysData } from '../../utills/data/notificationsData'
import styles from './styles'
import CommonStyles from '../../utills/CommonStyles';
import { totalSize } from 'react-native-dimension'
import AppColors from '../../utills/AppColors'



export default function Notifications({navigation}) {

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
        </ScreenWrapper>
    )
}

