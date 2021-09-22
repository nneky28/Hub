import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  timeOffIcon,
  lighteningIcon,
  truckIcon,
  threeMenIcon,
  documentIcon,
} from '../../assets/images';
import styles from './styles';
import Modal from 'react-native-modal';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const SelectionModal = ({isVisible, onHide, navigation}) => {
  const [selected, setSelected] = useState('Documents');
  const TextWithIcon = ({text, icon}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(text)
          navigation.navigate('Modules', { screen: text })
          // navigation.navigate(text)
          onHide();
        }}
        style={{alignItems: 'center'}}>
        <Image
          resizeMode="contain"
          style={[
            styles.icon,
            selected == text && {tintColor: AppColors.green},
          ]}
          source={icon}
        />
        <Text
          style={[styles.text, selected == text && {color: AppColors.green}]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      onBackButtonPress={onHide}
      onModalHide={onHide}
      animationInTiming={500}
      animationOutTiming={10}
      swipeDirection={'down'}
      onSwipeComplete={onHide}
      onBackdropPress={onHide}
      animationIn="fadeInUp"
      animationOut="fadeInDown"
      swipeThreshold={0.3}
      style={{justifyContent: 'flex-end', margin: 0}}
      isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.line1} />
        <View style={styles.row}>
          <TextWithIcon text="Time off" icon={timeOffIcon} />
          <TextWithIcon text="Documents" icon={documentIcon} />
          <TextWithIcon text="People" icon={threeMenIcon} />
        </View>
        <View style={styles.line} />
        <View style={styles.row}>
          <TextWithIcon text="Payslip" icon={truckIcon} />
          <TextWithIcon text="Trainings" icon={lighteningIcon} />
          <TextWithIcon text="Benefits" icon={lighteningIcon} />
        </View>
      </View>
    </Modal>
  );
};

export default SelectionModal;
