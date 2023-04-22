import React, { useEffect } from 'react';
import { View, Image, Platform, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/Actions/Auth';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { getStoreAboutMe, storeData } from '../../utills/Methods';
import { Images } from '../../utills/Image';
import styles from "./styles"
import { setSecurityVisible } from '../../Redux/Actions/Config';
import { getBuildNumber } from 'react-native-device-info';
import { Container, H1, P, TouchableWrapper } from '../../utills/components';
import { ANDROID_STABLE_BUILD_NUMBER, APP_STORE_URL, IOS_STABLE_BUILD_NUMBER, PLAY_STORE_URL } from '../../utills/Constants';

const Splash = () => {
  const auth = useSelector((state : any) => state.Auth);
  const dispatch = useDispatch();
 
  const [force,setForce] = React.useState(false)
  

  const onPressHandler = () => {
    if(Platform.OS === "android") return Linking.openURL(PLAY_STORE_URL)
    Linking.openURL(APP_STORE_URL)
  }

  const loginMethod = async () => {
    let about = await getStoreAboutMe()
    await storeData("page", 1)
    setTimeout(async () => {
      try {
        let build_number = getBuildNumber()
        const stable_build_number = Platform.OS === "android" ? ANDROID_STABLE_BUILD_NUMBER : IOS_STABLE_BUILD_NUMBER
        if(Number(build_number) < Number(stable_build_number)){
          setForce(true)
        }else if (about && about.completed_user_onboarding) {
          dispatch(setSecurityVisible(true))
          dispatch(login({ ...auth, user: about, isLogin: true, route: "main" }));
        } else if (about && !about.completed_user_onboarding) {
          dispatch(login({ ...auth, user: about, isLogin: true, route: "onboard" }));
        } else {
          //I have a feeling there is another case that needs to be captured here.
          dispatch(login({ ...auth, route: "auth", isLogin: false }));
        }
      } catch (err) {
      }
    }, 3000);
  };
  useEffect(() => {
    loginMethod()
  }, [])

  return (
    <ScreenWrapper statusBarColor={AppColors.white}>
      <View style={{
        display: 'flex',
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}>
        {
          !force ? <Image source={{ uri: Images.LogoGIF }}
          style={styles.resize}
        /> : <Container
            style={styles.container}
          >
                <Container style={styles.content}>
                  <Image 
                    source={{uri : Images.AppLogo}}
                    style={styles.logo}
                  />
                  <H1 fontSize={6}>Myedge needs an update</H1>
                  <P fontSize={3.5} marginTop={3}>To use this app, download the latest Version</P>
                </Container>
                <TouchableWrapper style={styles.button}
                  onPress={onPressHandler}
                >
                  <H1 style={styles.buttonText}>Update</H1>
                </TouchableWrapper>
          </Container>
        }
      </View>
    </ScreenWrapper>
  );
}



export default Splash;
