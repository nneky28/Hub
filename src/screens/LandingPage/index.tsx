import React, { useEffect, } from 'react';
import {View,BackHandler} from 'react-native';
import {login} from '../../Redux/Actions/Auth';
import AppColors from '../../utills/AppColors';
import { useFetchAboutMe } from '../../utills/api';
import { ToastSuccess,Capitalize, getStoredBusiness, useAppSelector, getStoredBusinessProps, useAppDispatch } from '../../utills/Methods';
import { Container, EmptyStateWrapper, H1, P, PageLoader } from '../../utills/components';
import { Images } from '../../component2/image/Image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import styles from "./style"
import ScreenWrapper from '../../components/ScreenWrapper';
import { useFetchAboutMeProps } from '../../components/TimeoffModal/types';
import { RootOnboardScreenProps } from '../../Routes/types';


export default function LandingPage(props : RootOnboardScreenProps) {
    const auth = useAppSelector((state) => state.Auth);
    const [biz,setBiz] = React.useState<getStoredBusinessProps>()
    const dispatch = useAppDispatch();

    const {
      data : about,
      isLoading
    } = useFetchAboutMe("main") as useFetchAboutMeProps

    const logoutMethod = async () => {
      try{
        let keys = await AsyncStorage.getAllKeys()
        AsyncStorage.multiRemove(keys);
        dispatch(login({...auth,route : "auth",isLogin : false}));
        ToastSuccess("Successfully logged out")
      }catch(err){
      }
    };

    const getRecord = async () => {
        try{
          let biz = await getStoredBusiness()
          if(!biz) return
          setBiz(biz)
        }catch(err){
          logoutMethod()
        }
    }

  const onPressHandler  = async ()=>{
    props.navigation.navigate("PersonalInfo")
  }

  useEffect(() => {
      getRecord()
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])


  return (
      <ScreenWrapper>
          {
            isLoading ? <PageLoader /> : (
                <View
                style={styles.main_container}
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
                    <Button
                      title={'Next'}
                      onPress={onPressHandler}
                      containerStyle={styles.button}
                    />
                  </Container> 
              </View>
            )
        }
      </ScreenWrapper>
  );
}
