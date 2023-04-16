import { StyleSheet } from "react-native";
import AppColors from "../../utills/AppColors";
import { FontFamily } from "../../utills/FontFamily";

const styles = StyleSheet.create({
    container : {
        backgroundColor: AppColors.green
    },
    label : {
        fontFamily: FontFamily.BlackSansBold,
        color : AppColors.white
    }
})

export default styles;