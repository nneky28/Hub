import React, { useEffect, useState } from 'react';
import {
  Text, View, ScrollView, Share, Linking, KeyboardAvoidingView, TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import { deleteIcon, downloadIcon, shareIcon, unCheckRectIcon } from '../../assets/images';
import TextWithIcon, { TextWithIconCopy } from '../TextWithIcon';
import styles from './styles';
import { Field, Formik } from 'formik';
import CustomText from '../../component2/customText/CustomText';
import CustomButton from '../../component2/button/Button';
import CustomInput from '../CustomInput';
import CustomDatePicker from '../CustomDatePicker';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setLoaderVisible } from '../../Redux/Actions/Config';
import { APIFunction, postAPIs } from '../../utills/api';
import { getData, ToastError, storeData, getStoredBusiness, getTimeOffsFunction } from '../../utills/Methods';
import { Container, CustomCalender, EmptyStateWrapper, H1, LottieIcon, P, SizedBox, TouchWrap, TouchableWrapper } from '../../utills/components';
import Warningjson from '../../assets/lottie/warning.json'
import { ActivityIndicator, TouchableRipple } from 'react-native-paper';
import AppColors from '../../utills/AppColors';
import { showFlashMessage } from '../SuccessFlash';
import { Images } from '../../component2/image/Image';
import { height, width } from 'react-native-dimension';
import { useQueryClient } from 'react-query';
import TaskDetails from '../TaskDetails/Index'
import CreateTask from '../../screens/CreateTask/Index'


const ContactModal = ({ isVisible, onHide, data }) => {
  const contactData = [
    {
      key: '1',
      title: data && data.email ? data.email : "",
      iconLeft: { uri: Images.MessageIcon },
      iconRight: { uri: Images.CopyIcon },
    },
    {
      key: '2',
      title: data && data.address && data.address.address1 ? data.address.address1 :
        data && data.address ? data.address : "",
      iconLeft: { uri: Images.MapPIN },
      iconRight: { uri: Images.CopyIcon },
    },
    {
      key: '3',
      title: data && data.phone_number1 ? data.phone_number1 : "",
      iconLeft: { uri: Images.PhoneIcon },
      iconRight: { uri: Images.CopyIcon },
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
      style={{ justifyContent: 'flex-end', margin: 0 }}
      isVisible={isVisible}>
      <View style={styles.container}>
        <TextWithIconCopy item={contactData[0]} onHide={onHide} />
        <TextWithIconCopy item={contactData[1]} onHide={onHide} />
        <TextWithIconCopy item={contactData[2]} onHide={onHide} />
        {/* <TextWithIcon item={contactData[3]} textStyle={styles.text2}/> */}
      </View>
    </Modal>
  );
};

const DocumentModal = ({ isVisible, onHide, document }) => {
  const onPressHandle = (action) => {
    try {
      if (!document || !document.file) return
      if (action === "view") {
        return
      }
      if (action === "share") {
        return Share.share({
          message: `${document.file}`
        })
      }
      if (!Linking.canOpenURL(document.file)) return
      return Linking.openURL(document.file)
    } catch (err) {
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
      style={{ justifyContent: 'flex-end', margin: 0 }}
      isVisible={isVisible}>
      <View style={styles.container}>
        <TextWithIcon item={{ title: 'Share', iconLeft: Images.ShareIcon }} textStyle={styles.text2}
          onPressHandle={() => onPressHandle("share")}
          url={true}
        />
        <TextWithIcon item={{ title: 'Download', iconLeft: Images.DownloadIcon }} textStyle={styles.text2}
          onPressHandle={() => onPressHandle("download")}
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

export const RestrictionModal = ({ isVisible, onHide, onPressHandler }) => {
  return (
    <Modal
      //onBackButtonPress={onHide}
      onModalHide={onHide}
      animationInTiming={500}
      animationOutTiming={10}
      backdropOpacity={0.2}
      swipeDirection={'down'}
      // onSwipeComplete={onHide}
      onBackdropPress={onHide}
      animationIn="fadeInUp"
      animationOut="fadeInDown"
      swipeThreshold={0.3}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      isVisible={isVisible}
    >
      <View style={styles.container}>
        <EmptyStateWrapper
          marginTop={height(0.3)}
          height={height(1.8)}
          icon={Images.PINLocation}
          header_1={"Where are you?"}
          sub_text={"Please turn on your location so you can clock in."}
        />
        <Container width={80} marginTop={2}
          // direction="row"
          style={{
            justifyContent: "space-between",
            alignSelf: "center",
            alignItems: "center"
          }}
        >
          {/* <TouchableOpacity onPress={onHide}>
              <H1>Cancel</H1>
            </TouchableOpacity> */}
          <CustomButton
            handelButtonPress={onPressHandler}
            btnStyle={{
              width: width(70),
            }}
            btnText={"Turn on"}
          />
          <CustomButton
            handelButtonPress={onHide}
            btnStyle={{
              width: width(70),
              marginTop: height(2),
              backgroundColor: AppColors.white
            }}
            btnText={"Cancel"}
            textStyle={{
              color: AppColors.black
            }}
          />
        </Container>
      </View>
    </Modal>
  );
};

const __TimeoffModal = ({ isVisible, onHide, timeoff_id, closeAndRefresh }) => {
  const dispatch = useDispatch();
  const defaultColor = AppColors.black;
  const [action, setAction] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState({
    "timeoff": timeoff_id,
    "start_date": "",
    "end_date": "",
    "reason": ""
  })
  const [show, setShow] = React.useState(false)
  useEffect(() => {
    setData({
      "timeoff": timeoff_id,
      "start_date": "",
      "end_date": "",
      "reason": ""
    })
    setShow(false)
  }, [isVisible])

  const handleSubmit = async () => {
    try {
      let failed = false;
      required = ["start_date", "end_date", "reason"]
      for (let req of required) {
        if (!data[req] || (data[req] && data[req] === "") || (data[req] && data[req].trim() === "")) failed = true;
      }
      if (failed) {
        return showFlashMessage({ type: "error", title: "All fields are required" })
      };
      let about_me = await getData("about_me")
      let biz = await getStoredBusiness();
      dispatch(setLoaderVisible(true));
      setLoading(true)
      let timeoff_url = APIFunction.timeoff_reqs(biz.business_id, about_me.id)
      let fd = {
        ...data, timeoff: timeoff_id
      }
      await postAPIs(timeoff_url, fd);
      let res = await getTimeOffsFunction();
      storeData("curr_timeoff", null)
      closeAndRefresh(res)
      setLoading(false)
      dispatch(setLoaderVisible(false));
      showFlashMessage({ title: "Request has been submitted for processing" })
      onHide()
    } catch (err) {
      let msg = err.msg && err.msg.detail && typeof (err.msg.detail) == "string" ? err.msg.detail : err.msg
      dispatch(setLoaderVisible(false));
      setLoading(false)
      return showFlashMessage({ type: "error", title: msg })
    }
  }
  return (
    <Modal
      onBackButtonPress={onHide}
      onModalHide={onHide}
      animationInTiming={500}
      animationOutTiming={10}
      backdropOpacity={0.2}
      //swipeDirection={'down'}
      // onSwipeComplete={onHide}
      onBackdropPress={onHide}
      animationIn="fadeInUp"
      animationOut="fadeInDown"
      swipeThreshold={0.3}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      isVisible={isVisible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.inner}>
            <View style={styles.bodyWrap}>
              {
                show ? <CustomCalender
                  date={action === "start_date" ? data.start_date : data.end_date}
                  setShow={(date) => {
                    if (action === "start_date") {
                      setData({ ...data, start_date: date.dateString })
                    }
                    if (action === "end_date") {
                      setData({ ...data, end_date: date.dateString })
                    }
                    setShow(false)
                  }}
                /> : <Formik>
                  <React.Fragment>
                    <Container marginLeft={2}>
                      <TouchWrap onPress={onHide}
                        width={15}
                        height={6}
                      >
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
                      setShow={() => {
                        setAction("start_date")
                        setShow(true)
                      }}
                      maximumDate={null}
                      color={AppColors.black}
                    />
                    <Field
                      name="end_date"
                      placeholder="Resumption Date"
                      component={CustomDatePicker}
                      value={data.end_date}
                      setShow={() => {
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
                      value={data.reason}
                      onChangeData={(value) => {
                        setData({ ...data, reason: value })
                      }}
                      minHeight={10}
                      multiline={true}
                      color={AppColors.black}
                    />
                    <View style={{ width: '100%', padding: '5%' }}>
                      {
                        loading ? <ActivityIndicator
                          color={AppColors.pink}
                        /> : <CustomButton
                          btnText={'Submit'}
                          handelButtonPress={handleSubmit}
                        />
                      }
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



const __ReportModal = ({ isVisible, onHide, asset }) => {
  const dispatch = useDispatch();
  const defaultColor = "";
  const [message, setMessage] = React.useState("")
  useEffect(() => {
    setMessage("")
  }, [isVisible])
  const handleSubmit = async () => {
    try {
      let failed = false;
      if (!message || (message === "") || (message.trim() === "")) failed = true;
      if (failed) {
        return showFlashMessage({ type: "error", title: "Message field is required" })
      };
      dispatch(setLoaderVisible(true));
      let fd = { message: message, date: moment().format("YYYY-MM-DD") }
      await APIFunction.report_asset(fd, asset.id)
      dispatch(setLoaderVisible(false));
      showFlashMessage({ title: "Issue has been reported to HR" })
      onHide()
    } catch (err) {
      dispatch(setLoaderVisible(false));
      return showFlashMessage({ type: "error", title: err.msg })
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
      style={{ justifyContent: 'flex-end', margin: 0 }}
      isVisible={isVisible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "flex-end" }}
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
                    onChangeData={(value) => {
                      setMessage(value)
                    }}
                    height={10}
                    multiline={true}
                    color={AppColors.black}
                  />
                  <View style={{ width: '100%', padding: '5%' }}>
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



const __WarningModal = ({ isVisible, onHide, onPressHandle, question, performAction, loading, btnText }) => {
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
      style={{ justifyContent: 'flex-end', margin: 0 }}
      isVisible={isVisible}>
      <View style={styles.container}>
        <View style={{
          padding: 20,
          width: "100%"
        }}>
          <View style={{
            alignItems: "center"
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
                  backgroundColor: "#FF7372",
                  width: "100%",
                  textAlign: "center"
                }}
                handelButtonPress={() => {
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



const FilterModal = ({ isVisible, onHide, onPressHandle }) => {

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
      style={{ justifyContent: 'flex-end', margin: 0 }}
      isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.line1} />
        <View style={styles.textContainer}>
          <Text style={styles.text1}>Filter</Text>
        </View>
        <TextWithIcon item={{ title: 'Department', iconRight: unCheckRectIcon }} containerStyle={styles.filterContainer} iconStyle={styles.uncheckIcon} textStyle={styles.text2} />
        <TextWithIcon item={{ title: 'Job Role', iconRight: unCheckRectIcon }} containerStyle={styles.filterContainer} iconStyle={styles.uncheckIcon} textStyle={styles.text2} />
        <TextWithIcon item={{ title: 'Line Manager', iconRight: unCheckRectIcon }} containerStyle={styles.filterContainer} iconStyle={styles.uncheckIcon} textStyle={styles.text2} />
      </View>
    </Modal>
  );
};
const ActionModal = ({ isVisible, onHide, onPressHandle, loading, item, deleteHandler }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const Loader = () => {
    if (loading)
      return (
        <Container marginTop={3}>
          <ActivityIndicator size={width(10)} color={AppColors.green} />
        </Container>
      )

  }

  const handleOpen = () => {
    setShowDetails(true)
    item
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
      style={{ margin: 0 }}
      isVisible={isVisible}>

      <View style={styles.container1}>
        <TouchableOpacity style={styles.textCon} onPress={handleOpen}>
          <P>View Task</P>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.textCon} onPress={() => onPressHandle("Completed")}>
          <P>Mark task as complete</P>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.textCon} onPress={() => { setShowForm(true), item }}>
          <P>Edit Task</P>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.textCon} onPress={() => deleteHandler()}>
          <P>Delete Task</P>
        </TouchableOpacity>
        <View style={styles.line} />
      </View>

      <TaskDetails isVisible={showDetails} onHide={() => setShowDetails(false)} item={item} />
      <CreateTask
        visible={showForm}
        onHide={() => setShowForm(false)}
        item={item}
      />
    </Modal>
  );
};

const SentActionModal = ({ isVisible, onHide, loading, item, deleteHandler }) => {

  const [showForm, setShowForm] = useState(false)

  const Loader = () => {
    if (loading)
      return (
        <Container marginTop={3}>
          <ActivityIndicator size={width(10)} color={AppColors.green} />
        </Container>
      )

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
      isVisible={isVisible}>
      <View style={styles.container1}>

        <React.Fragment >
          <TouchableOpacity onPress={() => { setShowForm(true), item }} style={styles.textCon}>
            <P style={styles.text1}>Edit Task</P>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity style={styles.textCon} onPress={() => deleteHandler()}>
            <P style={styles.text1}>Delete task</P>
          </TouchableOpacity>
        </React.Fragment>

      </View>
      <CreateTask
        visible={showForm}
        onHide={() => setShowForm(false)}
        item={item}
      />
    </Modal>
  );
};


const UnCompletedModal = ({ isVisible, onHide, onPressHandle }) => {

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
      style={{ margin: 0 }}
      isVisible={isVisible}>
      <View style={styles.container1}>
        <TouchableWrapper style={styles.textCon} onPress={() => onPressHandle('In-progress')}>
          <Text style={styles.progress}>Undo completed</Text>
        </TouchableWrapper>
      </View>
    </Modal>
  );
};




const areEqual = (prevProps, nextProps) => {
  return (prevProps.isVisible === nextProps.isVisible) && (prevProps.loading === nextProps.loading)
}
export const WarningModal = React.memo(__WarningModal, areEqual)
export const TimeoffModal = React.memo(__TimeoffModal, areEqual)
export const ReportModal = React.memo(__ReportModal, areEqual)
export { DocumentModal, FilterModal, ActionModal, UnCompletedModal, SentActionModal };
export default ContactModal;
