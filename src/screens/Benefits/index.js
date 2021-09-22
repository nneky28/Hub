import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { leftIcon } from '../../assets/images';
import BenifitList from '../../components/BenifitList';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import styles from './styles';


export default function Benefits({navigation}) {
        
    return (
        <ScreenWrapper scrollEnabled={true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.screenTitle}>
                Benefits
                </Text>
            </View>
            <View style={styles.line} />

            <View style={styles.mainViewContainer}>
                <BenifitList 
                data={[AppColors.blue1, AppColors.blue2, AppColors.lightPink, AppColors.lightOrange]} 
                horizontal={false}
                />
            </View>
        </ScreenWrapper>  
    );
}
