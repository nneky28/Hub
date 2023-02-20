import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/Actions/Auth';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { getData, storeData } from '../../utills/Methods';
import { Images } from '../../component2/image/Image';
import styles from "./styles"

const Splash = () => {
  const auth = useSelector((state : any) => state.Auth);
  const dispatch = useDispatch();
  const loginMethod = async () => {
    let user = await getData("user")
    let about = await getData("about_me")
    await storeData("page", 1)
    setTimeout(async () => {
      try {
        if (user && about && about.completed_user_onboarding) {
          dispatch(login({ ...auth, about: about, isLogin: true, route: "auth_main" }));
          //dispatch(login({...auth,user : about,isLogin : true,route : "security"}));
        } else if (user && about && !about.completed_user_onboarding) {
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
        <Image source={{ uri: Images.LogoGIF }}
          style={styles.resize}
        />
      </View>
    </ScreenWrapper>
  );
}



export default Splash;
