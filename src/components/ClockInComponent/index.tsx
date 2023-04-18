import React, { useEffect } from "react"
import { useMutation, useQueryClient } from "react-query"
import { useDispatch} from "react-redux"
import { APIFunction, useFetchAttendanceConfig, useFetchAttendanceStatus, useFetchLocationType } from "../../utills/api"
import moment from "moment"
import { getData, getGreetingTime, ToastError } from "../../utills/Methods"
import { setLoaderVisible } from "../../Redux/Actions/Config"
import { showFlashMessage } from "../SuccessFlash"
import { ActivityIndicator, PermissionsAndroid, Platform,View } from "react-native"
import Geolocation from 'react-native-geolocation-service'
import { Container, H1, P, SizedBox } from "../../utills/components"
import AppColors from "../../utills/AppColors"
import styles from "./styles"
import { height, width } from "react-native-dimension"
import {useFetchAttendanceConfigProps, useFetchAttendanceStatusProps,useFetchLocationTypeProps} from "./types"
import { StoredAboutMeProps } from "../../Routes/types"
import { TouchableOpacity } from "react-native-gesture-handler"

const ClockINContainer = () => {
    const [current, setCurrent] = React.useState("")
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const [tab, setTab] = React.useState("On-Site")
    const {
        mutateAsync : clockEmployeeIn
    } = useMutation(APIFunction.employee_clock_in)
    const {
        mutateAsync : clockEmployeeOut
    } = useMutation(APIFunction.employee_clock_out)
  
    const {
      data: config,
    } = useFetchAttendanceConfig("main") as useFetchAttendanceConfigProps
    const {
      data: status,
      isFetching: fetchingStatus
    } = useFetchAttendanceStatus("main") as useFetchAttendanceStatusProps
  
    const {
      data: type
    } = useFetchLocationType() as useFetchLocationTypeProps
  
    useEffect(() => {
      if (!type?.location_type) return
      if (status?.location_type === "on_site") {
        return setTab("On-Site")
      }
      if (status?.location_type && status?.location_type !== "on_site") {
        return setTab("Remote")
      }
      if (type?.location_type === "Onsite") return setTab("On-Site")
      setTab("Remote")
    }, [type, status])
  
    useEffect(() => {
      let interval = setInterval(() => {
        setCurrent(moment().format("HH : mm"))
      }, 1000);
      return ()=> clearInterval(interval)
    }, [])
  
    const submitHandler = async () => {
      try {
        if (status?.is_clocked_in) {
          let user : StoredAboutMeProps | null | false | string = await getData("about_me")
          if(typeof user === "string" || !user || !user?.id) return
          dispatch(setLoaderVisible(true))
          let fd = {
            employee: user.id,
            clock_in_time: status?.clock_in_time,
            clock_out_time: moment().toISOString()
          }
          await clockEmployeeOut(fd)
          queryClient.invalidateQueries("attendance_status")
          dispatch(setLoaderVisible(false))
          return showFlashMessage({ title: `You clocked out from work at ${moment().format("hh:mm a")}`, type: "success" })
        }
        if(Platform.OS === "android") await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if(Platform.OS === "ios") await Geolocation.requestAuthorization("always")
        dispatch(setLoaderVisible(true))
        Geolocation.getCurrentPosition(
          async (position) => {
            try{
              let fd = {
                latitude : position?.coords?.latitude,
                longitude : position?.coords?.longitude,
                location_type: tab === "Remote" ? "remote" : "on_site"
              }
              await clockEmployeeIn(fd)
              queryClient.invalidateQueries("attendance_status")
              dispatch(setLoaderVisible(false))
              showFlashMessage({ title: `You resumed for work at ${moment().format("hh:mm a")}`, type: "success" })
            }catch(error : any){
              dispatch(setLoaderVisible(false))
              ToastError(error?.msg)
            }
          },
          error => {
            // See error code charts below.
            dispatch(setLoaderVisible(false))
            ToastError(error?.message)
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            accuracy: {
              ios: 'best',
              android: 'high',
            },
          },
        );
      } catch (err :any) {
        dispatch(setLoaderVisible(false))
        ToastError(err.msg)
      }
    }
  
    return (
      <React.Fragment>
        {
          config?.data?.is_configured ? <View
            style={{
              alignItems: "center"
            }}
          >
            <Container
              marginTop={3}
              marginBottom={30}
              style={{
                alignItems: "center",
                height: height(28),
                width: width(90),
                borderRadius: width(8)
              }}
              backgroundColor={AppColors.lightOrange}
              borderWidth={1}
              borderColor={AppColors.yellow}
            >
              <Container marginTop={3} direction="row"
                style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
                backgroundColor={AppColors.lightOrange}
              >
                <Container width={1} backgroundColor="transparent" />
                <P fontSize={4} color={AppColors.black1}>
                  Daily Attendance
                </P>
              </Container>
              <SizedBox height={1} />
              <H1 fontSize={4} color={AppColors.black1}>
                {moment().format("dddd, DD MMM YYYY")}
              </H1>
              <SizedBox height={1} />
              <Container
                backgroundColor={AppColors.white}
                marginTop={1.5}
                direction="row"
                width={80}
                borderColor={AppColors.white}
                borderWidth={1}
                style={{
                  alignItems: "center",
                  justifyContent: "space-around",
                  borderRadius: width(2)
                }}
              >
                {
                  ["On-Site", "Remote"].map((item, i) => <TouchableOpacity key={i}
                    disabled={status?.location_type ? true : false}
                    onPress={() => setTab(item)}
                    style={[
                      styles.attendance_tab,
                      tab === item && status?.location_type ? { backgroundColor: AppColors.grayBorder } : tab === item ? { backgroundColor: AppColors.black }
                        : { backgroundColor: AppColors.white }
                    ]}
                  >
                    <H1 textAlign="center" fontSize={3} color={
                      tab === item && status?.location_type ? AppColors.darkGray : tab === item ? AppColors.white : AppColors.black
                    }>{item}</H1>
                  </TouchableOpacity>)
                }
              </Container>
              <Container
                style={styles.yellow_box}
                position="absolute"
                borderColor={AppColors.yellow}
                backgroundColor={AppColors.white}
              >
                <Container
                  style={{
                    alignItems: "center",
                  }}
                  marginBottom={2}
                  backgroundColor={AppColors.white}
                >
                  <P fontSize={3.3} color={AppColors.darkGray}>{getGreetingTime()}</P>
                  <Container
                    marginTop={2}
                    direction="row"
                    width={63}
                    horizontalAlignment="space-evenly"
                    alignSelf="center"
                  >
                    {
                      current ? [...current.toString()].filter(num => num.trim() !== "").map((num, i) => (
                        <Container key={i}
                          width={num !== ":" ? 14 : 2}
                          style={num !== ":" ? {
                            backgroundColor: AppColors.gray1,
                            borderRadius: width(2),
                            justifyContent: "center",
                            height: height(6),
                            borderBottomWidth: width(0.5),
                            borderBottomColor: AppColors.lightYellow
                          } : {
                            justifyContent: "center",
                            height: height(6)
                          }}
                        >
                          <H1 fontSize={9} color={AppColors.black}
                            textAlign="center"
                          >{num}</H1>
                        </Container>
                      )) : null
                    }
                  </Container>
  
                </Container>
                <Container
                  marginTop={1}
                  marginBottom={1}
                  direction="row"
                  width={50}
                  borderTopWidth={width(0.5)}
                  borderBottomWidth={width(0.5)}
                  borderColor={AppColors.lightYellow}
                  backgroundColor={AppColors.gray}
                  height={height(5)}
                  borderRadius={width(2)}
                  style={{
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {
                    fetchingStatus ? <ActivityIndicator size={width(2)}
                      color={AppColors.green}
                    /> :
                      status?.is_clocked_in && status?.clock_in_time && !status?.has_clocked_out ? <React.Fragment>
                        <P fontSize={3.3} color={AppColors.darkGray}>Clocked In time:</P>
                        <P fontSize={3.3} color={AppColors.black}> {moment(status?.clock_in_time).format("HH : mm")}</P>
                      </React.Fragment> : status?.has_clocked_out && status?.clocked_out_time ? <React.Fragment>
                        <P fontSize={3.3} color={AppColors.darkGray}>Clocked Out time:</P>
                        <P fontSize={3.3} color={AppColors.black}> {moment(status?.clocked_out_time).format("HH : mm")}</P>
                      </React.Fragment> : <React.Fragment>
                        <P fontSize={3.3} color={AppColors.darkGray}>Clock In time:</P>
                        <P fontSize={3.3} color={AppColors.black}> -- : --</P>
                      </React.Fragment>
                  }
                </Container>
                <TouchableOpacity 
                    onPress={submitHandler}
                    //disabled={(status?.has_clocked_out || fetchingStatus) ? true : false}
                  style={{
                    borderRadius: 7,
                    backgroundColor: (status?.has_clocked_out || fetchingStatus) ? AppColors.lightOrange : AppColors.yellow,
                    height: height(5.8),
                    marginTop: height(2),
                    width: width(80),
                    justifyContent: "center"
                  }}
                >
                  {
                    tab === "Remote" ? <H1 textAlign="center">{!status?.is_clocked_in ? "Clock In Remotely" : "Clock Out"} </H1> : <H1 textAlign="center">{!status?.is_clocked_in ? "Clock In" : "Clock Out"} </H1>
                  }
                </TouchableOpacity>
                <P fontSize={3} color={AppColors.black3}
                  style={{
                    marginTop: height(1.5)
                  }}
                >
                  Work Hours - {status?.is_clocked_in && status?.clock_in_time && !status?.has_clocked_out ? moment.utc(moment().diff(moment(status?.clock_in_time))).format("HH:mm:ss") : status?.has_clocked_out && status?.clocked_out_time ? moment.utc(moment(status?.clocked_out_time).diff(moment(status?.clock_in_time))).format("HH:mm:ss") : "00:00:00"}
                </P>
              </Container>
            </Container>
          </View> : null
        }
      </React.Fragment>
    )
  }

export default ClockINContainer