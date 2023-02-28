import { View, Text, FlatList, Platform, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './styles'
import { CloseHandler, Container, P, Rounded, H1, BackHandler, ImgPlaceholder, } from '../../utills/components';
import SearchBox, { SearchBoxIOS, SearchBoxIOSWithout, SearchBoxWithout } from '../../components/SearchBox/index';
import CommonStyles from '../../utills/CommonStyles';
import AppColors, { ColorList } from '../../utills/AppColors';
import PersonListComp from '../../components/PersonListComp/index';
import { useFetchEmployees, useFetchTeams } from '../../utills/api';
import { arrowIcon } from '../../assets/images'
import Button from '../../components/Button';
import { Capitalize } from '../../utills/Methods';
import { height, width } from 'react-native-dimension';
import ScreenWrapper from '../../components/ScreenWrapper/index';
import { borderColor } from 'styled-system';
import { Images } from '../../component2/image/Image';



const PeopleList = ({ navigation, route }) => {
    const { team, people } = route.params
    const [item, setItem] = useState([])
    const [teamItem, setTeamItem] = useState([])
    const [page, setPage] = useState(1)
    const [teampage, setTeamPage] = useState(1)
    const [id, setId] = useState(false)
    const [search, setSearch] = useState('')

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

    const RenderItem = ({ item }) => {
        return (
            <PersonListComp item={item}
                onPressHandle={() => navigation.navigate("profile", { item })}
            />
        )
    }
    const teamItems = ({ item }) => {
        return (
            <View
                style={styles.listItemContainer}>
                <View style={styles.rowPart}>
                    {
                        item.photo ? (
                            <Image source={{ uri: item.photo }} style={styles.avatarStyle} />
                        ) : (
                            // <Rounded backgroundColor={ColorList[Math.floor(Math.random() * 4)]} size={12}>
                            //     <H1>
                            //         {item && item.first_name && item.first_name.length > 0 ? Capitalize([...item.first_name][0]) : ""}
                            //         {item && item.last_name && item.first_name.length > 0 ? `${Capitalize([...item.last_name][0])}` : ""}
                            //     </H1>
                            //     </Rounded>
                            <ImgPlaceholder text={`${item && item.first_name && item.first_name.length > 0 ? Capitalize([...item.first_name][0]) : ""}${item && item.last_name && item.first_name.length > 0 ? `${Capitalize([...item.last_name][0])}` : ""}`}
                                size={12} />
                        )
                    }
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText}>
                            {item && item.first_name ? Capitalize(item.first_name) : ""} {" "}
                            {item && item.last_name ? Capitalize(item.last_name) : ""}
                        </Text>
                        <Text style={styles.subText}>{item.job && item.job.title ? Capitalize(item.job.title) : ""}</Text>
                    </View>
                </View>

                <View>
                    <Button
                        title="View tasks"
                        textStyle={styles.buttonText}
                        containerStyle={styles.button}
                        onPress={() => navigation.navigate('profile', {
                            item,
                        })
                        }
                    />
                </View>


            </View>
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

    const __flattenArr = (param) => {
        let flattenedArr = []
        if (param === "people" && data && data?.pages && Array.isArray(data?.pages)) {
            flattenedArr = data?.pages
        }
        if (param === "team" && teamData && teamData?.pages && Array.isArray(teamData?.pages)) {
            flattenedArr = teamData?.pages
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


    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));

    const RenderItems = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => setSearch(item)} >
                {/* <Rounded
                    marginRight={3}
                    backgroundColor={ColorList[Math.floor(Math.random() * 4)]}>
                    <H1 style={styles.team}>
                        {item}
                    </H1>
                </Rounded> */}
                <ImgPlaceholder text={item} size={15} />
            </TouchableOpacity>
        )
    }

    return (
        <Container backgroundColor='#F5F5F5'>

            {
                team &&
                <React.Fragment>
                    <View style={{ backgroundColor: AppColors.white, marginTop: height(4) }}>
                        <View style={styles.header}>
                            <View style={{ marginLeft: width(2) }}>
                                <BackHandler position={'center'} />
                            </View>
                            <Text numberOfLines={1} style={styles.screenTitle}>Team Members</Text>
                            <View style={{ width: width(13) }} />
                        </View>
                        <View style={styles.line} />
                    </View>


                    <View style={[CommonStyles.marginTop_1, CommonStyles.marginBottom_3]}>
                        {
                            Platform.OS === 'android' ?
                                <>
                                    <View style={styles.searchBox}>
                                        <SearchBox
                                            title="Search by name "
                                            containerStyle={styles.searchBox}
                                            onSubmitEditing={handleSearch}
                                        />
                                        <TouchableOpacity style={styles.filterIconContainer}>
                                            <Image resizeMode="contain" source={{ uri: Images.FilterArrow }} style={styles.filterIcon} />
                                        </TouchableOpacity>
                                    </View>
                                </> : Platform.OS === 'ios' ?
                                    <View style={styles.searchBox}>
                                        <SearchBoxIOS
                                            title="Search by name "
                                            containerStyle={styles.searchBox}
                                            onSubmitEditing={handleSearch}
                                        />
                                        <TouchableOpacity style={styles.filterIconContainerIOS}>
                                            <Image resizeMode="contain" source={{ uri: Images.FilterArrow }} style={styles.filterIconIOS} />
                                        </TouchableOpacity>
                                    </View> : null
                        }
                    </View>
                    <FlatList
                        data={teamItem}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={teamItems}
                        ItemSeparatorComponent={() => <View style={styles.line} />}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        contentContainerStyle={[CommonStyles.marginTop_1]}
                    />

                </React.Fragment>
            }

            {
                loading || loadingTeam && <ActivityIndicator size={width(10)} color={AppColors.green} />
            }


            {people && <View style={styles.containerView}>

                <View style={styles.header}>
                    <CloseHandler onPress={() => navigation.goBack()} />

                    <Text numberOfLines={1} style={styles.screenTitle}>
                        Search
                    </Text>
                    <View style={{ width: width(10) }} />
                </View>
                {
                    Platform.OS === "android" ? (
                        <View style={styles.searchBoxContainer}>
                            <SearchBoxWithout
                                title="Search for People"
                                containerStyle={styles.searchBoxStyle}
                                onSubmitEditing={handleSearch}
                                value={search}
                            />
                        </View>
                    ) : Platform.OS === 'ios' ? (
                        <View style={styles.searchBoxContainer}>
                            <SearchBoxIOSWithout
                                title="Search for People"
                                containerStyle={styles.searchBoxStyle}
                                onSubmitEditing={handleSearch}
                                value={search}
                            />

                        </View>
                    ) : null
                }
                <View>
                    <View style={styles.container}>
                        <P color={'#A8A8A8'}>Filter</P>
                        <TouchableOpacity onPress={() => {
                            setSearch(" ")
                            setPage(1)
                        }}>
                            <P style={styles.btnText}>Clear</P>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={alphabet}
                        horizontal
                        renderItem={RenderItems}
                        ItemSeparatorComponent={() => <View style={[CommonStyles.marginRight_3]} />}
                        showsHorizontalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        style={styles.team}
                    />
                </View>

                <View>
                    <View style={styles.container}>
                        <P color={AppColors.black1}>Recent Searches</P>
                        <TouchableOpacity onPress={() => {
                            setSearch(" ")
                            setPage(1)
                        }}>
                            <P style={styles.btnText}>Clear</P>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line} />
                </View>

                <View>
                    <View style={styles.container}>
                        <P color={'#A8A8A8'}>People</P>
                    </View>
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
                    onRefresh={async () => {
                        await storePage("page", 1)

                    }}
                    ListFooterComponent={isFetchingNextPage || hasNextPage ? footerLoader : null}
                />
            </View>
            }

        </Container>


    )
}
export default PeopleList




