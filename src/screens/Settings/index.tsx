import React, { useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { APIFunction} from '../../utills/api'
import { Container, } from '../../utills/components'
import { ToastError, ToastSuccess } from '../../utills/Methods'
import CustomInput from '../../components/CustomInput'
import { useMutation } from 'react-query'
import { HeaderWithBackButton } from '../../components/Headers/CustomHeader'

export default function Setting() {
    const [data,setData] = useState({
        old_password : "",
        new_password : "",
        confirm_password :""
    });
    const {
        mutateAsync,
        isLoading
    } = useMutation(APIFunction.change_password)

   const changePassword = async () => {
        try{
            if(data.confirm_password === "" || data.new_password === "" || data.old_password === "" 
            || data.new_password.trim() === "" || data.confirm_password.trim() === "" || data.old_password.trim() === ""){
                return ToastError("All fields are required")
            }
            if(data.confirm_password !== data.new_password){
                return ToastError("Passwords do not match");
            }
            await mutateAsync(data)
            ToastSuccess("Password has been changed");
            setData({
                new_password : "",
                old_password : "",
                confirm_password : ""
            })
        }catch(err : any){
            ToastError(err?.msg)
        }
    }
    
    return (
        <ScreenWrapper>
            <HeaderWithBackButton headerText='Change Password'
                rightButtonText="Save"
                onSubmitHandler={changePassword}
                isLoading={isLoading}
            />
            <Container 
                flex={1}
            >
                <CustomInput 
                    placeholder="Old Password"
                    value={data.old_password}
                    onChangeData={(value)=>{
                        setData({...data,old_password : value})
                    }}
                    secureTextEntry={true}
                />

                <CustomInput 
                    placeholder="New Password"
                    value={data.new_password}
                    onChangeData={(value)=>{
                        setData({...data,new_password : value})
                    }}
                    secureTextEntry={true}
                />

                <CustomInput 
                    placeholder="Confirm Password"
                    value={data.confirm_password}
                    onChangeData={(value)=>{
                        setData({...data,confirm_password : value})
                    }}
                    secureTextEntry={true}
                />
            </Container>
        </ScreenWrapper>
    )
}

