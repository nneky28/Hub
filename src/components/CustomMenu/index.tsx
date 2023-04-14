import React from "react"
import { Menu } from "react-native-paper"
import styles from "./styles"
import { CustomMenuProps } from "./types"

const CustomMenu = (props : CustomMenuProps) => {
    return(
        <Menu
            visible={props.visible}
            onDismiss={props?.onDismiss}
            anchor={props.anchor}>
            {
                [...props?.listItem].map((item,key)=> <Menu.Item onPress={() => props.onPressHandler(item)} title={item} key={key} 
                    style={props?.contentStyle || styles.contentStyle}
                    titleStyle={props?.titleStyle || styles.titleStyle}
                />)
            }
        </Menu>
    )
}

export default CustomMenu