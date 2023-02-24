import React, { useEffect } from 'react';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';
import DropDown from '../PaperDropdown';
import { Container } from '../../utills/components';
import { Capitalize } from '../../utills/Methods';
import { Keyboard } from 'react-native';


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
            Keyboard.dismiss()
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