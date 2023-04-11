import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { leftIcon } from '../../assets/images';
import { Images } from '../../utills/Image';
import BenifitList from '../../components/BenifitList';
import ScreenWrapper from '../../components/ScreenWrapper';
import { APIFunction, getAPIs, useFetchBenefits } from '../../utills/api';
import AppColors from '../../utills/AppColors';
import { BackHandler, Container, CustomWebView, EmptyStateWrapper, H1, ImageWrap, P, PageLoader, SizedBox } from '../../utills/components';
import { getData, ToastError } from '../../utills/Methods';
import styles from './styles';


export default function Benefits({navigation}) {

    const [employee_pk,setEmployeePK] = React.useState(null)
    const [web,setWeb] = React.useState(false)
    const [web_url,setWebUrl] = React.useState(null)

    const {
        data : benefits,
        isLoading
    } = useFetchBenefits(employee_pk)

    const getBenefits = async () => {
        try{
            let about_me = await getData("about_me")
            setEmployeePK(about_me?.id)
        }catch(err){
        }
    }
    
    const goToWeb = (url) => {
        setWebUrl(url)
        setWeb(true)
    }
    const closeWeb = () => {
        setWeb(false)
    }
    React.useEffect(()=>{
        getBenefits()
    },[isLoading])
    
    return (
        <ScreenWrapper scrollEnabled={false}>
            {
                web ? <CustomWebView 
                    setShow={closeWeb} web_url={web_url}
                /> : <React.Fragment>
                <View style={styles.header}>
                    <BackHandler />
                    <Text numberOfLines={1} style={styles.screenTitle}>
                        Benefits
                    </Text>
                </View>
                <View style={styles.line} />

                <View 
                    style={styles.mainViewContainer}
                >
                    {
                        isLoading ? (
                            <PageLoader />
                        ) : null
                    }
                    {
                        !isLoading ? <React.Fragment>
                            <Container width={90} marginTop={2}>
                                <H1 fontSize={3.4}>Company benefits you are enrolled on</H1>
                            </Container>
                            <BenifitList data={['#C2D4FF', '#99E6FF']} 
                                horizontal={false}
                                benefits={
                                    benefits?.results && Array.isArray(benefits?.results) && benefits?.results.length > 0 ? 
                                    benefits?.results : []
                                }
                                goToWeb={goToWeb}
                            /> 
                        </React.Fragment>: null
                    }
                </View>
            </React.Fragment>
            }
        </ScreenWrapper>  
    );
}
