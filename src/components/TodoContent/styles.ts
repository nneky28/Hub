import { StyleSheet } from "react-native"
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
    row : {
        paddingVertical : height(2),
        width : width(100)
    },
    start_task_btn : {
        width : width(23),
        paddingVertical : height(1.2),
        borderTopLeftRadius : width(50),
        borderBottomLeftRadius : width(50),
        backgroundColor : AppColors.grayBorder,
        justifyContent : "center",
        alignItems : "center"
    },
    claim_task_btn : {
        width : width(23),
        paddingVertical : height(1.2),
        borderRadius : width(50),
        backgroundColor : AppColors.grayBorder,
        justifyContent : "center",
        alignItems : "center"
    },
    menu_button : {
        width : width(6),
        paddingVertical : height(1.2),
        borderTopRightRadius : width(50),
        borderBottomRightRadius : width(50),
        backgroundColor : AppColors.grayBorder,
        justifyContent : "center",
        alignItems : "center"
    }

})

export default styles