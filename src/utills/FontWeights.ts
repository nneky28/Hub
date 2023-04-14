import { Platform } from "react-native";

export const FontWeights = Platform.OS === "ios" ? {
    "10" : 'BlackSans-Thin',
    "20" : 'BlackSans-Black',
    "30" : 'BlackSans-Light',
    "40" : 'BlackSans-Regular',
    "50" : 'BlackSans-UltraLight',
    "60" : "BlackSans-CondensedBold",
    "70" : "BlackSans-CondensedBook",
    "80" : "BlackSans-CondensedLight",
    "90" : "BlackSans-CondensedMedium",
    "100" : "BlackSans-SemiBold",
    "110" : "BlackSans-Bold"
} : {
    "10" : 'black-sans-thin',
    "20" : 'black-sans-black',
    "30" : 'black-sans-light',
    "40" : 'black-sans-regular',
    "50" : 'black-sans-ultraLight',
    "60" : "black-sans-condensed-bold",
    "70" : "black-sans-condensed-book",
    "80" : "black-sans-condensed-light",
    "90" : "black-sans-condensed-medium",
    "100" : "black-sans-semi-bold",
    "110" : "black-sans-bold"
};
