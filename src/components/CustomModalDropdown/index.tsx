// import React, { useEffect } from 'react';
// import { height, width } from 'react-native-dimension';
// import AppColors from '../../utills/AppColors';
// import { FontFamily } from '../../utills/FontFamily';
// import DropDown from '../PaperDropdown';
// import { Container } from '../../utills/components';
// import { Capitalize } from '../../utills/Methods';

// type optionType = {label : string, value : string }

// interface DropDownProps{
//   options : string[],
//   setOpen? : (param : boolean) => void,
//   inputWidth? : number,
//   defaultValue : string,
//   placeholder : string,
//   onChangeData? : (param : string) => void,
//   multiSelect? : boolean,
//   placeholderColor? : string,
//   textColor? : string
// }

// const CustomModalDropdown = (props : DropDownProps) => {
//   const [showDropDown,setShowDropDown] = React.useState<boolean>(false)
//   const [options,setOptions] = React.useState<optionType[]>([])

//   const optionsHandler =  () => {
//     if(
//       props.setOpen
//     ) return

//     if(
//       !props.setOpen && props?.options && Array.isArray(props.options)
//     ) return setOptions(props.options.map(item=>{
//       return {
//         label : item ? Capitalize(item) : "",
//         value : item ? Capitalize(item) : ""
//       }
//     }))
//   }

//   useEffect(()=>{
//     optionsHandler()
//   },[])
  
//   return(
//     <Container width={props?.inputWidth || 90} alignSelf="center" marginTop={2}>
//         <DropDown
//           label={props.placeholder}
//           placeholder={props.placeholder}
//           mode={"outlined"}
//           visible={showDropDown}
//           showDropDown={() => {
//             if(props.setOpen) return props.setOpen(true)
//             setShowDropDown(true)
//           }}
//           onDismiss={() => setShowDropDown(false)}
//           value={props.defaultValue !== props.placeholder ? props.defaultValue : ""}
//           iconColor={AppColors.black3}
//           setValue={(value : string)=> {
//             if(!props.onChangeData) return 
//             props.onChangeData(value)
//           }}
//           hasLabel={props.setOpen ? false : true}
//           multiSelect={props?.multiSelect}
//           list={options}
//           activeColor={AppColors.green}
//           outlineColor={AppColors.grayBorder}
//           inputProps={{
//             style : {
//               height : !props?.multiSelect ? height(5.5) : null,
//               backgroundColor : AppColors.gray
//             }
//           }}
//           theme={
//             {
//               colors: {primary: '#2898A4', underlineColor: 'transparent',
//                 placeholder : props?.placeholderColor || AppColors.black3, 
//                 text : props?.textColor || AppColors.black
//               },
//               fonts: {
//                 regular: {
//                   fontFamily: FontFamily.BlackSansRegular
//                 }
//               },
//               roundness: width(3) 
//             }
//           }
//           dropDownContainerHeight={height(40)}
//         />
//     </Container>
//   )
// }

// export default CustomModalDropdown
// import React, { useRef } from 'react';
// import { Image, Text, TouchableOpacity, Platform } from 'react-native';
// import { height, width } from 'react-native-dimension';
// import ModalDropdown from 'react-native-modal-dropdown';
// import { downIcon } from '../../assets/images';
// import CommonStyles from '../../utills/CommonStyles';
// import { Container } from '../../utills/components';
// import styles from './styles';



// const CustomModalDropdown = (props) => {
//   const {
//     field: { name, onBlur, onChange, value },
//     form: { errors, touched, setFieldTouched, setFieldValue },
//     ...inputProps
//   } = props

//   const hasError = errors[name] && touched[name]
//   const dropdown = useRef(null);
//   const [selected, setSelected] = React.useState(false);
//   return (
//     <TouchableOpacity
//       onPress={() => dropdown.current.show()}
//       style={CommonStyles.justifyCenter}
//     >
//       <ModalDropdown
//         ref={dropdown}
//         isFullWidth
//         options={props.options}
//         style={[
//           styles.listContainer,
//           hasError && styles.errorInput
//         ]}
//         dropdownStyle={styles.dropDownContainer}
//         defaultIndex={-1}
//         defaultValue={props.value || props.placeholder}
//         textStyle={selected ? styles.text2 : styles.text1}
//         dropdownTextStyle={[styles.text1, { marginLeft: width(3.5) }]}
//         onSelect={(index, text) => {
//           //setFieldValue(name, text)
//           props.placeholder === text ? setSelected(false) : setSelected(true)
//           props.onChangeData ? props.onChangeData(text) : null
//         }}
//         renderSeparator={() => <Container></Container>}
//         renderRightComponent={() => <Image
//           resizeMode="contain"
//           source={downIcon}
//           style={[styles.downIcon2]}
//         />
//         }
//       />
//       {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}

//     </TouchableOpacity>
//   )
// }

// export default CustomModalDropdown
import React, { useEffect } from 'react';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';
import DropDown from '../PaperDropdown';
import { Container } from '../../utills/components';
import { Capitalize } from '../../utills/Methods';


type optionType = {label : string, value : string }

interface DropDownProps{
  options : string[],
  setOpen? : (param : boolean) => void,
  inputWidth? : number,
  defaultValue : string,
  placeholder : string,
  onChangeData? : (param : string) => void,
  multiSelect? : boolean,
  placeholderColor? : string,
  textColor? : string
}

const CustomModalDropdown = (props : DropDownProps) => {
  const [showDropDown,setShowDropDown] = React.useState<boolean>(false)
  const [options,setOptions] = React.useState<optionType[]>([])

  const optionsHandler =  () => {
    if(
      props.setOpen
    ) return

    if(
      !props.setOpen && props?.options && Array.isArray(props.options)
    ) return setOptions(props.options.map(item=>{
      return {
        label : item ? Capitalize(item) : "",
        value : item ? Capitalize(item) : ""
      }
    }))
  }

  useEffect(()=>{
    optionsHandler()
  },[])
  
  return(
    <Container width={props?.inputWidth || 90} alignSelf="center" marginTop={2}>
        <DropDown
          label={props.placeholder}
          placeholder={props.placeholder}
          mode={"outlined"}
          visible={showDropDown}
          showDropDown={() => {
            if(props.setOpen) return props.setOpen(true)
            setShowDropDown(true)
          }}
          onDismiss={() => setShowDropDown(false)}
          value={props.defaultValue !== props.placeholder ? props.defaultValue : ""}
          iconColor={AppColors.black3}
          setValue={(value : string)=> {
            if(!props.onChangeData) return 
            props.onChangeData(value)
          }}
          hasLabel={props.setOpen ? false : true}
          multiSelect={props?.multiSelect}
          list={options}
          activeColor={AppColors.green}
          outlineColor={AppColors.grayBorder}
          inputProps={{
            style : {
              height : !props?.multiSelect ? height(5.5) : null,
              backgroundColor : AppColors.gray
            }
          }}
          theme={
            {
              colors: {primary: '#2898A4', underlineColor: 'transparent',
                placeholder : props?.placeholderColor || AppColors.black3, 
                text : props?.textColor || AppColors.black
              },
              fonts: {
                regular: {
                  fontFamily: FontFamily.BlackSansRegular
                }
              },
              roundness: width(3) 
            }
          }
          dropDownContainerHeight={height(40)}
        />
    </Container>
  )
}

export default CustomModalDropdown