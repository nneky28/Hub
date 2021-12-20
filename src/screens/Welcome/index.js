import React, { useEffect } from 'react';
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
import { employees_me, getAPIs, postNoToken } from '../../utills/api';
import { ToastError, ToastSuccess,storeData } from '../../utills/Methods';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import moment from 'moment';
import { Container, EmptyStateWrapper, H1, ImageWrap, OnboardModal, SizedBox } from '../../utills/components';
import Feather from "react-native-vector-icons/Feather"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BASE_URL } from '../../utills/Constants';
import { Images } from '../../component2/image/Image';


export default function Welcome(props) {
  const defaultColor = "black";
  const blackColor = "black";
  const [data,setData] = React.useState({
    email  : "",
    password  : ""
  })
  const auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if(auth && auth.user && auth.user.email){
      setData({...data,email : auth.user.email})
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])
  return (
      <ScrollView contentContainerStyle={styles.inner}>
        <View
          style={{
            flex : 1,
            alignItems : 'center',
            marginTop : "30%",
            backgroundColor : AppColors.welcome_green
          }}
        >
           <Container 
            backgroundColor={AppColors.welcome_green}
            paddingLeft={5}
            paddingRight={5}
            style={{
              justifyContent : "center",
              alignItems : "center"
            }}
           >
              <H1 fontSize={8} color={AppColors.green}
                textAlign="center"
              >An employee</H1>
              <H1 fontSize={8} color={AppColors.green}
                textAlign="center"
              >Self-service app</H1>
              <Container width={80}
                backgroundColor={AppColors.welcome_green}
              >
                <H1 fontSize={5} color={AppColors.welcomePink} textAlign="center"
                >to manage all your information and more.</H1>
              </Container>
           </Container>
            <EmptyStateWrapper 
              marginTop={2}
              icon={Images.Welcome}
              height={35}
              backgroundColor={AppColors.welcome_green}
            />
            <Container marginTop={3} width={90}>
              <CustomButton
                btnText={'Sign In'}
                handelButtonPress={()=>props.navigation.navigate("Login")}
              />
              <SizedBox size={3}  backgroundColor={AppColors.welcome_green} />
              <TouchableOpacity
                style={{
                  backgroundColor : AppColors.welcome_green
                }}
                onPress={()=>{
                  Linking.openURL(`${BASE_URL}mobile-app-redirect`)
                }}
              >
                <Container
                  backgroundColor={AppColors.welcome_green}
                  style={{
                    flexDirection : "row",
                    alignItems : "center",
                    justifyContent : "center"
                  }}
                >
                    <H1 fontSize={3.5} textAlign="center" color={AppColors.black2}>Invited to myedge?</H1>
                    <H1 fontSize={3.5} textAlign="center" color={AppColors.black2}
                      underline={"underline"}
                      lineColor={AppColors.black}
                    >Accept Invitation</H1>
                </Container>
              </TouchableOpacity>
            </Container> 
        </View>
        {
          auth.onboard ? <OnboardModal visible={auth.onboard} url={auth.url}/> : null
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
    backgroundColor: AppColors.welcome_green
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
