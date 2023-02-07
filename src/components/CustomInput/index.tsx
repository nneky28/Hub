import React from 'react';
import AppColors from '../../utills/AppColors';
import { TextInput } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import { Container } from '../../utills/components';
import { FontFamily } from '../../utills/FontFamily';
import { KeyboardTypeOptions } from 'react-native';

interface Props {
  // field: { name: string, onBlur: () => void,
  //    onChange: () => void, value: any },
  // form: { errors: any, touched: any, setFieldTouched: any },
  // inputProps: any,
  placeholder: string,
  mode: "outlined" | "flat",
  inputWidth: number,
  inputMarginTop: number
  height: number,
  minHeight: number,
  placeholderColor?: string,
  underlineColor?: string,
  textColor?: string,
  right?: React.ReactNode
  onChangeData: (text: string | number) => void,
  keyboardType?: KeyboardTypeOptions,
  secureTextEntry?: boolean,
  value?: string,
  autoFocus?: boolean,
  label? : string
}

const CustomInput = (props: Props) => {

  return (
    <Container>

      <TextInput
        label={props?.label || props.placeholder}
        placeholder={props?.placeholder || props?.label}
        autoCompleteType={"off"}
        mode={props?.mode || "outlined"}
        value={props.value}
        outlineColor={AppColors.grayBorder}
        keyboardType={props.keyboardType}
        secureTextEntry={props?.secureTextEntry}
        autoFocus={props?.autoFocus}
        style={[
          {
            backgroundColor: AppColors.gray,
            width: props?.inputWidth ? width(props.inputWidth) : width(90),
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: props?.inputMarginTop ? height(props.inputMarginTop) : height(1.5),
            height: height(props.height || 5.5),
            fontSize: width(4)
          },
          props.minHeight !== undefined ? {
            minHeight: height(props.minHeight),
            height: undefined
          } : {}
        ]}
        theme={
          {
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
          if (!props?.onChangeData) return
          return props.onChangeData(props?.keyboardType === "email-address" ? text?.toLowerCase() : text)

        }}
        right={props.right}
      />
    </Container>
  )
}

export default CustomInput



