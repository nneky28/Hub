import React, { useEffect, useState } from 'react';
import AppColors, { ColorList } from '../../utills/AppColors';
import { CloseHandler, Container, H1, P, Rounded, ImgPlaceholder } from '../../utills/components'
import { FlatList, Modal, View, Image, Text } from 'react-native';
import PersonListComp, { DeptListComp } from '../PersonListComp/index';
import { ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { width, height } from 'react-native-dimension';
import styles from './styles'
import CommonStyles from '../../utills/CommonStyles';
import { useFetchDepartments, useFetchEmployees } from '../../utills/api';
import { Images } from '../../utills/Image';
import { showFlashMessage } from '../SuccessFlash/index';



const CustomList = ({ open, setOpen, onPressHandler }) => {

    const [tab, setTab] = useState('Employees');
    const [options, setOptions] = useState(true)
    const [deptPage, setDeptPage] = useState(1)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const [searchDeptTerm, setSearchDeptTerm] = useState('')
    const [employees, setEmployees] = useState([])
    const [departments, setDepartments] = useState([])
    const [employeeList, setEmployeeList] = useState(false)
    const [deptList, setDeptList] = useState(false)



    const RenderItem = ({ item }) => {
        return (
            <PersonListComp item={item}
                onPressHandle={() => {
                    onPressHandler({ ...item, type: "Employee", assigned_to: item.id })
                }}
            />
        )
    }
    const RenderDept = ({ item }) => {
        return (
            <DeptListComp item={item}
                onPressHandle={() => {
                    onPressHandler({ ...item, type: "Departments", assigned_to: item.id })
                }}
            />
        )
    }
    const {
        data: data,
        hasNextPage: hasNextPage,
        isFetchingNextPage: isFetchingNextPage,
        loading
    } = useFetchEmployees(page, search)


    const {
        data: departmentData,
        isFetching: fetchingDepartments,
        isFetchingNextPage: fetchingNextDepartments,
    } = useFetchDepartments(deptPage, searchDeptTerm)

    const __flattenArr = (param) => {
        let flattenedArr = []
        if (param === "people" && data && data?.pages && Array.isArray(data?.pages)) {
            flattenedArr = data?.pages
        }
        if (param === "departments" && departmentData && departmentData?.pages && Array.isArray(departmentData?.pages)) {
            flattenedArr = departmentData?.pages
        }
        let flattenArr = flattenedArr.map((res) => {
            if (!res) return {}
            return res.results
        })
        let arr = flattenArr.flat()
        if (param === "people") {
            const activeEmployees = arr.filter((emp) => emp.status === "active");
            page > 1
                ? setEmployees([...employees, ...activeEmployees])
                : setEmployees(activeEmployees);
        }

        if (param === "departments")
            return deptPage > 1 ? setDepartments([...departments, ...arr]) : setDepartments(arr)
    }
    console.log("Data", employees)

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


    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));

    const RenderItems = ({ item }) => {

        return (
            <TouchableOpacity
                onPress={() => {
                    setPage(1)
                    setSearch(item)

                    if (!search && !loading) {
                        setPage(1)

                    }
                }}>
                <ImgPlaceholder text={item} size={15} />
            </TouchableOpacity>
        )
    }
    useEffect(() => {
        __flattenArr('people')
    }, [data])

    useEffect(() => {
        setPage(1)
        setSearch("")
    }, [tab])

    useEffect(() => {
        __flattenArr('departments')
    }, [fetchingDepartments, fetchingNextDepartments])


    return (
        <Modal visible={open}>
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
                                    if (item === "Me")
                                        return onPressHandler({ name: item, type: "Me" })
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


                <Container>

                </Container>
                <ScrollView>
                    {tab === "Employees" ?
                        <P style={styles.people}>People</P> :
                        <P style={styles.people}>Departments</P>
                    }

                    {
                        loading && <ActivityIndicator size={width(20)} color={AppColors.green} />
                    }



                    {data && Array.isArray(data) &&
                        data.length === 0 && !loading ?
                        <View style={styles.emptyState}>
                            <P>
                                There are no people in your company.
                            </P>
                            <P>
                                Adding people will enable you assign tasks directly to people or department
                            </P>
                        </View>
                        : null
                    }

                    {
                        tab === 'Employees' ?
                            (<React.Fragment>
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
                                    ListFooterComponent={isFetchingNextPage || hasNextPage || loading ? footerLoader : null}
                                />
                            </React.Fragment>)
                            :
                            (<React.Fragment>
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
                            </React.Fragment>)

                    }
                </ScrollView>

            </Container>

        </Modal>
    )
}



export default CustomList;
