
import React, { useEffect, useState } from 'react'
import {  Keyboard, Text, TouchableOpacity, View } from 'react-native'
import ScreenWrapper from '../../components/ScreenWrapper'
import { APIFunction, useFetchAboutMe, useFetchBanking, useFetchProviders, } from '../../utills/api'
import AppColors from '../../utills/AppColors'
import { BackHandler, Container, H1, ItemListModal,useDebounce } from '../../utills/components'
import { Capitalize, getData, storeData, ToastError, ToastSuccess } from '../../utills/Methods'
import styles from './styles'
import { Field } from 'formik'
import CustomInput from '../../components/CustomInput'
import { useSelector } from 'react-redux'
import CustomModalDropdown from '../../components/CustomModalDropdown'
import { ActivityIndicator } from 'react-native-paper'
import { useMutation } from 'react-query'
import { width } from 'react-native-dimension'
import { useFetchAboutMeProps } from '../../components/TimeoffModal/types'

interface Data {
    [key: string]: string | null;
    account_name:null;
    account_number: string;
    pension_number: string;
    bank: string;
    provider: string;
  }
  interface IndexProps {
    navigation: any;
  }

 const Index : React.FC<IndexProps> = ({ navigation }) => {
    const [data, setData] = useState<Data>({
        account_name: null,
        account_number: "",
        pension_number: "",
        bank: "",
        provider: ""
    });
     
    const [disabled, setDisabled] = useState(false)
    const auth = useSelector(state => state.Auth)
    const [visible, setVisible] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [reload, setReload] = React.useState("")
    const reloadTerm = useDebounce(reload, 200)
  

    const {
        mutateAsync: updatePension,
        isLoading
    } = useMutation(APIFunction.update_pension)
    const {
        mutateAsync: bankVerify,
        isLoading: verifying
    } = useMutation(APIFunction.bank_verification)

    const {
        data: banks,
        isFetching: fetchingBanks
    } = useFetchBanking()

    const {
        data: providers,
        isFetching: fetchingProviders
    } = useFetchProviders()

    const {
        data : profile
    } = useFetchAboutMe("main") as useFetchAboutMeProps
     
    const handleSubmit = async (param:any) => {
        try {
            let required = data?.account_number || data?.bank ?
                ["account_number", "bank"] : []
            if (data?.pension_number || data?.provider) {
                required = [...required, ...["pension_number", "provider"]]
            }
            let failed = false;
            let msg = ""
            for (let req of required) {
                if (
                    !data[req] || data[req] === "" || data[req]?.toString().trim() === ""
                ) {
                    failed = true
                    msg = `${Capitalize(req.replace("_", " "))} is required`
                }
            }
            //CHECK FOR ONDEBOUNCE SUBMISSION
            if ((failed && param === "reload") || (reloadTerm === "" && param === "reload")) return
            if (param === "reload" && data.account_number.length < 10) return

            //CHECK FOR BUTTON PRESS SUBMISSION
            Keyboard.dismiss()
            if (failed) {
                return ToastError(msg)
            }
            if (required.length && required.includes("account_number") && data.account_number.length < 10) {
                return ToastError("Please provide a valid account number.")
            }
            if (required.length && required.includes("account_number") && disabled) {
                let fd = {
                    bank_code: data.bank_code,
                    account_number: data.account_number
                }
                let res = await bankVerify(fd)
                setDisabled(false)
                return setData({ ...data, account_name: res.account_name })
            }
            let fd = { is_pension_applicable: false }
            if (data.bank) {
                fd["bank_account"] = {
                    "bank": data.bank,
                    "account_number": data.account_number
                }
            }
            if (data.provider) {
                fd["pension"] = {
                    "provider": data.provider,
                    "pension_number": data.pension_number
                }
                fd["is_pension_applicable"] = true
            }
        
            let res = await updatePension({ ...fd, id: profile?.id })
            if (res) {     
                ToastSuccess("Record has been saved");
               }
            if (auth.route !== "main") {
                return navigation.navigate("EditPhoto")
            }
            return navigation.goBack()
        } catch (err:any) {
            ToastError(err.msg)
        }
    }

    const fetchRecord = async () => {
        try {
            setData({
                account_name: profile?.bank_account?.account_name || "",
                account_number: profile?.bank_account?.account_number || "",
                bank_code: profile?.bank_account?.bank?.code || "",
                pension_number: profile?.pension?.pension_number || "",
                bank: profile?.bank_account?.bank?.id || "",
                provider: profile?.pension?.provider?.id || "",
                bank_name: profile?.bank_account?.bank?.name || "",
                prov_name: profile?.pension?.provider?.name || "",
            })
            profile?.bank_account?.account_name ? setDisabled(false) : setDisabled(true)
        } catch (err:any) {
            ToastError(err.msg)
        }
    }

    useEffect(() => {
        fetchRecord()
    }, [profile])


    useEffect(() => {
        handleSubmit("reload")
    }, [reloadTerm])

    return (
        <ScreenWrapper scrollEnabled={true}>
            <View style={styles.header}>
                <BackHandler position={"center"} />
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={styles.screenTitle}>
                        Update Information
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={verifying || isLoading}
                >
                    {
                        verifying || isLoading ? <ActivityIndicator size={width(6)} color={AppColors.green} /> : <H1 color={AppColors.green}>Save</H1>
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <Container
                flex={1}
            >
                {/* <Formik> */}
                    <Container>
                        <Container
                            paddingHorizontal={5}
                            marginTop={2}
                            marginLeft={5}
                        >
                            <Text numberOfLines={1} style={styles.screenTitle}>
                                Bank Information
                            </Text>
                            <View style={styles.line} />
                        </Container>
                        {
                            !disabled ? (   
                            <CustomInput
                             placeholder="Account Name"
                             value={data.account_name ?? ''}
                             editable={false}
                             onChangeData={() => null}
                            />
                            ) : null
                    }
                    <CustomModalDropdown
                           placeholder="Bank"
                           defaultValue={data.bank_name || ""}
                           setOpen={setOpen}
                    />
                    <CustomInput
                           placeholder="Account Number"
                           value={data.account_number}
                           onChangeData={async (value) => {
                               setData({ ...data, account_number: value })
                               setDisabled(true)
                               setReload(value)
                           }}
                           keyboardType={'numeric'}
                           maxLength={10}
                    />
                        <Container
                            paddingHorizontal={5}
                            marginTop={2}
                            marginLeft={5}
                        >
                            <Text numberOfLines={1} style={styles.screenTitle}>
                                Pension Information
                            </Text>
                            <View style={styles.line} />
                    </Container>
                    
                    <CustomModalDropdown
                           placeholder="Pension Provider"
                           defaultValue={data.prov_name || ""}
                           setOpen={setVisible}
                    />
                        
                    <CustomInput
                           placeholder="Pension Number"
                           value={data.pension_number}
                           onChangeData={async (value) => setData({ ...data, pension_number: value })}
                           keyboardType={'numeric'}
                    />
                     
                    </Container>
                {/* </Formik> */}
                <>
                {
                    open ? <ItemListModal
                        data={banks as Array<{id: string, name: string}>}
                            setOpen={setOpen}
                            open={open}
                        onPressHandler={(value) => {
                            let load = { ...data, bank: value }
                            setData(load)
                            storeData("load", load)
                            if (value === "" || value === "--Banks--" && (!data.account_number || data.account_number === ""
                                || data.account_number.trim() === "")) {
                                return setDisabled(false)
                            }
                            setOpen(false)
                            setDisabled(true)
                            if (
                                !data.account_number || data.account_number === ""
                                || data.account_number.trim() === ""
                            ) {
                                return false
                            }
                            handleSubmit({})

                        }}

                        header_1={"You have added"}
                        header_2={"no banks yet."}
                        sub_text={"They will show up here when you have."}
                    /> : null
                }
                </>

            </Container>
            <>
            {
                visible ? <ItemListModal
                    data={providers as Array<{id: string, name: string}>}
                    setOpen={setVisible} open={visible}
                    onPressHandler={(item) => {
                        let load = {
                            ...data, provider: item.id, prov_name: item.name
                        }
                        setData(load)
                        setVisible(false)
                    }}
                    header_1={"You have added"}
                    header_2={"no provider yet."}
                    sub_text={"They will show up here when you do."}
                    loading={fetchingProviders}
                /> : null
            }
            </>
            <>
            {
                open ? <ItemListModal
                    data={banks  as Array<{id: string, name: string}>}
                    setOpen={() => setOpen(false)} open={open}
                    onPressHandler={(item) => {
                        let load = {
                            ...data, bank: item.id, bank_name: item.name,
                            bank_code: item.code
                        }
                        setDisabled(true)
                        setData(load)
                        setReload(item.code)
                        setOpen(false)
                    }}
                    header_1={"You have added"}
                    header_2={"no banks yet."}
                    sub_text={"hey will show up here when you do."}
                    loading={fetchingBanks}
                /> : null
            }
            </>
        </ScreenWrapper>
    )
}

export default Index;