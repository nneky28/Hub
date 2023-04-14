import { StyleSheet } from "react-native";
import { width } from "react-native-dimension";
import AppColors from "../../utills/AppColors";
import { FontFamily } from "../../utills/FontFamily";

const styles = StyleSheet.create({
    titleStyle : {
        fontFamily : FontFamily.BlackSansRegular,
        color : AppColors.black1,
        fontSize : width(3)
    },
    contentStyle : {
        borderBottomWidth : width(0.2),
        borderColor : AppColors.grayBorder
    }
})

export default styles;