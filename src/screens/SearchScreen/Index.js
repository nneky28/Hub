import { View, Text, FlatList, Platform, ActivityIndicator, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './styles'
import { CloseHandler, Container, P, Rounded, H1, BackHandler, ImgPlaceholder, } from '../../utills/components';
import SearchBox, { SearchBoxIOS, SearchBoxIOSWithout, SearchBoxWithout } from '../../components/SearchBox/index';
import CommonStyles from '../../utills/CommonStyles';
import AppColors, { ColorList } from '../../utills/AppColors';
import PersonListComp, { DeptListComp } from '../../components/PersonListComp/index';
import { useFetchEmployees, useFetchTeams, useFetchDepartments } from '../../utills/api';
import { arrowIcon } from '../../assets/images'
import Button from '../../components/Button';
import { Capitalize, getData } from '../../utills/Methods';
import { height, width } from 'react-native-dimension';
import ScreenWrapper from '../../components/ScreenWrapper/index';
import { Images } from '../../component2/image/Image';



const PeopleList = ({ navigation, route, onPressHandler }) => {
    const { team, people, focus, } = route.params
    const [myTeam, setMyTeam] = useState({})
    const [item, setItem] = useState([])
    const [teamItem, setTeamItem] = useState([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [teampage, setTeamPage] = useState(1)
    const [id, setId] = useState(false)
    const [tab, setTab] = useState('Employees');
    const [employeeList, setEmployeeList] = useState(false)
    const [deptList, setDeptList] = useState(false)
    const [deptPage, setDeptPage] = useState(1)
    const [departments, setDepartments] = useState([])
    const [searchDeptTerm, setSearchDeptTerm] = useState('')


    const {
        data: data,
        hasNextPage: hasNextPage,
        loading: loading,
        isFetchingNextPage: isFetchingNextPage
    } = useFetchEmployees(page, search)

    const {
        data: teamData,
        loading: loadingTeam,
    } = useFetchTeams(page, id)
    const {
        data: departmentData,
        isFetching: fetchingDepartments,
        isFetchingNextPage: fetchingNextDepartments,
    } = useFetchDepartments(deptPage, searchDeptTerm)

    const RenderItem = ({ item }) => {
        return (
            <PersonListComp item={item}
                onPressHandle={() => navigation.navigate("profile", { item })}
            />
        )
    }
    const aboutMe = async () => {
        let details = await getData("about_me");
        setMyTeam(details)
    }

    const RenderDept = ({ item }) => {
        return (
            <DeptListComp item={item}
                onPressHandle={() => navigation.navigate("profile", { item, departments })}
            />
        )
    }
    const loadMore = () => {
        if (hasNextPage && !loading)
            setPage(page + 1)
    }
    const footerLoader = () => {
        return (
            <Container
                alignSelf={'center'}
                width={30} marginTop={3}>
                <ActivityIndicator size={width(10)} color={AppColors.green} />
            </Container>
        )
    }
    const listEmptyState = () => {
        return (
            <View style={styles.emptyState}>
                <P>
                    There are no people in your company.
                </P>
                <P>
                    Adding people will enable you assign tasks directly to people or department
                </P>
            </View>
        )
    }

    const __flattenArr = (param) => {
        let flattenedArr = []
        if (param === "people" && data && data?.pages && Array.isArray(data?.pages)) {
            flattenedArr = data?.pages
        }
        if (param === "team" && teamData && teamData?.pages && Array.isArray(teamData?.pages)) {
            flattenedArr = teamData?.pages
        }
        if (param === "departments" && departmentData && departmentData?.pages && Array.isArray(departmentData?.pages)) {
            flattenedArr = departmentData?.pages
        }
        let flattenArr = flattenedArr.map((res) => {
            if (!res) return {}
            return res.results
        })
        let arr = flattenArr.flat()

        if (param === "people")
            page > 1 ? setItem([...item, ...arr]) : setItem(arr)

        if (param === "team")
            teampage > 1 ? setTeamItem([...teamData, ...arr]) : setTeamItem(arr)

        if (param === "departments")
            return deptPage > 1 ? setDepartments([...departments, ...arr]) : setDepartments(arr)
    }


    const handleSearch = (item) => {
        setSearch(item)
        setPage(1)
    }

    useEffect(() => {
        __flattenArr('people')
    }, [data])

    useEffect(() => {
        __flattenArr('team')
    }, [teamData])

    useEffect(() => {
        __flattenArr('departments')
    }, [fetchingDepartments, fetchingNextDepartments])



    useEffect(() => {
        setPage(1)
        setSearch("")
    }, [tab])

    useEffect(() => {
        aboutMe()
    }, [tab])
    // console.log('dept', departments)

    return (
        <View
            style={styles.wrapper}>
            {
                loading || loadingTeam && <ActivityIndicator size={width(10)} color={AppColors.green} />
            }

            <View style={styles.containerView}>
                <View style={styles.header}>
                    <CloseHandler onPress={() => navigation.goBack()} />
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <P style={CommonStyles.marginRight_8}>Done</P>
                    </TouchableOpacity>
                </View>

                <View style={styles.twoButtonCont}>
                    {
                        ['Employees', 'Departments'].map((item, i) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setTab(item)
                                }
                                }
                                style={styles.button3}
                                activeOpacity={1}
                                key={i}
                            >
                                <Text style={[styles.buttonText, tab == item && styles.buttonText1]}>
                                    {item}
                                </Text>
                                {tab == item && <View style={styles.animatedView3} />}
                            </TouchableOpacity>
                        ))
                    }
                </View>

                {
                    Platform.OS === "android" ? (
                        <View style={styles.searchBoxContainer}>
                            <SearchBoxWithout
                                title="Search by name"
                                containerStyle={styles.searchBoxStyle}
                                onSubmitEditing={handleSearch}
                                value={search}
                                autoFocus={focus ? true : false}
                            />
                        </View>
                    ) : Platform.OS === 'ios' ? (
                        <View style={styles.searchBoxContainer}>
                            <SearchBoxIOSWithout
                                title="Search by name"
                                containerStyle={styles.searchBoxStyle}
                                onSubmitEditing={handleSearch}
                                value={search}
                                autoFocus={focus ? true : false}
                            />

                        </View>
                    ) : null
                }

                {
                    tab === "Employees" ?
                        <React.Fragment>
                            <View style={styles.team} >
                                <View style={styles.container}>
                                    <H1 fontSize={3.3}>Team Members</H1>
                                </View>
                                <FlatList
                                    data={teamItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={RenderItem}
                                    ItemSeparatorComponent={() => <View style={styles.line} />}
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled={true}
                                    contentContainerStyle={[CommonStyles.marginLeft_5, { paddingBottom: height(5) }]}
                                // ListEmptyComponent={listEmptyState}
                                />
                            </View>

                            <View style={styles.container}>
                                <H1 fontSize={3.3}>People</H1>
                            </View>
                            <FlatList
                                data={item}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={RenderItem}
                                ItemSeparatorComponent={() => <View style={styles.line} />}
                                showsVerticalScrollIndicator={false}
                                nestedScrollEnabled={true}
                                contentContainerStyle={[CommonStyles.marginTop_1, CommonStyles.marginLeft_5, { paddingBottom: height(100) }]}
                                onEndReachedThreshold={0.1}
                                onEndReached={loadMore}
                                refreshing={false}
                                ListFooterComponent={isFetchingNextPage || hasNextPage ? footerLoader : null}

                            />
                        </React.Fragment> :
                        (<React.Fragment>
                            <View style={[CommonStyles.marginTop_3, CommonStyles.marginLeft_5,]}>
                                <H1 fontSize={3.3}>Your Team</H1>

                                <DeptListComp item={myTeam?.department}
                                // onPressHandle={() => navigation.navigate("profile", { item, departments })}
                                />

                            </View>
                            <View style={styles.container}>
                                <H1 fontSize={3.3}>Department</H1>
                            </View>

                            <FlatList
                                data={departments}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={RenderDept}
                                ItemSeparatorComponent={() => <View style={styles.line} />}
                                showsVerticalScrollIndicator={false}
                                nestedScrollEnabled={true}
                                contentContainerStyle={[CommonStyles.marginLeft_5, { paddingBottom: height(100) }]}
                                onEndReachedThreshold={0.1}

                            />
                        </React.Fragment>)
                }



            </View>


        </View>


    )
}
export default PeopleList




