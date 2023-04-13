import { ViewStyle,TextStyle } from "react-native";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export type TextWithIconCopyProps = {
    item: {
        url: string,
        title: string,
        iconLeft: IconSource,
        iconRight:IconSource,
    },
    iconStyle:ViewStyle,
    onHide:()=>void
}

export type TextWithProps = {
    containerStyle? : ViewStyle,
    textStyle?: TextStyle,
    iconStyle: ViewStyle,
    item: {
        url: never,
        title: string,
        iconLeft: string,
        iconRight:string
    },
    onPressHandle?: () => void,
    url?:string
}





// import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
// import { View, Text, Image, ViewStyle } from "react-native";
// import React from "react";

// type TextWithIconCopyProps = {
//   item: {
//     url: string,
//     title: string,
//     iconLeft: IconSource,
//     iconRight: IconSource,
//   },
//   iconStyle: ViewStyle,
//   onHide: () => void
// }

// const TextWithIconCopy: React.FC<TextWithIconCopyProps> = ({ item, iconStyle, onHide }) => {
//   return (
//     <View>
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <Image
//           resizeMode={'contain'}
//           source={item.iconLeft}
//           style={[{ marginRight: 10 }, iconStyle]}
//         />
//         <Text>{item.title}</Text>
//         <Image
//           resizeMode={'contain'}
//           source={item.iconRight}
//           style={[{ marginLeft: 10 }, iconStyle]}
//         />
//       </View>
//       <Text>{item.url}</Text>
//     </View>
//   );
// };

// export default TextWithIconCopy;
