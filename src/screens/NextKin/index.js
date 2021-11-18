import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { leftIcon} from '../../assets/images'
import ScreenWrapper from '../../components/ScreenWrapper'
import { APIFunction } from '../../utills/api'
import AppColors from '../../utills/AppColors'
import { AppButton, Container, H1, P} from '../../utills/components'
import {Capitalize, getData, ToastError, ToastSuccess } from '../../utills/Methods'
import styles from './styles'
import { Field, Formik } from 'formik'
import CustomInput from '../../components/CustomInput'
import { setLoaderVisible } from '../../Redux/Actions/Config'
import { useDispatch } from 'react-redux'
import CustomModalDropdown from '../../components/CustomModalDropdown'
import Button from '../../components/Button';
import { ActivityIndicator } from 'react-native-paper'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import { ScrollView } from 'react-native-gesture-handler'


export default function NextKin({navigation,route}) {
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState({
        first_name : "",
        middle_name : "",
        last_name :"",
        phone_number : "",
        email : "",
        marital_status : "",
        gender : "",
        nationality : "NG",
        address1 :  "",
        address2 : "",
        country : "",
        state : "",
        city : "",
        postal_code : ""
    });
   const handleSubmit = async () => {
        try{
            let required = ["first_name","middle_name","last_name","phone_number",
            "email","marital_status","gender","nationality","address1","country","state","city","postal_code"];
            let failed = false;
            let msg = ""
            for(let req of required){
                console.log("CHECK--",data[req] === "",data[req],data,req)
                if(data[req] && data[req] === "" || data[req].trim() === ""){
                    failed = true;
                    msg = `"${Capitalize(req.replace("_"," "))}" is required`;
                }
            }
            if(failed){
                return ToastError(msg);
            }
            let about = await getData("about_me")
            dispatch(setLoaderVisible(true));
            let res = await APIFunction.update_next_of_kin({...data,country : "NG"},about.id)
            dispatch(setLoaderVisible(false));
            ToastSuccess("Record has been updated");
        }catch(err){
            console.log("errr--",err)
            dispatch(setLoaderVisible(false));
            let msg = err.msg && Object.values(err.msg) && Object.values(err.msg).length > 0 ? Object.values(err.msg)[0][0] : 
            "Something went wrong.Please retry";
            ToastError(msg)
        }
    }
    const getRecord = () => {
        const {kins} = route.params;
        console.log("getRecord",kins)
        setData({
            ...data,
           ...kins
        })
    }
    useEffect(()=>{
        getRecord()
    },[])
    
    return (

        
        <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
            <ScrollView>
                <View style={styles.mainViewContainer}>
                    <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={styles.screenTitle}>
                        Update Next of Kin
                    </Text>
                    </View>
                {
                    loading ? (
                        <ActivityIndicator />
                    ) : ( 
                            <TouchableOpacity
                                onPress={handleSubmit}
                            >
                                <H1 color={AppColors.green}>Save</H1>
                            </TouchableOpacity>
                        )
                }
                </View>
                <View style={styles.line} />
                <Container
                    paddingHorizontal={5}
                    marginTop={1}
                >
                    <H1 color={AppColors.green}>All fields are required *</H1>
                </Container>
                <Container 
                    flex={1}
                >
                    <Formik>
                        <Container>
                            <Field
                                component={CustomInput}
                                name="first_name"
                                placeholder="First Name"
                                value={data.first_name}
                                onChangeData={(value)=>{
                                    setData({...data,first_name : value})
                                }}
                                color={AppColors.black}
                            />
                            <Field
                                component={CustomInput}
                                name="middle_name"
                                placeholder="Middle Name"
                                value={data.middle_name}
                                onChangeData={(value)=>{
                                    setData({...data,middle_name : value})
                                }}
                                color={AppColors.black}
                            />
                            <Field
                                component={CustomInput}
                                name="middle_name"
                                placeholder="Last Name"
                                value={data.last_name}
                                onChangeData={(value)=>{
                                    setData({...data,last_name : value})
                                }}
                                color={AppColors.black}
                            />
                            <Field
                                component={CustomInput}
                                name="phone_number"
                                placeholder="Phone Number"
                                value={data.phone_number}
                                onChangeData={(value)=>{
                                    setData({...data,phone_number : value})
                                }}
                                color={AppColors.black}
                            />
                            <Field
                                component={CustomInput}
                                name="email"
                                placeholder="Email Address"
                                value={data.email}
                                onChangeData={(value)=>{
                                    setData({...data,email : value})
                                }}
                                color={AppColors.black}
                            />
                            <Field
                                name="marital_status" 
                                placeholder="Marital Status"
                                component={CustomModalDropdown}
                                value={data.gender}
                                onChangeData={(value)=>setData({...data,marital_status : value.toLowerCase()})}
                                color={AppColors.black}
                                options={["Married","Single","Divorced"]}
                            />
                            <Field
                                name="gender" 
                                placeholder="Gender"
                                component={CustomModalDropdown}
                                value={data.gender}
                                onChangeData={(value)=>setData({
                                ...data,gender : value === "Male" ? "M" : 
                                value === "Female" ? "F" : "O"
                            })}
                                color={AppColors.black}
                                options={["Male","Female","Others"]}
                            />
                            <Field
                                component={CustomInput}
                                name="nationality"
                                placeholder="Nationality"
                                value={data.nationality}
                                onChangeData={(value)=>{
                                    setData({...data,nationality : value})
                                }}
                                color={AppColors.black}
                            />
                            <Field
                                component={CustomInput}
                                name="address1"
                                placeholder="Address 1"
                                value={data.address1}
                                onChangeData={(value)=>{
                                    setData({...data,address1 : value})
                                }}
                                color={AppColors.black}
                            />
                            <Field
                                component={CustomInput}
                                name="address2"
                                placeholder="Addrees 2"
                                value={data.address2}
                                onChangeData={(value)=>{
                                    setData({...data,address2 : value})
                                }}
                                color={AppColors.black}
                            />
                            <Field
                                name="country" 
                                placeholder="Country"
                                component={CustomModalDropdown}
                                value={data.country}
                                onChangeData={(value)=>setData({...data,country : value})}
                                color={AppColors.black}
                                options={["Nigeria"]}
                            />
                            <Field
                                component={CustomInput}
                                name="state"
                                placeholder="state"
                                value={data.state}
                                onChangeData={(value)=>{
                                    setData({...data,state : value})
                                }}
                                color={AppColors.black}
                            />
                            <Field
                                component={CustomInput}
                                name="city"
                                placeholder="City"
                                value={data.city}
                                onChangeData={(value)=>{
                                    setData({...data,city : value})
                                }}
                                color={AppColors.black}
                            />
                            <Field
                                component={CustomInput}
                                name="postal_code"
                                placeholder="Postal Code"
                                value={data.postal_code}
                                onChangeData={(value)=>{
                                    setData({...data,postal_code : value})
                                }}
                                color={AppColors.black}
                            />
                        </Container>
                    </Formik>
                    {/* <Container
                        marginTop={3}
                        marginBottom={3}
                        padding={3}
                    >
                        <AppButton 
                            text={"SUBMIT"}
                            color={AppColors.white}
                            onPress={()=>{
                                handleSubmit()
                            }}
                        />
                    </Container> */}
                </Container>
                </View>
            </ScrollView>
        </KeyboardAvoidingScrollView>
    )
}

