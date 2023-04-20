import {
  View,
  TouchableOpacity,
  Text,
  LayoutAnimation,
  LayoutChangeEvent,
  Keyboard,
} from 'react-native';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import styles from './style';
import {
  P,
  KeyboardAwareWrapper,
  H1,
  PageLoader,
  Container,
} from '../../utills/components';
import AppColors from '../../utills/AppColors';
import CustomInput from '../../components/CustomInput/index';
import {
  Capitalize,
  ToastError,
  ToastSuccess,
  useAppDispatch,
} from '../../utills/Methods';
import EmployeeDepartmentListModal from '../../components/EmployeeDepartmentListModal/Index';
import {APIFunction, useFetchAboutMe, useFetchTaskByPK} from '../../utills/api';
import {useMutation, useQueryClient} from 'react-query';
import CommonStyles from '../../utills/CommonStyles';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scrollToPosition} from '../../Redux/Actions/Config';
import ScreenWrapper from '../../components/ScreenWrapper';
import CustomCalendarModal from '../../components/CustomCalendarModal';
import {DateData} from 'react-native-calendars/src/types';
import {RootMenuScreenProps} from '../../Routes/types';
import {useFetchTaskByPKProps} from '../TaskDetails/types';
import {HeaderWithBackButton} from '../../components/Headers/CustomHeader';
import {Data, SubTask} from './types';
import {useFetchAboutMeProps} from '../../components/TimeoffModal/types';
import CustomIconButton from '../../components/CustomIconButton';
import {Coordinates} from '../Profile/types';
import {
  GET_TASKS,
  GET_TASK_BY_PK,
  GET_TASK_STATISTICS,
  TaskLoad,
} from '../../utills/payload';
import {width} from 'react-native-dimension';

const CreateTask = ({route}: RootMenuScreenProps) => {
  const {task_id} = route?.params || {};
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [sub_tasks, setSubTask] = useState<SubTask[]>([]);
  const dispatch = useAppDispatch();
  const [coordinate, setCoordinate] = React.useState<Coordinates>({});

  const [data, setData] = useState<Data>({
    title: '',
    description: '',
    due_date: 'Today',
    id: '',
    type: 'Employee',
    name: '',
    assigned_to_id: '',
  });

  const {data: about} = useFetchAboutMe('main') as useFetchAboutMeProps;

  const {data: task, isLoading: loadingTask} = useFetchTaskByPK(
    typeof task_id === 'number' ? task_id : undefined,
  ) as useFetchTaskByPKProps;

  const {mutateAsync, isLoading} = useMutation(APIFunction.post_task);

  const {mutateAsync: editHandler, isLoading: isLoadingEdit} = useMutation(
    APIFunction.update_task_status,
  );

  const onChangeSubTask = (value: string, index: number) => {
    let arr = [...sub_tasks];
    arr[index]['description'] = value;
    setSubTask(arr);
  };

  const addMoreSubTask = () => {
    if (!about?.id) return;
    setSubTask([
      ...sub_tasks,
      {
        title: '',
        description: '',
        assigned_by: about?.id,
        status: 'To-do',
      },
    ]);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
  };

  const handleDelete = (index: number) => {
    let arr = [...sub_tasks];
    arr.splice(index, 1);
    setSubTask(arr);
  };

  const submitHandler = async () => {
    try {
      Keyboard.dismiss();
      type DataKeys = keyof Data;
      let required: DataKeys[] = ['title'];
      let msg = '';
      for (let req of required) {
        if (!data[req] || data?.[req]?.toString().trim() === '') {
          msg = `"${Capitalize(req.replaceAll('_', ' '))}" is required`;
          break;
        }
      }
      if (msg !== '') {
        return ToastError(msg);
      }

      if (typeof about?.id !== 'number') return;

      let fd: TaskLoad = {
        title: data?.title,
        due_date:
          data?.due_date === 'Today'
            ? moment().toISOString(true)
            : data?.due_date
            ? moment(data?.due_date).format('YYYY-MM-DD[T]HH:mm:ss.SSS')
            : undefined,
        created_by: task?.created_by?.id || about?.id,
        assigned_to:
          data?.type === 'Employee' &&
          data?.assigned_to_id &&
          typeof data?.assigned_to_id === 'number'
            ? data?.assigned_to_id
            : data?.type === 'Employee'
            ? about?.id
            : null,
        department:
          data?.type === 'Departments' &&
          typeof data?.assigned_to_id === 'number'
            ? data?.assigned_to_id
            : null,
        status: 'To-do',
        sub_tasks: sub_tasks.map((task) => {
          return {
            title: task?.description,
            description: task?.description,
            status: task?.status,
          };
        }),
      };
      if (!task?.id) {
        await mutateAsync(fd);
        queryClient.invalidateQueries(GET_TASK_STATISTICS);
        queryClient.invalidateQueries(GET_TASKS);
        setData({
          title: '',
          description: '',
          due_date: 'Today',
          id: '',
          type: 'Employee',
          name: '',
          assigned_to_id: '',
        });
        setSubTask([]);
        return ToastSuccess('Task has been created');
      }
      await editHandler({...fd, id: task?.id});
      queryClient.invalidateQueries(GET_TASK_STATISTICS);
      queryClient.invalidateQueries(GET_TASKS);
      queryClient.invalidateQueries(GET_TASK_BY_PK);
      ToastSuccess('Your changes have been saved.');
    } catch (err: any) {
      ToastError(err?.msg);
    }
  };

  const onDayPress = (value: DateData) => {
    setData({
      ...data,
      due_date: value?.dateString,
    });
  };
  const onLayout = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    coordinate[0] = layout;
    setCoordinate({...coordinate});
  };

  const showPeopleModal = () => {
    setOpen(true);
  };
  const showCalendar = () => {
    setShow(true);
  };

  const onDismiss = () => {
    setShow(false);
    setOpen(false);
  };

  useEffect(() => {
    if (!task?.id) return;
    setData({
      title: task?.title || '',
      description: task?.description || '',
      due_date: task?.due_date || '',
      id: task?.id || '',
      type: task?.department?.id ? 'Departments' : 'Employee',
      name:
        task?.department?.id && task?.department?.name
          ? Capitalize(task?.department?.name)
          : task?.assigned_to?.id && task?.assigned_to?.first_name
          ? Capitalize(task?.assigned_to?.first_name)
          : '',
      assigned_to_id: task?.department?.id || task?.assigned_to?.id || '',
    });

    if (task?.sub_tasks_tasksapp && Array.isArray(task?.sub_tasks_tasksapp)) {
      let arr: SubTask[] = task?.sub_tasks_tasksapp.map((item) => {
        return {
          id: item?.id,
          title: item?.title || '',
          description: item?.title || '',
          status: item?.status || 'To-do',
          assigned_by: task?.created_by?.id,
        };
      });
      setSubTask(arr);
    }
  }, [task]);

  useEffect(() => {
    dispatch(scrollToPosition(coordinate));
  }, [coordinate]);

  return (
    <ScreenWrapper>
      <HeaderWithBackButton
        headerText={task_id ? 'Edit Task' : 'Create Task'}
      />
      {loadingTask ? (
        <PageLoader />
      ) : (
        <View style={styles.mainViewContainer}>
          <KeyboardAwareWrapper scrollable={true}>
            <CustomInput
              placeholder="Enter Task Title"
              keyboardType={'default'}
              autoFocus={true}
              value={data.title}
              onChangeData={(value) => {
                setData({...data, title: value});
              }}
            />
            <CustomInput
              placeholder="Enter Task description here"
              keyboardType={'default'}
              multiline={true}
              minHeight={5}
              value={data.description}
              onChangeData={(value) => {
                setData({...data, description: value});
              }}
            />
            <View style={styles.container}>
              <View style={styles.assign}>
                <P color={AppColors.black3}>Assign To</P>
                <TouchableOpacity
                  onPress={showPeopleModal}
                  style={styles.button}>
                  {!data?.assigned_to_id ? (
                    <Ionicons
                      name="person-add"
                      size={15}
                      color={AppColors.black3}
                    />
                  ) : null}
                  <P style={styles.btnIcon} numberOfLines={1}>
                    {!data?.assigned_to_id
                      ? 'You'
                      : data?.name
                      ? Capitalize(data?.name)
                      : ''}
                  </P>
                </TouchableOpacity>
              </View>
              <View style={styles.dueDate}>
                <P color={AppColors.black3}>Due Date</P>
                <Container
                  width={50}
                  direction="row"
                  verticalAlignment="center">
                  <TouchableOpacity
                    onPress={showCalendar}
                    style={styles.button1}>
                    <Text numberOfLines={1} style={styles.date}>
                      {data?.due_date === 'No Date'
                        ? 'No Date'
                        : data?.due_date === 'Today'
                        ? `Today, ${moment().format('ddd D, MMM YYYY')}`
                        : moment(data?.due_date).format('ddd D, MMM YYYY')}
                    </Text>
                  </TouchableOpacity>
                  <CustomIconButton
                    onPress={() => setData({...data, due_date: 'No Date'})}
                    icon={'close'}
                    size={5}
                    color={AppColors.black1}
                  />
                </Container>
              </View>
            </View>
            {sub_tasks && Array.isArray(sub_tasks)
              ? sub_tasks.map((sub_task, i) => (
                  <CustomInput
                    multiline={true}
                    mode={'flat'}
                    minHeight={5}
                    autoFocus={true}
                    value={sub_task?.description}
                    key={i}
                    onChangeData={(value) => onChangeSubTask(value, i)}
                    right={
                      <TextInput.Icon
                        name={'close'}
                        style={[
                          CommonStyles.marginTop_1,
                          CommonStyles.marginRight_8,
                        ]}
                        color={AppColors.darkGray}
                        onPress={() => handleDelete(i)}
                        forceTextInputFocus={false}
                        hasTVPreferredFocus={undefined}
                        tvParallaxProperties={undefined}
                      />
                    }
                  />
                ))
              : null}

            <View style={styles.btnContainer} onLayout={onLayout}>
              <TouchableOpacity onPress={addMoreSubTask} style={styles.addBtn}>
                <Ionicons name="add" size={15} color={AppColors.green} />
                <H1 color={AppColors.green}>Add subtask</H1>
              </TouchableOpacity>

              {isLoading || isLoadingEdit ? (
                <ActivityIndicator size={width(5)} color={AppColors.green} />
              ) : (
                <TouchableOpacity onPress={submitHandler}>
                  <H1 color={AppColors.green}>
                    {task?.id ? 'Save' : 'Create'}
                  </H1>
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAwareWrapper>
          {open ? (
            <EmployeeDepartmentListModal
              onHide={onDismiss}
              open={open}
              onPressHandler={(item) => {
                if (item?.type === 'Departments') {
                  setData({
                    ...data,
                    assigned_to_id: item?.id || '',
                    name: item?.name ? Capitalize(item?.name) : '',
                    type: 'Departments',
                  });
                  return setOpen(false);
                }
                setData({
                  ...data,
                  assigned_to_id: item?.id || '',
                  name: item?.first_name ? Capitalize(item?.first_name) : '',
                  type: 'Employee',
                });
                setOpen(false);
              }}
            />
          ) : null}
          {show ? (
            <CustomCalendarModal
              show={show}
              onDayPress={onDayPress}
              date={
                data?.due_date === 'Today'
                  ? moment().format('YYYY-MM-DD')
                  : data?.due_date === 'No Date'
                  ? ''
                  : data?.due_date
                  ? moment(data?.due_date).format('YYYY-MM-DD')
                  : ''
              }
              onHide={onDismiss}
            />
          ) : null}
        </View>
      )}
    </ScreenWrapper>
  );
};

export default CreateTask;
