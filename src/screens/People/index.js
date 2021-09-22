import React, { useState } from 'react'
import { FlatList, Image, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native'
import { totalSize, width } from 'react-native-dimension'
import { useDispatch, useSelector } from 'react-redux'
import { categoryIcon1, downIcon, filterIcon, leftIcon, listingIcon } from '../../assets/images'
import { FilterModal } from '../../components/ContactModal'
import PersonCard from '../../components/PersonCard'
import PersonListComp from '../../components/PersonListComp'
import ScreenWrapper from '../../components/ScreenWrapper'
import SearchBox from '../../components/SearchBox'
import { setBottomTabBarVisible } from '../../Redux/Actions/Config'
import AppColors from '../../utills/AppColors'
import CommonStyles from '../../utills/CommonStyles'
import { celebrations, whosOut } from '../../utills/data/celebrations'
import { persons } from '../../utills/data/persons'
import styles from './styles'







export default function People({navigation}) {
    
    var [selected, setSelected] = useState('All');
    const [isListView, setIsListView] = useState(false);
    const [modal, setModal] = useState(false);
    const [personsList, setPersonsList] = useState(persons);
    const isBottomTabBarVisible = useSelector((state) => state.Config.isBottomTabBarVisible);
    const dispatch = useDispatch();

    const handleSearch = (text) => {
        if (text.length > 0) {
            let tmp = personsList.filter(item => item.title.includes(text));
            setPersonsList(tmp);
        }
        else
            setPersonsList(persons);
    }

    const handleFilter = (selectedFilter) => {
        
    }

    const CelebrationItem = ({item, section}) => {
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

    const WHosOutItem = ({item, section}) => {
        let bgColor, borderColor, textColor, btnColor;
        const {date} = section;
        if(item.background === 'pink') {
            bgColor = AppColors.lightPink;
            borderColor = AppColors.pink;
            textColor = AppColors.pink;
            btnColor = AppColors.white;
        }
        else if(item.background === 'green') {
            bgColor = AppColors.lightGreen;
            borderColor = AppColors.green;
            textColor = AppColors.green;
            btnColor = AppColors.white;
        }
        else {
            borderColor = AppColors.grayBorder;
            bgColor = AppColors.white;
            textColor = AppColors.white;
            btnColor = AppColors.green;
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
                <View style={[styles.smallBtnContainer, {backgroundColor: btnColor}]}>
                    <Text style={[styles.smallText, {color: textColor}]}>{item.status}</Text>
                </View>
                <Text style={styles.subText}>{date}</Text>
            </View>
        </View>
        );
    }

    return (
        <ScreenWrapper scrollEnabled={true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.screenTitle}>
                People
                </Text>
                <TouchableOpacity 
                onPress={() => setIsListView(!isListView)}
                >
                {isListView ? <Image resizeMode="contain" source={categoryIcon1} style={styles.rightIcon} /> :
                              <Image resizeMode="contain" source={listingIcon} style={styles.rightIcon} />
                }
                    
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View style={styles.mainViewContainer}>

                <ScrollView
                    nestedScrollEnabled={true}
                    contentContainerStyle={styles.scrollViewContainer}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                    {['All', 'My Team', "Who's out", 'Celebrations'].map((item) => (
                    <TouchableOpacity 
                    onPress={() => setSelected(item)}
                    >
                        <Text style={[styles.heading, selected == item && styles.selectedHeading]}>{item}</Text>
                        {selected == item && <View style={styles.animated} />}
                    </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={styles.line2} />
                {selected === 'Celebrations' &&
                    <SectionList
                    sections={celebrations}
                    keyExtractor={(item) => item.key}
                    renderItem={CelebrationItem}
                    ItemSeparatorComponent={() => <View style={{margin: totalSize(1)}} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={CommonStyles.paddingTop_1}
                    renderSectionHeader={({ section }) => {
                        return (
                        <View style={[styles.headingContainer]}>
                            <Text numberOfLines={1} style={styles.heading2}>{section.heading}</Text>
                            <Image resizeMode="contain" source={downIcon} style={styles.downIcon} />
                        </View>
                        )}}
                    />
                }
                {selected === "Who's out" &&
                    <SectionList
                    sections={whosOut}
                    keyExtractor={(item) => item.key}
                    renderItem={WHosOutItem}
                    ItemSeparatorComponent={() => <View style={{margin: totalSize(1)}} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={CommonStyles.paddingTop_1}
                    renderSectionHeader={({ section }) => {
                        return (
                        <View style={[styles.headingContainer]}>
                            <Text numberOfLines={1} style={styles.heading2}>{section.heading}</Text>
                            <Image resizeMode="contain" source={downIcon} style={styles.downIcon} />
                        </View>
                        )}}
                    />
                }
                {selected === 'All' &&
                    <View style={styles.searchBoxContainer}>
                        <SearchBox 
                            title="Search for Name " 
                            containerStyle={styles.searchBoxStyle}
                            onSubmitEditing={handleSearch}    
                        />
                        <TouchableOpacity style={styles.filterIconContainer} onPress={() => setModal(!modal)}>
                            <Image resizeMode="contain" source={filterIcon} style={styles.filterIcon} />
                        </TouchableOpacity>
                    </View>}
                {selected === "All" && !isListView &&
                    <FlatList
                    columnWrapperStyle={{justifyContent: 'space-between', width: width(90)}}
                    numColumns={2}
                    data={personsList}
                    keyExtractor={(item) => item.key}
                    renderItem={({item}) => <PersonCard item={item} onPressHandle={() => navigation.navigate('MemberProfile')}/>}
                    ItemSeparatorComponent={() => <View style={[CommonStyles.marginTop_2]}/>}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    contentContainerStyle={CommonStyles.marginTop_1}
                    />  
                }
                {selected === "All" && isListView &&
                    <FlatList
                    data={personsList}
                    keyExtractor={(item) => item.key}
                    renderItem={({item}) => <PersonListComp item={item} onPressHandle={() => navigation.navigate('MemberProfile')}/>}
                    ItemSeparatorComponent={() => <View style={styles.line}/>}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    contentContainerStyle={CommonStyles.marginTop_1}
                    />       
                }
                <FilterModal onPressHandle={handleFilter} isVisible={modal} onHide={() => setModal(false)}/>
            </View>
        </ScreenWrapper>
    )
}

