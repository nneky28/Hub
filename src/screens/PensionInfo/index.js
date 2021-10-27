import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Platform, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import { categoryIcon1, downIcon, filterIcon, leftIcon, listingIcon } from '../../assets/images'
import { FilterModal } from '../../components/ContactModal'
import PersonCard from '../../components/PersonCard'
import PersonListComp from '../../components/PersonListComp'
import ScreenWrapper from '../../components/ScreenWrapper'
import SearchBox, { SearchBoxIOS } from '../../components/SearchBox'
import TrainingList from '../../components/TrainingList'
import { APIFunction, getAPIs, postAPIs } from '../../utills/api'
import AppColors from '../../utills/AppColors'
import CommonStyles from '../../utills/CommonStyles'
import { AppButton, Container, H1, LottieIcon, PageLoader } from '../../utills/components'
import { celebrations, whosOut } from '../../utills/data/celebrations'
import { persons } from '../../utills/data/persons'
import tasksData from '../../utills/data/tasksData'
import { getData, ToastError, ToastSuccess } from '../../utills/Methods'
import styles from './styles'
import Empty from '../../assets/lottie/empty.json'
import { Field, Formik } from 'formik'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../component2/button/Button';
import { setLoaderVisible } from '../../Redux/Actions/Config'
import { useDispatch } from 'react-redux'
import CustomModalDropdown from '../../components/CustomModalDropdown'


export default function PensionInfo({navigation}) {
    const dispatch = useDispatch()
    const [data,setData] = useState({
        account_number : "",
        pension_number : "",
        bank :"",
        provider : ""
    });
    const [providers,setProviders] = useState([]);
    const [banks,setBanks] = useState([])
   const handleSubmit = async () => {
        try{

            // {
            //     "bank_account": {
            //       "bank": 0,
            //       "account_number": "string"
            //     },
            //     "pension": {
            //       "provider": 0,
            //       "pension_number": "string"
            //     }
            //   }
            if(data.confirm_password === "" || data.new_password === "" || data.old_password === "" 
            || data.new_password.trim() === "" || data.confirm_password.trim() === "" || data.old_password.trim() === ""){
                return ToastError("All fields are required")
            }
            if(data.confirm_password !== data.new_password){
                return ToastError("Passwords do not match");
            }
            dispatch(setLoaderVisible(true));
            let res = await APIFunction.change_password(data)
            dispatch(setLoaderVisible(false));
            ToastSuccess("Password has been changed");
            setData({
                new_password : "",
                old_password : "",
                confirm_password : ""
            })
        }catch(err){
            dispatch(setLoaderVisible(false));
            let msg = err.msg && Object.values(err.msg) && Object.values(err.msg).length > 0 ? Object.values(err.msg)[0][0] : 
            "Something went wrong.Please retry";
            ToastError(msg)
        }
    }

    const fetchRecord = async () => {
        try{
            let bank_res = await APIFunction.banks();
            let prov_res = await APIFunction.pension_providers();
            console.log("bank_res",bank_res)
            console.log("prov_res",prov_res)
            setProviders(prov_res);
            setBanks(bank_res);
        }catch(err){
            ToastError(err.msg)
        }
    }
    
    useEffect(()=>{
        fetchRecord()
    },[])

    return (
        <ScreenWrapper scrollEnabled={false}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                  <Text numberOfLines={1} style={styles.screenTitle}>
                    Update Pension Info
                  </Text>
                </View>
                <TouchableOpacity>
                    <H1 color={AppColors.green}>Save</H1>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <Container 
                flex={1}
            >
                <Formik>
                    <Container>
                        <Field
                            component={CustomInput}
                            name="account_number"
                            placeholder="Account Number"
                            value={data.old_password}
                            onChangeData={(value)=>{
                                setData({...data,account_number : value})
                            }}
                            color={AppColors.black}
                            keyboardType={'numeric'}
                        />
                        <Field
                            component={CustomInput}
                            name="pension_number"
                            placeholder="Pension Number"
                            value={data.pension_number}
                            onChangeData={(value)=>{
                                setData({...data,pension_number : value})
                            }}
                            color={AppColors.black}
                            keyboardType={'numeric'}
                        />

                        <Field
                            component={CustomModalDropdown}
                            name="pension_number"
                            placeholder="Bank"
                            value={data.bank}
                            onChangeData={(value)=>{
                                setData({...data,pension_number : value})
                            }}
                            color={AppColors.black}
                            options={banks && Array.isArray(banks) ? banks : []}
                        />

                        <Field
                            component={CustomModalDropdown}
                            name="pension_number"
                            placeholder="Pension Provider"
                            value={data.provider}
                            onChangeData={(value)=>{
                                setData({...data,pension_number : value})
                            }}
                            color={AppColors.black}
                            options={providers && Array.isArray(providers) ? providers : []}
                        />

                    </Container>
                </Formik>
            </Container>
        </ScreenWrapper>
    )
}

