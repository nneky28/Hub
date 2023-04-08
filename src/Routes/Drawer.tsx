import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Fragment} from 'react';
import AppColors, { ColorList } from '../utills/AppColors';
import {height, width} from 'react-native-dimension';
import {login} from '../Redux/Actions/Auth';
import {Images} from "../component2/image/Image"
import { FontFamily } from '../utills/FontFamily';
import { Capitalize, getStoredUser, ToastSuccess, useAppSelector } from '../utills/Methods';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, H1, ImageWrap, Rounded } from '../utills/components';
import { useMutation, useQueryClient } from 'react-query';
import { setSecurityVisible } from '../Redux/Actions/Config';
import { APIFunction } from '../utills/api';
import { StoredUserProps, UserMembershipProps } from './types';
import messaging from '@react-native-firebase/messaging';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const Drawer = (props : DrawerContentComponentProps) => {

  const dispatch = useDispatch();
  const queryClient = useQueryClient()
  const auth = useAppSelector((state)=>state.Auth);
  const [user,setUser] = React.useState<StoredUserProps>();
  const [bizs,setBiz] = React.useState<UserMembershipProps[]>();
  const {
    mutateAsync,
    isLoading
  } = useMutation(APIFunction.remove_device_token)

  const logoutMethod = async () => {
    try{
      let token = await messaging().getToken()
      let fd = {
        registration_id  : token
      }
      await mutateAsync(fd)
    }finally{
      let keys = await AsyncStorage.getAllKeys()
      let arr = [...keys]
      arr.splice(keys.indexOf(`@${user?.email?.replaceAll("_","")}`),1)
      await AsyncStorage.multiRemove(keys);
      props.navigation.closeDrawer();
      queryClient.invalidateQueries("")
      dispatch(setSecurityVisible(false))
      dispatch(login({...auth,onboard : false,url : null,route : "auth",isLogin : false}));
      ToastSuccess("Successfully logged out")
    }
  };


  const getUserDetails = async () => {
    let user = await getStoredUser();
    if(!user) return
    let biz = user?.employee_user_memberships &&
    Array.isArray(user?.employee_user_memberships) ? user.employee_user_memberships : [];
    setBiz(biz);
    setUser(user);
  }
  useEffect(()=>{
    getUserDetails();
  },[])
  const BusinessBox = ({item} : {item : UserMembershipProps}) => {
    return (
      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8}>
        <View style={styles.row}>
          {
            item && item.logo ? (
              <Image resizeMode="contain" source={{uri : item.logo}} style={styles.logo} />
            ) : (
              <Rounded  size={10} backgroundColor={ColorList[Math.floor(Math.random()*4)]}>
                  <H1>
                      {item && item.business_name && item.business_name.length > 0 ? Capitalize([...item.business_name][0]) : ""}
                  </H1>
              </Rounded>
            )
          }
          <View style={styles.margin}>
            <Text numberOfLines={1} style={styles.text1}>
              {item && item.business_name ? Capitalize(item.business_name) : "" }
            </Text>
            <Text numberOfLines={2} style={styles.text2}>
              {user && user.email ? user.email : ""}
            </Text>
          </View>
        </View>
        <Image resizeMode="contain" source={{uri : Images.ArrowRight}} style={styles.icon} />
      </TouchableOpacity>
    );
  };

  const RenderItem  = ({item} : {item : UserMembershipProps , index : number})=><BusinessBox item={item} />
  
  const ItemWithText = ({icon, text, onPress} : {icon : {uri : string}, text : string, onPress : () => void}) => {
    return (
      <TouchableOpacity
        style={styles.row1}
        onPress={onPress}
      >
        <Image source={icon} resizeMode="contain" style={styles.icon1} />
        <Text style={styles.text3}>{text}</Text>
      </TouchableOpacity>
    );
  };
  const keyExtractor = (item : UserMembershipProps,i : number) => `${item}${i}`.toString()

  return (
    <Fragment>
      {/* <Text style={styles.text}></Text> */}
      <Container
        marginTop={5}
      >
        <ImageWrap 
          url={Images.AppLogo}
          fit="contain"
        />
      </Container>
      <View style={styles.line} />
      <View style={{height: height(63)}}>
        <FlatList
          data={bizs ? bizs : []}
          extraData={bizs ? bizs : []}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.itemList}
          ItemSeparatorComponent={() => <View style={{marginTop: height(2)}} />}
          showsVerticalScrollIndicator={false}
          renderItem={RenderItem}
        />
      </View>
      <View style={[styles.line, {backgroundColor: AppColors.gray1}]} />
      <ItemWithText icon={{uri : Images.Settings}} text="Change Password" onPress={()=>{
          props.navigation.navigate("Settings")
        }}
      />
      {
        isLoading ? <Container alignSelf='center' marginTop={2}>
          <ActivityIndicator color={AppColors.green} />
        </Container> : <ItemWithText onPress={logoutMethod} icon={{uri : Images.Signout}} text="Sign Out" />
      }
    </Fragment>
  );
};
export default Drawer;
const styles = StyleSheet.create({
  text: {
    fontSize: width(4.5),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold,
    marginTop: height(5),
    marginLeft: '5%',
  },
  text1: {
    fontSize: width(4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansBold,
  },
  text2: {
    fontSize: width(2.9),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular,
  },
  text3: {
    fontSize: width(3.4),
    color: AppColors.black1,
    fontFamily: FontFamily.BlackSansRegular,
    marginLeft: '5%',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.gray,
    marginTop: height(2),
    elevation: 0,
  },
  itemContainer: {
    width: '100%',
    backgroundColor: AppColors.gray,
    paddingHorizontal: '5%',
    paddingVertical: height(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemList: {
    paddingVertical: height(2),
  },
  logo: {
    width: width(10),
    height: width(10),
    borderRadius: width(5),
  },
  icon: {
    width: width(3),
    height: width(3),
    tintColor: AppColors.black1,
  },
  icon1: {
    width: width(5),
    height: width(5),
    tintColor: AppColors.black1,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '5%',
    marginTop: height(3),
  },
  margin: {marginLeft: '7%', width: '65%'},
});
