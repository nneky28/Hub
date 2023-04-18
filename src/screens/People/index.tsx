import React, { useEffect, useState } from 'react'
import { FlatList, Image, Platform, ScrollView, SectionList, Text,View } from 'react-native'
import { width } from 'react-native-dimension'
import PersonCard from '../../components/PersonCard'
import PersonListComp from '../../components/PersonListComp'
import ScreenWrapper from '../../components/ScreenWrapper'
import SearchBox, { SearchBoxIOS } from '../../components/SearchBox'
import AppColors from '../../utills/AppColors'
import CommonStyles from '../../utills/CommonStyles'
import { Container, EmptyStateWrapper,PageLoader,useDebounce, TouchableWrapper, ImgPlaceholder } from '../../utills/components'
import styles from './styles'
import { Capitalize} from '../../utills/Methods'
import { useFetchAnniversary, useFetchBirthdays, useFetchEmployees, useFetchTeams, useFetchWhosOut } from '../../utills/api'
import moment from 'moment'
import { Images } from '../../utills/Image'
import { ActivityIndicator } from 'react-native-paper'
import { RootScreenProps } from '../../Routes/types'
import { HomePageHeader } from '../../components/Headers/CustomHeader'
import { CelebrationItem, Celebrations, TabType, useFetchEmployeesData, useFetchEmployeesProps, useFetchTeamsProps, WhosOutListItem, WhosOutSection } from './types'
import { useQueryClient } from 'react-query'
import { GET_EMPLOYEES, GET_MY_TEAM_MEMBERS } from '../../utills/payload'
import { useFetchAnniversaryProps, useFetchBirthdaysProps, useFetchWhosOutProps } from '../Dashboard/types'
import { CustomRefreshControl } from '../../components/CustomRefreshControl'

export default function People({navigation} : RootScreenProps) {
    
    var [selected, setSelected] = useState<TabType>('All');
    const [isListView, setIsListView] = useState(false);
    const [personsList, setPersonsList] = useState<useFetchEmployeesData[]>([]);
    const [celebrations,setCelebrations] = useState<Celebrations[]>();
    const [whosOut,setWhosOut] = useState<WhosOutSection[]>()
    const [loading] = React.useState(true);
    const [search,setSearch] = React.useState("")
    const searchTerm = useDebounce(search, 300);
    const [page,setPage] = React.useState(1)
    const tabs : TabType[] = ['All', 'My Team', "Who's Out", 'Celebrations']
    const queryClient = useQueryClient()

    const {
        data : active_BD,
        isLoading : loadingActiveBD
    } = useFetchBirthdays(selected === "Celebrations" ? "active" : "") as useFetchBirthdaysProps

    const {
        data : upcoming_BD,
        isLoading : loadingUpcomingBD
    } = useFetchBirthdays(selected === "Celebrations" ? "upcoming" : "") as useFetchBirthdaysProps

    const {
        data : employeeData,
        hasNextPage,
        isFetching
    } = useFetchEmployees(selected === "All" ? selected : "",page,searchTerm) as useFetchEmployeesProps

    const {
        data: activeANN,
        isFetching: activeANNFetching
      } = useFetchAnniversary(selected === "Celebrations" ? "active" : "") as useFetchAnniversaryProps
      
    const {
        data: upcomingANN,
        isFetching: upcomingANNFetching
    } = useFetchAnniversary(selected === "Celebrations" ? "upcoming" : "") as useFetchAnniversaryProps

    const {
        data: outData,
        isFetching: whosoutLoading
      } = useFetchWhosOut(selected === "Who's Out" ? "timeoff" : "") as useFetchWhosOutProps

    const {
        data : teamData,
        hasNextPage : hasNextTeamPage,
        isFetching : fetchingTeams
    } = useFetchTeams(selected === "My Team" ? selected : "",page) as useFetchTeamsProps

    const mapStateToData = () => {
        let arr : useFetchEmployeesData[] = [] 
        if(selected === "All" && employeeData?.pages?.[0]?.results && Array.isArray(employeeData?.pages?.[0]?.results)){
            arr = page === 1 ? employeeData?.pages?.[0]?.results : [...personsList,...employeeData?.pages?.[0]?.results]
            return setPersonsList(arr)
        }
        if(selected === "My Team" && teamData?.pages?.[0]?.results && Array.isArray(teamData?.pages?.[0]?.results)){
            arr = page === 1 ? teamData?.pages?.[0]?.results : [...personsList,...teamData?.pages?.[0]?.results]
            return setPersonsList(arr)
        }
         if(
             selected === "Celebrations" && 
            (active_BD?.results && Array.isArray(active_BD?.results)) ||
            (upcoming_BD?.results && Array.isArray(upcoming_BD?.results)) ||
            (upcomingANN?.results && Array.isArray(upcomingANN?.results)) ||
            (activeANN?.results && Array.isArray(activeANN?.results))
         ){
            let active_birthdays : CelebrationItem[] = active_BD?.results && Array.isArray(active_BD.results) ? 
            active_BD.results.map((item)=>(
                {
                    title: `${item && item.first_name ? Capitalize(item.first_name)+"'s" : ""} birthday is today`,
                    avatar: item.photo || "",
                    subtitle: item && item.job && item.job.title ? Capitalize(item.job.title) : '',
                    icon: {uri : Images.CakeIcon},
                    background: 'pink',
                    date : item.birth_date ? moment(item.birth_date).format("MMM DD") : ""
                }
            )) : []

            let upcoming_birthdays : CelebrationItem[] = upcoming_BD?.results && Array.isArray(upcoming_BD.results) ? 
            upcoming_BD.results.map((item)=>(
                {
                    title: `${item && item.first_name ? Capitalize(item.first_name)+"'s" : ""} birthday`,
                    avatar: item.photo || "",
                    subtitle: item && item.job && item.job.title ? Capitalize(item.job.title) : "",
                    icon: {uri : Images.CakeIcon},
                    date : item.birth_date ? moment(item.birth_date).format("MMM DD") : ""
                }
            )) : []

            let upcoming_ann : CelebrationItem[]= upcomingANN?.results && Array.isArray(upcomingANN?.results) ? 
            upcomingANN?.results.map((item)=>({
                title: item && item.first_name ? `${Capitalize(item.first_name)}’s ${item && item.num_years_spent ? item.num_years_spent : 0} year anniversary` : "",
                avatar: item && item.photo ? item.photo : "",
                subtitle: item && item.job && item.job.title ? Capitalize(item.job.title) : "",
                icon: {uri : Images.DocumentIcon},
                date : item.hire_date ? moment(item.hire_date).format("MMM DD") : ""
            })) : [];

            let active_ann : CelebrationItem[] = activeANN?.results && Array.isArray(activeANN.results) ? 
            activeANN.results.map((item)=>({
                title: item && item.first_name ? `${Capitalize(item.first_name)}’s ${item && item.num_years_spent ? item.num_years_spent : 0} year anniversary` : "",
                avatar: item && item.photo ? item.photo : "",
                subtitle: item && item.job && item.job.title ? Capitalize(item.job.title) : "",
                icon: {uri : Images.DocumentIcon},
                background : "pink",
                date : item.hire_date ? moment(item.hire_date).format("MMM DD") : ""
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
                    key: '3',
                    date: moment(new Date()).format("MMM DD"),
                    heading: 'Upcoming Birthdays',
                    data: upcoming_birthdays
                } : null,
                upcoming_ann && Array.isArray(upcoming_ann) && upcoming_ann.length > 0 ? {
                    key: '4',
                    date: moment(new Date()).format("MMM DD"),
                    heading: 'Upcoming Anniversary',
                    data: upcoming_ann
                    
                } : null,
            ].filter((item) : item is Celebrations =>!!item);
            return setCelebrations(celeb)
        }

        if(selected === "Who's Out" && outData?.results && Array.isArray(outData?.results)){
            let data : WhosOutListItem[] = outData?.results && Array.isArray(outData?.results) ?
            outData?.results.map((item)=>(
                {
                    title: `${item?.employee?.first_name ? Capitalize(item.employee.first_name) : ""} ${item?.employee?.last_name ? Capitalize(item.employee.last_name) : ""}`,
                    avatar: item.photo ? item.photo : "",
                    subtitle: item?.employee?.job?.title ? 
                    Capitalize(item.employee.job.title) : "",
                    status: item.title || "",
                    background: 'pink',
                }
             )) : [];
             let whos_out_data : WhosOutSection[] = data && Array.isArray(data) && data.length > 0 ? [
                {
                    key: '1',
                    date: 'Jan 12 - Jul 23',
                    heading: 'On Leave',
                    data: data
                }
             ] : []
            setWhosOut(whos_out_data)
        }
    }

    const handleSearch = (text : string) => {
        setPage(1)
        setSearch(text)
    }

    useEffect(()=>{
        mapStateToData()
    },[employeeData,teamData,selected,upcoming_BD,active_BD,upcomingANN,activeANN,outData])    

    const CelebrationListEmptyComponent = () => {
        return(
            <EmptyStateWrapper 
                icon={Images.EmptyCelebration}
                header_1={"No record of upcoming"} 
                header_2={"celebration."}
                sub_text={"When there is, it will show up here."}
            />
        )
    }

    const CelebrationItem = ({item} : {item : CelebrationItem}) => {
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
        return(
        <View 
        style={[styles.listItemContainer, {backgroundColor: bgColor, borderColor: borderColor}]}
        >
            <View style={CommonStyles.rowJustifySpaceBtw}>
                {
                    item.avatar ? (
                        <Image source={{uri : item.avatar}} style={styles.avatarStyle} />
                    ) : (
                        <ImgPlaceholder 
                            text={`${item?.title?.[0] ? Capitalize(item?.title?.[0]) : ""}`}
                        />
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

    const WHosOutItem = ({item} : {item : WhosOutListItem}) => {
        let bgColor, borderColor, textColor, btnColor;
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
                    item.avatar ? (
                        <Image source={{uri : item.avatar}} style={styles.avatarStyle} />
                    ) : (
                        <ImgPlaceholder 
                            text={`${item?.title?.[0] ? Capitalize(item?.title?.[0]) : ""}`}
                        />
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

    const RenderEmployeeComponent = ({item} : {item : useFetchEmployeesData}) => {
        const onPressHandler = () => {
            navigation.navigate("People",{screen : "MemberProfile",params : {member : item}})
        }
        return(
            <PersonCard item={item} onPressHandler={onPressHandler} />
        )
    } 

    const RenderListViewComponent = ({item} : {item : useFetchEmployeesData}) => {
        const onPressHandler = () => {
            navigation.navigate("People",{screen : "MemberProfile",params : {member : item}})
        }
        return(
            <PersonListComp item={item} onPressHandler={onPressHandler} />
        )
    }

    const KeyExtractor = (item : useFetchEmployeesData,index : number) => `${index}${item}`.toString()

    const changeListViewHandler = () => setIsListView(!isListView)

    const onRefreshHandler = () => {
        setPage(1)
        queryClient.invalidateQueries(GET_EMPLOYEES)
        queryClient.invalidateQueries(GET_MY_TEAM_MEMBERS)
    }

    const ListFooterComponent = ()=>{
        if(fetchingTeams || isFetching){
            return(
                <Container marginTop={3}>
                    <ActivityIndicator color={AppColors.green}/>
                </Container> 
            )
        }  
        return <React.Fragment></React.Fragment> 
    }

    const CelebrationKeyExtractor = (item : CelebrationItem,index : number) => `${index}${item}`.toString()
    const onEndReached = () => {
        if(
            (selected === "All" && (isFetching || !hasNextPage || fetchingTeams)) 
            || 
            (selected === "My Team" && (isFetching || !hasNextTeamPage || fetchingTeams))
        ) return
        setPage(page + 1)
    }

    

    return (
        <ScreenWrapper>
            <React.Fragment>
            <HomePageHeader 
                image={Images.people}
                header={"People"}
                rightIcon={!isListView ? "view-grid" : "format-list-bulleted"}
                onPressHandler={changeListViewHandler}
            />

            <Container style={styles.scrollViewContainer}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {tabs.map((item,index) => (
                        <TouchableWrapper 
                            onPress={() => {
                                setSearch("")
                                setSelected(item)
                                setPage(1)
                            }}
                            key={index}
                            isText
                            style={selected === item ? styles.selected_tab : styles.deselected_tab}
                            
                        >
                            <Text style={[styles.heading, selected == item && styles.selectedHeading]}>{item}</Text>
                        </TouchableWrapper>
                        ))}
                </ScrollView>
            </Container>
            <View style={styles.mainViewContainer}>
                {
                    selected === "All" && Platform.OS === "android" ? (
                        <View style={styles.searchBoxContainer}>
                            <SearchBox 
                                title="Search for Name " 
                                containerStyle={styles.searchBoxStyle}
                                onSubmitEditing={handleSearch}    
                                value={search}
                            />
                        </View>
                        ) : selected === "All" ? (
                            <View style={styles.searchBoxContainer}>
                                <SearchBoxIOS 
                                    title="Search for Name " 
                                    containerStyle={styles.searchBoxStyle}
                                    onSubmitEditing={handleSearch}  
                                    value={search}  
                                />
                            </View>
                        ) : null
                }
                {
                    page === 1 && (fetchingTeams || isFetching || activeANNFetching || upcomingANNFetching || whosoutLoading || loadingUpcomingBD || loadingActiveBD) ? <PageLoader /> : (
                        <React.Fragment>
                            {
                                selected === "Celebrations" && celebrations ? (
                                    <SectionList
                                    sections={celebrations && Array.isArray(celebrations) ? celebrations : []}
                                    keyExtractor={CelebrationKeyExtractor}
                                    renderItem={CelebrationItem}
                                    ItemSeparatorComponent={() => <View style={{margin: width(1)}} />}
                                    showsVerticalScrollIndicator={false}
                                    ListEmptyComponent={CelebrationListEmptyComponent}
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
                                (
                                    (selected === "All" || selected === "My Team") && personsList && Array.isArray(personsList) &&
                                    personsList.length === 0
                                ) ? (
                                    <EmptyStateWrapper 
                                        icon={Images.EmptyTeams}
                                        header_1={selected === "My Team" ? "You have no team" : "No record found"} 
                                        header_2={selected === "My Team" ? "member yet." : "for the search query."}
                                        sub_text={selected === "My Team" ? "When you do, they will show up here." : ""}
                                    />
                                ) : null
                            }
                            {
                                selected === "Who's Out" && Array.isArray(whosOut) &&
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
                                selected === "Who's Out" && Array.isArray(whosOut) && whosOut.length > 0 ? (
                                    <SectionList
                                        sections={whosOut}
                                        keyExtractor={(item,index) => `${index}${item}`.toString()}
                                        renderItem={WHosOutItem}
                                        ItemSeparatorComponent={() => <View style={{margin: width(1)}} />}
                                        showsVerticalScrollIndicator={false}
                                        renderSectionHeader={({ section }) => {
                                            return (
                                            <View style={[styles.headingContainer]}>
                                                <Text numberOfLines={1} style={styles.heading2}>{section.heading}</Text>
                                            </View>
                                            )}}
                                        />
                                ) : null 
                            }
                            
                            {
                                    (selected === "All" || selected === "My Team") && !isListView && personsList && Array.isArray(personsList) ? (
                                        <React.Fragment>
                                            <FlatList
                                                columnWrapperStyle={styles.column_wrapper}
                                                numColumns={2}
                                                data={personsList}
                                                keyExtractor={KeyExtractor}
                                                renderItem={RenderEmployeeComponent}
                                                ItemSeparatorComponent={() => <View style={[CommonStyles.marginTop_2]}/>}
                                                showsVerticalScrollIndicator={false}
                                                contentContainerStyle={styles.contentContainerStyle}
                                                onEndReached={onEndReached}
                                                ListFooterComponent={ListFooterComponent}
                                                refreshControl={<CustomRefreshControl 
                                                    loading={(fetchingTeams || isFetching) && page === 1}
                                                    onRefresh={onRefreshHandler}
                                                />}
                                            /> 
                                        </React.Fragment>
                                    ) : null
                                }
                            {
                                (selected === "All" || selected === "My Team") && isListView && personsList && Array.isArray(personsList) 
                                && personsList.length > 0
                                ? (  
                                        <React.Fragment>
                                            <FlatList
                                                data={personsList}
                                                keyExtractor={KeyExtractor}
                                                renderItem={RenderListViewComponent}
                                                ItemSeparatorComponent={() => <View style={styles.line}/>}
                                                showsVerticalScrollIndicator={false}
                                                nestedScrollEnabled={true}
                                                contentContainerStyle={styles.contentContainerStyle}
                                                ListFooterComponent={ListFooterComponent}
                                                onEndReached={onEndReached}
                                                refreshControl={<CustomRefreshControl 
                                                    loading={(fetchingTeams || isFetching) && page === 1}
                                                    onRefresh={onRefreshHandler}
                                                />}
                                            /> 
                                        </React.Fragment>
                                ) : null
                            }
                        </React.Fragment>
                    )
                }
            </View>
            </React.Fragment>
        </ScreenWrapper>
    )
}

