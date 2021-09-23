import React, { useEffect } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { width } from 'react-native-dimension';
import { rightIcon, twoMenIcon } from '../../assets/images';
import { APIFunction, getAPIs } from '../../utills/api';
import CommonStyles from '../../utills/CommonStyles';
import { getData } from '../../utills/Methods';
import Button from '../Button';
import styles from './styles';

const BenifitList = ({data, horizontal}) => {
  const getBenefits = async () => {
    try{
      setLoading(true);
      let token = await getData("token");
      let user =  await getData("user");
      let about_me = await getData("about_me")
      let biz_id = user.employee_user_memberships &&
      Array.isArray(user.employee_user_memberships) && user.employee_user_memberships[0]
      && user.employee_user_memberships[0].business_id ? user.employee_user_memberships[0].business_id : null;
      let benefits_url = APIFunction.benefits(biz_id,about_me.id);
      let benefits_res = await getAPIs(benefits_url,token);
      console.log("benefits_res",benefits_res)
      setLoading(false);
    }catch(err){
      console.log("err|||",err)
      ToastError("Something went wrong. Please retry")
    }

  }
  useEffect(()=>{
    //getBenefits()
  },[])
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={horizontal ? styles.margin : CommonStyles.marginTop_2} />}
      keyExtractor={(i) => String(Math.random())}
      contentContainerStyle={styles.flatList}
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled={true}
      horizontal={horizontal}
      renderItem={({item}) => {
        return (
          <View style={[styles.container, {backgroundColor: item}, !horizontal && {width: width(90)}]}>
            <View style={[styles.row, styles.between]}>
              <View>
                <View style={styles.row}>
                  <Text style={styles.text}>Reliance Premium </Text>
                  <Image
                    resizeMode="contain"
                    source={rightIcon}
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.text1}>Reliance HMO</Text>
              </View>
              <Button
                title="Visit Website"
                textStyle={styles.buttonText}
                containerStyle={styles.button}
              />
            </View>
            <View style={styles.line} />
            <View style={[styles.row, styles.between, styles.margin1]}>
              <View>
                <Text style={styles.ttext1}>Category</Text>
                <Text style={styles.ttext}>Health Benefit</Text>
              </View>
              <View style={styles.row}>
                <Image
                  resizeMode="contain"
                  source={twoMenIcon}
                  style={[styles.icon, styles.margin2]}
                />
                <Text style={styles.text1}>5 Dependents</Text>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};

export default BenifitList;
