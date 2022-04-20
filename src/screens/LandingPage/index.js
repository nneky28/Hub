import React, { useEffect, useState } from 'react';
import {View, KeyboardAvoiText,StyleSheet,Dimensions,ScrollView, BackHandler,Image, Linking} from 'react-native';
//import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../Redux/Actions/Auth';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import {showMessage} from 'react-native-flash-message';
import {setLoaderVisible} from '../../Redux/Actions/Config';
import CustomText from '../../component2/customText/CustomText';
import CusInput from '../../component2/input/inputElement';
import CustomButton from '../../component2/button/Button';
//import Image from '../../component2/image/Image';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import { Field, Formik } from 'formik';
import CustomInput from '../../components/CustomInput';
import { APIFunction, employees_me, getAPIs, postNoToken } from '../../utills/api';
import { ToastError, ToastSuccess,storeData, getData, Capitalize, getStoredBusiness } from '../../utills/Methods';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import moment from 'moment';
import { Container, EmptyStateWrapper, H1, ImageWrap, OnboardModal, P, PageLoader, SizedBox } from '../../utills/components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BASE_URL } from '../../utills/Constants';
import { Images } from '../../component2/image/Image';


export default function LandingPage(props) {
    const auth = useSelector((state) => state.Auth);
    const [biz,setBiz] = React.useState(null)
    const [about,setAbout] = useState(null)
    const [kin,setKin] = useState(null)
    const [loading,setLoading] = useState(false);
    const [banking,setBanking] = useState(null);
    const [pension,setPension] = useState(null);
    const dispatch = useDispatch();
    const [emergency,setEmergency] = useState(null);
    const getRecord = async () => {
        try{
            setLoading(true)
            let about = await getData("about_me");
            let biz = await getStoredBusiness()
            let res = await APIFunction.next_of_kins(about.id);
            setKin(res);
            let emg_res = await APIFunction.emergency(about.id);
            let bank_res = await APIFunction.banks(about.id);
            let pen_res = await APIFunction.pension_providers(about.id);
            setBiz(biz)
            setEmergency(emg_res);
            setAbout(about);
            setPension(pen_res);
            setBanking(bank_res);
            setLoading(false)
            dispatch(setLoaderVisible(false))
        }catch(err){
          console.log("ERR",err)
        }
    }
  useEffect(() => {
      getRecord()
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])
  return (
      <ScrollView contentContainerStyle={styles.inner}>
        {
            loading ? <PageLoader /> : (
                <View
                style={{
                  flex : 1,
                  alignItems : 'center',
                  marginTop : "30%",
                  backgroundColor : AppColors.lightGreen
                }}
              >
                  <EmptyStateWrapper 
                    icon={Images.EmailSent}
                    backgroundColor={AppColors.lightGreen}
                  />
                  <Container backgroundColor={AppColors.lightGreen}
                      paddingLeft={3}
                      paddingRight={3}
                  >
                      <H1 fontSize={6}  textAlign="center">
                          Welcome, {`${about && about.first_name ? Capitalize(about.first_name) : ""}`}
                          {" "}
                          {`${about && about.last_name ? Capitalize(about.last_name) : ""}`}
                      </H1>
                 </Container>
                 <Container
                      backgroundColor={AppColors.lightGreen}
                      marginTop={2}
                 >
                      <P textAlign="center" fontSize={4.5} 
                          lineHeight={2.5}
                          color={AppColors.black1}
                      >You now have access to all your</P>
                      <P textAlign="center" fontSize={4.5} lineHeight={2.5} 
                          color={AppColors.black1}
                      >credentials with {biz && biz.business_name ? Capitalize(biz.business_name) : null} at your</P>
                      <P textAlign="center" fontSize={4.5} 
                          lineHeight={2.5}
                          color={AppColors.black1}
                      >fingertip.</P>
                 </Container>
                  <Container marginTop={15} width={90}>
                    <CustomButton
                      btnText={'Next'}
                      handelButtonPress={async ()=>{
                          await storeData("profile",{
                            banking,
                            about,
                            kin,
                            emergency,
                          });
                          props.navigation.navigate('PersonalInfo')
                        }}
                    />
                  </Container> 
              </View>
            )
        }
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  Container: {
    minHeight: deviceHeight,
    flex: 1,
    // paddingTop: 40,
    // marginTop: 40,
  },
  Image1Sty: {
    width : "100%",
    resizeMode: 'contain',
  },
  inner: {
    minHeight: deviceHeight,
    backgroundColor: AppColors.lightGreen
    // paddingTop: 40,
  },
  bodyWrap: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    paddingTop: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent : 'center'
    // marginTop: 40,
  },
  signUpWrap: {
    display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
    width: '100%',
    padding: 20,
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 65,
    alignItems: 'center',
  },
});
