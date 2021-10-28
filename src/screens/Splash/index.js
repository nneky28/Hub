import React, { useEffect } from 'react';
import {View, Text,Image,StyleSheet} from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../Redux/Actions/Auth';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import {showMessage} from 'react-native-flash-message';
import {setLoaderVisible} from '../../Redux/Actions/Config';
import { getData } from '../../utills/Methods';
import CustomText from '../../component2/customText/CustomText';
import { Container } from '../../utills/components';
import { height, width } from 'react-native-dimension';

const Splash = (props) => {
  const auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const loginMethod = async () => {
    //dispatch(setLoaderVisible(true));
    let user = await getData("user") 
    setTimeout(() => {
      if(user){
        dispatch(login({...auth,user : user,isLogin : true,route : "main"}));
      }else{
       props.navigation.navigate("Onboard");
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
          <Image source={require('../../assets/images/icons/loader.gif')} 
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
