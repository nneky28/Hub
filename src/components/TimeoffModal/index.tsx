import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { APIFunction } from "../../utills/api";
import AppColors from "../../utills/AppColors";
import { getData, ToastSuccess } from "../../utills/Methods";
import { TimeOffModalData, TimeoffModalProps, useFetchAboutMeData } from "./types";
import Modal from "react-native-modal"
import { Keyboard, KeyboardAvoidingView, Platform,View} from "react-native";
import styles from "./styles"
import { Container, H1, P } from "../../utills/components";
import Button from "../Button";
import CustomDatePicker from "../CustomDatePicker";
import CustomInput from "../CustomInput";

const  TimeoffModal  = ({ data,isVisible, onHide, timeoff_id,datePickerHandler,onChangeText } : TimeoffModalProps ) => {
    const [error,setError] = React.useState("")
    const queryClient = useQueryClient()
    const {
       mutateAsync,
       isLoading
    } = useMutation(APIFunction.request_timeoff)

    const handleUnhandledTouches = () =>{
        Keyboard.dismiss()
        return false;
      }
  
    const handleSubmit = async () => {
      try {
        let failed = false;
        type requiredItems = keyof TimeOffModalData
        let required : requiredItems[] = ["start_date", "end_date", "reason"]
        for (let req of required) {
          if (!data[req] || data?.[req]?.toString().trim() === ""){
            failed = true
            break
          };
        }
        if (failed) {
          return setError("All fields are required")
        };
        let about : useFetchAboutMeData | null | false = await getData("about_me")
        if(!about || !about?.id || !timeoff_id) return
        let fd = {
            id : about?.id,
          ...data, timeoff: timeoff_id,
        }
        setError("")
        await mutateAsync(fd)
        ToastSuccess("Request has been submitted for processing")
        queryClient.invalidateQueries("employee_timeoff")
        queryClient.invalidateQueries("employee_timeoff_taken")
        queryClient.invalidateQueries("employee_timeoff_reqs")
        onHide()
      } catch (err : any) {
        return setError(err?.msg)
      }
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
        style={{justifyContent: 'flex-end', margin: 0}}
        isVisible={isVisible}
    >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{justifyContent: "flex-end" }} 
        >
            <View style={styles.container}
                onStartShouldSetResponder={handleUnhandledTouches}
            >
                
                <Container width={90} alignSelf="center">
                    <H1 textAlign="center" fontSize={5} marginTop={1}>Timeoff Request</H1>
                    {error ? <P color={AppColors.red2} textAlign="center" marginTop={1}
                    >{error}</P> : null}
                    <CustomDatePicker 
                        placeholder="Start Date"
                        value={data?.start_date || ""}
                        setShow={() => {
                            setError("")
                            datePickerHandler("start_date")
                        }}
                    />
                    <CustomDatePicker 
                        placeholder="Resumption Date"
                        value={data?.end_date || ""}
                        setShow={() => {
                            setError("")
                            datePickerHandler("end_date")
                        }}
                    />
                    <CustomInput 
                        placeholder="Reason"
                        keyboardType="default"
                        value={data.reason}
                        onChangeData={(value : string) => {
                            setError("")
                            onChangeText(value)
                        }}
                        minHeight={3}
                        multiline={true}
                    />
                     <Button
                        title={'Submit'}
                        onPress={handleSubmit}
                        isLoading={isLoading}
                        containerStyle={styles.button}
                    />
                </Container>
            </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }


export default TimeoffModal