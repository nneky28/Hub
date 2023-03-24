import React from 'react';
import AppColors from '../../utills/AppColors';
import { TextInput } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import { Container } from '../../utills/components';
import { FontFamily } from '../../utills/FontFamily';
import { KeyboardTypeOptions } from 'react-native';

interface Props{
  placeholder? : string,
  label? : string
  mode? : "outlined" | "flat",
  inputWidth? : number,
  inputMarginTop? : number,
  height? : number,
  minHeight? : number,
  placeholderColor? : string,
  underlineColor? : string,
  textColor? : string,
  keyboardType? : KeyboardTypeOptions
  onChangeData : (param : string) => void,
  value : string
  secureTextEntry? : boolean
  right? : React.ReactNode,
  maxLength? : number,
  editable?: boolean,
  style: any[],
  autoFocus: boolean,
  multiline:boolean
}

const CustomInput: React.FC<Props> = (props) => {
  return (
      <Container>
        <TextInput
            label={props.placeholder}
            autoCompleteType={"off"}
            mode={props?.mode || "outlined"}
            value={props.value}
            outlineColor={AppColors.grayBorder}
            keyboardType={props.keyboardType}
           secureTextEntry={props?.secureTextEntry}
        autoFocus={props.autoFocus}
        multiline={props.multiline}
            style={[
              {
                backgroundColor: AppColors.gray,
                width: props?.inputWidth ? width(props.inputWidth) : width(90),
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: props?.inputMarginTop ? height(props.inputMarginTop) : height(2),
                height: height(props.height || 5.5),
                fontSize: width(4)
              },
              props.minHeight !== undefined ? {
                minHeight: height(props.minHeight),
                height: undefined
              } : {},props.style
            ]}
            theme={{
              colors: {
              primary: '#2898A4',
              placeholder: props?.placeholderColor || AppColors.black3,
              text: props?.textColor || AppColors.black
              },
              fonts: {
              regular: {
              fontFamily: FontFamily.BlackSansRegular
              }
              },
              roundness: width(3)
            }
          }
          onChangeText={(text) => {
            if(!props?.onChangeData) return
            return props.onChangeData(props?.keyboardType === "email-address" ? text?.toLowerCase() : text)

          }}
          right={props.right}
          maxLength={props.maxLength}
          editable={props.editable}
        />
      </Container>
  )
}

export default CustomInput



