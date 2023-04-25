import React from "react"
import Modal from "react-native-modal"
import Button from "../Button";
import { WarningModalProps } from "./types";
import styles from "./styles"
import AppColors from "../../utills/AppColors";
import Ionicons from "react-native-vector-icons/Ionicons"
import { width } from "react-native-dimension";
import { Container, H1, P } from "../../utills/components";

const WarningModal = (props : WarningModalProps) => {
    const onHide = () => {
        if(props.loading) return
        props.onHide()
    }
    return (
      <Modal
        onBackButtonPress={onHide}
        onModalHide={onHide}
        animationInTiming={500}
        animationOutTiming={10}
        backdropOpacity={0.5}
        swipeDirection={'down'}
        onSwipeComplete={onHide}
        onBackdropPress={onHide}
        animationIn="fadeInUp"
        animationOut="fadeInDown"
        swipeThreshold={0.3}
        style={{justifyContent: 'center', margin: 0}}
        isVisible={props.isVisible}
    >
            <Container width={90} alignSelf="center" backgroundColor={AppColors.white}
                borderRadius={8}
                paddingTop={3}
                paddingBottom={3}
                paddingHorizontal={6}
                verticalAlignment="center"
            >   
                {
                    props?.icon ? <Ionicons name={props.icon}  color={props.iconColor} 
                        style={[styles.icon,props.iconStyle as any]}
                        size={width(10)}
                    /> : null
                }
                <H1 textAlign="center" color={AppColors.black1}>{props?.title || ""}</H1>
                <P marginTop={2} color={AppColors.black1} fontSize={3.1} textAlign="center"
                    lineHeight={3}
                >{props.sub_title}</P>
                <Button
                    title={props?.submitBtnText || ""}
                    containerStyle={styles.green_button}
                    onPress={props.onPressHandler}
                    textStyle={styles.green_button_text}
                    isLoading={props.loading}
                    disabled={props.loading}
                />
                {
                    !props.loading ? <Button
                    title={props?.cancelBtnText || ""}
                    containerStyle={styles.button}
                    onPress={onHide}
                    textStyle={styles.button_text}
                /> : null
                }
            </Container>
      </Modal>
    );
  };

  export default WarningModal;