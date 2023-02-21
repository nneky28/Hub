import { StyleSheet } from "react-native";
import { height, width } from "react-native-dimension";
import AppColors from "../../utills/AppColors";
import { FontFamily } from "../../utills/FontFamily";

const styles = StyleSheet.create({
  resize: {
    width: 300,
    height: 300,
  },
  button : {
    width : width(90),
    backgroundColor : AppColors.green,
    alignSelf : "center",
    borderRadius : width(3),
    paddingVertical : height(2),
  },
  buttonText : {
    fontFamily : FontFamily.BlackSansSemiBold,
    fontSize : width(3.5),
    color : AppColors.white,
    textAlign : "center"
  },
  content : {
    width : width(90),
    alignSelf : "center",
    marginTop : height(20)
  },
  container : {
    paddingTop : height(3),
    paddingBottom : height(3),
    flex : 1,
    justifyContent : "space-between"
  },
  logo : {
    height : height(5),
    width : width(30),
    resizeMode : "contain",
    marginBottom : height(3)
  }
})

export default styles;