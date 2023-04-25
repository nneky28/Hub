import { StyleSheet } from "react-native";
import { height, width } from "react-native-dimension";
import AppColors from "../../utills/AppColors";
import { FontFamily } from "../../utills/FontFamily";

const styles = StyleSheet.create({
    button : {
        backgroundColor : AppColors.green4,
        width : width(75),
        justifyContent : "center",
        alignItems : "center",
        marginBottom : height(2)
    },
    green_button : {
        backgroundColor : AppColors.green,
        width : width(75),
        justifyContent : "center",
        alignItems : "center",
        marginTop : height(3),
        marginBottom : height(0.5)
    },
    green_button_text : {
        color : AppColors.white,
        fontSize : width(3.1),
        fontFamily : FontFamily.BlackSansSemiBold
    },
    button_text : {
        color : AppColors.green,
        fontSize : width(3.1),
        fontFamily : FontFamily.BlackSansSemiBold
    },
    icon : {
        alignSelf : "center",
        marginBottom : height(2)
    }
})

export default styles;