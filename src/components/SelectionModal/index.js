import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { Images } from '../../component2/image/Image';
import { getData } from '../../utills/Methods';
import { useFetchOnboarding } from '../../utills/api';

const SelectionModal = ({ isVisible, onHide, navigation }) => {
  const [selected, setSelected] = useState('Todos');
  const TextWithIcon = ({ text, icon, fill }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(text)
          navigation.navigate('Menu', { screen: text })
          //navigation.navigate(text)
          onHide();
        }}
        style={{ alignItems: 'center' }}>
        <Image
          resizeMode="contain"
          style={[
            styles.icon,
            selected == text && { tintColor: AppColors.green },
          ]}
          source={{ uri: selected == text ? fill : icon }}
        />
        <Text
          style={[styles.text, selected == text && { color: AppColors.green }]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };



  const {
    data,
  } = useFetchOnboarding()


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
      style={{ justifyContent: 'flex-end', margin: 0 }}
      isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.line1} />
        <View style={styles.row}>
          <TextWithIcon text="Todos" icon={Images.TaskIcon} fill={Images.TaskFillIcon} />
          <TextWithIcon text="Time off" icon={Images.RadioIcon} fill={Images.RadioFillIcon} />
          <TextWithIcon text="Benefits" icon={Images.BenefitIcon} fill={Images.BenefitFillIcon} />
        </View>
        <View style={styles.line} />
        <View style={styles.row}>
          <TextWithIcon text="Payslip" icon={Images.PayslipIcon} fill={Images.PayFillIcon} />
          <TextWithIcon text="Documents" icon={Images.DocumentIcon} fill={Images.DocumentFillIcon} />
          <TextWithIcon text="Trainings" icon={Images.TrainingIcon} fill={Images.TrainingFillIcon} />
        </View>
        <View style={styles.line} />
        <View style={styles.row}>
          {
            data && data.length > 0 || null ? <TextWithIcon text="Task" icon={Images.TaskIcon} fill={Images.TaskFillIcon} /> :
              <TextWithIcon text="TaskOnboarding" icon={Images.TaskIcon} fill={Images.TaskFillIcon} />
          }
        </View>
      </View>
    </Modal>
  );
};

export default SelectionModal;
