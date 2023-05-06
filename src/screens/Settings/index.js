import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { HeaderWithBackButton } from '../../components/Headers/CustomHeader'
import { width, height } from 'react-native-dimension'
import { FontFamily } from '../../utills/FontFamily'
import Button from '../../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ToastSuccess } from '../../utills/Methods'

const index = ({ navigation }) => {
    const logoutMethod = async () => {
        try {
            let keys = await AsyncStorage.getAllKeys();
            await Promise.all([
                AsyncStorage.multiRemove(keys),
                navigation.navigate('Login')
            ]);
            ToastSuccess('Successfully logged out');
        } catch (error) {
            // Handle any errors that occurred during the logout process
            console.error(error);
            ToastError('Error logging out');
        }
    };

    return (
        <ScreenWrapper>
            <HeaderWithBackButton
                headerText="Settings"
                backHandler
                rightIcon={'bell-outline'}
                onPressHandler={() => navigation.goBack()}
                headerTextStyle={styles.header}
            />
            <View style={styles.mainCon}>
                <Text>Settings Screen.</Text>
                <Button
                    title='Log Out'
                    onPress={logoutMethod}
                    containerStyle={styles.btn}
                />
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: width(50)
    }
})