import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { DateData } from 'react-native-calendars/src/types'
import { useMutation} from 'react-query'
import CustomCalendarModal from '../../components/CustomCalendarModal'
import { HomePageHeader } from '../../components/Headers/CustomHeader'
import ScreenWrapper from '../../components/ScreenWrapper'
import { TimeoffVertical } from '../../components/Timeoff'
import { RenderItemVerticalParams} from '../../components/Timeoff/types'
import TimeoffModal from '../../components/TimeoffModal'
import WarningModal from '../../components/WarningModal'
import { APIFunction, useFetchEmployeeTimeOff, useFetchEmployeeTimeOffReqs, useFetchEmployeeTimeOffTaken } from '../../utills/api'
import AppColors from '../../utills/AppColors'
import { Container, PageLoader, TouchableWrapper } from '../../utills/components'
import { Images } from '../../utills/Image'
import { getStoreAboutMe, ToastError, ToastSuccess } from '../../utills/Methods'
import { useFetchEmployeeTimeOffData, useFetchEmployeeTimeOffProps, useFetchEmployeeTimeOffReqsData, useFetchEmployeeTimeOffReqsProps, useFetchEmployeeTimeOffTakenData, useFetchEmployeeTimeOffTakenProps } from '../Dashboard/types'
import styles from './styles'


export default function TimeOff() {
    
    var [selected, setSelected] = useState('Available');
    const [requests,setRequests] = useState<useFetchEmployeeTimeOffReqsData[]>();
    const [available,setAvailable] = useState<useFetchEmployeeTimeOffData[]>();
    const [active,setActive] = useState<useFetchEmployeeTimeOffTakenData[]>();
    const [history,setHistory] = useState<useFetchEmployeeTimeOffTakenData[]>();
    const [modal,setModal] = useState(false);
    const [current,setCurrent] = useState<number>();
    const [show,setShow] = useState(false);
    const [del,setDelete] = useState<useFetchEmployeeTimeOffReqsData>();
    const [text,setText] = useState("");
    const [employee_pk, setEmployeePK] = React.useState<number>()
    const [appear,setAppear] = React.useState(false)
    const [action,setAction] = React.useState("")
    const [requestData,setRequestData] = React.useState({
        start_date : "",
        end_date : "",
        reason : ""
    })

    const {
        mutateAsync,
        isLoading : isDeleting
      } = useMutation(APIFunction.delete_timeoff)

    const {
        data : timeoffData,
        isFetching : fetchingTimeoff
      } = useFetchEmployeeTimeOff(employee_pk || "") as useFetchEmployeeTimeOffProps
    
      const {
        data : activeData,
        isFetching : fetchingActive
      } = useFetchEmployeeTimeOffTaken(employee_pk || "","active") as useFetchEmployeeTimeOffTakenProps
    
      const {
        data : upcomingData,
        isFetching : fetchingUpcoming
      } = useFetchEmployeeTimeOffTaken(employee_pk || "","upcoming") as useFetchEmployeeTimeOffTakenProps
    
      const {
        data : historyData,
        isFetching : fetchingHistory
      } = useFetchEmployeeTimeOffTaken(employee_pk || "","history") as useFetchEmployeeTimeOffTakenProps
    
      const {
        data : reqData,
        isFetching : fetchingReq
      } = useFetchEmployeeTimeOffReqs(employee_pk || "") as useFetchEmployeeTimeOffReqsProps

    const getUserInfo = async () => {
        try {
            let about_me = await getStoreAboutMe();
            if(about_me?.id) setEmployeePK(about_me?.id)
        } catch (err) {

        }
    }

      const cancelRequest = async () => {
        try {
          if(!del || !del?.id || !Array.isArray(requests)) return
          await mutateAsync(del.id)
          let filtered = requests.filter(item => item.id !== del.id);
          setRequests(filtered)
          setShow(false);
          return ToastSuccess("Request has been canceled");
        } catch (err : any) {
          setShow(false);
          ToastError(err?.msg)
        }
      }

    const mapArrToState = async () => {
        let active_arr : useFetchEmployeeTimeOffTakenData[] = []
        if(timeoffData?.results && Array.isArray(timeoffData?.results)){
            setAvailable(timeoffData?.results)
        }
        if(activeData?.results && Array.isArray(activeData?.results)){
            active_arr = [...active_arr,...activeData?.results]
        }
        if(upcomingData?.results && Array.isArray(upcomingData?.results)){
            active_arr = [...active_arr,...upcomingData?.results]
        }
        if(reqData?.results && Array.isArray(reqData?.results)){
            setRequests(reqData?.results)
        }
        if(historyData?.results && Array.isArray(historyData?.results)){
            setHistory(historyData?.results)
        }
        setActive(active_arr)
    }

    // const refreshHandler = () => {
    //     queryClient.invalidateQueries(EMPLOYEE_TIMEOFF)
    //     queryClient.invalidateQueries(EMPLOYEE_TIMEOFF_TAKEN)
    //     queryClient.invalidateQueries(EMPLOYEE_TIMEOFF_REQS)
    // }

    const onDayPress = (param : DateData)=>{
        if(action === "start_date") return setRequestData({
          ...requestData,start_date : param?.dateString
        })
        if(action === "end_date") setRequestData({
          ...requestData,end_date : param?.dateString
        })
    }

    const datePickerHandler = (type : string) => {
        setAction(type)
        setAppear(true)
    }
    const hideCalendarHandler = () => {
        setAppear(false)
    }

    const onChangeText = (value : string) => {
        setRequestData({...requestData,reason : value})
    }

    const onHideHandler = () => {
        setRequestData({
            start_date : "",
            end_date : "",
            reason : ""
        })
        setModal(false)
        setShow(false)
      }
    
    const onItemPressHandler = (param : RenderItemVerticalParams) => {
        if (param.status === "active") {
          setText("Are you sure you want to end this leave?")
         // setDelete(param?.item);
          //setShow(true);
          return
        }
        if (param?.status === "request") {
          setDelete(param?.item);
          setText("Are you sure you want to cancel this request?")
          return setShow(true);
        }
        if (param?.status === "balance" && param?.item?.id && param?.item?.total_days_taken !== undefined && param?.item?.total_days_taken !== undefined && param?.item?.max_days_allowed &&
        param?.item?.total_days_taken >= 0 &&
        param?.item?.total_days_taken <
        param?.item?.max_days_allowed
        ) {
          setCurrent(param?.item?.id)
          return setModal(true)
        }
      }

    useEffect(()=>{
        getUserInfo()
    },[])

    React.useEffect(()=>{
        mapArrToState()
    },[historyData,upcomingData,reqData,activeData,timeoffData])

    return (
        <ScreenWrapper scrollEnabled={false}>
            <React.Fragment>
            <HomePageHeader 
                image={Images.people}
                header={"Time Off"}
            />
            {
                fetchingActive || fetchingHistory
                || fetchingReq || fetchingUpcoming || fetchingTimeoff ?  <PageLoader /> : <Container style={styles.mainViewContainer}>

                    <Container
                        style={styles.scrollViewContainer}
                    >
                        {['Active', 'Available','Requests', 'History'].map((item,index) => (
                            <TouchableWrapper 
                                onPress={() => setSelected(item)}
                                key={index}
                                isText
                                style={selected === item ? styles.selected_tab : styles.deselected_tab}
                                
                            >
                                <Text style={[styles.heading, selected == item && styles.selectedHeading]}>{item}</Text>
                            </TouchableWrapper>
                            ))}
                    </Container>

                {selected === 'Active' &&
                    <>
                       
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>Active and upcoming</Text>
                        </View>
                        <TimeoffVertical
                            data={'active'}
                            load={active && Array.isArray(active) ? active : []}
                            header_1={"You have no active"}
                            header_2={"timeoff."}
                        />
                    </>
                }

                    {selected === 'Requests' &&
                        <React.Fragment>
                            <View style={styles.headingContainer}>
                                <Text style={styles.heading}></Text>
                            </View>
                            <TimeoffVertical
                                data={'request'}
                                header_1={"You have no pending"}
                                header_2={"timeoff request."}
                                load={requests && Array.isArray(requests) ? requests : []}
                                onItemPress={onItemPressHandler}
                            />
                        </React.Fragment>
                    }
                    {selected === "History" &&
                        <React.Fragment>
                            <View style={styles.headingContainer}>
                                <Text style={styles.heading}></Text>
                            </View>
                            <TimeoffVertical
                                data={'fewDays'}
                                header_1={"You have no timeoff"}
                                header_2={"history."}
                                load={history && Array.isArray(history) ? history : []}
                            />
                        </React.Fragment>
                    }
                    {selected === "Available" &&
                        <React.Fragment>
                            <View style={styles.headingContainer} />
                            <TimeoffVertical
                                data={'balance'}
                                load={available && Array.isArray(available) ? available : []}
                                header_1={"You have no available"}
                                header_2={"timeoff policy."}
                                onItemPress={onItemPressHandler}
                            />
                        </React.Fragment>
                    }

                </Container>
            }
            {
              appear ? <CustomCalendarModal 
                show={appear}
                onDayPress={onDayPress}
                date={action === "start_date" ? requestData?.start_date : action === "end_date" ? requestData?.end_date : ""}
                onHide={hideCalendarHandler}
              /> : null
            }
            {
              !appear && modal ?  <TimeoffModal
                isVisible={modal}
                onHide={onHideHandler}
                timeoff_id={current} 
                datePickerHandler={datePickerHandler}
                onChangeText={onChangeText}
                data={requestData}
              /> : null
            }
            {
                show ?  <WarningModal
                isVisible={show}
                onHide={onHideHandler}
                title={"Cancel Request?"}
                sub_title={text}
                onPressHandler={cancelRequest}
                loading={isDeleting}
                submitBtnText={"Yes, I am sure"}
                cancelBtnText={"No, go back"}
                icon={'alert-circle'}
                iconColor={AppColors.red2}
              />  : null
            }
           
            </React.Fragment>
        </ScreenWrapper>
    )
}

