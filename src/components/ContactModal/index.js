import React, { useEffect } from 'react';
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
      {
          key: '4',
          title: 'linkedin',
          iconLeft: require('../../assets/images/icons/linked-in.png'),
          iconRight: null,
      },
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
        <TextWithIcon item={contactData[3]} textStyle={styles.text2}/>
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

const TimeoffModal = ({isVisible, onHide,timeoff_id}) => {
  console.log("TimeoffModal",timeoff_id)
  const defaultColor = "";
  const blackColor = "";
  const [data,setData] = React.useState({
      "timeoff": timeoff_id,
      "start_date": "2021-09-28",
      "end_date": "2021-09-28",
      "reason": "string"
    })
  const handleSubmit = async () => {
    try{
      return console.log("handleSubmit",data,timeoff_id)
    }catch(err){
      console.log("err---",err)
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
                      displayText={'Payoff Request'}
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
                />
                <Field
                    name="end_date"
                    placeholder="End Date"
                    component={CustomDatePicker}
                    value={data.end_date}
                    onChangeData={(value)=>{
                      setData({...data,end_date : value})
                    }}
                />
                  <Field
                    component={CustomInput}
                    name="reason"
                    placeholder="Reason"
                    keyboardType="default"
                    value={data.email}
                    onChangeData={(value)=>{

                    }}
                    height={100}
                    multiline={true}
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

export { DocumentModal, FilterModal,TimeoffModal };
export default ContactModal;
