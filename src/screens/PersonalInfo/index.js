import { Field, Formik } from 'formik';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { ActivityIndicator } from 'react-native-paper';
import { leftIcon } from '../../assets/images';
import Button from '../../components/Button';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomInput from '../../components/CustomInput';
import CustomModalDropdown from '../../components/CustomModalDropdown';
import ScreenWrapper from '../../components/ScreenWrapper';
import { showFlashMessage } from '../../components/SuccessFlash';
import { APIFunction, putAPIs } from '../../utills/api';
import AppColors from '../../utills/AppColors';
import { getData, getStoredBusiness, storeData, ToastError } from '../../utills/Methods';
import { validationSchema } from '../../utills/validationSchema';
import styles from './styles';



export default function PersonalInfo({navigation}) {
    const [loading,setLoading] = React.useState(null);
    const updateProfile = async () => {
        try{
            let failed = false;
            required = ["firstName","middleName",
                "lastName","gender","dateOfBirth","maritalStatus","email","addr","mobileNumber1"]
            for(let req of required){
                console.log("data--",data[req])
               if(!data[req] || (data[req] && data[req] === "") || (data[req] && data[req].trim() === "")) failed = true;
            }
            if(failed) return ToastError("All fields are required")
            setLoading(true)
            setLoading(true);
            let token = await getData("token");
            let user =  await getData("user");
            let about = await getData("about_me");
            let fd = {
                "title": "",
                "first_name": data.firstName,
                "middle_name": data.middleName,
                "last_name": data.lastName,
                "birth_date": moment(new Date()).format("YYYY-MM-DD"),
                "marital_status": data.maritalStatus && data.maritalStatus.toLowerCase()  ,
                "gender": data.gender === "Male" ? "M" : "F",
                "phone_number1": data.mobileNumber1,
                "phone_number2": data.mobileNumber2,
                "address": {
                  "address1": data.addr,
                  "address2": data.address2,
                  "country": "NG",
                  "state": "Lagos",
                  "city": "Lagos",
                  "postal_code": ""
                }
            }
            let res = await APIFunction.edit(fd,about.id);
            await storeData("about_me",res);
            let profile = await getData("profile");
            await storeData("profile",{
                ...profile,about : res
            })
            showFlashMessage()
            navigation.goBack();
            setLoading(false)
        }catch(err){
            
            let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : "Something went wrong. Please retry"
            console.log("err|||",err,msg)
            ToastError(msg)
            setLoading(false);
        }
    }
    const [data,setData] = React.useState({
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        maritalStatus:"",
        email: "",
        addr: "",
        address2: "",
        mobileNumber1: "",
        mobileNumber2: "",
    })
    const getProfile = async () => {
        try{
            let profile = await getData("profile");
            if(profile && profile.about){
                setData(
                    {
                        firstName: profile.about.first_name,
                        middleName: profile.about.middle_name,
                        lastName: profile.about.last_name,
                        gender: profile.about.gender,
                        dateOfBirth: profile.about.birth_date,
                        maritalStatus : profile.about.marital_status,
                        email: profile.about.email,
                        addr: profile.about.address && profile.about.address.address1 ? 
                        profile.about.address.address1 : "",
                        address2: '',
                        mobileNumber1: profile.about.phone_number1,
                        mobileNumber2: profile.about.phone_number2,
                    }
                )
            }
        }catch(err){
            console.log("err",err)
        }
    }
    useEffect(()=>{
        getProfile()
    },[])
    return (
    <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
        <ScrollView>
        <View style={styles.mainViewContainer}>
                <Formik
                    initialValues={{
                        firstName: '',
                        middleName: '',
                        lastName: '',
                        gender: '',
                        dateOfBirth: '',
                        maritalStatus:'',
                        email: '',
                        address: '',
                        address2: '',
                        mobileNumber1: '',
                        mobileNumber2: '',
                    }}
                    //validationSchema={validationSchema}
                    onSubmit={showFlashMessage}
                >
                {({ handleSubmit, isValid, errors, onSubmit, values, setFieldTouched, setFieldValue, setFieldError }) => (
                <>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={styles.screenTitle}>
                            Personal Information
                        </Text>
                       {
                           !loading ? (
                                <Button 
                                    title="save" 
                                    containerStyle={styles.saveBtnStyle} 
                                    textStyle={styles.saveBtnText}
                                    onPress={() =>updateProfile()}
                                />
                           ) : (
                               <ActivityIndicator size={15} color={AppColors.green} />
                           )
                       }
                    </View>
                    <View style={styles.line} />
                    <Field
                        component={CustomInput}
                        name="firstName"
                        placeholder="First Name"
                        value={data.firstName}
                        setData={setData}
                        data={data}
                        color={AppColors.black}
                        onChangeData={(value)=>setData({...data,firstName : value})}
                    />
                    <Field
                        component={CustomInput}
                        name="middleName"
                        placeholder="Middle Name"
                        value={data.middleName}
                        onChangeData={(value)=>setData({...data,middleName : value})}
                        color={AppColors.black}
                    />
                    <Field
                        component={CustomInput}
                        name="lastName"
                        placeholder="Last Name"
                        value={data.lastName}
                        onChangeData={(value)=>setData({...data,lastName : value})}
                        color={AppColors.black}
                    />
                    <Field
                        name="gender" 
                        placeholder="Gender"
                        component={CustomModalDropdown}
                        value={data.gender}
                        onChangeData={(value)=>setData({...data,gender : value})}
                        color={AppColors.black}
                        options={["Male","Female","Others"]}
                    />

                    <Field
                        name="maritalStatus" 
                        placeholder="Marital Status"
                        component={CustomModalDropdown}
                        value={data.maritalStatus}
                        onChangeData={(value)=>setData({...data,maritalStatus : value})}
                        color={AppColors.black}
                        options={["Single","Married","Divorced"]}
                    />
                    

                    <Field
                        name="dateOfBirth"
                        placeholder="Date of Birth"
                        component={CustomDatePicker}
                        value={data.dateOfBirth}
                        onChangeData={(value)=>setData({...data,dateOfBirth : value})
                        }
                        color={AppColors.black}
                    />
            
                    
                    <Field
                        component={CustomInput}
                        name="email"
                        placeholder="Email"
                        keyboardType="email-address"
                        editable={false}
                        value={data.email}
                        onChangeData={(value)=>setData({...data,email : value})}
                        color={AppColors.black}
                    />
                    <Field
                        component={CustomInput}
                        name="address"
                        placeholder="Address"
                        value={data.address}
                        onChangeData={(value)=>setData({...data,addr : value})}
                        color={AppColors.black}
                    />
                    <Field
                        component={CustomInput}
                        name="address2"
                        placeholder="Address 2"
                        value={data.address2}
                        onChangeData={(value)=>setData({...data,address2 : value})}
                        color={AppColors.black}
                    />
                    <Field
                        component={CustomInput}
                        name="mobileNumber1"
                        placeholder="Mobile Number 1"
                        keyboardType='phone-pad'
                        value={data.mobileNumber1}
                        onChangeData={(value)=>setData({...data,mobileNumber1 : value})}
                        color={AppColors.black}
                    />
                    <Field
                        component={CustomInput}
                        name="mobileNumber2"
                        placeholder="Mobile Number 2 (Optional)"
                        keyboardType='phone-pad'
                        value={data.mobileNumber2}
                        onChangeData={(value)=>setData({...data,mobileNumber2 : value})}
                        color={AppColors.black}
                    />

                </>
                )}
            </Formik>
            </View>
        </ScrollView>
    </KeyboardAvoidingScrollView>
    );
}
