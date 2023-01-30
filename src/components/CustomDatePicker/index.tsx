import React from 'react';
import { TouchableOpacity } from 'react-native';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import { TextInput } from 'react-native-paper';
import { FontFamily } from '../../utills/FontFamily';
import { height, width } from 'react-native-dimension';
import CommonStyles from '../../utills/CommonStyles';


type styleType = {
  [key : string] : string | number
}

interface CustomDatePickerProps{
  setShow? : (param : boolean) => void,
  containerStyle? : styleType
  value : string,
  placeholder?: string,

}

const CustomDatePicker = (props : CustomDatePickerProps) => {

  return (
    <>
    <TouchableOpacity
      onPress={() => {
        if(!props.setShow) return
        props.setShow(true)
      }}
      style={[styles.listContainer,props.containerStyle]}
    >
        <TextInput 
            value={props.value} 
            autoCompleteType={"off"}
            mode={"outlined"} 
            outlineColor={AppColors.grayBorder}
            label={props?.placeholder} 
            placeholder={props?.placeholder}
            pointerEvents={"none"}
            editable={false}
          right={<TextInput.Icon name={"calendar"} color={AppColors.black2}
          style={CommonStyles.marginTop_2}
              size={width(5)}
              onPress={() => {
                if(!props.setShow) return
                props.setShow(true)
              }}
              tvParallaxProperties={undefined}
              hasTVPreferredFocus={undefined}
            />} 
            style={{
              backgroundColor: AppColors.gray,
              height : height(5.5),
              fontSize : width(4)
          }}
            theme={
              {
                colors: {
                  primary: '#2898A4',
                  placeholder : AppColors.black3, 
                  text : AppColors.black
                },
                fonts: {
                  regular: {
                    fontFamily: FontFamily.BlackSansRegular
                  }
                },
                roundness: width(3) 
              }
            }
        />
    </TouchableOpacity>
    </>
  )
}

export default CustomDatePicker