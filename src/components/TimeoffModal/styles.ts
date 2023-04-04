import { StyleSheet } from "react-native";
import { height, width } from "react-native-dimension";
import AppColors from "../../utills/AppColors";

const styles = StyleSheet.create({
    container: {
        width: width(100),
        paddingVertical: height(2),
        backgroundColor: AppColors.white,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
      },
      text: {
        color: AppColors.black1,
        fontSize: width(4),
        textAlign: 'center',
      },
      textContainer: {
        width: width(90),
        marginLeft: width(4)
      },
      button : {
          marginBottom : height(2),
          marginTop : height(2)
      }
})

export default styles;