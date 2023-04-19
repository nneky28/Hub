import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {width} from 'react-native-dimension';
import {ScrollView} from 'react-native-gesture-handler';
import AnimatedView from '../../components/AnimatedView';
import AssetsList from '../../components/AssetsList';
import BenifitList from '../../components/BenifitList';
import ScreenWrapper from '../../components/ScreenWrapper';
import TasksList from '../../components/TasksList';
import Timeoff from '../../components/Timeoff';
import {
  APIFunction,
  useFetchAssets,
  useFetchBenefits,
  useFetchWhosOut,
  useFetchBirthdays,
  useFetchAnniversary,
  useFetchEmployeeTimeOff,
  useFetchEmployeeTimeOffTaken,
  useFetchEmployeeTimeOffReqs,
  useFetchAboutMe,
} from '../../utills/api';
import AppColors from '../../utills/AppColors';
import {
  Container,
  CustomWebView,
  ImageWrap,
  ImgPlaceholder,
  PageLoader,
  Rounded,
} from '../../utills/components';
import tasksData from '../../utills/data/tasksData';
import {
  Capitalize,
  ToastError,
  ToastSuccess,
  useAppSelector,
} from '../../utills/Methods';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {Images} from '../../utills/Image';
import {setLoaderVisible} from '../../Redux/Actions/Config';
import {useMutation, useQueryClient} from 'react-query';
import TimeoffModal from '../../components/TimeoffModal';
import CustomCalendarModal from '../../components/CustomCalendarModal';
import {DateData} from 'react-native-calendars/src/types';
import ClockINContainer from '../../components/ClockInComponent';
import {RootScreenProps} from '../../Routes/types';
import {
  useFetchAnniversaryProps,
  useFetchAssetsProps,
  useFetchBenefitsProps,
  useFetchBirthdaysProps,
  useFetchEmployeeTimeOffData,
  useFetchEmployeeTimeOffProps,
  useFetchEmployeeTimeOffReqsData,
  useFetchEmployeeTimeOffReqsProps,
  useFetchEmployeeTimeOffTakenData,
  useFetchEmployeeTimeOffTakenProps,
  useFetchWhosOutProps,
} from './types';
import WarningModal from '../../components/WarningModal';
import {useFetchAboutMeProps} from '../../components/TimeoffModal/types';
import {RenderItemVerticalParams} from '../../components/Timeoff/types';

export default function Dashboard({
  navigation: {navigate, toggleDrawer},
}: RootScreenProps) {
  const {data: activeBD, isFetching: activeBDFetching} = useFetchBirthdays(
    'active',
  ) as useFetchBirthdaysProps;

  const {data: activeANN, isFetching: activeANNFetching} = useFetchAnniversary(
    'active',
  ) as useFetchAnniversaryProps;
  // const {data: activeANN, isFetching: activeANNFetching} = useFetchAnniversary(
  //   'upcoming' || '',
  // ) as useFetchAnniversaryProps;

  console.log('ANNIversary', activeANN);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [margin, setMargin] = useState(0.1);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = React.useState(true);
  const [available, setAvailable] = React.useState<
    useFetchEmployeeTimeOffData[]
  >([]);
  const [active, setActive] = React.useState<
    useFetchEmployeeTimeOffTakenData[]
  >([]);
  const [requests, setRequests] = React.useState<
    useFetchEmployeeTimeOffReqsData[]
  >([]);
  const [modal, setModal] = React.useState(false);
  const [current, setCurrent] = useState<number>();
  const [show, setShow] = useState(false);
  const [del, setDelete] = useState<useFetchEmployeeTimeOffReqsData>();
  const [text, setText] = useState('');
  const [tab, setTab] = React.useState('Leave');
  const [web, setWeb] = React.useState(false);
  const [web_url, setWebUrl] = React.useState<string>();
  const auth = useAppSelector((state) => state.Auth);
  const isSecurityVisible = useAppSelector(
    (state) => state.Config.isSecurityVisible,
  );
  const [employee_pk, setEmployeePK] = React.useState<number>();
  const [category, setCategory] = React.useState('timeoff');
  const [appear, setAppear] = React.useState(false);
  const [action, setAction] = React.useState('');

  const {mutateAsync, isLoading: isDeleting} = useMutation(
    APIFunction.delete_timeoff,
  );

  const [requestData, setRequestData] = React.useState({
    start_date: '',
    end_date: '',
    reason: '',
  });

  const {data: outData, isLoading: whosoutLoading} = useFetchWhosOut(
    category,
  ) as useFetchWhosOutProps;

  const {data: about_me} = useFetchAboutMe('main') as useFetchAboutMeProps;

  const {data: upcomingBD, isFetching: upcomingBDFetching} = useFetchBirthdays(
    'upcoming',
  ) as useFetchBirthdaysProps;

  const {data: assets, isFetching: assetFetching} = useFetchAssets(
    employee_pk,
  ) as useFetchAssetsProps;

  const {data: benefits, isFetching: benefitFetching} = useFetchBenefits(
    employee_pk,
  ) as useFetchBenefitsProps;

  const {data: timeoffData, isFetching: fetchingTimeoff} =
    useFetchEmployeeTimeOff(employee_pk || '') as useFetchEmployeeTimeOffProps;

  const {data: activeData, isFetching: fetchingActive} =
    useFetchEmployeeTimeOffTaken(
      employee_pk || '',
      'active',
    ) as useFetchEmployeeTimeOffTakenProps;

  const {data: upcomingData, isFetching: fetchingUpcoming} =
    useFetchEmployeeTimeOffTaken(
      employee_pk || '',
      'upcoming',
    ) as useFetchEmployeeTimeOffTakenProps;

  const {data: historyData, isFetching: fetchingHistory} =
    useFetchEmployeeTimeOffTaken(
      employee_pk || '',
      'history',
    ) as useFetchEmployeeTimeOffTakenProps;

  const {data: reqData, isFetching: fetchingReq} = useFetchEmployeeTimeOffReqs(
    employee_pk || '',
  ) as useFetchEmployeeTimeOffReqsProps;

  const getInfo = async () => {
    if (!about_me?.id) return;
    setEmployeePK(about_me?.id);
  };

  useEffect(() => {
    getInfo();
  }, [about_me]);

  useEffect(() => {
    if (
      assetFetching ||
      benefitFetching ||
      activeBDFetching ||
      upcomingBDFetching ||
      activeANNFetching ||
      fetchingTimeoff ||
      fetchingActive ||
      fetchingHistory ||
      fetchingReq ||
      fetchingUpcoming
    ) {
      //dispatch(setLoaderVisible(true))
      return setLoading(true);
    }
    dispatch(setLoaderVisible(false));
    setLoading(false);
  }, [
    assetFetching,
    benefitFetching,
    activeBDFetching,
    upcomingBDFetching,
    activeANNFetching,
    fetchingTimeoff,
    fetchingActive,
    fetchingHistory,
    fetchingReq,
    fetchingUpcoming,
  ]);

  const goToWeb = (url?: string) => {
    if (!url) return;
    setWebUrl(url);
    setWeb(true);
  };

  const getWhosOut = (param: string) => {
    if (param === 'Training') {
      return setTab(param);
    }
    let categ = param == 'Remote Work' ? 'work_from_home' : 'timeoff';
    setCategory(categ);
    setTab(param);
  };

  const cancelRequest = async () => {
    try {
      if (!del || !del?.id) return;
      await mutateAsync(del.id);
      let filtered = requests.filter((item) => item.id !== del.id);
      setRequests(filtered);
      setShow(false);
      return ToastSuccess('Request has been canceled');
    } catch (err: any) {
      setShow(false);
      ToastError(err?.msg);
    }
  };

  const setButtons = (i: number) => {
    setIndex(i);
    var margin = i * 30;
    if (margin == 0) margin = 0.1;
    setMargin(width(margin));
  };
  const closeWeb = () => {
    setWeb(false);
  };

  const refreshDashboard = () => {
    getInfo();
    queryClient.invalidateQueries('');
  };

  const onDayPress = (param: DateData) => {
    if (action === 'start_date')
      return setRequestData({
        ...requestData,
        start_date: param?.dateString,
      });
    if (action === 'end_date')
      setRequestData({
        ...requestData,
        end_date: param?.dateString,
      });
  };
  const datePickerHandler = (type: string) => {
    setAction(type);
    setAppear(true);
  };
  const hideCalendarHandler = () => {
    setAppear(false);
  };
  const timeoffResponseHandler = () => {
    var margin = 30;
    setMargin(width(margin));
    setIndex(1);
    let arr: useFetchEmployeeTimeOffTakenData[] = [];
    if (timeoffData?.results && Array.isArray(timeoffData?.results)) {
      setAvailable(timeoffData?.results);
    }
    if (activeData?.results && Array.isArray(activeData?.results)) {
      arr = activeData?.results;
    }
    if (upcomingData?.results && Array.isArray(upcomingData?.results)) {
      arr = [...arr, ...upcomingData?.results];
    }
    if (reqData?.results && Array.isArray(reqData?.results)) {
      setRequests(reqData?.results);
    }
    setActive(arr);
    if (
      activeData?.results &&
      Array.isArray(activeData?.results) &&
      activeData?.results.length > 0
    ) {
      setIndex(0);
      setMargin(width(0.1));
    }
  };
  const onChangeText = (value: string) => {
    setRequestData({...requestData, reason: value});
  };

  const showModalHandler = (param: RenderItemVerticalParams) => {
    if (param?.status == 'active') {
      // setText("Are you sure you want to end this leave?")
      // setDelete(param?.item);
      return setShow(true);
    }
    if (param?.status === 'request') {
      setDelete(param?.item);
      setText('Are you sure you want to cancel this request?');
      return setShow(true);
    }

    if (
      param?.status === 'balance' &&
      param?.item?.total_days_taken !== undefined &&
      param?.item?.total_days_taken !== undefined &&
      param?.item?.max_days_allowed &&
      param?.item?.total_days_taken >= 0 &&
      param?.item.total_days_taken < param?.item?.max_days_allowed
    ) {
      setCurrent(param?.item?.id);
      return setModal(true);
    }
  };

  const onHideHandler = () => {
    setRequestData({
      start_date: '',
      end_date: '',
      reason: '',
    });
    setModal(false);
    setShow(false);
  };

  useEffect(() => {
    timeoffResponseHandler();
  }, [timeoffData, activeData, reqData, historyData]);

  return (
    <ScreenWrapper scrollEnabled={false} statusBarColor={AppColors.lightGreen}>
      <React.Fragment>
        <Container backgroundColor={AppColors.lightGreen}>
          <View style={styles.header}>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => toggleDrawer()}>
                {about_me?.business_logo ? (
                  <Image
                    resizeMode="contain"
                    source={{uri: about_me?.business_logo}}
                    style={styles.logo}
                  />
                ) : (
                  <ImgPlaceholder
                    text={
                      about_me?.business_name?.[0]
                        ? Capitalize(about_me?.business_name?.[0])
                        : ''
                    }
                    size={10}
                  />
                )}
              </TouchableOpacity>
              <Text numberOfLines={1} style={styles.text1}>
                {about_me?.business_name
                  ? Capitalize(about_me.business_name)
                  : ''}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigate('Home', {screen: 'Notifications'});
              }}>
              <React.Fragment>
                {auth && auth.notifications > 0 ? (
                  <Container
                    position="absolute"
                    backgroundColor={'transparent'}
                    style={{
                      top: 5,
                      left: 5,
                      zIndex: 10,
                    }}>
                    <Rounded size={4} backgroundColor={AppColors.pink} />
                  </Container>
                ) : null}
                <ImageWrap
                  url={Images.BellIcon}
                  height={5}
                  fit={'contain'}
                  width={5}
                />
              </React.Fragment>
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
        </Container>
        {loading && !isSecurityVisible ? (
          <PageLoader />
        ) : (
          <ScrollView
            horizontal={false}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={refreshDashboard} />
            }>
            <React.Fragment>
              <ClockINContainer />
              <Container>
                <Text numberOfLines={1} style={styles.timeOffText}>
                  Time Off
                </Text>
              </Container>
              <View style={styles.threeButtonCont}>
                {['Active', 'Available', 'Requests'].map((item, i) => (
                  <TouchableOpacity
                    onPress={() => setButtons(i)}
                    style={styles.button}
                    activeOpacity={0.8}
                    key={i}>
                    <Text
                      style={[
                        styles.buttonText,
                        index == i && styles.buttonText1,
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
                <AnimatedView
                  marginLeft={margin}
                  styles={styles.animatedView}
                />
              </View>
              <View>
                <Timeoff
                  load={
                    index == 0
                      ? active && Array.isArray(active)
                        ? active
                        : []
                      : index == 1
                      ? available && Array.isArray(available)
                        ? available
                        : []
                      : requests && Array.isArray(requests)
                      ? requests
                      : []
                  }
                  data={
                    index === 0 ? 'active' : index === 1 ? 'balance' : 'request'
                  }
                  onItemPress={showModalHandler}
                />
              </View>
              {assets?.results &&
              Array.isArray(assets?.results) &&
              assets?.results.length > 0 ? (
                <React.Fragment>
                  <Text style={styles.heading}>
                    Asset
                    {assets?.results &&
                    Array.isArray(assets?.results) &&
                    assets?.results.length > 1
                      ? `(${assets?.results.length})`
                      : ''}
                  </Text>
                  <View>
                    <AssetsList data={assets?.results} />
                  </View>
                </React.Fragment>
              ) : null}
              {benefits?.results &&
              Array.isArray(benefits?.results) &&
              benefits?.results.length > 0 ? (
                <React.Fragment>
                  <Text style={styles.heading}>Benefit</Text>
                  <BenifitList
                    data={['#C2D4FF', '#99E6FF']}
                    horizontal={benefits?.results.length === 1 ? false : true}
                    benefits={benefits?.results}
                    goToWeb={goToWeb}
                  />
                </React.Fragment>
              ) : null}
              <TasksList
                data={tasksData}
                whos_out={
                  tab !== 'Training' &&
                  outData?.results &&
                  Array.isArray(outData?.results)
                    ? outData?.results
                    : []
                }
                birthdays={
                  activeBD?.results && Array.isArray(activeBD?.results)
                    ? activeBD?.results
                    : []
                }
                upcoming_birthdays={
                  upcomingBD?.results && Array.isArray(upcomingBD?.results)
                    ? upcomingBD?.results
                    : []
                }
                anniversary={
                  activeANN?.results && Array.isArray(activeANN?.results)
                    ? activeANN?.results
                    : []
                }
                tab={tab}
                navigate={navigate}
                getWhosOut={getWhosOut}
                fetch={whosoutLoading}
              />
            </React.Fragment>
          </ScrollView>
        )}
        {appear ? (
          <CustomCalendarModal
            show={appear}
            onDayPress={onDayPress}
            date={
              action === 'start_date'
                ? requestData?.start_date
                : action === 'end_date'
                ? requestData?.end_date
                : ''
            }
            onHide={hideCalendarHandler}
          />
        ) : null}
        {!appear && modal ? (
          <TimeoffModal
            isVisible={modal}
            onHide={onHideHandler}
            timeoff_id={current}
            datePickerHandler={datePickerHandler}
            onChangeText={onChangeText}
            data={requestData}
          />
        ) : null}
        {show ? (
          <WarningModal
            isVisible={show}
            onHide={onHideHandler}
            title={'Cancel Request?'}
            sub_title={text}
            onPressHandler={cancelRequest}
            loading={isDeleting}
            submitBtnText={'Yes, I am sure'}
            cancelBtnText={'No, go back'}
            icon={'alert-circle'}
            iconColor={AppColors.red2}
          />
        ) : null}

        {web && web_url ? (
          <CustomWebView show={web} setShow={closeWeb} web_url={web_url} />
        ) : null}
      </React.Fragment>
    </ScreenWrapper>
  );
}
