import { StyleSheet } from "react-native";
import { height, width } from "react-native-dimension";
import AppColors from "../../utills/AppColors";
import { FontFamily } from "../../utills/FontFamily";

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: AppColors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },

    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1

    },
    container: {
        flex: 1,
    },

    image: {
        width: width(15),
        height: height(15),
    },
    title: {
        color: '#171717',
        fontSize: width(5.5),
        textAlign: 'center',
        width: width(55)
    },
    subTitle: {
        color: '#545454',
        fontSize: width(3.3),
        lineHeight: width(5),
        paddingVertical: height(2),
        textAlign: 'center',
        paddingHorizontal: width(15),

    },
    dot: {
        backgroundColor: "#5BCBD7",
        width: height(1.5),
        height: height(1.5),
        marginLeft: width(2),
        marginRight: width(2),
        borderRadius: width(15)
    },

    active: {
        backgroundColor: '#2898A4',
        width: height(1.5),
        height: height(1.5),
        marginLeft: width(2),
        marginRight: width(2),
        borderRadius: width(15)
    },
    button: {
        width: width(90),
        borderRadius: width(3),
        bottom: height(5),
        height: height(5)
    },
    btn: {
        backgroundColor: '#EAF8FA',
        width: width(90),
        borderRadius: width(3),
        bottom: height(5),
        height: height(5)
    },
    btnText: {
        color: AppColors.green,
        fontSize: width(3.5),
        fontFamily: FontFamily.BlackSansBold
    },
    buttonText: {
        fontSize: width(3.5),
        fontFamily: FontFamily.BlackSansBold
    }
})

export default styles;