import React from 'react';
import AppColors from '../../utills/AppColors';
import { TextInput } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import { Container } from '../../utills/components';
import { FontFamily } from '../../utills/FontFamily';
import { KeyboardTypeOptions } from 'react-native';

interface Props {
field: { name: string, onBlur: () => void, onChange: () => void, value: any },
form: { errors: any, touched: any, setFieldTouched: any },
inputProps: any,
placeholder: string,
mode: "outlined" | "flat",
inputWidth: number,
inputMarginTop: number,
height: number,
    minHeight: number,
    placeholderColor? : string,
    underlineColor? : string,
    textColor? : string,
rightPressable: () => JSX.Element,
  onChangeData: (text: string) => void,
  keyboardType?: KeyboardTypeOptions,
  secureTextEntry?: boolean,
  value : string
}

const CustomInput: React.FC<Props> = (props) => {
// const {
// field: { name},
// form: { errors, touched },
// ...inputProps
// } = props

// const hasError = errors[name] && touched[name]

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
  if(!props?.onChangeData) return
  return props.onChangeData(props?.keyboardType === "email-address" ? text?.toLowerCase() : text)
}}
// {...inputProps}
  />
  
  {
    props?.rightPressable ? <Container>
      {props?.rightPressable()}
    </Container> : null
  }
   
</Container>
)
}

export default CustomInput



