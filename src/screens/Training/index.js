import React, { useState } from 'react'
import { FlatList, Image, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import { categoryIcon1, downIcon, filterIcon, leftIcon, listingIcon } from '../../assets/images'
import { FilterModal } from '../../components/ContactModal'
import PersonCard from '../../components/PersonCard'
import PersonListComp from '../../components/PersonListComp'
import ScreenWrapper from '../../components/ScreenWrapper'
import SearchBox from '../../components/SearchBox'
import TrainingList from '../../components/TrainingList'
import AppColors from '../../utills/AppColors'
import CommonStyles from '../../utills/CommonStyles'
import { celebrations, whosOut } from '../../utills/data/celebrations'
import { persons } from '../../utills/data/persons'
import tasksData from '../../utills/data/tasksData'
import styles from './styles'







export default function Training({navigation}) {
    
    var [selected, setSelected] = useState('Overview');
    
    return (
        <ScreenWrapper scrollEnabled={true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                  <Text numberOfLines={1} style={styles.screenTitle}>
                  Training
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
                    {['Overview', 'Available'].map((item) => (
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
                    <SearchBox title="Search for Training"/>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Upcoming</Text>
                    </View>
                    <TrainingList data={tasksData.slice(0,1)}/>

                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>History</Text>
                    </View>
                    <TrainingList data={tasksData} opacity={0.5}/>
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

