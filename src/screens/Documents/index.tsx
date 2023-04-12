import React, { useState } from 'react';
import { FlatList, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import  { DocumentModal } from '../../components/ContactModal';
import ScreenWrapper from '../../components/ScreenWrapper';
import SearchBox, { SearchBoxIOS } from '../../components/SearchBox';
import AppColors from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import { BackHandler, Container, H1, ImageWrap, P, PageLoader, SizedBox } from '../../utills/components';
import styles from './styles';
import { Images } from '../../utills/Image';
import { useFocusEffect } from '@react-navigation/core';
import { Capitalize, ToastError } from '../../utills/Methods';
import {useFetchAboutMe, useFetchDoc } from '../../utills/api';
import moment from 'moment';
import { width } from 'react-native-dimension';
import { useFetchAboutMeProps } from '../../components/TimeoffModal/types';


type Document = {
    id: number;
    name: string;
    file: string;             
    created_at: string;
    updated_at: string;
    file_type: string;
    url: string;
  };
  export default function Documents() {
    const [modal, setModal] = useState<boolean>(false);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [document, setDocument] = useState<Document | null>(null);
    const [holders, setHolders] = useState<Document[]>([]);                 


      const {
          data: profile
      } = useFetchAboutMe('main') as useFetchAboutMeProps;  

      const {
          data:doc,
          isLoading:loading
      } = useFetchDoc(profile?.id);

      console.log("doc",doc)

    const getDocuments = async () => {
        try{
            const res =  Array.isArray((doc as {results: Array<any>}).results)
            ? (doc as {results: Array<any>}).results
            : []

            if(res){
                setDocuments(res)
                setHolders(res)
            }else{
                setDocuments([])
                setHolders([])
            }
        } catch (err:any){
            ToastError(err.msg)
        }
    }
    const handleSearch = (text:string) => {
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
        }, [doc])
    )
    
    const ListComponent = ({ item }: { item: Document }) => {
        return(     
            <>
            <TouchableOpacity 
            onPress={() => {
                setDocument(item)
                setModal(!modal)
            }}
            style={[styles.listItemContainer]}
            >
                <View style={[CommonStyles.rowJustifySpaceBtw,{width : width(80)}]}>
                    <Image source={{uri : Images.FileIcon}} style={styles.fileIcon} />
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText}>{item?.name ? Capitalize(item.name) : null}</Text>
                        <Text style={styles.subText}>{item && item.created_at ? moment(item.created_at).format("DD MMM YYYY") : null}</Text>
                    </View>
                </View>
                <Image source={{uri : Images.DotsIcon}} style={styles.dotsIcon} />
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
                <BackHandler />
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
                            <SearchBoxIOS title="Search for document"
                            onSubmitEditing={handleSearch}
                            />
                            )
                        }
                        {
                !loading && documents && Array.isArray(documents) && documents.length > 0  ? (
                        <FlatList
                            data={documents}
                            keyExtractor={(i) => i.toString()}
                            renderItem={ListComponent}
                            ItemSeparatorComponent={() => <View />}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            contentContainerStyle={CommonStyles.marginTop_2}
                        />
                        ) : null
            }
                    </View>
                
            <>
            {
                loading ? <PageLoader /> : null
            }
            </>

            <>
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
            </>
            <DocumentModal isVisible={modal} onHide={() => setModal(false)} document={document}/>
        </ScreenWrapper>  
    );
}
