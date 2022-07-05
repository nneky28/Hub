import React, { useEffect} from 'react';
import {BackHandler, Image, Keyboard} from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import styles from './styles';
import { H1, P,Container } from '../../../utills/components';
import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import AppColors from '../../../utills/AppColors';
import { TouchableWrapper, UserPINComponent } from '../../../utills/components';
import { Images } from '../../../component2/image/Image';
import { ICON_BUTTON_SIZE } from '../../../utills/Constants';
import CommonStyles from '../../../utills/CommonStyles';
import { showFlashMessage } from '../../../components/SuccessFlash';
import { Field, Formik } from 'formik';
import CustomInput from '../../../components/CustomInput';
import { useMutation } from 'react-query';
import { APIFunction } from '../../../utills/api';
import { setLoaderVisible } from '../../../Redux/Actions/Config';
import { getData, storeData } from '../../../utills/Methods';
import CryptoJS from 'crypto-js';
import { login } from '../../../Redux/Actions/Auth';

const ResetPIN = (props) => {
  const auth = useSelector((state)=>state.Auth)
  const [password,setPassword] = React.useState("")
  const loginFunction = useMutation((load)=>APIFunction.login(load))
  const dispatch = useDispatch()
  const [PIN,setPIN] = React.useState("")
  const [hasPIN,setHasPIN] = React.useState(false)
  const [holder,setHolder] = React.useState("")
  const [action,setAction] = React.useState("reset")

  const handleSubmit = async () => {
    try{
      if(!password || password.trim() === "") return showFlashMessage({type : "error",title : "Please enter a password"})
      dispatch(setLoaderVisible(true))
      const fd = {
        email : auth.business_email,
        password
      }
      await loginFunction.mutateAsync(fd)
      storeData(auth.business_email.toLowerCase().replaceAll("_",""),null)
      dispatch(setLoaderVisible(false))
      setAction("create")
    }catch(err){
      dispatch(setLoaderVisible(false))
      showFlashMessage({type : "error",title : err.msg})
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
        return showFlashMessage({title : "Please confirm that your PIN matches",type : "error"})
      }
      if(!hasPIN && action === "confirm"){
        let userInfo = await getData("userInfo");
        let ciphertext = CryptoJS.AES.encrypt(text,userInfo.email.replaceAll("_","")).toString();
        storeData(userInfo.email.replaceAll("_",""),ciphertext)
      }
      dispatch(login({...auth,route : "main"}))
    }catch(err){
    }
  }

  useEffect(()=>{
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      ()=>{
        if(action === "reset")  props.navigation.goBack()
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
          >
              <TouchableWrapper 
                onPress={()=>{
                  if(action === "reset") return props.navigation.goBack()
                  if(action === "create") return setAction("reset")
                  if(action === "confirm") return setAction("create")
                }} 
                size={ICON_BUTTON_SIZE}
              >
                <Image 
                  source={{uri : Images.BackArrow}}
                  style={styles.Image1Sty}
                />
              </TouchableWrapper>
            </Container>
            {
              action !== "reset" ? <UserPINComponent hasPIN={hasPIN} validatePIN={validatePIN} action={action}
                  setHolder={setHolder}
                  auth={auth}
                  holder={holder}
                /> : <Container
                marginTop={4}
                width={90}
                alignSelf="center"
              >
                <H1 fontSize={6} color={AppColors.black1}>Reset Pin</H1>
                <P color={AppColors.black1} style={CommonStyles.marginTop_1}>Reset your pin by entering your password</P>
  
                <Formik>
                  <React.Fragment>
                    <Field 
                      placeholder="Password"
                      name="password"
                      value={password}
                      component={CustomInput}
                      secureTextEntry={true}
                      onChangeData={(text)=>setPassword(text)}
                    />
                  </React.Fragment>
                </Formik>
                <Button
                    title={'Reset PIN'}
                    containerStyle={styles.btnContainer}
                    textStyle={styles.greenButtonText}
                    onPress={handleSubmit}
                  />
              </Container>
            }
            
        </Container>
    </ScreenWrapper>
  )
}
export default ResetPIN;
