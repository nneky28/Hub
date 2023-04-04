import React, { useState, useEffect } from 'react';
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
import { Images } from '../../component2/image/Image';
import { useFetchOnboarding } from '../../utills/api';
import { SelectionModalProps, TextWithIconProps } from './types';
import { Container } from '../../utills/components';

const SelectionModal = ({ isVisible, onHide, navigation } : SelectionModalProps) => {
  const [selected, setSelected] = useState('');
  const {
    data: onboarding,
  } = useFetchOnboarding("Task")

  const screenList = [
    {
      text : "Task",
      icon : Images.TaskIcon,
      fill : Images.TaskFillIcon
    },
    {
      text : "Time off",
      icon : Images.RadioIcon,
      fill : Images.RadioFillIcon
    },
    {
      text : "Benefits",
      icon : Images.BenefitIcon,
      fill : Images.BenefitFillIcon
    },
    {
      text : "Payslip",
      icon : Images.PayslipIcon,
      fill : Images.PayFillIcon
    },
    {
      text : "Documents",
      icon : Images.DocumentIcon,
      fill : Images.DocumentFillIcon
    },
    {
      text : "Trainings",
      icon : Images.TrainingIcon,
      fill : Images.TrainingFillIcon
    }
  ]

  const TextWithIcon = ({ text, icon, fill} : TextWithIconProps) => {

    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(text)
          if (text === "Task" && !onboarding?.[0]?.has_completed_mobile_onboarding) {
            onHide();
            return navigation.navigate("Menu", { screen: "TaskOnboarding" })
          }
          navigation.navigate('Menu', { screen: text })
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
