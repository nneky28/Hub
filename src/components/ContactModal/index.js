import React from 'react';
import {
  Text, View
} from 'react-native';
import Modal from 'react-native-modal';
import { deleteIcon, downloadIcon, shareIcon, unCheckRectIcon } from '../../assets/images';
import { contactData } from '../../utills/data/contactData';
import TextWithIcon, { TextWithIconCopy } from '../TextWithIcon';
import styles from './styles';


const ContactModal = ({isVisible, onHide}) => {

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

export { DocumentModal, FilterModal };
export default ContactModal;
