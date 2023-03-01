import React, { useEffect, useState } from 'react';
import { ColorList } from '../../utills/AppColors';
import { CloseHandler, Container, H1, P, Rounded, ImgPlaceholder } from '../../utills/components'
import { FlatList, Modal, View, Image, Text } from 'react-native';
import PersonListComp, { DeptListComp } from '../PersonListComp/index';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { width, height } from 'react-native-dimension';
import styles from './styles'
import CommonStyles from '../../utills/CommonStyles';
import { useFetchDepartments, useFetchEmployees } from '../../utills/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Images } from '../../component2/image/Image';



const CustomListModal = ({ open, setOpen, onPressHandler }) => {
    const [options, setOptions] = useState(true)
    const [deptPage, setDeptPage] = useState(1)
    const [page, setPage] = useState(1)
    const [searchDeptTerm, setSearchDeptTerm] = useState('')
    const [employees, setEmployees] = useState([])
    const [departments, setDepartments] = useState([])
    const [search, setSearch] = useState('')
    const [employeeList, setEmployeeList] = useState(false)
    const [deptList, setDeptList] = useState(false)
    const [tab, setTab] = useState('Employees');



    const RenderItem = ({ item }) => {
        return (
            <PersonListComp item={item}
                onPressHandle={() => {
                    onPressHandler({ ...item, type: "Employee" })
                }}
            />
        )
    }

    const RenderDept = ({ item }) => {
        return (
            <DeptListComp item={item}
                onPressHandle={() => {
                    onPressHandler({ ...item, type: "Departments" })
                }}
            />
        )
    }


    const {
        data: employeeData,
        hasNextPage: hasNextEmployees,
        isFetchingNextPage: fetchingNextEmployees,
        loading: empLoading
    } = useFetchEmployees(page, search)

    const {
        data: departmentData,
        isFetching: fetchingDepartments,
        isFetchingNextPage: fetchingNextDepartments,
        loading: loadingDept
    } = useFetchDepartments(deptPage, searchDeptTerm)

    const __flattenArr = (param) => {
        let flattenedArr = []
        if (param === "employee" && employeeData && employeeData?.pages && Array.isArray(employeeData?.pages)) {
            flattenedArr = employeeData?.pages
        }
        if (param === "departments" && departmentData && departmentData?.pages && Array.isArray(departmentData?.pages)) {
            flattenedArr = departmentData?.pages
        }
        let flattenArr = flattenedArr.map((res) => {
            if (!res) return {}
            return res.results
        })
        let arr = flattenArr.flat()

        if (param === "employee")
            page > 1 ? setEmployees([...employees, ...arr]) : setEmployees(arr)

        if (param === "departments")
            return deptPage > 1 ? setDepartments([...departments, ...arr]) : setDepartments(arr)

    }

    const loadMore = () => {
        if (hasNextEmployees && !empLoading)
            setPage(page + 1)
    }
    const footerLoader = () => {
        return (
            <Container marginTop={3}>
                <ActivityIndicator size={width(10)} color={ColorList[Math.floor(Math.random() * 4)]} />
            </Container>
        )

    }
    const RenderItems = ({ item }) => {

        return (
            <TouchableOpacity onPress={() => setSearch(item)}>
                <ImgPlaceholder text={item}
                    size={15} />
            </TouchableOpacity>
        )
    }
    console.log('search', search)
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));

    useEffect(() => {
        __flattenArr('employee')
    }, [employeeData])

    useEffect(() => {
        __flattenArr('departments')
    }, [fetchingDepartments, fetchingNextDepartments])

    return (
        <Modal
            visible={open}>
            <Container style={styles.container}>
                <View style={styles.close}>
                    <CloseHandler
                        setOpen={setOpen} position={'center'} onPress={() => {
                            setOpen(false)
                        }} />
                    <P style={styles.text}>Done</P>
                </View>

                <View style={styles.twoButtonCont}>
                    {
                        ['Employees', 'Departments'].map((item, i) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setTab(item)

                                    if (item === 'Employee')
                                        return setEmployeeList(true)
                                    if (item === "Departments")
                                        return setDeptList(true)
                                    onPressHandler({ name: item, type: "Me" })
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
                <Container>
                    <View style={styles.containerA}>
                        <View>
                            {tab === "Employees" ? <Text numberOfLines={1} style={styles.headerTitle}>
                                Find People
                            </Text> : <Text numberOfLines={1} style={styles.headerTitle}>
                                Find Department
                            </Text>
                            }
                        </View>
                    </View>

                    <View style={styles.search}>
                        <TouchableOpacity style={styles.searchView}>
                            <Image source={{ uri: Images.SearchIcon }} style={styles.searchBoxStyle} />
                        </TouchableOpacity>
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
                </Container>
                {
                    loadingDept || empLoading && <ActivityIndicator size={width(10)} color={AppColors.green} />
                }

                <Container>
                    {tab === "Employees" &&
                        <>
                            <View style={styles.containerA}>
                                <H1 fontSize={3.3} color={'#878787'}>Recent Searches</H1>
                                <TouchableOpacity onPress={() => {
                                    setSearch('')
                                    setPage(1)
                                }}>
                                    <P style={styles.btnText}>Clear</P>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.line} />
                        </>
                    }
                </Container>
                <KeyboardAwareScrollView>

                    <P style={styles.people}>People</P>
                    {
                        tab === 'Employees' ?
                            <React.Fragment>
                                <FlatList
                                    data={employees}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={RenderItem}
                                    ItemSeparatorComponent={() => <View style={styles.line1} />}
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled={true}
                                    contentContainerStyle={[styles.flatlist, { paddingBottom: height(40), paddingHorizontal: width(5) }]}
                                    onEndReachedThreshold={0.1}
                                    onEndReached={loadMore}
                                    refreshing={false}
                                    onRefresh={async () => {
                                        await storePage("page", 1)

                                    }}
                                    ListFooterComponent={fetchingNextEmployees || hasNextEmployees ? footerLoader : null}
                                />
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <FlatList
                                    data={departments}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={RenderDept}
                                    ItemSeparatorComponent={() => <View style={styles.line} />}
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled={true}
                                    contentContainerStyle={[styles.flatlist, { paddingBottom: height(40), paddingHorizontal: width(5) }]}
                                    onEndReachedThreshold={0.1}
                                />
                            </React.Fragment>

                    }
                </KeyboardAwareScrollView>

            </Container>

        </Modal>
    )
}



export default CustomListModal;
