import React, { useState } from 'react'
import { FlatList, Image, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import { categoryIcon1, downIcon, filterIcon, leftIcon, listingIcon } from '../../assets/images'
import { FilterModal } from '../../components/ContactModal'
import PersonCard from '../../components/PersonCard'
import PersonListComp from '../../components/PersonListComp'
import ScreenWrapper from '../../components/ScreenWrapper'
import SearchBox from '../../components/SearchBox'
import { TimeoffVertical } from '../../components/Timeoff'
import TrainingList from '../../components/TrainingList'
import AppColors from '../../utills/AppColors'
import CommonStyles from '../../utills/CommonStyles'
import { celebrations, whosOut } from '../../utills/data/celebrations'
import { persons } from '../../utills/data/persons'
import tasksData from '../../utills/data/tasksData'
import styles from './styles'








export default function TimeOff({navigation}) {
    
    var [selected, setSelected] = useState('Overview');
    
    return (
        <ScreenWrapper scrollEnabled={true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                  <Text numberOfLines={1} style={styles.screenTitle}>
                  Time Off
                  </Text>
                </View>
            </View>
            <View style={styles.line} />
            <View style={styles.mainViewContainer}>
                <ScrollView
                    nestedScrollEnabled={true}
                    contentContainerStyle={styles.scrollViewContainer}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                    {['Overview', 'Request', 'History'].map((item) => (
                    <TouchableOpacity 
                    onPress={() => setSelected(item)}
                    >
                        <Text style={[styles.heading, selected == item && styles.selectedHeading]}>{item}</Text>
                        {selected == item && <View style={styles.animated} />}
                    </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={styles.line2} />
                {selected === 'Overview' &&
                    <>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Active and upcoming</Text>
                    </View>
                    <TimeoffVertical
                    data={
                        // ['active', 'active']
                        // ['balance', 'balance']
                        // : 
                        ['request', 'active']
                    }
                    />

                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Available</Text>
                    </View>
                    <TimeoffVertical
                    data={
                        // ['active', 'active']
                        ['balance', 'fewDays', 'balance', 'balance']
                        // : 
                        // ['request', 'request']
                    }
                    />
                    </>
                }
                {selected === "Available" &&
                    <>
                    </>
                }
            </View>
        </ScreenWrapper>
    )
}

