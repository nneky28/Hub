import React, { useEffect, useState } from 'react';
import {
  Text, View, Share, Linking, TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import { unCheckRectIcon } from '../../assets/images';
import TextWithIcon, { TextWithIconCopy } from '../TextWithIcon';
import styles from './styles';
import { getData } from '../../utills/Methods';
import { Container, EmptyStateWrapper, P, TouchableWrapper } from '../../utills/components';
import AppColors from '../../utills/AppColors';
import { Images } from '../../utills/Image';
import { height, width } from 'react-native-dimension';
import { useNavigation } from '@react-navigation/native';
import { nextProps, prevProps } from './types';
import Button from '../Button';



const ContactModal = ({ isVisible, onHide, data }) => {


  let address = ""
  if (data?.address) {
    address = data?.address?.address1 || ""
    address = address && data?.address?.address2 ? `${address}, ${data?.address?.address2}` : data?.address?.address2 ? data?.address?.address2 : address
    address = address && data?.address?.city ? `${address}, ${data?.address?.city}` : data?.address?.city ? data?.address?.city : address
    address = address && data?.address?.state ? `${address}, ${data?.address?.state}` : data?.address?.state ? data?.address?.state : address
    address = address && data?.address?.country_display ? `${address}, ${data?.address?.country_display}` : data?.address?.country_display ? data?.address?.country_display : address
  }
  const contactData = [
    {
      key: '1',
      title: data && data.email ? data.email : "",
      iconLeft: { uri: Images.MessageIcon },
      iconRight: { uri: Images.CopyIcon },
    },
    {
      key: '2',
      title: address,
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
          <Button
            onPress={onPressHandler}
            containerStyle={{
              width: width(70),
            }}
            title={"Turn on"}
          />
          <Button
            onPress={onHide}
            containerStyle={{
              width: width(70),
              marginTop: height(2),
              backgroundColor: AppColors.white
            }}
            title={"Cancel"}
            textStyle={{
              color: AppColors.black
            }}
          />
        </Container>
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
const ActionModal = ({ isVisible, onHide, onPressHandle, loading, item, deleteHandler, title }) => {

  const [showDetails, setShowDetails] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const navigation = useNavigation();


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
      style={{ justifyContent: 'flex-end', margin: 0 }}
      isVisible={isVisible}>

      <View style={styles.container1}>
        <TouchableOpacity style={styles.textCon} onPress={() => {
          onHide()
          navigation.navigate("TaskView", { item, title })
        }}>
          <P>View Task</P>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          style={styles.textCon} onPress={() => onPressHandle("Completed")}>
          <P>Mark task as complete</P>
        </TouchableOpacity>
        {
          title === "To-Do" ? null :
            <>
              <View style={styles.line} />
              <TouchableOpacity style={styles.textCon} onPress={() => {
                onHide()
                onPressHandle("To-do")
              }
              } >
                <P>Mark task as not started</P>
              </TouchableOpacity>
            </>
        }
        <View style={styles.line} />
        <TouchableOpacity style={styles.textCon} onPress={() => {
          onHide()
          navigation.navigate("CreateTask", { item })
        }}>
          <P>Edit Task</P>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.textCon} onPress={() => deleteHandler()}>
          <P color={AppColors.red}>Delete Task</P>
        </TouchableOpacity>
        <View style={styles.line} />
      </View>

      {/* <TaskViewMore isVisible={showDetails} onHide={() => setShowDetails(false)} item={item} /> */}
    </Modal>
  );
};

const SentActionModal = ({ isVisible, onHide, item, deleteHandler, onPressHandle, loading, title }) => {
  const [showForm, setShowForm] = useState(false)
  const [employee, setEmployee] = useState({})
  const [showDetails, setShowDetails] = useState(false)
  const navigation = useNavigation();

  const getUser = async () => {
    let user = await getData("about_me")
    setEmployee(user)
  }
  // const disabled = () => {
  //   if (employee?.id !== item?.created_by?.id) {
  //     Alert('You can not delete this task')
  //   }
  // }

  const handleView = () => {
    setShowDetails(true)
    item
  }
  useEffect(() => {
    getUser()
  }, [])
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
      <View style={styles.container1}>
        <React.Fragment>
          <TouchableOpacity onPress={() => {
            onHide()
            navigation.navigate("TaskView", { item, title })
          }}
            style={styles.textCon}>
            <P>View Task</P>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity onPress={() => {
            onHide()
            navigation.navigate("CreateTask", { item, })
          }}
            style={styles.textCon}>
            <P>Edit Task</P>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity style={[styles.textCon]}
            onPress={() => deleteHandler()}
            disabled={(employee?.id !== item?.created_by?.id)}>
            <P color={AppColors.red}>Delete task</P>
          </TouchableOpacity>
        </React.Fragment>
      </View>
      {/* <TaskViewMore isVisible={showDetails} onHide={() => setShowDetails(false)} item={item} /> */}
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
      <View style={styles.conBox}>
        <TouchableWrapper style={styles.textCon} onPress={() => onPressHandle('In-progress')}>
          <Text style={styles.progress}>Undo completed</Text>
        </TouchableWrapper>
      </View>
    </Modal>
  );
};

const areEqual = (prevProps : prevProps, nextProps : nextProps) => {
  return (prevProps.isVisible === nextProps.isVisible) && (prevProps.loading === nextProps.loading)
}

export { DocumentModal, FilterModal, ActionModal, UnCompletedModal, SentActionModal };
export default ContactModal;
