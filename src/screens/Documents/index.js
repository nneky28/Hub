import React, { useEffect, useState } from 'react';
import { FlatList, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { leftIcon, HorDotIcon, fileIcon } from '../../assets/images';
import ContactModal, { DocumentModal } from '../../components/ContactModal';
import ScreenWrapper from '../../components/ScreenWrapper';
import SearchBox, { SearchBoxIOS } from '../../components/SearchBox';
import AppColors from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import { Container, H1, ImageWrap, LottieIcon, P, PageLoader, SizedBox } from '../../utills/components';
import { documents } from '../../utills/data/documents';
import styles from './styles';
import Emptyjson from '../../assets/lottie/empty.json'
import { Images } from '../../component2/image/Image';
import { useFocusEffect } from '@react-navigation/core';
import { Capitalize, getData, ToastError } from '../../utills/Methods';
import { APIFunction } from '../../utills/api';
import moment from 'moment';



export default function Documents({navigation}) {
    const [modal, setModal] = useState(false);
    const [documents,setDocuments] = React.useState([])
    const [loading,setLoading] = React.useState(true)
    const [document,setDocument] = React.useState(null)
    const [holders,setHolders] = React.useState([])
    const getDocuments = async () => {
        try{
            setLoading(true)
            let about = await getData("about_me")
            let res =  await APIFunction.employee_doc(about.id)
            if(res && res.results && Array.isArray(res.results)){
                setDocuments(res.results)
                setHolders(res.results)
            }else{
                setDocuments([])
                setHolders([])
            }
            setLoading(false)
        }catch(err){
            ToastError(err.msg)
        }
    }
    const handleSearch = (text) => {
        if (text.length > 0){
            let filtered = documents.filter(item => {
                return (item && item.file && item.file.toLowerCase() && item.file.toLowerCase().includes(text.toLowerCase()))
            });
            setDocuments(filtered);
        }
        else
            setDocuments(holders);
    }
    useFocusEffect(
        React.useCallback(()=>{
            getDocuments()
        },[])
    )
    const ListComponent = ({item}) => {
        let split = item && item.file && item.file.split("/") ? item.file.split("/") : []
        let title = split && split.length > 0 ? split[split.length - 1] : ""
        return(
            
            <>
            <TouchableOpacity 
            onPress={() => {
                setDocument(item)
                setModal(!modal)
            }}
            style={[styles.listItemContainer]}
            >
                <View style={CommonStyles.rowJustifySpaceBtw}>
                    <Image source={fileIcon} style={styles.fileIcon} />
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText}>{title ? Capitalize(title) : null}</Text>
                        <Text style={styles.subText}>{item && item.created_at ? moment(item.created_at).format("dd MMM YYYY") : null}</Text>
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
                                <SearchBox title="Search for document"
                                    onSubmitEditing={handleSearch}
                                />
                            ) : (
                                <SearchBoxIOS title="Search for document"/>
                            )
                        }
                        {
                !loading && documents && Array.isArray(documents) && documents.length > 0  ? (
                        <FlatList
                            data={documents}
                            keyExtractor={(item) => item.key}
                            renderItem={ListComponent}
                            ItemSeparatorComponent={() => <View />}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            contentContainerStyle={CommonStyles.marginTop_2}
                        />
                        ) : null
            }
                    </View>
                
            {
                loading ? <PageLoader /> : null
            }
            {
                !loading && documents && Array.isArray(documents) && documents.length === 0  ? <Container
                marginTop={8}
                flex={1}
                style={{
                    //justifyContent : "center",
                    alignItems : "center"
                }}
            >
                <ImageWrap 
                    url={Images.EmptyDoc}
                    height={30}
                    fit="contain"
                />
                    <H1
                        color={AppColors.black3}
                        fontSize={5}
                    >You do not have</H1>
                    <H1 color={AppColors.black3}
                        fontSize={5}>any document yet.</H1>
                    <SizedBox height={2} />
                    <P color={AppColors.black2}>When you do, they will show up here.</P>
                </Container> : null
            }
            <DocumentModal isVisible={modal} onHide={() => setModal(false)} document={document}/>
        </ScreenWrapper>  
    );
}
