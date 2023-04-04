import { StyleSheet } from "react-native";
import { height, width } from "react-native-dimension";

const styles = StyleSheet.create({
    attendance_tab: {
        paddingVertical: height(1),
        width: width(38),
        borderRadius: width(2),
        marginTop: height(0.3),
        marginBottom: height(0.3)
      },
      yellow_box : {
        alignItems: "center",
        top: height(17),
        width: width(90),
        paddingTop: height(3),
        paddingBottom: height(3),
        zIndex: 1000,
        borderRadius: width(5),
        borderWidth: width(0.3),
        borderTopWidth: 0,
        borderTopColor: "transparent"
      }
})

export default styles;