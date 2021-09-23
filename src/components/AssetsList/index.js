import React, { useEffect } from 'react';
import {Image, FlatList, Text, TouchableOpacity, View} from 'react-native';
import Button from '../Button';
import AppColors from '../../utills/AppColors';
import {checkIcon, unCheckIcon, placeholderIcon4} from '../../assets/images';
import styles from './styles';
import { getData } from '../../utills/Methods';
import { APIFunction, getAPIs } from '../../utills/api';

const AssetsList = ({data}) => {
  const getAssets = async () => {
    try{
      setLoading(true);
      let token = await getData("token");
      let user =  await getData("user");
      let about_me = await getData("about_me")
      let biz_id = user.employee_user_memberships &&
      Array.isArray(user.employee_user_memberships) && user.employee_user_memberships[0]
      && user.employee_user_memberships[0].business_id ? user.employee_user_memberships[0].business_id : null;
      let assets_url = APIFunction.my_business_assests(biz_id,about_me.id);
      let asset_res = await getAPIs(assets_url,token);
      console.log("res>>",asset_res);
      setLoading(false);
    }catch(err){
      console.log("err|||",err)
      ToastError("Something went wrong. Please retry")
    }

  }
  useEffect(()=>{
    //getAssets()
  },[])
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={styles.margin} />}
      keyExtractor={(i) => String(Math.random())}
      contentContainerStyle={styles.flatList}
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled={true}
      horizontal={true}
      renderItem={({item}) => {
        return (
          <View style={styles.container}>
            <Image source={placeholderIcon4} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.text}>Apple MacBook Pro 2017</Text>
              <Text style={styles.text1}>Apple Touch Bar</Text>
              <Button
                title="Report"
                textStyle={styles.buttonText}
                containerStyle={styles.button}
              />
            </View>
          </View>
        );
      }}
    />
  );
};

export default AssetsList;
