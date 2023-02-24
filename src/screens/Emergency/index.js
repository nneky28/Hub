import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View,Keyboard } from 'react-native'
import { leftIcon} from '../../assets/images'
import ScreenWrapper from '../../components/ScreenWrapper'
import { APIFunction} from '../../utills/api'
import AppColors from '../../utills/AppColors'
import { AppButton, BackHandler, Container, H1, KeyboardAwareWrapper, P} from '../../utills/components'
import {Capitalize, getData, storeData, ToastError, ToastSuccess, validateEmail } from '../../utills/Methods'
import styles from './styles'
import { Field, Formik } from 'formik'
import CustomInput from '../../components/CustomInput'
import { setLoaderVisible } from '../../Redux/Actions/Config'
import { useDispatch, useSelector } from 'react-redux'
import CustomModalDropdown from '../../components/CustomModalDropdown'
import Button from '../../components/Button';
import { ActivityIndicator } from 'react-native-paper'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import { ScrollView } from 'react-native-gesture-handler'
import { useQueryClient } from 'react-query'


export default function NextKin({navigation,route}) {
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.Auth)
    const queryClient = useQueryClient()
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState({
        first_name : "",
        last_name :"",
        phone_number : "",
        email : "",
        gender : "",
        nationality : "NG",
        address1 :  "",
        address2 : "",
        country : "",
        state : "",
        city : "",
        postal_code : "",
        relationship : ""
    });
   const handleSubmit = async () => {
        try{
            // let required = ["first_name","last_name","phone_number",
            // "email","gender","nationality","address1","country","state","city"];
            // let failed = false;
            // let msg = ""
            // for(let req of required){
            //     if(data[req] && data[req] === "" || data[req].trim() === ""){
            //         failed = true;
            //         msg = `"${Capitalize(req.replace("_"," "))}" is required`;
            //     }
            // }
            // if(failed){
            //     return ToastError(msg);
            // }
            Keyboard.dismiss()
            if(data.email && !validateEmail(data.email.toString().trim())) return ToastError("Please enter a valid email")
            let about = await getData("about_me")
            dispatch(setLoaderVisible(true));
            let res = await APIFunction.update_emergency({...data,country : "NG"},about.id)
            dispatch(setLoaderVisible(false));
            ToastSuccess("Record has been updated");
            let profile = await getData("profile") 
            if(auth.route !== "main"){
                return navigation.navigate("PensionInfo",{pension : profile.pension})
            }
            storeData("profile",{...profile,emergency : res})
            queryClient.invalidateQueries("emergency")
        }catch(err){
            dispatch(setLoaderVisible(false));
            let msg = err.msg && Object.values(err.msg) && Object.values(err.msg).length > 0 ? Object.values(err.msg)[0][0] : 
            "Something went wrong.Please retry";
            ToastError(msg)
        }
    }
    const getRecord = () => {
        const {emergency} = route.params;
        setData({
            ...data,
           ...emergency,
           country : emergency?.country_display || ""
        })
    }
    useEffect(()=>{
        getRecord()
    },[])
    
    return (
        <ScreenWrapper
            scrollEnabled={false}
        >
             <View style={styles.header}>
                <BackHandler />
                <View style={styles.titleContainer}>
                  <Text numberOfLines={1} style={styles.screenTitle}>
                    Emergency Contact
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
            <KeyboardAwareWrapper>
                <Formik>
                    <>
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
                            name="last_name"
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
                            keyboardType="numeric"
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
                            component={CustomInput}
                            name="relationship"
                            placeholder="Relationship"
                            value={data.relationship}
                            onChangeData={(value)=>{
                                setData({...data,relationship : value})
                            }}
                            color={AppColors.black}
                        />
                        {/* <Field
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
                        /> */}
                        {/* <Field
                            component={CustomInput}
                            name="nationality"
                            placeholder="Nationality"
                            value={data.nationality}
                            onChangeData={(value)=>{
                                setData({...data,nationality : value})
                            }}
                            color={AppColors.black}
                        /> */}
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
                            defaultValue={data.country || "Country"}
                            onChangeData={(value)=>setData({...data,country : value})}
                            color={AppColors.black}
                            options={["Nigeria"]}
                        />
                        <Field
                            component={CustomInput}
                            name="state"
                            placeholder="State"
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
                    </>
                </Formik>
            </KeyboardAwareWrapper>
        </ScreenWrapper>
    )
}

