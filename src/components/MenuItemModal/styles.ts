import { StyleSheet } from "react-native";
import { height, width } from "react-native-dimension";
import AppColors from "../../utills/AppColors";

const styles = StyleSheet.create({
    menuItemModal : {
        flexDirection : "row",
        justifyContent : "flex-start",
        alignItems : "center",
        paddingHorizontal : width(4),
        borderBottomWidth : width(0.5),
        borderColor : AppColors.gray,
        paddingVertical : height(2)
    },
    container: {
        width: width(100),
        paddingVertical: height(2),
        backgroundColor: AppColors.white,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
      },
      line1: {
        width: '15%',
        height: 4,
        backgroundColor: '#E1E1E1',
        marginBottom: height(1.5),
        marginTop: height(0.5),
        elevation: 0,
        alignSelf: 'center',
      },
})

export default styles;