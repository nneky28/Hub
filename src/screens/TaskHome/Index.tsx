import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  LayoutChangeEvent,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  H1,
  Container,
  PageLoader,
  ImgPlaceholder,
  EmptyStateWrapper,
  TouchableWrapper,
} from '../../utills/components';
import {width} from 'react-native-dimension';
import CommonStyles from '../../utills/CommonStyles';
import styles from './styles';
import TodoContent from '../../components/TodoContent/Index';
import {Images} from '../../utills/Image';
import numeral from 'numeral';
import AppColors from '../../utills/AppColors';
import {
  useFetchStatistics,
  useFetchTodos,
  useFetchTeamTask,
  APIFunction,
} from '../../utills/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  __flatten,
  getStoreAboutMe,
  useAppSelector,
  ToastError,
  ToastSuccess,
} from '../../utills/Methods';
import {RootScreenProps} from '../../Routes/types';
import {HomePageHeader} from '../../components/Headers/CustomHeader';
import {
  ActionTitleType,
  AddButtonProps,
  ProgressCardType,
  RenderItemProps,
  TaskTabType,
  useFetchStatisticsProps,
  useFetchTodosData,
  useFetchTodosProps,
} from './types';
import {
  GET_TASKS,
  GET_TASK_STATISTICS,
  GET_TEAM_TASKS,
  TaskDueDateFilter,
  TaskProgressLoad,
  TaskProgressStatus,
  TaskStatisticFilter,
} from '../../utills/payload';
import {Coordinates} from '../Profile/types';
import CustomSnackBar from '../../components/CustomSnackBar';
import {setCurrentTaskItem} from '../../Redux/Actions/Config';
import {useDispatch} from 'react-redux';
import {useMutation, useQueryClient} from 'react-query';
import {setCurrentTabIndex} from '../../Redux/Actions/Config';

const TaskHome = ({navigation}: RootScreenProps) => {
  const [department_id, setDepartmentID] = useState<number>();
  const [tab, setTab] = useState<TaskTabType>('All');
  const [actionTitle, setActionTitle] = useState<ActionTitleType>('To-Do');
  const [progress, setProgress] = React.useState<TaskProgressStatus>('To-do');
  const [tasks, setTasks] = useState<useFetchTodosData[]>([]);
  const dispatch = useDispatch();
  const [characters, setCharacters] = React.useState<string[]>([]);
  const [filter, setFilter] = React.useState<TaskStatisticFilter>('');
  const [coordinates, setCoordinates] = React.useState<Coordinates>({});
  const ref = useRef<ScrollView>(null);
  const [overdue_status, setOverDueStatus] =
    React.useState<TaskDueDateFilter>('');
  const menu = ['My Tasks', 'Sent Tasks', 'My Team'];
  const tabs: TaskTabType[] = [
    'All',
    'Due Today',
    'Upcoming',
    'Overdue',
    'No Date',
  ];
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  const currentTabIndex = useAppSelector(
    (state) => state.Config.currentTaskTabIndex,
  );
  
  const [show, setShow] = React.useState(false);
  const [timeoutID, setTimeoutID] = React.useState<NodeJS.Timeout>();
  const currentTask: useFetchTodosData & {
    old_status: TaskProgressLoad;
  } = useAppSelector((state) => state?.Config?.task);

  const queryClient = useQueryClient();
  const {mutateAsync, isLoading: updating} = useMutation(
    APIFunction.update_task_status,
  );

  const setButtons = (i: number) => {
    if(currentTabIndex === i) return
    dispatch(setCurrentTabIndex(i));
    setCurrentTabIndex(i);
    setActionTitle('To-Do');
    setTab('All');
    setOverDueStatus('');
    setLoading(true);
    setPage(1);
  };

  const AddButton = ({onPress, style}: AddButtonProps) => (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  );

  const RenderItem = ({item}: RenderItemProps) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Menu', {
            screen: 'TaskPeopleList',
            params: {char: item},
          })
        }>
        <ImgPlaceholder text={item} size={15} />
      </TouchableOpacity>
    );
  };

  const {data: statistics, isLoading} = useFetchStatistics(
    filter,
    currentTabIndex === 2 && department_id ? department_id : '',
  ) as useFetchStatisticsProps;

  // TODOS
  const {
    data: taskData,
    isFetching,
    hasNextPage,
  } = useFetchTodos(
    currentTabIndex !== 2 ? filter : '',
    currentTabIndex !== 2 ? overdue_status : '',
    currentTabIndex !== 2 ? progress : '',
    '',
    page,
  ) as useFetchTodosProps;

  const {
    data: teamTaskData,
    isFetching: fetching,
    hasNextPage: hasNextTeamPage,
  } = useFetchTeamTask(
    currentTabIndex === 2 ? 'My Team' : '',
    department_id,
    overdue_status,
    progress,
    page,
  ) as useFetchTodosProps;

  const progressCards: ProgressCardType[] = [
    {
      selected: 'To-Do',
      selected_image: Images.SelectedPurpleBg,
      image: Images.blueBox,
      count: statistics?.todo_count
        ? numeral(statistics?.todo_count).format('0,0')
        : '0',
      borderWidth: 0.5,
      borderColor: '#5182F6',
    },

    {
      selected: 'In Progress',
      image: Images.yellowBox,
      // colorUp: AppColors.newYellow,
      selected_image: Images.SelectedYellowBg,
      count: statistics?.inprogress_count
        ? numeral(statistics?.inprogress_count).format('0,0')
        : '0',
      borderWidth: 1,
      borderColor: '#FBBC3E',
    },
    {
      selected: 'Completed',
      image: Images.greenBox,
      // colorUp: AppColors.lightGreen,
      selected_image: Images.SelectedGreenBg,
      count: statistics?.completed_count
        ? numeral(statistics?.completed_count).format('0,0')
        : '0',
      borderWidth: 0.5,
      borderColor: '#2898A4',
    },
  ];

  const ListEmptyComponent = () => {
    let msg = 'todo task.';
    if (overdue_status === 'duetoday') msg = 'task due today.';
    if (overdue_status === 'upcoming') msg = 'upcoming task.';
    if (overdue_status === 'overdue') msg = 'overdue task.';
    if (actionTitle === 'In Progress') msg = 'task in progress.';
    if (actionTitle === 'Completed') msg = 'completed task.';
    return (
      <EmptyStateWrapper
        marginTop={1}
        icon={Images.EmptyTraining}
        header_1={currentTabIndex < 2 ? 'You have no' : 'Your team has no'}
        header_2={msg}
        backgroundColor={AppColors.transparent}
        sub_text={'They will show up here when you do.'}
      />
    );
  };

  const TaskRenderItem = ({item}: {item: useFetchTodosData}) => {
    if (item?.is_menu)
      return (
        <React.Fragment>
          {currentTabIndex === 2 ? (
            <View>
              <Text numberOfLines={1} style={styles.headerTitle}>
                Find People
              </Text>

              <View style={styles.search}>
                <TouchableOpacity
                  style={styles.searchView}
                  onPress={() =>
                    navigation.navigate('Menu', {screen: 'TaskPeopleList'})
                  }>
                  <Image
                    source={{uri: Images.SearchIcon}}
                    style={styles.searchBoxStyle}
                  />
                </TouchableOpacity>
                <FlatList
                  data={characters}
                  horizontal
                  renderItem={RenderItem}
                  ItemSeparatorComponent={() => (
                    <View style={[CommonStyles.marginRight_3]} />
                  )}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
          ) : null}
          <View style={styles.boxContainer}>
            {progressCards.map((item, i) => (
              <TouchableOpacity key={i} onPress={() => cardPressHandler(item)}>
                <ImageBackground
                  source={{
                    uri:
                      item.selected === actionTitle
                        ? item.selected_image
                        : item.image,
                  }}
                  resizeMode="cover"
                  imageStyle={{
                    borderRadius: width(4),
                    borderWidth:
                      item.selected === actionTitle
                        ? item.borderWidth
                        : undefined,
                    borderColor:
                      item.selected === actionTitle
                        ? item.borderColor
                        : undefined,
                  }}
                  style={styles.bg_img}>
                  <View style={styles.titleCon}>
                    <H1 style={styles.title}>{item.selected}</H1>
                    {item.selected === actionTitle && (
                      <Ionicons
                        name="checkbox"
                        size={14}
                        color={AppColors.black1}
                      />
                    )}
                  </View>
                  <Container
                    backgroundColor={AppColors.transparent}
                    horizontalAlignment="flex-end"
                    paddingRight={4}
                    paddingBottom={1}>
                    <H1 color={AppColors.black1} fontSize={7} numberOfLines={1}>
                      {item.count}
                    </H1>
                  </Container>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
          {currentTabIndex === 2 && actionTitle === 'To-Do' ? null : (
            <View style={styles.container}>
              <H1 color={AppColors.black1}>
                {actionTitle} (
                {actionTitle === 'Completed'
                  ? numeral(statistics?.completed_count).format('0,0')
                  : actionTitle === 'In Progress'
                  ? numeral(statistics?.inprogress_count).format('0,0')
                  : actionTitle === 'To-Do'
                  ? numeral(statistics?.todo_count).format('0,0')
                  : 0}
                )
              </H1>
            </View>
          )}
          {actionTitle === 'To-Do' ? (
            <View style={styles.scrollViewContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                ref={ref}>
                {tabs.map((item, i) => (
                  <TouchableWrapper
                    onPress={() => pressTabHandler(item)}
                    style={tab === item ? styles.currentTab : styles.defaultTab}
                    onLayout={(event) => onLayout(event, item)}
                    key={i}>
                    <H1
                      fontSize={3.3}
                      style={
                        tab === item
                          ? styles.selected_tab_text
                          : styles.tab_text
                      }>
                      {item}
                    </H1>
                  </TouchableWrapper>
                ))}
              </ScrollView>
            </View>
          ) : null}
          {!(isFetching || fetching) &&
          tasks &&
          Array.isArray(tasks) &&
          tasks.length === 0 ? (
            <ListEmptyComponent />
          ) : null}
          {(isFetching || fetching) && page === 1 ? (
            <Container marginTop={10}>
              <ActivityIndicator size={width(8)} color={AppColors.green} />
            </Container>
          ) : null}
        </React.Fragment>
      );
    return (
      <TodoContent
        item={item}
        title={actionTitle}
        index={currentTabIndex}
        id={item.id}
      />
    );
  };

  const pressTabHandler = (selected: TaskTabType) => {
    setTab(selected);
    let type: TaskDueDateFilter = '';
    if (selected === 'Due Today') type = 'duetoday';
    if (selected === 'Overdue') type = 'overdue';
    if (selected === 'Upcoming') type = 'upcoming';
    if (selected === 'No Date') type = 'nodate';
    setOverDueStatus(type);
    ref?.current?.scrollTo({
      x: coordinates?.[tab]?.x,
      y: coordinates?.[tab]?.y,
      animated: true,
    });
  };

  const onLayout = (event: LayoutChangeEvent, tab: string) => {
    setCoordinates({...coordinates, [tab]: event.nativeEvent.layout});
  };
  const getInfo = async () => {
    try {
      let about_me = await getStoreAboutMe();
      setDepartmentID(about_me?.department?.id);
    } catch (err) {}
  };

  const onEndReached = () => {
    if (
      (currentTabIndex !== 2 && (!hasNextPage || isFetching)) ||
      (currentTabIndex === 2 && (!hasNextTeamPage || fetching))
    )
      return;
    setPage(page + 1);
  };

  const cardPressHandler = (item: ProgressCardType) => {
    if (actionTitle === item?.selected) return;
    setActionTitle(item.selected);
    setPage(1);
    setTab('All');
    setOverDueStatus('');
    setLoading(true);
  };

  const KeyExtractor = (item: useFetchTodosData, index: number) =>
    `${item}${index}`.toString();

  const mapDataToState = () => {
    if (
      currentTabIndex !== 2 &&
      taskData?.pages?.[0]?.results &&
      Array.isArray(taskData?.pages?.[0]?.results)
    ) {
      page > 1
        ? setTasks([...tasks, ...taskData?.pages?.[0]?.results])
        : setTasks(taskData?.pages?.[0]?.results);
      return setLoading(false);
    }
    if (
      currentTabIndex === 2 &&
      teamTaskData?.pages?.[0]?.results &&
      Array.isArray(teamTaskData?.pages?.[0]?.results)
    ) {
      page > 1
        ? setTasks([...tasks, ...teamTaskData?.pages?.[0]?.results])
        : setTasks(teamTaskData?.pages?.[0]?.results);
      setLoading(false);
    }
  };

  const undoChangesHandler = async () => {
    try {
      clearTimeout(Number(timeoutID));
      if (
        !currentTask?.id ||
        !currentTask?.created_by?.id ||
        !currentTask?.title
      )
        return;
      let fd = {
        id: currentTask?.id,
        status: currentTask?.old_status,
        created_by: currentTask?.created_by?.id,
        title: currentTask?.title,
      };
      await mutateAsync(fd);
      setShow(false);
      queryClient.invalidateQueries(GET_TASKS);
      queryClient.invalidateQueries(GET_TASK_STATISTICS);
      queryClient.invalidateQueries(GET_TEAM_TASKS);
      ToastSuccess('Your changes have been saved.');
    } catch (err: any) {
      setShow(false);
      ToastError(err?.msg);
    }
  };

  const onDismiss = () => {};

  const ListFooterComponent = () => {
    if ((isFetching || fetching) && page > 1) {
      return (
        <Container alignSelf={'center'} width={30} marginTop={3}>
          <ActivityIndicator size={width(10)} color={AppColors.green} />
        </Container>
      );
    }
    return <React.Fragment></React.Fragment>;
  };

  useEffect(() => {
    mapDataToState();
  }, [taskData, teamTaskData, currentTabIndex]);

  useEffect(() => {
    let type: TaskStatisticFilter = '';
    if (currentTabIndex === 0) type = 'assigned_to_me';
    if (currentTabIndex === 1) type = 'created_by_me_and_sent';
    setFilter(type);
  }, [currentTabIndex]);

  useEffect(() => {
    if (actionTitle === 'To-Do') return setProgress('To-do');
    if (actionTitle === 'In Progress') return setProgress('In-progress');
    setProgress('Completed');
  }, [actionTitle]);

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    dispatch(setCurrentTabIndex(0));
  }, []);

  useEffect(() => {
    setCharacters(
      [...Array(26).keys()]
        .map((i) => i + 65)
        .map((x) => String.fromCharCode(x)),
    );
    return () => {
      dispatch(setCurrentTaskItem({}));
    };
  }, []);

  useEffect(() => {
    if (Object.values(currentTask).length === 0) return;
    setPage(1);
    setShow(true);
  }, [currentTask]);

  useEffect(() => {
    if (Object.values(currentTask).length === 0) return;
    let timeout = setTimeout(() => {
      setShow(false);
      dispatch(setCurrentTaskItem({}));
    }, 7000);
    setTimeoutID(timeout);
  }, [currentTask]);

  return (
    <ScreenWrapper
      footerUnScrollable={() =>
        !show ? (
          <AddButton
            style={styles.addButton}
            onPress={() => navigation.navigate('Menu', {screen: 'CreateTask'})}
          />
        ) : (
          () => <React.Fragment />
        )
      }>
      <React.Fragment>
        <HomePageHeader image={Images.TaskLogo} header="Tasks" />
        <View style={styles.threeButtonCont}>
          {menu.map((item, i) => (
            <TouchableWrapper
              onPress={() => {
                setButtons(i);
              }}
              style={
                currentTabIndex === i ? styles.animatedView : styles.button
              }
              key={i}>
              <Text
                style={[
                  styles.buttonText,
                  currentTabIndex === i && styles.buttonText1,
                ]}>
                {item}
              </Text>
            </TouchableWrapper>
          ))}
        </View>
        {isLoading || loading ? (
          <PageLoader />
        ) : (
          <React.Fragment>
            <FlatList
              data={
                (isFetching || fetching) && page === 1
                  ? [{is_menu: true, id: 1.5}]
                  : [{is_menu: true}, ...tasks]
              }
              keyExtractor={KeyExtractor}
              renderItem={TaskRenderItem}
              ItemSeparatorComponent={() => <View style={styles.line} />}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              contentContainerStyle={styles.contentContainerStyle}
              onEndReachedThreshold={0.1}
              ListEmptyComponent={ListEmptyComponent}
              onEndReached={onEndReached}
              ListFooterComponent={ListFooterComponent}
            />
          </React.Fragment>
        )}
        {show ? (
          <CustomSnackBar
            visible={show}
            onDismiss={onDismiss}
            label="Undo"
            text={'Your changes have been saved'}
            onPressHandler={undoChangesHandler}
            loading={updating}
            containerStyle={styles.snackbar}
            labelStyle={styles.snackbar_label}
            textColor={AppColors.black}
          />
        ) : null}
      </React.Fragment>
    </ScreenWrapper>
  );
};
export default TaskHome;
