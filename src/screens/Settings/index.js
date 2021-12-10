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
import { APIFunction} from '../../utills/api'
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
import { ActivityIndicator } from 'react-native-paper'







export default function Setting({navigation}) {
    const dispatch = useDispatch()
    const [data,setData] = useState({
        old_password : "",
        new_password : "",
        confirm_password :""
    });
   const changePassword = async () => {
        try{
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
    
    return (
        <ScreenWrapper scrollEnabled={true}>
            <Container 
                //paddingHorizontal={3}
                marginLeft={3}
                style={{
                    flexDirection : "row"
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                  <Text numberOfLines={1} style={styles.screenTitle}>
                    Change Password
                  </Text>
                </View>
                <TouchableOpacity
                    onPress={changePassword}
                >
                    <H1 color={AppColors.green}>Save</H1>
                </TouchableOpacity>
            </Container>
            {/* <View style={styles.header}>
                
            </View> */}
            <View style={styles.line} />
            <Container 
                flex={1}
            >
                <Formik>
                    <Container>
                        <Field
                            component={CustomInput}
                            name="password"
                            placeholder="Old Password"
                            value={data.old_password}
                            onChangeData={(value)=>{
                                setData({...data,old_password : value})
                            }}
                            color={AppColors.black}
                            secureTextEntry={true}
                        />
                        <Field
                            component={CustomInput}
                            name="new_password"
                            placeholder="New Password"
                            value={data.new_password}
                            onChangeData={(value)=>{
                                setData({...data,new_password : value})
                            }}
                            color={AppColors.black}
                            secureTextEntry={true}
                        />
                        <Field
                            component={CustomInput}
                            name="confirm_password"
                            placeholder="Confirm Password"
                            value={data.confirm_password}
                            onChangeData={(value)=>{
                                setData({...data,confirm_password : value})
                            }}
                            color={AppColors.black}
                            secureTextEntry={true}
                        />
                        <Container>
                    {/* <AppButton 
                        text={"SUBMIT"}
                        color={AppColors.white}
                        onPress={()=>{
                            changePassword()
                        }}
                        //loading={loading}
                    /> */}
                </Container>
                    </Container>
                </Formik>
            </Container>
        </ScreenWrapper>
    )
}

