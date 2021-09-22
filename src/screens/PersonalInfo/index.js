import { Field, Formik } from 'formik';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { leftIcon } from '../../assets/images';
import Button from '../../components/Button';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomInput from '../../components/CustomInput';
import CustomModalDropdown from '../../components/CustomModalDropdown';
import ScreenWrapper from '../../components/ScreenWrapper';
import { showFlashMessage } from '../../components/SuccessFlash';
import { validationSchema } from '../../utills/validationSchema';
import styles from './styles';



export default function PersonalInfo({navigation}) {

    
    return (
        <ScreenWrapper scrollEnabled={true}>

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
                validationSchema={validationSchema}
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
                        <Button 
                        title="save" 
                        containerStyle={styles.saveBtnStyle} 
                        textStyle={styles.saveBtnText}
                        onPress={() => {
                            try{
                                console.log(values)    
                                handleSubmit();
                            }catch(e ) {
                                console.error(e.message)
                            }
                        }}
                        />
                    </View>
                    <View style={styles.line} />
                    <Field
                    component={CustomInput}
                    name="firstName"
                    placeholder="First Name"
                    />
                    <Field
                    component={CustomInput}
                    name="middleName"
                    placeholder="Middle Name"
                    />
                    <Field
                    component={CustomInput}
                    name="lastName"
                    placeholder="Last Name"
                    />
                    <Field
                    name="gender" 
                    placeholder="Gender"
                    component={CustomModalDropdown}
                    />

                    <Field
                    name="maritalStatus" 
                    placeholder="Marital Status"
                    component={CustomModalDropdown}
                    />
                    

                    <Field
                    name="dateOfBirth"
                    placeholder="Date of Birth"
                    component={CustomDatePicker}
                    />
            
                    
                    <Field
                    component={CustomInput}
                    name="email"
                    placeholder="Email"
                    keyboardType="email-address"
                    />
                    <Field
                    component={CustomInput}
                    name="address"
                    placeholder="Address"
                    />
                    <Field
                    component={CustomInput}
                    name="address2"
                    placeholder="Address 2"
                    />
                    <Field
                    component={CustomInput}
                    name="mobileNumber1"
                    placeholder="Mobile Number 1"
                    keyboardType='phone-pad'
                    />
                    <Field
                    component={CustomInput}
                    name="mobileNumber2"
                    placeholder="Mobile Number 2 (Optional)"
                    keyboardType='phone-pad'
                    />

                </>
                )}
            </Formik>


                
            </View>
        </ScreenWrapper>  
    );
}
