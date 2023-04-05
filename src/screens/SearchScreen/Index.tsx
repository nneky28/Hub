import { View, Text, FlatList, Platform, ActivityIndicator, TouchableOpacity, SectionList } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './styles'
import { CloseHandler, Container, P,  H1 } from '../../utills/components';
import SearchBox,{SearchBoxIOS} from '../../components/SearchBox/index';
import CommonStyles from '../../utills/CommonStyles';
import AppColors from '../../utills/AppColors';
import PersonListComp, { DeptListComp } from '../../components/PersonListComp/index';
import { useFetchEmployees, useFetchTeams, useFetchDepartments } from '../../utills/api';
import {  getData } from '../../utills/Methods';
import { height, width } from 'react-native-dimension';




interface Props {
    navigation: any;
    onPressHandler: () => void;
    item:any
  }
  


const PeopleList: React.FC<Props> = ({ navigation }) => {
  const [myTeam, setMyTeam] = useState({name : ""})
  const [item, setItem] = useState<Array<any>>([]);
  const [teamItem, setTeamItem] = useState<Array<any>>([]);
  const [page, setPage] = useState<number>(1);
  const [teamPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [id] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("Employees");
  const [deptPage] = useState<number>(1);
  const [departments, setDepartments] = useState<Array<any>>([]);
  const [searchDeptTerm] = useState<string>("");
  const combinedState = [...teamItem, ...item];


    const {
        data: data,
        hasNextPage: hasNextPage,
        isLoading: loading,
        isFetchingNextPage: isFetchingNextPage
    } = useFetchEmployees(page, search)

    const {
        data: teamData,
    } = useFetchTeams(teamPage, id)

    const {
        data: departmentData,
        isFetching: fetchingDepartments,
        isFetchingNextPage: fetchingNextDepartments,
    } = useFetchDepartments(deptPage, searchDeptTerm)


    const RenderItem = ({ item }:{item:any}) => {
        return (
          <PersonListComp
            item={item}
            onPressHandle={() =>
              navigation.navigate("profile", { item })
            }
          />
        );
      };
    
    
    
      const RenderDept = ({ item }:{item:any}) => {
        return (
          <DeptListComp
            item={item}
            onPressHandle={() =>
              navigation.navigate("profile", { item, departments })
            }
          />
        );
      };
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

    const __flattenArr = (param:string) => {
        let flattenedArr = [];
        if (param === "departments" && departmentData && departmentData?.pages && Array.isArray(departmentData?.pages)) {
            flattenedArr = departmentData?.pages
        }
        let flattenArr = flattenedArr.map((res) => {
            if (!res) return {}
            return res.results
        })
        let arr = flattenArr.flat()
        if (param === "departments")
            return deptPage > 1 ? setDepartments([...departments, ...arr]) : setDepartments(arr)
    }

    const flattenAndMapData = (data:any, type:string) => {
        let flattenedArr = [];
        if (data && data.pages && Array.isArray(data.pages)) {
            flattenedArr = data.pages;
        }
        flattenedArr = flattenedArr
            .map((res:any) => {
                if (!res) return {};
                return res.results;
            })
            .map((item:any) => item.filter((employee:any) => employee.status === "active"))
            .map((item:any, i:number) => {
                return {
                    key: i,
                    title: type,
                    data: item.map((employee:any) => {
                        return {
                            id: employee.id,
                            first_name: employee.first_name,
                            last_name: employee.last_name,
                            photo: employee.photo,
                            job: employee?.job
                        };
                    }),
                };
            });

        if (type === "Others")
            page > 1 ? setItem([...item, ...flattenedArr]) : setItem(flattenedArr)
        return flattenedArr;
    };


    useEffect(() => {
        const formattedData = flattenAndMapData(data, 'Others');
        setItem(formattedData);
    }, [data]);

    useEffect(() => {
        const formattedData = flattenAndMapData(teamData, 'Team Members');
        setTeamItem(formattedData);
    }, [teamData]);

    const handleSearch = (item:string) => {
        setSearch(item)
        setPage(1)
    }
    const aboutMe = async () => {
        let details = await getData("about_me");
      setMyTeam(details?.department);
    };

  

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

console.log("myTeam",myTeam)
    return (
        <View
            style={styles.wrapper}>
            {
                loading && <ActivityIndicator size={width(10)} color={AppColors.green} />
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
                            <SearchBox
                                title="Search by name"
                                containerStyle={styles.searchBoxStyle}
                                onSubmitEditing={handleSearch}
                                value={search}
                            />
                        </View>
                    ) : Platform.OS === 'ios' ? (
                        <View style={styles.searchBoxContainer}>
                            <SearchBoxIOS
                                title="Search by name"
                                containerStyle={styles.searchBoxStyle}
                                onSubmitEditing={handleSearch}
                                value={search}
                            />

                        </View>
                    ) : null
                }

                {
                    tab === "Employees" ?
                        <View>
                            {item && Array.isArray(item) && !loading && (
                                <SectionList
                                    sections={combinedState}
                                    renderItem={RenderItem}
                                    contentContainerStyle={[CommonStyles.marginLeft_5, { paddingBottom: height(30) }]}
                                    renderSectionHeader={({ section }) => {
                                        return (
                                            <View>
                                                <H1 numberOfLines={1} style={styles.container}>{section?.title}</H1>
                                            </View>
                                        )
                                    }}
                                    keyExtractor={(index) => index.toString()}
                                    ListFooterComponent={
                                        isFetchingNextPage || hasNextPage ? footerLoader : null
                                    }
                                    onEndReachedThreshold={0.1}
                                    onEndReached={loadMore}
                                />
                            )}
                        </View> :
                        <View>
                            <View style={[CommonStyles.marginTop_3, CommonStyles.marginLeft_5,]}>
                                <H1 style={CommonStyles.marginBottom_2} fontSize={3.3}>Your Team</H1>
                            <DeptListComp item={myTeam}
                                      onPressHandle={() => null}
                                />
                            </View>
                            <View style={[CommonStyles.marginBottom_2, CommonStyles.marginTop_1, CommonStyles.marginLeft_5,]}>
                                <H1 fontSize={3.3}>Department</H1>
                            </View>

                            <FlatList
                                data={departments}
                                keyExtractor={(id) => id.toString()}
                                renderItem={RenderDept}
                                ItemSeparatorComponent={() => <View style={styles.line} />}
                                showsVerticalScrollIndicator={false}
                                nestedScrollEnabled={true}
                                contentContainerStyle={[CommonStyles.marginLeft_5, { paddingBottom: height(10) }]}
                                onEndReachedThreshold={0.1}

                            />
                        </View>
                }

            </View>
        </View>


    )
}
export default PeopleList




