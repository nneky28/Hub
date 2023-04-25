import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import AppColors from '../../utills/AppColors';
import { Images } from '../../utills/Image';
import { useFetchOnboarding } from '../../utills/api';
import { SelectionModalProps, TextWithIconProps, useFetchAppOnboardingProps } from './types';
import { Container } from '../../utills/components';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../Routes/types';
import { TASK_ONBOARDING } from '../../utills/payload';

const SelectionModal = ({ isVisible, onHide} : SelectionModalProps) => {
  const [selected, setSelected] = useState('');
  const navigation = useNavigation<RootNavigationProps>()
  const {
    data: onboarding,
  } = useFetchOnboarding(TASK_ONBOARDING) as useFetchAppOnboardingProps

  console.log("useFetchOnboarding",onboarding)

  const screenList : TextWithIconProps[]  = [
    {
      screen : "TaskHome",
      text : "Task",
      icon : Images.TaskIcon,
      fill : Images.TaskFillIcon
    },
    {
      screen : "TimeOff",
      text : "Time Off",
      icon : Images.RadioIcon,
      fill : Images.RadioFillIcon
    },
    {
      screen : "Benefits",
      text : "Benefits",
      icon : Images.BenefitIcon,
      fill : Images.BenefitFillIcon
    },
    {
      screen : "PayslipHistory",
      text : "Payslip",
      icon : Images.PayslipIcon,
      fill : Images.PayFillIcon
    },
    {
      screen : "Documents",
      text : "Documents",
      icon : Images.DocumentIcon,
      fill : Images.DocumentFillIcon
    },
    {
      screen : "Trainings",
      text : "Trainings",
      icon : Images.TrainingIcon,
      fill : Images.TrainingFillIcon
    }
  ]

  const TextWithIcon = ({ screen, text, icon, fill} : TextWithIconProps) => {

    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(text)
          if (screen === "TaskHome" && !onboarding?.[0]?.has_completed_mobile_onboarding) {
            onHide();
            return navigation.navigate("Menu", { screen: "TaskOnboarding" })
          }
          navigation.navigate('Menu', { screen })
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

  const renderItem = ({item} : {item : TextWithIconProps}) => {
    return <TextWithIcon 
      {...item}
    />
  }
  const keyExtractor = (item : TextWithIconProps,i : number) => `${item}${i}`.toString()
  const ItemSeparatorComponent = () => <Container  backgroundColor='transparent' marginBottom={2} />
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
        <FlatList 
          data={screenList}
          contentContainerStyle={styles.contentContainerStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
          numColumns={3}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </Modal>
  );
};

export default SelectionModal;
