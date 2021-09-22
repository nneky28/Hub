import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { leftIcon, HorDotIcon, fileIcon } from '../../assets/images';
import ContactModal, { DocumentModal } from '../../components/ContactModal';
import ScreenWrapper from '../../components/ScreenWrapper';
import SearchBox from '../../components/SearchBox';
import AppColors from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import { documents } from '../../utills/data/documents';
import styles from './styles';



export default function Documents({navigation}) {
    const [modal, setModal] = useState(false);

    const ListComponent = ({item}) => {
        return(
            
            <>
            <TouchableOpacity 
            onPress={() => setModal(!modal)}
            style={[styles.listItemContainer]}
            >
                <View style={CommonStyles.rowJustifySpaceBtw}>
                    <Image source={fileIcon} style={styles.fileIcon} />
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText}>{item.title}</Text>
                        <Text style={styles.subText}>{item.date}</Text>
                    </View>
                </View>
                <Image source={HorDotIcon} style={styles.dotsIcon} />
            </TouchableOpacity>
            <View style={styles.line}/>
        </>
        );
    }
        
    return (
        <ScreenWrapper scrollEnabled={true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.screenTitle}>
                Documents
                </Text>
            </View>
            <View style={styles.line} />

            <View style={styles.mainViewContainer}>
            <SearchBox title="Search for document"/>
            <FlatList
                data={documents}
                keyExtractor={(item) => item.key}
                renderItem={ListComponent}
                ItemSeparatorComponent={() => <View />}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={CommonStyles.marginTop_2}
                />
            </View>
            <DocumentModal isVisible={modal} onHide={() => setModal(false)}/>
        </ScreenWrapper>  
    );
}
