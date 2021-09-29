import React, { useEffect } from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../Redux/Actions/Auth';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import {showMessage} from 'react-native-flash-message';
import {setLoaderVisible} from '../../Redux/Actions/Config';
import { getData } from '../../utills/Methods';

const Splash = (props) => {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const loginMethod = async () => {
    //dispatch(setLoaderVisible(true));
    let user = await getData("user") 
    console.log("Splash---",user)
    setTimeout(() => {
      if(user){
        dispatch(login({userName: user}));
      }else{
        props.navigation.navigate("Onboard");
      }
    }, 1500);
  };
  useEffect(()=>{
    loginMethod()
  },[])
  return (
    <ScreenWrapper statusBarColor={AppColors.white}>
      <View style={styles.mainViewContainer}>
          {/* <Image src={} /> */}
      </View>
    </ScreenWrapper>
  );
}

export default Splash;
