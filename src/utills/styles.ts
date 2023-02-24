import { StyleSheet } from "react-native";
import { height, width } from "react-native-dimension";
import AppColors from "./AppColors";

const styles = StyleSheet.create({
    addNewButton : {
        backgroundColor : AppColors.lightGreen,
        width : width(90)
      },
      addNewText : {
        color : AppColors.green
      },
      list_component : {
          justifyContent : "center",
          paddingVertical : height(2),
          backgroundColor : AppColors.transparent,
          borderBottomWidth : width(0.2),
          borderColor : AppColors.grayBorder,
          paddingHorizontal : width(2)
          
      }
})

export default styles;