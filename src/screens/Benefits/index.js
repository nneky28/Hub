import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { leftIcon } from '../../assets/images';
import BenifitList from '../../components/BenifitList';
import ScreenWrapper from '../../components/ScreenWrapper';
import { APIFunction, getAPIs } from '../../utills/api';
import AppColors from '../../utills/AppColors';
import { PageLoader } from '../../utills/components';
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
    useFocusEffect(
        useCallback(()=>{
            getBenefits()
        },[])
    )
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
                {
                    loading ? (
                        <PageLoader />
                    ) : (
                        <BenifitList data={['#C2D4FF', '#99E6FF']} 
                            horizontal={false}
                            benefits={benefits}
                        />
                    )
                }
            </View>
        </ScreenWrapper>  
    );
}
