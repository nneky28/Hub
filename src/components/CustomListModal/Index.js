import React, { useEffect, useState } from 'react';
import AppColors, { ColorList } from '../../utills/AppColors';
import { CloseHandler, Container, H1, P, Rounded, TouchableWrapper } from '../../utills/components'
import { FlatList, Modal, View, Image, Text } from 'react-native';
import PersonListComp, { DeptListComp } from '../PersonListComp/index';
import SearchBox, { SearchBoxIOS } from '../SearchBox/index';
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
    const [empPage, setEmpPage] = useState(1)
    const [searchDeptTerm, setSearchDeptTerm] = useState('')
    const [employees, setEmployees] = useState([])
    const [departments, setDepartments] = useState([])
    const [searchEmp, setSearchEmp] = useState("")
    const [employeeList, setEmployeeList] = useState(false)
    const [deptList, setDeptList] = useState(false)
    const [tab, setTab] = useState('Employees');
    const [selected, setSelected] = useState('')

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



    const handleSearch = (text) => {
        setSearchEmp(text)
        setEmpPage(1)

    }


    const {
        data: employeeData,
        hasNextPage: hasNextEmployees,
        isFetchingNextPage: fetchingNextEmployees,
        loading: empLoading
    } = useFetchEmployees(empPage, searchEmp)



    const {
        data: departmentData,
        isFetching: fetchingDepartments,
        isFetchingNextPage: fetchingNextDepartments,
    } = useFetchDepartments(deptPage, searchDeptTerm)

    // console.log('department', departmentData?.pages)

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
            empPage > 1 ? setEmployees([...employees, ...arr]) : setEmployees(arr)


        if (param === "departments")
            return deptPage > 1 ? setDepartments([...departments, ...arr]) : setDepartments(arr)

    }

    const loadMore = () => {
        if (hasNextEmployees && !empLoading)
            setEmpPage(empPage + 1)
    }
    const footerLoader = () => {
        return (
            <Container marginTop={3}>
                <ActivityIndicator size={width(10)} color={ColorList[Math.floor(Math.random() * 4)]} />
            </Container>
        )

    }
    const RenderItems = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => setSelected(index, item)}>
                <Rounded
                    marginRight={3}
                    backgroundColor={ColorList[Math.floor(Math.random() * 4)]}>
                    <H1 fontSize={5} style={styles.team}>
                        {item}
                    </H1>
                </Rounded>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        __flattenArr('employee')
    }, [employeeData])

    useEffect(() => {
        __flattenArr('departments')
    }, [fetchingDepartments, fetchingNextDepartments])


    console.log('dept', departments)
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
                        <TouchableOpacity style={styles.searchView}
                            onPress={handleSearch} >
                            <Image source={{ uri: Images.SearchIcon }} style={styles.searchBoxStyle} />
                        </TouchableOpacity>
                        <FlatList
                            data={
                                ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
                            }
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
                    {tab === "Employees" &&
                        <>
                            <View style={styles.containerA}>
                                <H1 fontSize={3.3} color={'#878787'}>Recent Searches</H1>
                                <TouchableOpacity onPress={() => setEmpPage(1)}>
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
                                // onEndReached={loadMore}
                                // refreshing={false}
                                // onRefresh={async () => {
                                //     await storePage("page", 1)

                                // }}
                                // ListFooterComponent={fetchingNextEmployees || hasNextEmployees ? footerLoader : null}
                                />
                            </React.Fragment>

                    }
                </KeyboardAwareScrollView>

            </Container>

        </Modal>
    )
}



export default React.memo(CustomListModal)
