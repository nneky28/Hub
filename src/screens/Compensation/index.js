import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { leftIcon } from '../../assets/images';
import ScreenWrapper from '../../components/ScreenWrapper';
import CommonStyles from '../../utills/CommonStyles';
import { compensation } from '../../utills/data/compensation';
import styles from './styles';



export default function Compensation({navigation}) {

    const renderListElement = ({item}) => {
        return (
            <TouchableOpacity style={styles.componentContainer}>
                <View>
                    <Text style={styles.listCompTitle}>{item.title}</Text>
                    <Text style={styles.subText}>Modified {item.date}</Text>
                </View>
                <View style={styles.line} />
            </TouchableOpacity>
        );
    }

    return (
        <ScreenWrapper scrollEnabled={true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.screenTitle}>
                Compensation
                </Text>
            </View>
            <View style={styles.line} />

            <View style={styles.mainViewContainer}>
                <FlatList
                data={compensation}
                renderItem={renderListElement}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View  />}            
                contentContainerStyle={CommonStyles.marginTop_2}
                keyExtractor={(item) => item.key}
                />
            </View>
        </ScreenWrapper>  
    );
}
