import { LayoutChangeEvent, ScrollView, View, } from "react-native";
import { Checkbox, Divider, Menu, TextInput, TouchableRipple, useTheme, } from "react-native-paper";
import React, { forwardRef, useEffect, useState, Fragment, } from "react";
import CommonStyles from "../../utills/CommonStyles";

type valueType = {
    label : string,
    value : string,
} 

type styleType = {
    [key : string] : string | any
}

type DropDownType = { 
    multiSelect? : boolean, 
    visible : boolean, 
    onDismiss : () => void, 
    showDropDown : () => void,
    value : string, 
    setValue : (param : string) => void, 
    activeColor : string,
    mode : "outlined" | "flat",
    label : string,
    placeholder : string,
    inputProps? : any, 
    list : valueType[],
    dropDownContainerMaxHeight? : number, 
    dropDownContainerHeight? : number, 
    theme? : styleType, 
    dropDownStyle? : styleType, 
    dropDownItemStyle? : styleType, 
    dropDownItemSelectedStyle? : styleType, 
    dropDownItemTextStyle? : styleType, 
    dropDownItemSelectedTextStyle? : styleType, 
    accessibilityLabel? : string, 
    iconColor? : string,
    outlineColor? : string,
    hasLabel? : boolean
}



const DropDown = forwardRef((props : DropDownType, ref) => {
    const activeTheme = useTheme();
    const { multiSelect = false, visible, onDismiss, showDropDown, value, setValue, activeColor, mode, label, placeholder, inputProps, list, dropDownContainerMaxHeight, dropDownContainerHeight, theme, dropDownStyle, dropDownItemStyle, dropDownItemSelectedStyle, dropDownItemTextStyle, dropDownItemSelectedTextStyle, accessibilityLabel, iconColor,outlineColor,hasLabel} = props;

    const [displayValue, setDisplayValue] = useState("");
    const [inputLayout, setInputLayout] = useState({
        height: 0,
        width: 0,
        x: 0,
        y: 0,
    });
    const onLayout = (event : LayoutChangeEvent) => {
        setInputLayout(event.nativeEvent.layout);
    };

    useEffect(() => {
        if (multiSelect) {
            const _labels = list
                .filter((_) => value.indexOf(_.value) !== -1)
                .map((_) => _.label)
                .join(", ");
            setDisplayValue(_labels);
        }
        else if(!hasLabel){
            setDisplayValue(value);
        }else {
            const _label = list.find((_) => _.value === value)?.label;
            if (_label) {
                setDisplayValue(_label);
            }
        }
    }, [list, value]);

    const isActive = (currentValue : string) => {
        if (multiSelect) {
            return value.indexOf(currentValue) !== -1;
        }
        else {
            return value === currentValue;
        }
    }

    const setActive = (currentValue : string) => {
        if (multiSelect) {
            const valueIndex = value.indexOf(currentValue);
            const values = value.split(",");
            if (valueIndex === -1) {
                setValue([...values, currentValue].join(","));
            }
            else {
                setValue([...values].filter((value) => value !== currentValue).join(","));
            }
        }
        else {
            setValue(currentValue);
        }
    }
    
    return (<Menu visible={visible} onDismiss={onDismiss} theme={theme} 
        
            anchor={
                <TouchableRipple 
                    ref={ref as any}
                    onPress={showDropDown} onLayout={onLayout} accessibilityLabel={accessibilityLabel}     
                    hasTVPreferredFocus={undefined} 
                    tvParallaxProperties={undefined}            
                >
                    <View pointerEvents={"none"}>
                    <TextInput value={displayValue} mode={mode} 
                        outlineColor={outlineColor}
                        label={label} placeholder={placeholder}
                        multiline={multiSelect}
                        pointerEvents={"none"} theme={theme} 
                        right={<TextInput.Icon name={visible ? "menu-up" : "menu-down"} color={iconColor} style={CommonStyles.marginTop_2} 
                            tvParallaxProperties={undefined}
                            hasTVPreferredFocus={undefined}
                        />} 
                        {...inputProps}
                    />
                    </View>
                </TouchableRipple>
            } 
            style={{
                maxWidth: inputLayout?.width,
                width: inputLayout?.width,
                marginTop: inputLayout?.height,
                ...dropDownStyle,
            }}
        >
        <ScrollView bounces={false} style={{
            ...(dropDownContainerHeight
                ? {
                    height: dropDownContainerHeight,
                }
                : {
                    maxHeight: dropDownContainerMaxHeight || 200,
                }),
        }}>
          {list.map((_item : valueType, _index : number) => (<Fragment key={_item.value}>
              <TouchableRipple style={{
                  flexDirection: "row",
                  alignItems: "center",
              }} onPress={() => {
                  setActive(_item.value);
                  if (onDismiss && !multiSelect) {
                      onDismiss();
                  }
              } }
              hasTVPreferredFocus={undefined} 
              tvParallaxProperties={undefined}
              >
                <Fragment>
                  <Menu.Item titleStyle={{
                color: isActive(_item.value)
                    ? activeColor || (theme || activeTheme).colors.primary
                    : (theme || activeTheme).colors.text,
                ...(isActive(_item.value)
                    ? dropDownItemSelectedTextStyle
                    : dropDownItemTextStyle),
            }} title={_item.label} style={{
                flex: 1,
                maxWidth: inputLayout?.width,
                ...(isActive(_item.value)
                    ? dropDownItemSelectedStyle
                    : dropDownItemStyle),
            }}/>
                  {multiSelect && (<Checkbox.Android 
                    theme={{
                        colors: { accent: activeColor },
                    }} status={isActive(_item.value) ? "checked" : "unchecked"} onPress={() => setActive(_item.value)}
                    hasTVPreferredFocus={undefined} 
                    tvParallaxProperties={undefined}
                />)}
                </Fragment>
              </TouchableRipple>
              <Divider />
            </Fragment>))}
        </ScrollView>
      </Menu>);
});
export default DropDown;