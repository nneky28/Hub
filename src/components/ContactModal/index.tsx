import React from 'react';
import {
  View, Share, Linking} from 'react-native';
import Modal from 'react-native-modal';
import TextWithIcon, { TextWithIconCopy } from '../TextWithIcon';
import styles from './styles';
import { Images } from '../../utills/Image';
import { ContactModalProps, DocumentModalProps } from './types';



const ContactModal = ({ isVisible, onHide, data } : ContactModalProps) => {


  let address = ""
  if ( data && "address" in data) {
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
      title: data && "phone_number1" in data && data?.phone_number1 ? data.phone_number1 : "",
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
        {
          contactData.map((item,i)=><TextWithIconCopy item={item} onHide={onHide} key={i}/>)
        }
      </View>
    </Modal>
  );
};

const DocumentModal = ({ isVisible, onHide, document } : DocumentModalProps) => {
  const onPressHandle = (action : "view" | "share" | "download") => {
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
        <TextWithIcon item={{ title: 'Share', iconLeft: {uri : Images.ShareIcon} }} textStyle={styles.text2}
          onPressHandle={() => onPressHandle("share")}
        />
        <TextWithIcon item={{ title: 'Download', iconLeft: {uri : Images.DownloadIcon} }} textStyle={styles.text2}
          onPressHandle={() => onPressHandle("download")}
        />
      </View>
    </Modal>
  );
};

export { DocumentModal };
export default ContactModal;
