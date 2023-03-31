import React, { useState, useEffect } from 'react';
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
import { getData, getStoredBusiness } from '../../utills/Methods';
import { useFetchOnboarding } from '../../utills/api';
import { clockRunning } from 'react-native-reanimated';
import { STABLE_BUSINESS_ID } from '../../utills/Constants';

const SelectionModal = ({ isVisible, onHide, navigation }) => {
  const [selected, setSelected] = useState('Task');
  const [business_id, setBusinessID] = React.useState("")

  const Task_Name = "Task"

  const {
    data: onboarding,
  } = useFetchOnboarding(Task_Name)

  const getBusinessID = async () => {
    let biz = await getStoredBusiness()
    setBusinessID(biz?.business_id)
  }
  useEffect(() => {
    getBusinessID()
  }, [])

  useEffect(() => {
  }, [selected])

  const TextWithIcon = ({ text, icon, fill, onboarded }) => {

    return (
      <TouchableOpacity
        onPress={() => {
          if (text === "Task" && !onboarding?.[0]?.has_completed_mobile_onboarding) {
            onHide();
            return navigation.navigate("Menu", { screen: "TaskOnboarding" })
          }
          if (text === "Task" && onboarding?.[0]?.has_completed_mobile_onboarding) {
            onHide()
            return navigation.navigate("Menu", { screen: "Task" })
          }
          setSelected(text)
          navigation.navigate('Menu', { screen: text })
          //navigation.navigate(text)
          onHide();
        }}
        style={styles.textIconContainer}>
        <View style={[styles.iconContainer, selected == text && { backgroundColor: AppColors.lightestGreen, },]}>
          <Image
            resizeMode="contain"
            style={[
              styles.icon,
              selected == text && { tintColor: AppColors.green, },
            ]}
            source={{ uri: selected == text ? fill : icon }}
          />
        </View>
        <Text
          numberOfLines={1}
          style={[styles.text, selected == text && { color: AppColors.green }]}>
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
      style={{ justifyContent: 'flex-end', margin: 0 }}
      isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.row}>
          <TextWithIcon text="Payslip" icon={Images.PayslipIcon} fill={Images.PayFillIcon} />
          <TextWithIcon text="Documents" icon={Images.DocumentIcon} fill={Images.DocumentFillIcon} />
          <TextWithIcon text="Trainings" icon={Images.TrainingIcon} fill={Images.TrainingFillIcon} />
        </View>
        <View style={styles.row}>
          {
            business_id !== STABLE_BUSINESS_ID ? <TextWithIcon text="Task" icon={Images.TaskIcon} fill={Images.TaskFillIcon} /> : null
          }
          <TextWithIcon text="Time off" icon={Images.RadioIcon} fill={Images.RadioFillIcon} />
          <TextWithIcon text="Benefits" icon={Images.BenefitIcon} fill={Images.BenefitFillIcon} />
        </View>
      </View>
    </Modal>
  );
};

export default SelectionModal;
