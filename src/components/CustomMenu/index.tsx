import React from "react"
import { Menu } from "react-native-paper"
import styles from "./styles"
import { CustomMenuProps } from "./types"

const CustomMenu = <T,>(props : CustomMenuProps<T>) => {
    return(
        <Menu
            visible={props.visible}
            onDismiss={props?.onDismiss}
            anchor={props.anchor}>
            {
                [...props?.listItem].map((item,key)=> <Menu.Item onPress={() => props.onPressHandler(item)} 
                    title={item} 
                    key={key} 
                    style={[styles.contentStyle,props?.contentStyle]}
                    titleStyle={[styles.titleStyle,props?.titleStyle]}
                />)
            }
        </Menu>
    )
}

export default CustomMenu