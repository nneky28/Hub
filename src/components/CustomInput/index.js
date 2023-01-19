import React, { useEffect } from 'react';
import { Keyboard, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { setBottomTabBarVisible } from '../../Redux/Actions/Config';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';
import styles from './styles';
import { TextInput } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import { Container } from '../../utills/components';

// const CustomInput = (props) => {
//   const {
//     field: { name, onBlur, onChange, value,data,setData,onChangeData},
//     form: { errors, touched, setFieldTouched },
//     ...inputProps
//   } = props

//   const hasError = errors[name] && touched[name]
//   const dispatch = useDispatch();

//   useEffect(() => {
//     Keyboard.addListener('keyboardDidShow', () => dispatch(setBottomTabBarVisible(false)));
//     Keyboard.addListener('keyboardDidHide', () => dispatch(setBottomTabBarVisible(true)))

// }, []);

//   return (
//     <>
//       <TextInput
//         style={[
//           styles.textInput,
//           hasError && styles.errorInput
//         ]}
//         fontFamily={FontFamily.BlackSansRegular}
//         placeholderTextColor={AppColors.black3}
//         color={AppColors.black}
//         value={value}
//         onChangeText={(text) => {
//           if(data){
//             setData({...data,name : text})
//           }
//           props && props.onChangeData ? props.onChangeData(text) : null;
//           //onChange(name)(text)
//         }}
//         onBlur={() => {
//           setFieldTouched(name)
//           onBlur(name)
//         }}
//         {...inputProps}
//       />
//       {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}

//     </>
//   )
// }

// export default CustomInput


// const CustomInput = (props) => {
//   const {
//     field: { name, onBlur, onChange, value },
//     form: { errors, touched, setFieldTouched },
//     ...inputProps
//   } = props

//   const hasError = errors[name] && touched[name]

//   return (
//     <TextInput
//       label={props.placeholder}
//       mode={props?.mode || "outlined"}
//       style={[
//         {
//           backgroundColor: AppColors.white,
//           width: props?.inputWidth ? width(props.inputWidth) : width(90),
//           justifyContent: 'center',
//           alignSelf: 'center',
//           borderRadius: width(5),
//           marginTop: props?.inputMarginTop ? height(props.inputMarginTop) : height(2),
//           height: height(props.height || 5.5),
//           fontSize: width(4)
//         },
//         props?.minHeight ? {
//           minHeight: height(props.minHeight),
//           height: null
//         } : {}
//       ]}
//       theme={
//         {
//           colors: {
//             primary: '#2898A4', underlineColor: 'transparent',
//             placeholder: props?.placeholderColor || AppColors.black3,
//             text: props?.textColor || AppColors.black
//           },
//           fonts: {
//             regular: {
//               fontFamily: FontFamily.BlackSansRegular
//             }
//           },
//         }
//       }
//       onChangeText={(text) => {
//         return props.onChangeData(text)
//         //return onChange(name)(text)
//       }}
//       {...inputProps}
//     />
//   )
// }






const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  return (
    <Container>
      <TextInput
        label={props.placeholder}
        mode={props?.mode || "outlined"}
        outlineColor={AppColors.grayBorder}
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
          props.minHeight ? {
            minHeight: height(props.minHeight),
            height: null
          } : {}
        ]}
        theme={
          {
            colors: {
              primary: '#2898A4', underlineColor: 'transparent',
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
          return props.onChangeData(text)
          //return onChange(name)(text)
        }}
        {...inputProps}


      />
      {
        props?.rightPressable ? <React.Fragment>
          {props?.rightPressable()}
        </React.Fragment> : null
      }
    </Container>
  )
}



export default CustomInput
