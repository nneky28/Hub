import React from "react"
import { MenuItemModalProps } from "./types";
import Modal from "react-native-modal"
import AppColors from "../../utills/AppColors";
import { Container, H1, P, TouchableWrapper } from "../../utills/components";
import { ActivityIndicator, View } from "react-native";
import styles from "./styles"
import { Capitalize } from "../../utills/Methods";

export const MenuItemModal = React.memo(({isVisible, onHide, onPressHandler,list,title,type,loading} : 
    MenuItemModalProps
  ) => {
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
        <React.Fragment>
            {title ? <H1 color={AppColors.black1} textAlign="center" marginBottom={2} fontSize={4}>{title}</H1> : null}
                {
                loading ? <Container horizontalAlignment='center' marginBottom={2}>
                        <ActivityIndicator color={AppColors.green} />
                </Container> : list && Array.isArray(list) && list.map((item,i)=><TouchableWrapper key={i}
                    style={styles.menuItemModal}
                    onPress={()=>onPressHandler(item)}
                >
                    {
                    type === "Delete" ? <React.Fragment>
                        {item?.icon}
                        <P color={item?.text && item?.text.toLowerCase().includes("yes") ? AppColors.red : AppColors.black1}  fontSize={3.5} marginLeft={2}>{item?.text}</P>
                    </React.Fragment> : <React.Fragment>
                        {item?.icon}
                        <P color={item?.text && ["Delete","Clear filter"].includes(item?.text) ? AppColors.red : AppColors.black1}  fontSize={3.5} marginLeft={2}>{item?.text ? Capitalize(item?.text ) : null}</P>
                    </React.Fragment>
                    }
                </TouchableWrapper>)
                }
            </React.Fragment>
      </View>
    </Modal>
  );
},(prevProps,nextProps)=>{
    return prevProps.isVisible === nextProps.isVisible
  });