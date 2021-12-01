import React, { useEffect, useState } from 'react';
import {
  Text, View,ScrollView
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
import { Container, H1, LottieIcon, P, SizedBox } from '../../utills/components';
import Warningjson from '../../assets/lottie/warning.json'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import AppColors from '../../utills/AppColors';
import { showFlashMessage } from '../SuccessFlash';

const ContactModal = ({isVisible, onHide,data}) => {
//   email: ""
// first_name: "asha"
// hire_date: "2021-09-21"
// job: Object
// last_name: "abi"
// line_manager: null
// phone_number1: ""
// photo: null
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

const DocumentModal = ({isVisible, onHide}) => {

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
        <TextWithIcon item={{title: 'Share', iconLeft: shareIcon}} textStyle={styles.text2}/>
        <TextWithIcon item={{title: 'Download', iconLeft: downloadIcon}} textStyle={styles.text2}/>
        <TextWithIcon item={{title: 'Delete', iconLeft: deleteIcon}} textStyle={styles.text2}/>
      </View>
    </Modal>
  );
};

const __TimeoffModal = ({isVisible, onHide,timeoff_id,active,hideAndOpen,closeAndRefresh}) => {
  const dispatch = useDispatch();
  const defaultColor = "";
  const blackColor = "";
  const [data,setData] = React.useState({
    "timeoff": timeoff_id,
    "start_date": "",
    "end_date": "",
    "reason": ""
  })
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
      // console.log("err--",active,data)
      // let check = active && Array.isArray(active) && active.length > 0 ?  active.some(item=>{
      //   return item.start_date && moment(item.start_date).isBefore(moment(data.start_date)) &&
      //   item.end_date && moment(item.end_date).isBefore(moment(data.end_date))
      // }) : true;
      // if(!check){
      //   return showFlashMessage({type : "error",title : "Please select dates that do not fall within active timeoffs"})
      // }
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
      console.log("err00",err)
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
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.inner}>
          <View style={styles.bodyWrap}>
            <Formik>
              <React.Fragment>
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
                <CustomText
                  textSize={12}
                  textWeight={'normal'}
                  textcolor={blackColor}
                  textStyle={{
                    marginTop: 5,
                  }}
                />
                <Field
                    name="start_date"
                    placeholder="Start Date"
                    component={CustomDatePicker}
                    value={data.start_date}
                    onChangeData={(value)=>{
                      setData({...data,start_date : value})
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
                      //isloading={isprocessing}
                    />
                  </View> 
                </React.Fragment>
            </Formik>
        </View>
      </ScrollView>


      </View>
    </Modal>
  );
};



const __WarningModal = ({isVisible, onHide, onPressHandle,question,performAction,loading}) => {
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
                    btnText={"Cancel Request"}
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
export { DocumentModal, FilterModal};
export default ContactModal;
