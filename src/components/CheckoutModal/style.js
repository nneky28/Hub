import { StyleSheet } from "react-native";
import { height, width } from "react-native-dimension";
import AppColors from "../../utills/AppColors";
import { FontFamily } from "../../utills/FontFamily";

const styles = StyleSheet.create({
    button: {
        backgroundColor: AppColors.transparent,
        width: width(75),
        justifyContent: "center",
        alignItems: "center",
        marginBottom: height(2),
        borderWidth: 0.5,
        borderColor: AppColors.red
    },
    black_button: {
        backgroundColor: AppColors.black,
        width: width(75),
        justifyContent: "center",
        alignItems: "center",
        marginTop: height(3),
        marginBottom: height(0.5)
    },
    green_button_text: {
        color: AppColors.white,
        fontSize: width(3.1),
        fontFamily: FontFamily.BlackSansSemiBold
    },
    button_text: {
        color: AppColors.black,
        fontSize: width(3.1),
        fontFamily: FontFamily.BlackSansSemiBold
    },
    icon: {
        alignSelf: "center",
        marginBottom: height(2)
    }
})

export default styles;