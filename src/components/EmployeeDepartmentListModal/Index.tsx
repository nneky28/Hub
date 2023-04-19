import React, { useEffect, useState } from 'react';
import AppColors from '../../utills/AppColors';
import {Container,ImgPlaceholder, useDebounce, H1 } from '../../utills/components'
import { FlatList, Modal, View, Text } from 'react-native';
import PersonListComp from '../PersonListComp/index';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { width } from 'react-native-dimension';
import styles from './styles'
import CommonStyles from '../../utills/CommonStyles';
import { useFetchDepartments, useFetchEmployees } from '../../utills/api';
import { EmployeeDepartmentListModalProps, Tab } from './types';
import CustomIconButton from '../CustomIconButton';
import { useFetchEmployeesData, useFetchEmployeesProps } from '../../screens/People/types';
import { useFetchDepartmentsData, useFetchDepartmentsProps } from '../../screens/TaskPeopleList/types';
import { __flatten } from '../../utills/Methods';
import DeptListComp from '../DepartmentListComp';
import SearchBox from '../SearchBox';



const EmployeeDepartmentListModal = ({ open, onHide, onPressHandler } : EmployeeDepartmentListModalProps) => {
    
    const [tab, setTab] = useState<Tab>('Employees');
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const searchTerm = useDebounce(search,200)
    const [employees, setEmployees] = useState<useFetchEmployeesData[]>([])
    const [departments, setDepartments] = useState<useFetchDepartmentsData[]>([])
    const [alphabets,setAlphabets] = React.useState<string[]>([])
    const tabs : Tab[] = ['Employees', 'Departments']



    const RenderItem = ({ item } : {item : useFetchEmployeesData}) => {
        return (
            <PersonListComp item={item}
                onPressHandler={() => {
                    onPressHandler({ ...item, type: "Employee"})
                }}
            />
        )
    }
    const RenderDept = ({ item } : {item : useFetchDepartmentsData}) => {
        return (
            <DeptListComp item={item}
                onPressHandler={() => {
                    onPressHandler({ ...item, type: "Departments" })
                }}
            />
        )
    }
    const {
        data: employeeData,
        hasNextPage: hasNextPage,
        isFetching
    } = useFetchEmployees(
        tab === "Employees" ? tab : "",
        page, 
        searchTerm
    ) as useFetchEmployeesProps


    const {
        data: departmentData,
        isFetching: fetchingDepartments,
        hasNextPage: hasNextDept,
    } = useFetchDepartments(
        tab === "Departments" ? tab : "",
        page, 
        searchTerm
    ) as useFetchDepartmentsProps

    const mapDataToState = () => {
        if(tab === "Employees" && employeeData?.pages && Array.isArray(employeeData?.pages)){
            let arr : useFetchEmployeesData[] = __flatten(employeeData?.pages)
            return page > 1 ? setEmployees([...employees,...arr]) : setEmployees(arr)
        }
        if(tab === "Departments" && departmentData?.pages && Array.isArray(departmentData?.pages)){
            let arr : useFetchDepartmentsData[] = __flatten(departmentData?.pages)
            return page > 1 ? setDepartments([...employees,...arr]) : setDepartments(arr)
        }
    }

    const onEndReached = () => {
        if (
            (tab === "Employees" && (!hasNextPage || isFetching)) || 
            (tab === "Departments" && (!hasNextDept || fetchingDepartments))
        ) return 
            setPage(page + 1)
    }

    const KeyExtractor = (item : useFetchDepartmentsData | useFetchEmployeesData, index : number) => `${item}${index}`.toString()

    const RenderAlphabets = ({ item } : {item : string}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setPage(1)
                    setSearch(item)
                }}
            >
                <ImgPlaceholder text={item} size={15} />
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        mapDataToState()
    }, [employeeData,departmentData,tab])

    useEffect(() => {
        setPage(1)
        setSearch("")
    }, [tab])

    useEffect(()=>{
       setAlphabets([...Array(26).keys()].map((i) => i + 65).map((x) => String.fromCharCode(x)))
    },[])



    return (
        <Modal visible={open}>
            <Container style={styles.container}>
                <Container width={95} alignSelf="center">
                    <CustomIconButton 
                        icon={"close"}
                        onPress={onHide}
                        size={7}
                        color={AppColors.black1}
                    />
                </Container>
                <View style={styles.twoButtonCont}>
                    {
                        tabs.map((item, i) => (
                            <TouchableOpacity
                                onPress={() => {setTab(item)}}
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
                <React.Fragment>
                    <FlatList
                        ListHeaderComponent={<React.Fragment>
                            <View style={styles.searchBoxContainer}>
                                <SearchBox
                                    title="Search by name"
                                    containerStyle={styles.searchBoxStyle}
                                    onSubmitEditing={(value : string)=>setSearch(value)}
                                    value={search}
                                />   
                            </View>
                            <Container marginBottom={2}>
                                <FlatList
                                    data={alphabets}
                                    horizontal
                                    renderItem={RenderAlphabets}
                                    ItemSeparatorComponent={() => <View style={[CommonStyles.marginRight_3]} />}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.alphabetscontentContainerStyle}
                                />
                            </Container>
                            {
                                (isFetching || fetchingDepartments) && page === 1 ? <Container marginTop={5} verticalAlignment="center"
                                    horizontalAlignment="center"
                                    width={90}
                                    alignSelf="center"
                                >
                                    <ActivityIndicator size={width(8)} color={AppColors.green} />
                                </Container> : null
                            }
                        </React.Fragment>}
                        data={(isFetching || fetchingDepartments) && page === 1 ? [] : tab === "Employees" ? employees : departments}
                        keyExtractor={KeyExtractor}
                        renderItem={tab === "Employees" ? RenderItem : RenderDept}
                        ItemSeparatorComponent={() => <View style={styles.line} />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.flatlist}
                        ListEmptyComponent={(isFetching || fetchingDepartments) && page === 1 ?  undefined : <View style={styles.emptyState}>
                        <H1 color={AppColors.black2} fontSize={4} bold={"110"}
                            textAlign='center'
                        >
                            {
                                tab === "Employees" && !search ? "There are no people in your company." : !search?  " Adding people will enable you assign tasks directly to people or department." : "No result found for the search query"
                            }
                        </H1>
                    </View>}
                        onEndReachedThreshold={0.1}
                        onEndReached={onEndReached}
                        ListFooterComponent={
                            (isFetching || fetchingDepartments) && page > 1 ? <Container
                                alignSelf={'center'}
                                width={30} marginTop={3}>
                                <ActivityIndicator size={width(10)} color={AppColors.green} />
                            </Container> : undefined
                        }
                    />
                </React.Fragment>
            </Container>
        </Modal>
    )
}



export default EmployeeDepartmentListModal;
