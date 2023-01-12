import React, { useEffect } from 'react';
import {View, Text,Image,StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../Redux/Actions/Auth';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { getData, storeData } from '../../utills/Methods';
import { Images } from '../../component2/image/Image';
import { setSecurityVisible } from '../../Redux/Actions/Config';

const Splash = (props) => {
  const auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const loginMethod = async () => {
    let user = await getData("user")
    let about = await getData("about_me")
    await storeData("page",1)
    setTimeout(async () => {
      try{
        if(user && about && about.completed_user_onboarding){
          dispatch(setSecurityVisible(true))
          dispatch(login({...auth,user : user,isLogin : true,route : "main"}));
          //dispatch(login({...auth,user : about,isLogin : true,route : "security"}));
        }else if(user && about && !about.completed_user_onboarding){
          dispatch(login({...auth,user : about,isLogin : true,route : "onboard"}));
        }else{
          //I have a feeling there is another case that needs to be captured here.
          dispatch(login({...auth,route : "auth",isLogin : false}));
        }
      }catch(err){
      }
    }, 3000);
  };
  useEffect(()=>{
    loginMethod()
  },[])
  return (
    <ScreenWrapper statusBarColor={AppColors.white}>
      <View style={{
        display : 'flex',
        flex : 1,
        alignItems : "center",
        justifyContent : "center"
      }}>
        {/* <CustomText
            textSize={30}
            textWeight={'bold'}
            textcolor={'black'}
            displayText={'MyCoolOwo'}
            textStyle={{
              marginTop: -3,
            }}
        /> */}
         <Image source={{uri : Images.LogoGIF}} 
            style={style.resize}
          />
      </View>
    </ScreenWrapper>
  );
}

const style = StyleSheet.create({
  resize : {
    width: 300,
    height: 300,
  }
})

export default Splash;
