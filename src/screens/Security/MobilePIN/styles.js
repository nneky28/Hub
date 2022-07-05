import { StyleSheet } from "react-native"
import { height, width } from "react-native-dimension"
import { ICON_HEIGHT, ICON_WIDTH } from "../../../utills/Constants"
import AppColors from "../../../utills/AppColors"

export default styles = StyleSheet.create({
     Image1Sty: {
        width: width(ICON_HEIGHT),
        height: height(ICON_WIDTH),
        resizeMode: 'contain',
    },
    secretIcon : {
        width: width(20),
        height: height(15),
        resizeMode: 'contain',
    },
    whiteButton : {
        marginTop : height(1),
        backgroundColor : AppColors.white,
        borderWidth : width(0.2),
        borderColor : AppColors.green,
        width: width(90),
        marginBottom : height(3)
    },
    whiteButtonText : {
        color : AppColors.black,
        fontSize : width(3.5)
    },
    greenButtonText : {
        fontSize : width(3.5)
    },
    btnContainer: {
        width: width(90),
        fontSize : width(3.5),
        marginBottom : height(4)
    },
})