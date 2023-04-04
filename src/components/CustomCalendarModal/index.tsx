import React from "react"
import { Calendar } from "react-native-calendars"
import { width } from "react-native-dimension"
import AppColors from "../../utills/AppColors"
import Feather from 'react-native-vector-icons/Feather'
import moment from "moment"
import { FontFamily } from "../../utills/FontFamily"
import { Container } from "../../utills/components"
import Modal from "react-native-modal"
import { CustomCalendarModalProps } from "./types"

const CustomCalendarModal = (props : CustomCalendarModalProps) => {
  return(
      <Modal 
        onBackButtonPress={props?.onHide}
        onModalHide={props?.onHide}
        animationInTiming={500}
        animationOutTiming={10}
        backdropOpacity={0.2}
        swipeDirection={'down'}
        onSwipeComplete={props?.onHide}
        onBackdropPress={props?.onHide}
        animationIn="fadeInUp"
        animationOut="fadeInDown"
        swipeThreshold={0.3}
        style={{justifyContent: 'flex-end', margin: 0}}
        isVisible={props?.show}
    >
      <Container 
        backgroundColor={AppColors.white}
        borderTopRightRadius={width(5)}
        borderTopLeftRadius={width(5)}
        paddingTop={2}
      >
         <Calendar
          // Collection of dates that have to be marked. Default = {}
          markedDates={{
            [props.date] : {selected: true, selectedColor: AppColors.green}
          }}
          theme={{
            textDayFontFamily: FontFamily.BlackSansSemiBold,
            textMonthFontFamily: FontFamily.BlackSansSemiBold,
            textDayHeaderFontFamily: FontFamily.BlackSansSemiBold,

          }}
          renderArrow={direction=>{
            if(direction === "left") return <Feather name="arrow-left" size={width(6)}
              color={AppColors.green}
            />
            if(direction === "right") return <Feather name="arrow-right" size={width(6)}
              color={AppColors.green}
            />
          }}
          enableSwipeMonths={true}
          current={props.date ? moment(props.date).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")}
          minDate={props.disableMinimum ? undefined : props?.minDate ? props?.minDate : moment().toDate()}
          maxDate={props.maxDate}
          onDayPress={(day) => {
            props?.onDayPress(day)
            props?.onHide()
          }}
        />
      </Container>
    </Modal>
  )
}

  export default CustomCalendarModal;