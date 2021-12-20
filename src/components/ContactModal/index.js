import React, { useEffect, useState } from 'react';
import {
  Text, View,ScrollView, Share, Linking, KeyboardAvoidingView
} from 'react-native';
import Modal from 'react-native-modal';
import { deleteIcon, downloadIcon, shareIcon, unCheckRectIcon } from '../../assets/images';
import { contactData } from '../../utills/data/contactData';
import TextWithIcon, { TextWithIconCopy } from '../TextWithIcon';
import styles from './styles';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import { Field, Formik } from 'formik';
import CustomText from '../../component2/customText/CustomText';
import CustomButton from '../../component2/button/Button';
import CustomInput from '../CustomInput';
import CustomDatePicker from '../CustomDatePicker';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setLoaderVisible } from '../../Redux/Actions/Config';
import { APIFunction, postAPIs } from '../../utills/api';
import { getData, ToastError,storeData, getStoredBusiness } from '../../utills/Methods';
import { Container, CustomCalender, H1, LottieIcon, P, SizedBox, TouchWrap } from '../../utills/components';
import Warningjson from '../../assets/lottie/warning.json'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import AppColors from '../../utills/AppColors';
import { showFlashMessage } from '../SuccessFlash';
import { Calendar } from 'react-native-calendars';
import { Images } from '../../component2/image/Image';

const ContactModal = ({isVisible, onHide,data}) => {
  const contactData = [
      {
          key: '1',
          title: data && data.email ? data.email : "",
          iconLeft: require('../../assets/images/icons/message.png'),
          iconRight: require('../../assets/images/icons/copy.png'),
      },
      {
          key: '2',
          title: data && data.address && data.address.address1 ? data.address.address1 : 
          data && data.address ? data.address : "",
          iconLeft: require('../../assets/images/icons/location.png'),
          iconRight: require('../../assets/images/icons/copy.png'),
      },
      {
          key: '3',
          title: data && data.phone_number1 ? data.phone_number1 : "",
          iconLeft: require('../../assets/images/icons/phone.png'),
          iconRight: require('../../assets/images/icons/copy.png'),
      },
      // {
      //     key: '4',
      //     title: 'linkedin',
      //     iconLeft: require('../../assets/images/icons/linked-in.png'),
      //     iconRight: null,
      // },
  ]
  return (
    <Modal
      onBackButtonPress={onHide}
      onModalHide={onHide}
      animationInTiming={500}
      animationOutTiming={10}
      backdropOpacity={0.2}
      swipeDirection={'down'}
      onSwipeComplete={onHide}
      onBackdropPress={onHide}
      animationIn="fadeInUp"
      animationOut="fadeInDown"
      swipeThreshold={0.3}
      style={{justifyContent: 'flex-end', margin: 0}}
      isVisible={isVisible}>
      <View style={styles.container}>
        <TextWithIconCopy item={contactData[0]} onHide={onHide}/>
        <TextWithIconCopy item={contactData[1]} onHide={onHide}/>
        <TextWithIconCopy item={contactData[2]} onHide={onHide}/>
        {/* <TextWithIcon item={contactData[3]} textStyle={styles.text2}/> */}
      </View>
    </Modal>
  );
};

const DocumentModal = ({isVisible, onHide,document}) => {
  const onPressHandle = (action) => {
    try{
      if(!document || !document.file) return
      if(action === "view"){
        return
      }
      if(action === "share"){
        return Share.share({
          message : `${document.file}`
        })
      }
      if(!Linking.canOpenURL(document.file)) return
      return Linking.openURL(document.file)
    }catch(err){
      console.log("Errr--",err)
    }
  }
  return (
    <Modal
      onBackButtonPress={onHide}
      onModalHide={onHide}
      animationInTiming={500}
      animationOutTiming={10}
      backdropOpacity={0.2}
      swipeDirection={'down'}
      onSwipeComplete={onHide}
      onBackdropPress={onHide}
      animationIn="fadeInUp"
      animationOut="fadeInDown"
      swipeThreshold={0.3}
      style={{justifyContent: 'flex-end', margin: 0}}
      isVisible={isVisible}>
      <View style={styles.container}>
        <TextWithIcon item={{title: 'Share', iconLeft: Images.ShareIcon}} textStyle={styles.text2}
          onPressHandle={()=>onPressHandle("share")}
          url={true}
        />
        <TextWithIcon item={{title: 'Download', iconLeft: Images.DownloadIcon}} textStyle={styles.text2}
          onPressHandle={()=>onPressHandle("download")}
          url={true}
        />
        {/* <TextWithIcon item={{title: 'View', iconLeft: Images.EyeIcon}} textStyle={styles.text2}
          onPressHandle={()=>onPressHandle("view")}
          url={true}
        /> */}
      </View>
    </Modal>
  );
};

const __TimeoffModal = ({isVisible, onHide,timeoff_id,active,hideAndOpen,closeAndRefresh}) => {
  const dispatch = useDispatch();
  const defaultColor = "";
  const blackColor = "";
  const [action,setAction] = React.useState(null)
  const [data,setData] = React.useState({
    "timeoff": timeoff_id,
    "start_date": "",
    "end_date": "",
    "reason": ""
  })
  const [show,setShow] = React.useState(false)
  useEffect(()=>{
    setData({
      "timeoff": timeoff_id,
      "start_date": "",
      "end_date": "",
      "reason": ""
    })
    setShow(false)
  },[isVisible])
  const handleSubmit = async () => {
    try{
      let failed = false;
      required = ["start_date","end_date",
          "reason"]
      for(let req of required){
          if(!data[req] || (data[req] && data[req] === "") || (data[req] && data[req].trim() === "")) failed = true;
      }
      if(failed) {
        return showFlashMessage({type : "error",title : "All fields are required"})
      };
      if(!moment(data.start_date).isBefore(moment(data.end_date))){
        return showFlashMessage({type : "error",title : "Start date must be before end date"})
      }
      if(moment(moment(new Date()).format("YYYY-MM-DD")).isAfter(moment(data.start_date)) || moment(moment(new Date()).format("YYYY-MM-DD")).isAfter(moment(data.end_date))){
        return showFlashMessage({type : "error",title : "Date must be in the future"})
      }
      let about_me = await getData("about_me")
      let biz = await getStoredBusiness();
      dispatch(setLoaderVisible(true));
      let timeoff_url = APIFunction.timeoff_reqs(biz.business_id,about_me.id)
      let fd = {
        ...data,timeoff : timeoff_id
      }
       await postAPIs(timeoff_url,fd);
      storeData("curr_timeoff",null)
      dispatch(setLoaderVisible(false));
      closeAndRefresh()
    }catch(err){
      let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : err.msg
      dispatch(setLoaderVisible(false));
      return showFlashMessage({type : "error",title : msg})
    }
  }
  return (
    <Modal
      onBackButtonPress={onHide}
      onModalHide={onHide}
      animationInTiming={500}
      animationOutTiming={10}
      backdropOpacity={0.2}
      swipeDirection={'down'}
      onSwipeComplete={onHide}
      onBackdropPress={onHide}
      animationIn="fadeInUp"
      animationOut="fadeInDown"
      swipeThreshold={0.3}
      style={{justifyContent: 'flex-end', margin: 0}}
      isVisible={isVisible}>
        <KeyboardAvoidingView  
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={{flex : 1,justifyContent : "flex-end"}}
        >
              <View style={styles.container}>
                  <ScrollView contentContainerStyle={styles.inner}>
                    <View style={styles.bodyWrap}>
                      {
                        show ? <CustomCalender 
                          date={action === "start_date" ? data.start_date : data.end_date}
                          setShow={(date)=>{
                            if(action === "start_date"){
                              setData({...data,start_date : date.dateString})
                            }
                            if(action === "end_date"){
                              setData({...data,end_date : date.dateString})
                            }
                            setShow(false)
                          }} 
                        /> : <Formik>
                        <React.Fragment>
                          <Container marginLeft={4}
                            width={10}
                          >
                            <TouchWrap onPress={onHide}>
                              <P>Close</P>
                            </TouchWrap>
                          </Container>
                          <View
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              marginTop: 25,
                            }}>
                              <CustomText
                                textSize={20}
                                textWeight={'bold'}
                                textcolor={defaultColor}
                                displayText={'Timeoff Request'}
                                textStyle={{
                                  marginTop: -3,
                                }}
                              />
                          </View>
                          <Field
                              name="start_date"
                              placeholder="Start Date"
                              component={CustomDatePicker}
                              value={data.start_date}
                              onChangeData={(value)=>{
                                setData({...data,start_date : value})
                              }}
                              setShow={()=>{
                                setAction("start_date")
                                setShow(true)
                              }}
                              maximumDate={null}
                              color={AppColors.black}
                          />
                          <Field
                              name="end_date"
                              placeholder="End Date"
                              component={CustomDatePicker}
                              value={data.end_date}
                              onChangeData={(value)=>{
                                setData({...data,end_date : value})
                              }}
                              setShow={()=>{
                                setAction("end_date")
                                setShow(true)
                              }}
                              maximumDate={null}
                              color={AppColors.black}
                          />
                            <Field
                              component={CustomInput}
                              name="reason"
                              placeholder="Reason"
                              keyboardType="default"
                              value={data.email}
                              onChangeData={(value)=>{
                                setData({...data,reason : value})
                              }}
                              height={100}
                              multiline={true}
                              color={AppColors.black}
                            />
                            <View style={{width: '100%', padding : '5%'}}>
                              <CustomButton
                                btnText={'Submit'}
                                handelButtonPress={handleSubmit}
                              />
                            </View> 
                          </React.Fragment>
                      </Formik>
                      }
                  </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    </Modal>
  );
};



const __ReportModal = ({isVisible, onHide,asset}) => {
  const dispatch = useDispatch();
  const defaultColor = "";
  const [message,setMessage] = React.useState("")
  useEffect(()=>{
    setMessage("")
  },[isVisible])
  const handleSubmit = async () => {
    try{
      let failed = false;
      if(!message || (message === "") || (message.trim() === "")) failed = true;
      if(failed) {
        return showFlashMessage({type : "error",title : "Message field is required"})
      };
      dispatch(setLoaderVisible(true));
      let fd = {message : message,date : moment().format("YYYY-MM-DD")}
      await APIFunction.report_asset(fd,asset.id)
      dispatch(setLoaderVisible(false));
      showFlashMessage({title : "Issue has been reported to HR"})
      onHide()
    }catch(err){
      console.log("er--",err)
      dispatch(setLoaderVisible(false));
      return showFlashMessage({type : "error",title : err.msg})
    }
  }
  return (
    <Modal
      onBackButtonPress={onHide}
      onModalHide={onHide}
      animationInTiming={500}
      animationOutTiming={10}
      backdropOpacity={0.2}
      swipeDirection={'down'}
      onSwipeComplete={onHide}
      onBackdropPress={onHide}
      animationIn="fadeInUp"
      animationOut="fadeInDown"
      swipeThreshold={0.3}
      style={{justifyContent: 'flex-end', margin: 0}}
      isVisible={isVisible}>
        <KeyboardAvoidingView  
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={{flex : 1,justifyContent : "flex-end"}}
        >
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner}>
              <View style={styles.bodyWrap}>
                <Formik>
                    <React.Fragment>
                      <Container marginLeft={4}
                        width={10}
                      >
                        <TouchWrap onPress={onHide}>
                          <P>Close</P>
                        </TouchWrap>
                      </Container>
                      <View
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          marginTop: 25,
                        }}>
                          <CustomText
                            textSize={20}
                            textWeight={'bold'}
                            textcolor={defaultColor}
                            displayText={'Report Issue'}
                            textStyle={{
                              marginTop: -3,
                            }}
                          />
                      </View>
                        <Field
                          component={CustomInput}
                          name="message"
                          placeholder="Message"
                          keyboardType="default"
                          value={message}
                          onChangeData={(value)=>{
                            setMessage(value)
                          }}
                          height={100}
                          multiline={true}
                          color={AppColors.black}
                        />
                        <View style={{width: '100%', padding : '5%'}}>
                          <CustomButton
                            btnText={'Submit'}
                            handelButtonPress={handleSubmit}
                          />
                        </View> 
                      </React.Fragment>
                  </Formik>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
    </Modal>
  );
};



const __WarningModal = ({isVisible, onHide, onPressHandle,question,performAction,loading,btnText}) => {
  return (
    <Modal
      onBackButtonPress={onHide}
      onModalHide={onHide}
      animationInTiming={500}
      animationOutTiming={10}
      backdropOpacity={0.2}
      swipeDirection={'down'}
      onSwipeComplete={onHide}
      onBackdropPress={onHide}
      animationIn="fadeInUp"
      animationOut="fadeInDown"
      swipeThreshold={0.3}
      style={{justifyContent: 'flex-end', margin: 0}}
      isVisible={isVisible}>
      <View style={styles.container}>
          <View style={{
            padding : 20,
            width : "100%"
          }}>
            <View style={{
              alignItems : "center"
            }}>
              <LottieIcon 
                icon={Warningjson}
                size={100}
              />
            </View>
              <H1 textAlign="center" fontSize={3}>{question}</H1>
              <SizedBox />
              {
                loading ? (
                  <ActivityIndicator 
                    color={AppColors.pink}
                  />
                ) : (
                  <CustomButton 
                    btnText={btnText || "Cancel Request"}
                    btnStyle={{
                      backgroundColor : "#FF7372",
                      width : "100%",
                      textAlign : "center"
                    }}
                    handelButtonPress={()=>{
                      performAction();
                    }}
                />
                )
              }
            {/* <SizedBox /> */}
          </View>
      </View>
    </Modal>
  );
};



const FilterModal = ({isVisible, onHide, onPressHandle}) => {

  return (
    <Modal
      onBackButtonPress={onHide}
      onModalHide={onHide}
      animationInTiming={500}
      animationOutTiming={10}
      backdropOpacity={0.2}
      swipeDirection={'down'}
      onSwipeComplete={onHide}
      onBackdropPress={onHide}
      animationIn="fadeInUp"
      animationOut="fadeInDown"
      swipeThreshold={0.3}
      style={{justifyContent: 'flex-end', margin: 0}}
      isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.line1}/>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>Filter</Text>
        </View>
        <TextWithIcon item={{title: 'Department', iconRight: unCheckRectIcon}} containerStyle={styles.filterContainer} iconStyle={styles.uncheckIcon} textStyle={styles.text2}/>
        <TextWithIcon item={{title: 'Job Role', iconRight: unCheckRectIcon}} containerStyle={styles.filterContainer} iconStyle={styles.uncheckIcon} textStyle={styles.text2}/>
        <TextWithIcon item={{title: 'Line Manager', iconRight: unCheckRectIcon}} containerStyle={styles.filterContainer} iconStyle={styles.uncheckIcon} textStyle={styles.text2}/>
      </View>
    </Modal>
  );
};

const areEqual = (prevProps,nextProps)=>{
  return (prevProps.isVisible === nextProps.isVisible) && (prevProps.loading === nextProps.loading)
}
export const WarningModal = React.memo(__WarningModal,areEqual)
export const TimeoffModal = React.memo(__TimeoffModal,areEqual)
export const ReportModal = React.memo(__ReportModal,areEqual)
export { DocumentModal, FilterModal};
export default ContactModal;
