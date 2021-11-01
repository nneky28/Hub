import React, { useState } from 'react';
import { FlatList, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { leftIcon, HorDotIcon, fileIcon } from '../../assets/images';
import ContactModal, { DocumentModal } from '../../components/ContactModal';
import ScreenWrapper from '../../components/ScreenWrapper';
import SearchBox, { SearchBoxIOS } from '../../components/SearchBox';
import AppColors from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import { Container, H1, LottieIcon } from '../../utills/components';
import { documents } from '../../utills/data/documents';
import styles from './styles';
import Emptyjson from '../../assets/lottie/empty.json'



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
        <ScreenWrapper 
            scrollEnabled={false}
        >
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
                {
                    Platform.OS === "android" ? (
                        <SearchBox title="Search for document"/>
                    ) : (
                        <SearchBoxIOS title="Search for document"/>
                    )
                }
            {/* <FlatList
                data={documents}
                keyExtractor={(item) => item.key}
                renderItem={ListComponent}
                ItemSeparatorComponent={() => <View />}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={CommonStyles.marginTop_2}
                /> */}
            </View>
            <Container
                    flex={1}
                    style={{
                        justifyContent : "center",
                        alignItems : "center"
                    }}
                >
                    <H1
                        color={AppColors.black3}
                    >You have no document yet.</H1>
                    </Container>
            <DocumentModal isVisible={modal} onHide={() => setModal(false)}/>
        </ScreenWrapper>  
    );
}
