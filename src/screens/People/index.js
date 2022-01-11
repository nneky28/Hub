import React, { useEffect, useState } from 'react'
import { FlatList, Image, Platform, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import { useDispatch, useSelector } from 'react-redux'
import { categoryIcon1, downIcon, filterIcon, leftIcon, listingIcon } from '../../assets/images'
import { FilterModal } from '../../components/ContactModal'
import PersonCard from '../../components/PersonCard'
import PersonListComp from '../../components/PersonListComp'
import ScreenWrapper from '../../components/ScreenWrapper'
import SearchBox, { SearchBoxIOS } from '../../components/SearchBox'
import { setBottomTabBarVisible } from '../../Redux/Actions/Config'
import AppColors, { ColorList, ColorList2 } from '../../utills/AppColors'
import CommonStyles from '../../utills/CommonStyles'
import { Container, EmptyStateWrapper, H1, ImageWrap, LottieIcon, P, PageLoader, Reload, Rounded, SizedBox,BackHandler, useDebounce } from '../../utills/components'
import styles from './styles'
import Empty from '../../assets/lottie/empty.json'
import Outjson from '../../assets/lottie/out.json'
import Celebrationjson from '../../assets/lottie/birthday-icon.json'
import Teamjson from '../../assets/lottie/teams.json'
import { Capitalize, getData, getStoredBusiness, storeData, ToastError } from '../../utills/Methods'
import { APIFunction, getAPIs } from '../../utills/api'
import moment from 'moment'
import { Images } from '../../component2/image/Image'
import { ActivityIndicator } from 'react-native-paper'






export default function People({route,navigation}) {
    
    var [selected, setSelected] = useState('All');
    const [isListView, setIsListView] = useState(false);
    const [modal, setModal] = useState(false);
    const [personsList, setPersonsList] = useState([]);
    const [celebrations,setCelebrations] = useState(null);
    const [whosOut,setWhosOut] = useState(null)
    const [persons,setPersons] = useState([]);
    const [loading,setLoading] = React.useState(true);
    const [data,setData] = React.useState([])
    const [fetch,setFetch] = React.useState(false)
    const [end_reached,setEndReached] = React.useState(false)
    const [searchTerm,setSearchTerm] = React.useState(null)
    const debouncedSearchTerm = useDebounce(searchTerm, 300);


    

    const fetchData = async () => {
        try{
            if(end_reached) return
            let page = await getData("page")
            if(page > 1){
                setFetch(true)
            }else{
                page = 1;
                setLoading(true)
            }
            let selected = await getData("tab");
            let token = await getData("token");
            let user =  await getData("user");
            let about_me = await getData("about_me")
            let biz = user.employee_user_memberships &&
            Array.isArray(user.employee_user_memberships) && user.employee_user_memberships[0]
            && user.employee_user_memberships[0].business_id ? user.employee_user_memberships[0] : null;
            if(selected === "All" || selected === "My Team"){
                let searchParam = debouncedSearchTerm && debouncedSearchTerm.toString("").trim() ? 
                debouncedSearchTerm : "";
                let url = selected === "All" ? APIFunction.employees(biz.business_id,page || 1,searchParam) : 
                APIFunction.team_members(biz.business_id,about_me.id,page || 1);
                let res = await getAPIs(url,token);
                let persons_arr = res && res.results && Array.isArray(res.results) ? 
                res.results : [];
                let arr = [...personsList,...persons_arr]
                arr.splice((page * 10)+1)
                setPersonsList([...arr]);
                setPersons([...arr])
                setData([...arr])
            }
            if(selected === "Celebrations"){
                let active_birthdays_url = APIFunction.birthdays(biz.business_id,"active");
                let upcoming_birthdays_url = APIFunction.birthdays(biz.business_id,"upcoming");
                let active_ann_url = APIFunction.job_anniversary("active",biz.business_id);
                let up_ann_url = APIFunction.job_anniversary("upcoming",biz.business_id);
                let upcoming_res = await getAPIs(upcoming_birthdays_url,token);
                let active_res = await getAPIs(active_birthdays_url,token);
                let active_ann_res = await getAPIs(active_ann_url,token);
                let up_ann_res = await getAPIs(up_ann_url,token);

                let active_birthdays = active_res && active_res.results && Array.isArray(active_res.results) ? 
                active_res.results.map((item)=>(
                    {
                        title: `${item && item.first_name ? Capitalize(item.first_name)+"'s" : ""} birthday is today`,
                        avatar: item.photo,
                        subtitle: item && item.job && item.job.title ? Capitalize(item.job.title) : '',
                        icon: {uri : Images.CakeIcon},
                        background: 'pink',
                        date : item.birth_date ? moment(item.birth_date).format("MMM DD") : null
                    }
                )) : []

                let upcoming_birthdays = upcoming_res && upcoming_res.results && Array.isArray(upcoming_res.results) ? 
                upcoming_res.results.map((item)=>(
                    {
                        title: `${item && item.first_name ? Capitalize(item.first_name)+"'s" : ""} birthday is today`,
                        avatar: item.photo,
                        subtitle: item && item.job && item.job.title ? Capitalize(item.job.title) : "",
                        icon: {uri : Images.CakeIcon},
                        date : item.birth_date ? moment(item.birth_date).format("MMM DD") : null
                    }
                )) : []

                let upcoming_ann = up_ann_res && up_ann_res.results && Array.isArray(up_ann_res.results) ? 
                up_ann_res.results.map((item)=>({
                    title: item && item.first_name ? `${Capitalize(item.first_name)}’s ${item && item.num_years_spent ? item.num_years_spent : 0} ${item && item.num_years_spent && item && item.num_years_spent > 1 ? 'years' : 'year'} anniversary` : null,
                    avatar: item && item.photo ? item.photo : null,
                    subtitle: item && item.job && item.job.title ? Capitalize(item.job.title) : null,
                    icon: {uri : Images.DocumentIcon},
                    date : item.hire_date ? moment(item.hire_date).format("MMM DD") : null
                })) : [];

                let active_ann = active_ann_res && active_ann_res.results && Array.isArray(active_ann_res.results) ? 
                active_ann_res.results.map((item)=>({
                    title: item && item.first_name ? `${Capitalize(item.first_name)}’s ${item && item.num_years_spent ? item.num_years_spent : 0} ${item && item.num_years_spent && item && item.num_years_spent > 1 ? 'years' : 'year'} anniversary` : null,
                    avatar: item && item.photo ? item.photo : null,
                    subtitle: item && item.job && item.job.title ? Capitalize(item.job.title) : null,
                    icon: {uri : Images.DocumentIcon},
                    background : "pink",
                    date : item.hire_date ? moment(item.hire_date).format("MMM DD") : null
                })) : [];

                let celeb = [
                    active_birthdays && Array.isArray(active_birthdays) && active_birthdays.length > 0 ? {
                        key: '1',
                        date: moment(new Date()).format("MMM DD"),
                        heading: 'Birthdays',
                        data: active_birthdays
                    } : null,
                    active_ann && Array.isArray(active_ann) && active_ann.length > 0 ? {
                        key: '2',
                        date: moment(new Date()).format("MMM DD"),
                        heading: 'Job Anniversary',
                        data: active_ann
                        
                    } : null,
                    upcoming_birthdays && Array.isArray(upcoming_birthdays) && upcoming_birthdays.length > 0 ? {
                        key: '1',
                        date: moment(new Date()).format("MMM DD"),
                        heading: 'Upcoming Birthdays',
                        data: upcoming_birthdays
                    } : null,
                    upcoming_ann && Array.isArray(upcoming_ann) && upcoming_ann.length > 0 ? {
                        key: '2',
                        date: moment(new Date()).format("MMM DD"),
                        heading: 'Upcoming Anniversary',
                        data: upcoming_ann
                        
                    } : null,
                ].filter(item=>item !== null);
                    setCelebrations(celeb);
                    setData(celeb)
            }

            if(selected === "Who's out"){
                let whos_out_url = APIFunction.whos_out(biz.business_id);
                let whos_out_res = await getAPIs(whos_out_url,token);
                let data = whos_out_res && whos_out_res.results && Array.isArray(whos_out_res.results) ?
                 whos_out_res.results.map((item,index)=>(
                    {
                        title: `${item && item.employee && item.employee.first_name ? Capitalize(item.employee.first_name) : ""} ${item && item.employee && item.employee.last_name ? Capitalize(item.employee.last_name) : ""}`,
                        avatar: item.photo ? item.photo : null,
                        subtitle: item && item.employee && item.employee.job && item.employee.job.title ? 
                        Capitalize(item.employee.job.title) : "",
                        status: item.title,
                        background: 'pink',
                    }
                 )) : [];
                 let whos_out_data = data && Array.isArray(data) && data.length > 0 ? [
                    {
                        key: '1',
                        date: 'Jan 12 - Jul 23',
                        heading: 'On leave',
                        data: data
                    }
                 ] : []
                setWhosOut(whos_out_data)
                setData(whos_out_data)
            }
            setLoading(false);
            setFetch(false)
            await storeData("page",page + 1)
        }catch(err){
            setLoading(false);
            setFetch(false)
            let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : err.msg  ? err.msg : "Something went wrong. Please retry"
            if(msg === "Invalid page."){
                setEndReached(true)
                return;
            }
            ToastError(msg)
        }
    }
    const handleSearch = (text) => {
        setSearchTerm(text)
    }
    const searchQueryHandler = async () => {
        try{
            setEndReached(false)
            if(!debouncedSearchTerm || debouncedSearchTerm.toString().trim() === ""){
                return setPersonsList([...persons])
            }
            setLoading(true)
            let biz = await getStoredBusiness()
            let url = APIFunction.employees(biz.business_id,1,debouncedSearchTerm)
            let res = await getAPIs(url)
            let results = []
            if(res && res.results && Array.isArray(res.results)){
                setPersonsList(res.results)
            }
            setLoading(false)
        }catch(err){
            ToastError(err.msg)
        }
    }


    useEffect(()=>{
        setSearchTerm(null)
        fetchData()
    },[selected])

    
    useEffect(()=>{
        searchQueryHandler()
    },[debouncedSearchTerm])

    const location = async () => {
        let {tab} = route.params ? route.params : {tab : 'All'}
        storeData("tab",tab);
        setSelected(tab);
    }
    const resetPageNumber = () =>{
        storeData("page",1)
    }   
    useEffect(()=>{
        location()
        setSearchTerm(null)
        return ()=>{
            setSearchTerm(null)
            setEndReached(false)
            resetPageNumber()
        }
    },[])
    
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
                        <Rounded backgroundColor={item && item.background === "pink" ? ColorList2[Math.floor(Math.random()*4)]  : ColorList[Math.floor(Math.random()*4)]} size={11}>
                          <H1>
                            {item && item.title && item.title.length > 0 ? Capitalize([...item.title][0]) : ""}
                            {item && item.title && item.title.length > 1 ? `${Capitalize([...item.title][1])}` : ""}
                          </H1>
                        </Rounded>
                    )
                }
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.subText}>{item.subtitle}</Text>
                </View>
            </View>
            <View style={styles.iconAndTextContainer}>
                <Image source={item.icon} style={styles.flatListIcon} />
                <Text style={styles.subText}>{item.date}</Text>
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
                {
                    item && item.avatar ? (
                        <Image source={item.avatar} style={styles.avatarStyle} />
                    ) : (
                        <Rounded backgroundColor={ColorList[Math.floor(Math.random()*4)]} size={11}>
                          <H1>
                            {item && item.title && item.title.length > 0 ? Capitalize([...item.title][0]) : ""}
                            {item && item.title && item.title.length > 1 ? `${Capitalize([...item.title][1])}` : ""}
                          </H1>
                        </Rounded>
                    )
                }
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.subText}>{item.subtitle}</Text>
                </View>
            </View>
            <View style={styles.iconAndTextContainer}>
                <View style={[styles.smallBtnContainer, {backgroundColor: btnColor}]}>
                    <Text style={[styles.smallText, {color: textColor}]}>{item.status}</Text>
                </View>
                {/* <Text style={styles.subText}>{date}</Text> */}
            </View>
        </View>
        );
    }

    return (
        <ScreenWrapper scrollEnabled={
            //!loading && data && Array.isArray(data) && data.length === 0 ? false : true
            !["All","Team"].includes(selected)
        }>
            <Container flex={1}>
                <View style={styles.header}>
                    <BackHandler />
                    <Text numberOfLines={1} style={styles.screenTitle}>
                        People
                    </Text>
                    <TouchableOpacity 
                    onPress={() => setIsListView(!isListView)}
                    >
                    {isListView ? <Image resizeMode="contain" source={{uri : Images.MenuFillIcon}} style={styles.rightIcon} /> :
                        <Image resizeMode="contain" source={{uri : Images.Listing}} style={styles.rightIcon} />
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
                        await storeData("page",1)
                        setEndReached(false)
                        setPersonsList([])
                        setSelected(item)
                    }}
                    >
                        <Text style={[styles.heading, selected == item && styles.selectedHeading]}>{item}</Text>
                        {selected == item && <View style={[styles.animated,personsList && Array.isArray(personsList) && personsList.length >= 9 ? {height : height(1.5)} : null]} />}
                    </TouchableOpacity>
                    ))}
                </ScrollView>
                {/* <View style={styles.line2} /> */}
                {
                    selected === "All" ? <SizedBox size={2} /> : null
                }
                {selected === "All" && Platform.OS === "android" ? (
                    <View style={styles.searchBoxContainer}>
                        <SearchBox 
                            title="Search for Name " 
                            containerStyle={styles.searchBoxStyle}
                            onSubmitEditing={handleSearch}    
                        />
                        {/* <TouchableOpacity style={styles.filterIconContainer} onPress={() => setModal(!modal)}>
                            <Image resizeMode="contain" source={filterIcon} style={styles.filterIcon} />
                        </TouchableOpacity> */}
                    </View>
                    ) : selected === "All" ? (
                        <View style={styles.searchBoxContainer}>
                            <SearchBoxIOS 
                                title="Search for Name " 
                                containerStyle={styles.searchBoxStyle}
                                onSubmitEditing={handleSearch}    
                            />
                            {/* <TouchableOpacity style={styles.filterIconContainerIOS} onPress={() => setModal(!modal)}>
                                <Image resizeMode="contain" source={filterIcon} style={styles.filterIcon} />
                            </TouchableOpacity> */}
                        </View>
                    ) : null
                    
                }

                {
                    loading ? <PageLoader /> : null
                }
                <SizedBox size={2} />
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
                                <Text numberOfLines={1} style={styles.heading2}>{section.heading}</Text> 
                                {/* <Image resizeMode="contain" source={downIcon} style={styles.downIcon} /> */}
                            </View>
                            )}}
                        />
                     ) : null
                }
                {
                    !loading && celebrations && selected === "Celebrations" && Array.isArray(celebrations) && celebrations.length === 0 ? (
                        <EmptyStateWrapper 
                            icon={Images.EmptyCelebration}
                            header_1={"No record of upcoming"} 
                            header_2={"celebration."}
                            sub_text={"When there is, it will show up here."}
                        />
                    ) : null
                }
                
                {
                    (
                        (selected === "All" || selected === "My Team") && personsList && Array.isArray(personsList) &&
                        personsList.length === 0 && !loading
                    ) ? (
                        <EmptyStateWrapper 
                            icon={Images.EmptyTeams}
                            header_1={"You have no team"} 
                            header_2={"member yet."}
                            sub_text={"When you do, they will show up here."}

                        />
                    ) : null
                }
                {
                    selected === "Who's out" && Array.isArray(whosOut) &&
                        whosOut.length === 0 && !loading
                    ? (
                        <EmptyStateWrapper 
                            icon={Images.EmptyWhosOut}
                            header_1={"No one is out of office"} 
                            header_2={"today."}
                            sub_text={"When anyone is, they will show up here."}
                        
                        />
                    ) : null
                }
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
                                    {/* <Image resizeMode="contain" source={downIcon} style={styles.downIcon} /> */}
                                </View>
                                )}}
                            />
                    ) : null 
                }
                
                {
                        (selected === "All" || selected === "My Team") && !isListView && personsList && Array.isArray(personsList) 
                        && personsList.length > 0 && !loading
                        ? (
                            <React.Fragment>
                                <FlatList
                                    columnWrapperStyle={{justifyContent: 'space-between', width: width(90)}}
                                    numColumns={2}
                                    data={personsList}
                                    keyExtractor={(item) => `${Math.random()}`}
                                    renderItem={({item}) => <PersonCard item={item} onPressHandle={async () => {
                                        await storeData("tmember",item)
                                        navigation.navigate('MemberProfile')
                                    }} />}
                                    ItemSeparatorComponent={() => <View style={[CommonStyles.marginTop_2]}/>}
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled={true}
                                    contentContainerStyle={[CommonStyles.marginTop_1,{paddingBottom : height(40)}]}
                                    onEndReachedThreshold={0.5}
                                    onEndReached={({ distanceFromEnd }) => {
                                        fetchData();
                                    }}

                                    ListFooterComponent={()=>{
                                        if(fetch){
                                            return(
                                                <Container marginTop={3} fontSize={10}>
                                                    <ActivityIndicator color={AppColors.green}/>
                                                </Container> 
                                            )
                                        }  
                                        return <React.Fragment></React.Fragment> 
                                    }}
                                    // //refreshing={fetch}
                                    // onRefresh={async ()=> {
                                    //     await storeData("page",1)
                                    //     fetchData();
                                    // }}
                                /> 
                            </React.Fragment>
                        ) : null
                    }
                {
                    (selected === "All" || selected === "My Team") && isListView && personsList && Array.isArray(personsList) 
                    && personsList.length > 0 && !loading
                    ? (  
                            <React.Fragment>
                                <FlatList
                                    data={personsList}
                                    keyExtractor={(item) => item.key}
                                    renderItem={({item}) => <PersonListComp item={item} fetch={fetch} onPressHandle={async () => {
                                        await storeData("tmember",item)
                                        navigation.navigate('MemberProfile')
                                    }}/>}
                                    ItemSeparatorComponent={() => <View style={styles.line}/>}
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled={true}
                                    contentContainerStyle={CommonStyles.marginTop_1}
                                    onEndReachedThreshold={0.3}
                                    onEndReached={fetchData}
                                    refreshing={fetch}
                                    onRefresh={async ()=> {
                                        await storePage("page",1)
                                        fetchData();
                                    }}
                                /> 
                            </React.Fragment>
                    ) : null
                }
            
                <FilterModal onPressHandle={handleSearch} isVisible={modal} onHide={() => setModal(false)}/>
            </View>
            </Container>
        </ScreenWrapper>
    )
}

