import React from "react"
import { View } from "react-native";
import { H1, ImgPlaceholder, TouchableWrapper } from "../../utills/components";
import { Capitalize } from "../../utills/Methods";
import {DeptListCompProps} from "./types"
import styles from "./styles"


const DeptListComp = ({
    item,
    onPressHandler,
  } : DeptListCompProps) => {
    return (
      <TouchableWrapper
        style={styles.listContainer1}
        onPress={onPressHandler}>
            <React.Fragment>
                <ImgPlaceholder
                    text={item?.name && item?.name.length > 0 ? Capitalize([...item?.name][0]) : ''}
                    size={10}
                />
                <View style={styles.textContainer1}>
                    <H1 style={styles.titleText}>
                        {item?.name ? Capitalize(item?.name) : ''}{' '}
                    </H1>
                </View>
            </React.Fragment>
      </TouchableWrapper>
    );
  };
export default DeptListComp