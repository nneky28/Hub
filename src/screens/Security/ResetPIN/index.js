import React, { useEffect} from 'react';
import {BackHandler, Image, Keyboard} from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import styles from './styles';
import { H1, P,Container } from '../../../utills/components';
import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import AppColors from '../../../utills/AppColors';
import { TouchableWrapper, UserPINComponent } from '../../../utills/components';
import { Images } from '../../../utills/Image';
import { ICON_BUTTON_SIZE } from '../../../utills/Constants';
import CommonStyles from '../../../utills/CommonStyles';
import { Field, Formik } from 'formik';
import CustomInput from '../../../components/CustomInput';
import { useMutation } from 'react-query';
import { APIFunction } from '../../../utills/api';
import { getData, storeData, ToastError } from '../../../utills/Methods';
import CryptoJS from 'crypto-js';
import { login } from '../../../Redux/Actions/Auth';
import { setSecurityVisible } from '../../../Redux/Actions/Config';
import moment from "moment"

const ResetPIN = ({onModeChangeHandler}) => {
  const auth = useSelector((state)=>state.Auth)
  const [password,setPassword] = React.useState("")
  const {
    mutateAsync,
    isLoading
  } = useMutation(APIFunction.login)
  const dispatch = useDispatch()
  const [PIN,setPIN] = React.useState("")
  const [hasPIN,setHasPIN] = React.useState(false)
  const [holder,setHolder] = React.useState("")
  const [action,setAction] = React.useState("reset")
  const [error,setError] = React.useState("")

  const handleSubmit = async () => {
    try{
      if(!password || password.trim() === "") return setError("Please enter a password")
      const fd = {
        email : auth?.user?.email,
        password
      }
      await mutateAsync(fd)
      storeData(auth.user.email.toLowerCase().replaceAll("_",""),null)
      setAction("create")
    }catch(err){
      setError(err.msg)
    }
  }

  const validatePIN = async (text) => {
    try{
      Keyboard.dismiss()
      if(!hasPIN && action === "create"){
        setPIN(text)
        setAction("confirm")
        setHolder("")
        return
      }
      if(!hasPIN && action === "confirm" && (text !== PIN)){
        setHolder("")
        return setError("Please confirm that your PIN matches")
      }
      if(!hasPIN && action === "confirm"){
        let userInfo = await getData("user");
        let ciphertext = CryptoJS.AES.encrypt(text,userInfo.email.replaceAll("_","")).toString();
        storeData(userInfo.email.replaceAll("_",""),ciphertext)
      }
      storeData("lastActiveMoment", moment().toISOString())
      dispatch(setSecurityVisible(false))
      onModeChangeHandler("CREATE_PIN")
    }catch(err){
    }
  }

  const onChangeText = (text) => {
    if(error) setError("")
    setPassword(text)
  }

  useEffect(()=>{
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      ()=>{
        if(action === "reset")  onModeChangeHandler("CREATE_PIN")
        if(action === "create") setAction("reset")
        if(action === "confirm") setAction("create")
        return true
      }
    );

    return () => backHandler.remove();

  },[action])

  return (
    <ScreenWrapper>
        <Container flex={1}>
          <Container direction='row' 
            verticalAlignment='center'
            width={90}
            alignSelf="center"
          >
              <TouchableWrapper 
                onPress={()=>{
                  if(action === "reset") return onModeChangeHandler("CREATE_PIN")
                  if(action === "create") return setAction("reset")
                  if(action === "confirm") return setAction("create")
                }} 
                size={ICON_BUTTON_SIZE}
                style={CommonStyles.alignLeft}
              >
                <Image 
                  source={{uri : Images.BackArrow}}
                  style={styles.Image1Sty}
                />
              </TouchableWrapper>
            </Container>
            {
              action !== "reset" ? <UserPINComponent hasPIN={hasPIN} validatePIN={validatePIN} 
                  action={action}
                  setHolder={setHolder}
                  auth={auth}
                  error={error}
                  holder={holder}
                  setError={setError}
                /> : <Container
                marginTop={4}
                width={90}
                alignSelf="center"
              >
                <H1 fontSize={6} color={AppColors.black1}>Reset Pin</H1>
                <P color={AppColors.black1} style={CommonStyles.marginTop_1}>Reset your pin by entering your password</P>
  
                <Formik>
                  <React.Fragment>
                    {error ? <P color={AppColors.red} style={CommonStyles.marginTop_2}>{error}</P> : null}
                    <Field 
                      placeholder="Password"
                      name="password"
                      value={password}
                      component={CustomInput}
                      secureTextEntry={true}
                      onChangeData={onChangeText}
                    />
                  </React.Fragment>
                </Formik>
                <Button
                    title={'Reset PIN'}
                    containerStyle={styles.btnContainer}
                    textStyle={styles.greenButtonText}
                    onPress={handleSubmit}
                    isLoading={isLoading}
                  />
              </Container>
            }
            
        </Container>
    </ScreenWrapper>
  )
}
export default ResetPIN;
