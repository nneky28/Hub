import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { HeaderWithBackButton } from '../../components/Headers/CustomHeader'
import { width, height } from 'react-native-dimension'
import { FontFamily } from '../../utills/FontFamily'

const index = ({ navigation }) => {
    return (
        <ScreenWrapper scrollEnabled={true}>
            <HeaderWithBackButton
                headerText="Settings"
                backHandler
                rightIcon={'bell-outline'}
                onPressHandler={() => navigation.goBack()}
                headerTextStyle={styles.header}
            />
            <View style={styles.mainCon}>
                <Text>Settings Screen.</Text>
            </View>
        </ScreenWrapper>
    )
}

export default index


const styles = StyleSheet.create({
    header: {
        fontSize: width(5),
        paddingVertical: height(1),
        fontFamily: FontFamily.MontserratBold,
        paddingHorizontal: width(3)
    },
    mainCon: {
        flex: 1,
        paddingHorizontal: width(2),
        width: width(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
})