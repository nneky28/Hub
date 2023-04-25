import {
  View,
  Text,
  FlatList,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {
  H1,
  useDebounce,
  PageLoader,
  EmptyStateWrapper,
} from '../../utills/components';
import SearchBox, {SearchBoxIOS} from '../../components/SearchBox/index';
import AppColors from '../../utills/AppColors';
import PersonListComp from '../../components/PersonListComp/index';
import {
  useFetchEmployees,
  useFetchTeams,
  useFetchDepartments,
} from '../../utills/api';
import {Capitalize, getStoreAboutMe, __flatten} from '../../utills/Methods';
import {width} from 'react-native-dimension';
import {RootMenuScreenProps} from '../../Routes/types';
import {Tab, useFetchDepartmentsData, useFetchDepartmentsProps} from './types';
import {
  useFetchEmployeesData,
  useFetchEmployeesProps,
  useFetchTeamsProps,
} from '../People/types';
import DeptListComp from '../../components/DepartmentListComp';
import ScreenWrapper from '../../components/ScreenWrapper';
import {HeaderWithBackButton} from '../../components/Headers/CustomHeader';
import {Images} from '../../utills/Image';
import {CustomRefreshControl} from '../../components/CustomRefreshControl';
import {useQueryClient} from 'react-query';
import {
  GET_DEPARTMENTS,
  GET_EMPLOYEES,
  GET_MY_TEAM_MEMBERS,
} from '../../utills/payload';

const TaskPeopleList = ({route, navigation}: RootMenuScreenProps) => {
  const {char} = route?.params || {};
  const [myTeam, setMyTeam] = useState<useFetchDepartmentsData>({name: ''});
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  // const [text, setText] = useState<string>('');
  const searchTerm = useDebounce(search, 200);
  const [tab, setTab] = useState<Tab>('Employees');
  const [departments, setDepartments] = useState<useFetchDepartmentsData[]>([]);
  const [employees, setEmployees] = React.useState<useFetchEmployeesData[]>([]);
  const tabs: Tab[] = ['Employees', 'Departments'];
  const [members, setMembers] = React.useState<useFetchEmployeesData[]>([]);
  const queryClient = useQueryClient();

  const {
    data: data,
    hasNextPage: hasNextPage,
    isLoading: loading,
    isFetching,
  } = useFetchEmployees(
    tab === 'Employees' ? 'Employees' : '',
    page,
    searchTerm,
  ) as useFetchEmployeesProps;

  const {data: teamData} = useFetchTeams(
    tab === 'Employees' ? 'Employees' : '',
  ) as useFetchTeamsProps;

  const {
    data: departmentData,
    isLoading,
    isFetching: fetchingDepartments,
    hasNextPage: hasNextDeptPage,
  } = useFetchDepartments(
    tab === 'Departments' ? 'Departments' : '',
    page,
    searchTerm,
  ) as useFetchDepartmentsProps;

  const RenderItem = ({item}: {item: useFetchEmployeesData}) => {
    return (
      <PersonListComp item={item} onPressHandler={() => onPressHandler(item)} />
    );
  };

  const RenderDept = ({item}: {item: useFetchDepartmentsData}) => {
    return (
      <DeptListComp item={item} onPressHandler={() => onPressHandler(item)} />
    );
  };

  const refreshHandler = () => {
    setPage(1);
    queryClient.invalidateQueries(GET_DEPARTMENTS);
    queryClient.invalidateQueries(GET_MY_TEAM_MEMBERS);
    queryClient.invalidateQueries(GET_EMPLOYEES);
  };

  const onEndReached = () => {
    if (
      (tab === 'Employees' && !hasNextPage) ||
      (!hasNextDeptPage && tab === 'Departments') ||
      isFetching ||
      fetchingDepartments
    )
      return;
    setPage(page + 1);
  };

  const mapDataToState = () => {
    if (
      tab === 'Departments' &&
      departmentData?.pages &&
      Array.isArray(departmentData?.pages)
    ) {
      let arr: useFetchDepartmentsData[] = __flatten(departmentData?.pages);
      if (page > 1) return setDepartments([...departments, ...arr]);
      return setDepartments(arr);
    }
    if (teamData && teamData?.pages && Array.isArray(teamData?.pages)) {
      let arr: useFetchEmployeesData[] = __flatten(teamData?.pages).filter(
        (el) => el?.first_name?.startsWith(searchTerm),
      );
      setMembers(arr);
    }
    if (tab === 'Employees' && data?.pages && Array.isArray(data?.pages)) {
      let arr: useFetchEmployeesData[] = __flatten(data?.pages);
      if (page > 1) return setEmployees([...employees, ...arr]);
      return setEmployees(arr);
    }
  };

  const onPressHandler = (
    item: useFetchEmployeesData | useFetchDepartmentsData,
  ) => {
    if ('department' in item) {
      return navigation.navigate('TeamTaskHome', {
        type: 'employee',
        name: `${item?.first_name ? Capitalize(item?.first_name) : ''} ${
          item?.last_name ? Capitalize(item?.last_name) : ''
        }`.trim(),
        id: item?.id,
      });
    }
    if ('employee_count' in item)
      return navigation.navigate('TeamTaskHome', {
        type: 'department',
        name: `${item.name ? Capitalize(item.name) : ''}`.trim(),
        id: item?.id,
      });
  };

  const handleSearch = (item: string) => {
    setSearch(item);
    // setText(item);
    setPage(1);
  };

  const KeyExtractor = (
    item: useFetchEmployeesData | useFetchDepartmentsData,
    index: number,
  ) => `${item}${index}`.toString();

  const aboutMe = async () => {
    const about = await getStoreAboutMe();
    if (!about?.department) return;
    setMyTeam({
      ...about?.department,
      employee_count: 0,
    });
  };

  useEffect(() => {
    if (typeof char === 'string') setSearch(char);
  }, []);

  useEffect(() => {
    mapDataToState();
  }, [teamData, data, departmentData, tab]);

  useEffect(() => {
    aboutMe();
  }, []);

  return (
    <ScreenWrapper>
      <HeaderWithBackButton />
      <View style={styles.twoButtonCont}>
        {tabs.map((item, i) => (
          <TouchableOpacity
            onPress={() => {
              setPage(1);
              setSearch('');
              setTab(item);
            }}
            style={tab === item ? styles.selected_tab : styles.deselected_tab}
            activeOpacity={1}
            key={i}>
            <Text
              style={[styles.buttonText, tab == item && styles.buttonText1]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {Platform.OS === 'android' ? (
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
      ) : null}
      {(loading || isLoading) && page === 1 ? (
        <PageLoader />
      ) : (
        <React.Fragment>
          {tab === 'Employees' ? (
            <React.Fragment>
              <FlatList
                ListHeaderComponent={
                  <React.Fragment>
                    {members && Array.isArray(members) && members.length > 0 ? (
                      <React.Fragment>
                        <H1 marginBottom={2} fontSize={3.3} marginTop={2}>
                          Team Members
                        </H1>
                        {members.map((member, i) => (
                          <PersonListComp
                            item={member}
                            onPressHandler={() => onPressHandler(member)}
                            key={i}
                          />
                        ))}
                      </React.Fragment>
                    ) : null}
                    <H1 marginBottom={2} fontSize={3.3} marginTop={2}>
                      Others
                    </H1>
                  </React.Fragment>
                }
                data={employees}
                refreshControl={
                  <CustomRefreshControl
                    loading={page === 1 && (isFetching || fetchingDepartments)}
                    onRefresh={refreshHandler}
                  />
                }
                renderItem={RenderItem}
                keyExtractor={KeyExtractor}
                ItemSeparatorComponent={() => <View style={styles.line} />}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.1}
                contentContainerStyle={styles.contentContainerStyle}
                onEndReached={onEndReached}
                ListEmptyComponent={
                  <EmptyStateWrapper
                    icon={Images.EmptyTeams}
                    header_1={'No record found'}
                    header_2={search ? 'for the search query.' : undefined}
                  />
                }
                ListFooterComponent={
                  page > 1 && isFetching ? (
                    <ActivityIndicator
                      size={width(5)}
                      color={AppColors.green}
                    />
                  ) : undefined
                }
              />
            </React.Fragment>
          ) : (
            <FlatList
              ListHeaderComponent={
                <React.Fragment>
                  <H1 marginBottom={2} fontSize={3.3} marginTop={2}>
                    Your Team
                  </H1>
                  <DeptListComp
                    item={myTeam}
                    onPressHandler={() => onPressHandler(myTeam)}
                  />
                  <H1 marginBottom={2} fontSize={3.3} marginTop={2}>
                    Department
                  </H1>
                </React.Fragment>
              }
              data={departments}
              refreshControl={
                <CustomRefreshControl
                  loading={page === 1 && (isFetching || fetchingDepartments)}
                  onRefresh={refreshHandler}
                />
              }
              renderItem={RenderDept}
              keyExtractor={KeyExtractor}
              ItemSeparatorComponent={() => <View style={styles.line} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainerStyle}
              ListEmptyComponent={
                <EmptyStateWrapper
                  icon={Images.EmptyTeams}
                  header_1={'No record found'}
                  header_2={search ? 'for the search query.' : undefined}
                />
              }
              onEndReached={onEndReached}
              ListFooterComponent={
                page > 1 && isFetching ? (
                  <ActivityIndicator size={width(5)} color={AppColors.green} />
                ) : undefined
              }
            />
          )}
        </React.Fragment>
      )}
    </ScreenWrapper>
  );
};
export default TaskPeopleList;
