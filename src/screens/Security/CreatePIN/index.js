import React, {Component, useEffect} from 'react';
import {BackHandler, Image, Keyboard} from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import styles from './styles';
import { H1, P,Container, PageLoader} from '../../../utills/components';
import { useDispatch, useSelector } from 'react-redux';
import AppColors from '../../../utills/AppColors';
import { TouchableWrapper, UserPINComponent } from '../../../utills/components';
import { Images } from '../../../component2/image/Image';
import { ICON_BUTTON_SIZE } from '../../../utills/Constants';
import { getData, storeData } from '../../../utills/Methods';
import CryptoJS from 'crypto-js';
import { login } from '../../../Redux/Actions/Auth';
import { showFlashMessage } from '../../../components/SuccessFlash';
import MobilePIN from '../MobilePIN';
import { setLoaderVisible, setSecurityVisible } from '../../../Redux/Actions/Config';
import moment from "moment"
import { useIsFetching } from 'react-query';

const CreatePIN = ({onModeChangeHandler}) => {
  const auth = useSelector(state=>state.Auth)
  const dispatch = useDispatch()
  const [PIN,setPIN] = React.useState("")
  const [hasPIN,setHasPIN] = React.useState(false)
  const [original,setOriginal] = React.useState(null)
  const [holder,setHolder] = React.useState("")
  const [action,setAction] = React.useState("")
  const [error,setError] = React.useState("")
  const isFetching = useIsFetching()

  const getOLDPIN = async () => {
    try{
      dispatch(setLoaderVisible(false))
      let userInfo = await getData("about_me");
      let userPIN = await getData(userInfo.email.replaceAll("_",""))
      if(!userPIN){
        setAction("NoMobilePIN")
        return setHasPIN(false)
      }
      setHasPIN(true)
      var bytes  = CryptoJS.AES.decrypt(userPIN,userInfo.email.replaceAll("_",""));
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      setOriginal(originalText)
      setAction("HasMobilePIN")
    }catch(err){
    }
  }

  const onSkipHandler = () => {
    storeData("lastActiveMoment", moment().toISOString())
    dispatch(setSecurityVisible(false))
  }

  const validatePIN = async (text) => {
    try{
      if(hasPIN && (original !== text)){
        setHolder("")
        return setError("Wrong PIN :(")
      }
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
    }catch(err){
    }
  }

  useEffect(()=>{
    getOLDPIN()
  },[])

  useEffect(()=>{
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      ()=>{
        if(action === "create") setAction("NoMobilePIN")
        if(action === "confirm") setAction("create")
        return true
      }
    );

    return () => backHandler.remove();
  },[action])
  
  return (
    <ScreenWrapper>
        {
          action === "NoMobilePIN" && !isFetching ? <MobilePIN setAction={setAction} /> : 
          (action === "confirm" || action === "create" || action === "HasMobilePIN") && !isFetching ? (

            <Container 
              flex={1}>
              {
                !hasPIN ? <Container direction='row' 
                horizontalAlignment={!hasPIN ? "space-between" : 'flex-end'}
                verticalAlignment='center'
                width={90}
                alignSelf="center"
              >
                <TouchableWrapper 
                    onPress={()=>{
                      if(action === "create") setAction("NoMobilePIN")
                      if(action === "confirm") setAction("create")
                    }} 
                    size={ICON_BUTTON_SIZE}
                  >
                    <Image 
                      source={{uri : Images.BackArrow}}
                      style={styles.Image1Sty}
                    />
                  </TouchableWrapper>
                  {
                    !hasPIN ? <TouchableWrapper 
                      onPress={onSkipHandler} 
                      isText
                    >
                      <H1 color={AppColors.black1}>Skip</H1>
                    </TouchableWrapper> : null
                  }
                </Container> : null
              }
              <UserPINComponent hasPIN={hasPIN} validatePIN={validatePIN} action={action}
                setHolder={setHolder}
                holder={holder}
                auth={auth}
                error={error}
                setError={setError}
              />
              {
                hasPIN ? <Container horizontalAlignment='center' marginTop={3}>
                    <TouchableWrapper isText onPress={()=>onModeChangeHandler("RESET_PIN")} width={90}>
                      <P color={AppColors.green}>Forgot PIN?</P>
                    </TouchableWrapper>
                  </Container> : null
              }
          </Container>


          ) : isFetching ? <PageLoader /> : null
        }
    </ScreenWrapper>
  )
}
export default CreatePIN;
