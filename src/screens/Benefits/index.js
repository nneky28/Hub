import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { leftIcon } from '../../assets/images';
import { Images } from '../../component2/image/Image';
import BenifitList from '../../components/BenifitList';
import ScreenWrapper from '../../components/ScreenWrapper';
import { APIFunction, getAPIs } from '../../utills/api';
import AppColors from '../../utills/AppColors';
import { Container, CustomWebView, EmptyStateWrapper, H1, ImageWrap, P, PageLoader, SizedBox } from '../../utills/components';
import { getData, ToastError } from '../../utills/Methods';
import styles from './styles';


export default function Benefits({navigation}) {
    const [loading,setLoading] = useState(false);
    const [benefits,setBenefits] = useState(null);
    const getBenefits = async () => {
        try{
            setLoading(true);
            let token = await getData("token");
            let user =  await getData("user");
            let about_me = await getData("about_me")
            let biz = user.employee_user_memberships &&
            Array.isArray(user.employee_user_memberships) && user.employee_user_memberships[0]
            && user.employee_user_memberships[0].business_id ? user.employee_user_memberships[0] : null;
            let benefits_url = APIFunction.benefits(biz.business_id,about_me.id);
            let benefits_res = await getAPIs(benefits_url,token)
            setBenefits(benefits_res.results);
            setLoading(false);
        }catch(err){
            let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : "Something went wrong. Please retry"
            console.log("err|||",err,msg)
            ToastError(msg)
        }

    }
    const [web,setWeb] = React.useState(false)
    const [web_url,setWebUrl] = React.useState(null)
    const goToWeb = (url) => {
        setWebUrl(url)
        setWeb(true)
    }
    const closeWeb = () => {
        setWeb(false)
      }
    useFocusEffect(
        useCallback(()=>{
            getBenefits()
        },[])
    )
    return (
        <ScreenWrapper scrollEnabled={(!loading && benefits && Array.isArray(benefits) && benefits.length === 0) || web ? false : true}>
            {
                web ? <CustomWebView 
                    setShow={closeWeb} web_url={web_url}
                /> : <React.Fragment>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.screenTitle}>
                    Benefits
                    </Text>
                </View>
                <View style={styles.line} />

                <View 
                    style={!loading && benefits && Array.isArray(benefits) && benefits.length === 0 ? 
                        styles.mainViewContainer2 : styles.mainViewContainer}
                >
                    {
                        loading ? (
                            <PageLoader />
                        ) : null
                    }
                    {
                        !loading && benefits && Array.isArray(benefits) && benefits.length === 0 ? (
                            <EmptyStateWrapper 
                                icon={Images.EmptyBenefits}
                                header_1={"You have no active"} 
                                header_2={"benefits yet."}
                                sub_text={"When you do, they will show up here."}
                            />
                        ) : null
                    }
                    {
                       !loading && benefits && Array.isArray(benefits) && benefits.length > 0 ?  <React.Fragment>
                            <Container width={90} marginTop={2}>
                                <H1 fontSize={3.4}>Company benefits you are enrolled on</H1>
                            </Container>
                            <BenifitList data={['#C2D4FF', '#99E6FF']} 
                                horizontal={false}
                                benefits={benefits}
                                goToWeb={goToWeb}
                            />
                   </React.Fragment> : null 
                    }
                </View>
            </React.Fragment>
            }
        </ScreenWrapper>  
    );
}
