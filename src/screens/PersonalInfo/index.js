import { Field, Formik } from 'formik';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { leftIcon } from '../../assets/images';
import Button from '../../components/Button';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomInput from '../../components/CustomInput';
import CustomModalDropdown from '../../components/CustomModalDropdown';
import ScreenWrapper from '../../components/ScreenWrapper';
import { showFlashMessage } from '../../components/SuccessFlash';
import { APIFunction, putAPIs } from '../../utills/api';
import AppColors from '../../utills/AppColors';
import { BackHandler, CustomCalender, DatePickerModal } from '../../utills/components';
import { Capitalize, getData, getStoredBusiness, storeData, ToastError, ToastSuccess } from '../../utills/Methods';
import { validationSchema } from '../../utills/validationSchema';
import styles from './styles';



export default function PersonalInfo({navigation}) {
    const [loading,setLoading] = React.useState(null);
    const auth = useSelector(state=>state.Auth)
    const updateProfile = async () => {
        try{
            let failed = false;
            let required = ["first_name","last_name",
                "middle_name","gender","birth_date","marital_status","email","address","phone_number","state","city"]
            let msg = "";
            for(let req of required){
               if(!data[req] || (data[req] && data[req] === "") || (data[req] && data[req].trim() === "")){
                    msg = `"${Capitalize(req.replace("_"," "))}" is required`
                    failed = true
               };
            }
            if(failed) return ToastError(msg)
            setLoading(true)
            setLoading(true);
            let token = await getData("token");
            let user =  await getData("user");
            let about = await getData("about_me");
            let fd = {
                "title": "",
                "first_name": data.first_name,
                "middle_name": data.middle_name,
                "last_name": data.last_name,
                "birth_date": moment(data.birth_date).format("YYYY-MM-DD"),
                "marital_status": data.marital_status && data.marital_status.toLowerCase()  ,
                "gender": data.gender === "Male" ? "M" : "F",
                "phone_number1": data.phone_number,
                "phone_number2": data.mobileNumber2,
                "address": {
                  "address1": data.address,
                  "address2": data.address2,
                  "country": "NG",
                  "state": data.state,
                  "city": data.city,
                  "postal_code": data.postal_code
                }
            }
            let res = await APIFunction.edit(fd,about.id);
            await storeData("about_me",res);
            let profile = await getData("profile");
            await storeData("profile",{
                ...profile,about : res
            })
            ToastSuccess("Profile Updated")
            setLoading(false)
            if(auth.route !== "main"){
                let profile = await getData("profile") 
                return navigation.navigate("NextKin",{kins : profile.kin})
            }
            navigation.goBack();
        }catch(err){
            let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : "Something went wrong. Please retry"
            ToastError(msg)
            setLoading(false);
        }
    }
    const [data,setData] = React.useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        birth_date: "",
        marital_status:"",
        email: "",
        address: "",
        address2: "",
        phone_number: "",
        mobileNumber2: "",
        state : "",
        city : "",
        postal_code : ''
    })
    const [show,setShow] = React.useState(false)
    const [action,setAction] = React.useState(null)
    
    const getProfile = async () => {
        try{
            let profile = await getData("profile");
            if(profile && profile.about){
                setData(
                    {
                        first_name: profile.about.first_name,
                        middle_name: profile.about.middle_name,
                        last_name: profile.about.last_name,
                        gender: profile.about.gender,
                        birth_date: profile.about.birth_date,
                        marital_status : profile.about.marital_status,
                        email: profile.about.email,
                        address: profile.about.address && profile.about.address.address1 ? 
                        profile.about.address.address1 : "",
                        address2: profile.about.address && profile.about.address.address2 ? 
                        profile.about.address.address2 : "",
                        phone_number: profile.about.phone_number1,
                        mobileNumber2: profile.about.phone_number2,
                        city : profile.about.address && profile.about.address.address1 ? 
                        profile.about.address.city : "",
                        state : profile.about.address && profile.about.address.address1 ? 
                        profile.about.address.state : "",
                        postal_code : profile.about.address && profile.about.address.address1 ? 
                        profile.about.address.postal_code : ""
                    }
                )
            }
        }catch(err){
        }
    }
    useEffect(()=>{
        getProfile()
    },[])
    return (
    <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
        {
            show ? <DatePickerModal
                onChangeData={(date)=>{
                    setData({...data,birth_date : moment(new Date(date)).format("YYYY-MM-DD")})
                    setShow(false)
                }} 
                current={data.birth_date}
                setShow={setShow}
                show={show}
       />   : (
        <ScrollView>
        <View style={styles.mainViewContainer}>
        <Formik
                    initialValues={{
                        first_name: '',
                        last_name: '',
                        middle_name: '',
                        gender: '',
                        birth_date: '',
                        marital_status:'',
                        email: '',
                        address: '',
                        address2: '',
                        phone_number: '',
                        mobileNumber2: '',
                        city : "",
                        state : "",
                        postal_code : ""
                    }}
                    //validationSchema={validationSchema}
                    onSubmit={showFlashMessage}
                >
                {({ handleSubmit, isValid, errors, onSubmit, values, setFieldTouched, setFieldValue, setFieldError }) => (
                <>
                    <View style={styles.header}>
                        <BackHandler />
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
                        value={data.first_name}
                        setData={setData}
                        data={data}
                        color={AppColors.black}
                        onChangeData={(value)=>setData({...data,first_name : value})}
                    />
                    <Field
                        component={CustomInput}
                        name="middleName"
                        placeholder="Middle Name"
                        value={data.middle_name}
                        onChangeData={(value)=>setData({...data,middle_name : value})}
                        color={AppColors.black}
                    />
                    <Field
                        component={CustomInput}
                        name="lastName"
                        placeholder="Last Name"
                        value={data.last_name}
                        onChangeData={(value)=>setData({...data,last_name : value})}
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
                        value={data.marital_status}
                        onChangeData={(value)=>setData({...data,marital_status : value})}
                        color={AppColors.black}
                        options={["Single","Married","Divorced"]}
                    />
                    

                    <Field
                        name="dateOfBirth"
                        placeholder="Date of Birth"
                        component={CustomDatePicker}
                        value={data.birth_date}
                            onChangeData={(value)=>setData({...data,birth_date : value})
                        }
                        setShow={()=>{
                            setAction("dob")
                            setShow(true)
                        }}
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
                        onChangeData={(value)=>setData({...data,address : value})}
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
                        value={data.phone_number}
                        onChangeData={(value)=>setData({...data,phone_number : value})}
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
                        name="city"
                        placeholder="City"
                        keyboardType='default'
                        value={data.city}
                        onChangeData={(value)=>setData({...data,city : value})}
                        color={AppColors.black}
                    />

                    <Field
                        component={CustomInput}
                        name="state"
                        placeholder="State"
                        keyboardType='default'
                        value={data.state}
                        onChangeData={(value)=>setData({...data,state : value})}
                        color={AppColors.black}
                    />

                    <Field
                        component={CustomInput}
                        name="state"
                        placeholder="Postal Code"
                        keyboardType='number-pad'
                        value={data.postal_code}
                        onChangeData={(value)=>setData({...data,postal_code : value})}
                        color={AppColors.black}
                    />
                </>
                )}
            </Formik>
            </View>
        </ScrollView>
       )
        }
        
    </KeyboardAvoidingScrollView>
    );
}
