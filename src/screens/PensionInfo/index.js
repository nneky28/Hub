
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Platform, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native'
import { categoryIcon1, downIcon, filterIcon, leftIcon, listingIcon } from '../../assets/images'
import ScreenWrapper from '../../components/ScreenWrapper'
import { APIFunction, } from '../../utills/api'
import AppColors from '../../utills/AppColors'
import {Container, H1 } from '../../utills/components'
import { Capitalize, getData, storeData, ToastError, ToastSuccess } from '../../utills/Methods'
import styles from './styles'
import { Field, Formik } from 'formik'
import CustomInput from '../../components/CustomInput'
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
    const [bankHolder,setBankHolder] = useState([]);
    const [provHolder,setProvHolder] = useState([]);
   const handleSubmit = async () => {
        try{
            let required = ["account_number","account_number","bank","provider"];
            let failed = false;
            for(let req of required){
                if(data[req] === "" || data[req].trim() === ""){
                    failed = true
                    msg = `${Capitalize(req.replace("_"," "))} is required`
                }
            }
            if(failed){
                return ToastError(msg);
            }
            let pension = provHolder[providers.indexOf(data.provider)]
            let bank = bankHolder[banks.indexOf(data.bank)]
            let fd  = {
                "bank_account": {
                  "bank": bank.id,
                  "account_number": data.account_number
                },
                "pension": {
                  "provider": pension.id,
                  "pension_number": data.pension_number
                }
              }
            dispatch(setLoaderVisible(true));
            let about = await getData("about_me");
            let res = await APIFunction.update_pension(fd,about.id)
            await storeData("about_me",res)
            dispatch(setLoaderVisible(false));
            ToastSuccess("Record has been saved");
        }catch(err){
            dispatch(setLoaderVisible(false));
            ToastError(err.msg)
        }
    }

    const fetchRecord = async () => {
        try{
            let about = await getData("about_me");
            let bank_res = await APIFunction.banks();
            let prov_res = await APIFunction.pension_providers();
            console.log("about_me==",about.bank_account,about.pension)
            setData({
                account_number : about && about.bank_account && about.bank_account.account_number ? 
                about.bank_account.account_number : "",
                pension_number : about && about.pension && about.pension.pension_number ?
                about.pension.pension_number : "",
                bank : about && about.bank_account && about.bank_account.bank && about.bank_account.bank.name ? 
                about.bank_account.bank.name : "",
                provider : about && about.pension && about.pension.provider && about.pension.provider.name ?
                about.pension.provider.name : ""
            })
            setBankHolder(bank_res)
            setProvHolder(prov_res)
            setProviders(prov_res.map((item)=>item.name));
            setBanks(bank_res.map((item)=>item.name));
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
                <TouchableOpacity
                    onPress={handleSubmit}
                >
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
                            value={data.account_number}
                            onChangeData={(value)=>{
                                setData({...data,account_number : value})
                            }}
                            color={AppColors.black}
                            keyboardType={'numeric'}
                            maxLength={10}
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
                                setData({...data,bank : value})
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
                                setData({...data,provider : value})
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

