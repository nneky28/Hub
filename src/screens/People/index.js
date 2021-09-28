import React, { useEffect, useState } from 'react'
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
import { LottieIcon, PageLoader } from '../../utills/components'
//import { celebrations, whosOut } from '../../utills/data/celebrations'
import { persons } from '../../utills/data/persons'
import styles from './styles'
import Birthdayjson from '../../assets/lottie/birthday.json'
import Empty from '../../assets/lottie/empty.json'
import { Capitalize, getData, storeData, ToastError } from '../../utills/Methods'
import { APIFunction, getAPIs } from '../../utills/api'
import Loader from '../../components/Loader'
import moment from 'moment'







export default function People({route,navigation}) {
    
    var [selected, setSelected] = useState('All');
    const [isListView, setIsListView] = useState(false);
    const [modal, setModal] = useState(false);
    const [personsList, setPersonsList] = useState(null);
    const [celebrations,setCelebrations] = useState(null);
    const [whosOut,setWhosOut] = useState(null)
    const isBottomTabBarVisible = useSelector((state) => state.Config.isBottomTabBarVisible);
    const dispatch = useDispatch();
    const [loading,setLoading] = React.useState(null);

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
    const fetchData = async () => {
        try{
            setLoading(true);
            let token = await getData("token");
            let user =  await getData("user");
            let about_me = await getData("about_me")
            let biz = user.employee_user_memberships &&
            Array.isArray(user.employee_user_memberships) && user.employee_user_memberships[0]
            && user.employee_user_memberships[0].business_id ? user.employee_user_memberships[0] : null;
            let selected = await getData("tab");
            if(selected === "All" || selected === "My Team"){
                let url = selected === "All" ? APIFunction.employees(biz.business_id) : APIFunction.team_members(biz.business_id,about_me.id);
                console.log("url<<<",url)
                let res = await getAPIs(url,token);
                console.log("url-----",url,token,res)
                let persons = res && res.results && Array.isArray(res.results) ? 
                res.results : [];
                setPersonsList(persons);
            }
            if(selected === "Celebrations"){
                let active_birthdays_url = APIFunction.birthdays(biz.business_id,"active");
                let upcoming_birthdays_url = APIFunction.birthdays(biz.business_id,"upcoming");
                let upcoming_res = await getAPIs(upcoming_birthdays_url,token);
                let active_res = await getAPIs(active_birthdays_url,token);
                let active_birthdays = active_res && active_res.results && Array.isArray(active_res.results) ? 
                active_res.results.map((item)=>(
                    {
                        title: `${item && item.first_name ? Capitalize(item.first_name)+"'s" : ""} birthday is today`,
                        avatar: item.photo,
                        subtitle: 'Tech Support',
                        icon: require('../../assets/images/icons/cake.png'),
                        background: 'pink',
                    }
                )) : []

                let upcoming_birthdays = upcoming_res && upcoming_res.results && Array.isArray(upcoming_res.results) ? 
                upcoming_res.results.map((item)=>(
                    {
                        title: `${item && item.first_name ? Capitalize(item.first_name)+"'s" : ""} birthday is today`,
                        avatar: item.photo,
                        subtitle: 'Tech Support',
                        icon: require('../../assets/images/icons/cake.png')
                    }
                )) : []

                let celeb = [
                    {
                        key: '1',
                        date: moment(new Date()).format("MMM DD"),
                        heading: 'Birthdays',
                        data: active_birthdays
                    },
                    {
                        key: '2',
                        date: moment(new Date()).format("MMM DD"),
                        heading: 'Job Anniversary',
                        data: []
                        
                    },
                    {
                        key: '1',
                        date: moment(new Date()).format("MMM DD"),
                        heading: 'Upcoming Birthdays',
                        data: upcoming_birthdays
                    },
                    {
                        key: '2',
                        date: 'Aug 28',
                        heading: 'Upcoming Anniversary',
                        data: [
                            {
                            title: 'Naomi Ashley’s 1 year anniversary',
                            avatar: require('../../assets/images/dummy/placeholder.png'),
                            subtitle: 'Tech Support',
                            icon: require('../../assets/images/icons/document2.png'),
                            },
                        ]
                        
                    },
                ];
                setCelebrations(celeb);
            }

            if(selected === "Who's out"){
                console.log("selected--",token)
                let whos_out_url = APIFunction.whos_out(biz.business_id,"active");
                let whos_out_res = await getAPIs(whos_out_url,token);
                console.log("whos---out",whos_out_url,whos_out_res)
                let data = whos_out_res && whos_out_res.results && Array.isArray(whos_out_res.results) ?
                 whos_out_res.results.map((item,index)=>(
                    {
                        title: `${item && item.first_name ? Capitalize(item.first_name) : ""} ${item && item.first_name ? Capitalize(item.first_name) : ""}`,
                        avatar: require('../../assets/images/dummy/placeholder.png'),
                        subtitle: 'Tech Support',
                        status: item.title,
                        background: 'pink',
                    }
                 )) : [];
                 let whos_out_data = [
                    {
                        key: '1',
                        date: 'Jan 12 - Jul 23',
                        heading: 'On leave',
                        data: data
                    }
                 ]
                setWhosOut(whos_out_data)
            }
            setLoading(false);
        }catch(err){
            let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : "Something went wrong. Please retry"
            console.log("err|||",err,msg)
            ToastError(msg)
        }
    }
    const location = async () => {
        let {tab} = route.params ? route.params : {tab : 'All'}
        storeData("tab",tab);
        setSelected(tab);
    }
    useEffect(()=>{
        location()
    },[])
    useEffect(()=>{
        fetchData()
    },[selected])
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
                {
                    item.photo ? (
                        <Image url={item.avatar} style={styles.avatarStyle} />
                    ) : (
                        <Image source={require('../../assets/images/dummy/placeholder.png')} style={styles.avatarStyle} />
                    )
                }
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
                    onPress={async () => {
                        await storeData("tab",item)
                        setSelected(item)
                    }}
                    >
                        <Text style={[styles.heading, selected == item && styles.selectedHeading]}>{item}</Text>
                        {selected == item && <View style={styles.animated} />}
                    </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={styles.line2} />
                {selected === "All" ? (
                    <View style={styles.searchBoxContainer}>
                        <SearchBox 
                            title="Search for Name " 
                            containerStyle={styles.searchBoxStyle}
                            onSubmitEditing={handleSearch}    
                        />
                        <TouchableOpacity style={styles.filterIconContainer} onPress={() => setModal(!modal)}>
                            <Image resizeMode="contain" source={filterIcon} style={styles.filterIcon} />
                        </TouchableOpacity>
                    </View>
                    ) : null
                }
                {
                    loading ? <PageLoader /> : null
                }
                {
                    selected === "Celebrations" && celebrations && !loading ? (
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
                                {console.log("section---",section)}
                                <Text numberOfLines={1} style={styles.heading2}>{section.heading}</Text> 
                                <Image resizeMode="contain" source={downIcon} style={styles.downIcon} />
                            </View>
                            )}}
                        />
                     ) : null
                }
                {console.log("---|||selected",celebrations)}
                {
                    !loading && selected === "Celebrations" && celebrations && celebrations.active_bithdays && celebrations.upcoming_birthdays
                    &&
                    (celebrations.upcoming_birthdays.length === 0 || celebrations.active_bithdays.length === 0) ? (
                        <LottieIcon icon={Birthdayjson} />
                    ) : null
                }
                {
                    (
                        (selected === "All" || selected === "My Team") && Array.isArray(personsList) &&
                        personsList.length === 0 && !loading
                    ) || (
                        selected === "Who's out" && Array.isArray(whosOut) &&
                        whosOut.length === 0 && !loading
                    ) ? (
                        <View>
                            <LottieIcon icon={Empty} />
                        </View>
                    ) : null
                }
                {console.log("---||---whos_outs",whosOut)}
                {
                    selected === "Who's out" && Array.isArray(whosOut) && whosOut.length > 0 && !loading ? (
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
                    ) : null 
                }
                
                {
                    (selected === "All" || selected === "My Team") && !isListView && personsList && Array.isArray(personsList) 
                    && personsList.length > 0 && !loading
                    ? (
                        <FlatList
                            columnWrapperStyle={{justifyContent: 'space-between', width: width(90)}}
                            numColumns={2}
                            data={personsList}
                            keyExtractor={(item) => item.key}
                            renderItem={({item}) => <PersonCard item={item} onPressHandle={() => navigation.navigate('MemberProfile',{member : item})}/>}
                            ItemSeparatorComponent={() => <View style={[CommonStyles.marginTop_2]}/>}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            contentContainerStyle={CommonStyles.marginTop_1}
                        /> 
                    ) : null
                }
                {console.log("personList---",personsList)}
                {
                    (selected === "All" || selected === "My Team") && isListView && personsList && Array.isArray(personsList) 
                    && personsList.length > 0 && !loading
                    ? (  
                        <FlatList
                    data={personsList}
                    keyExtractor={(item) => item.key}
                    renderItem={({item}) => <PersonListComp item={item} onPressHandle={() => navigation.navigate('MemberProfile',{member : item})}/>}
                    ItemSeparatorComponent={() => <View style={styles.line}/>}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    contentContainerStyle={CommonStyles.marginTop_1}
                    /> 
                    ) : null
                }
            
                <FilterModal onPressHandle={handleFilter} isVisible={modal} onHide={() => setModal(false)}/>
            </View>
        </ScreenWrapper>
    )
}

