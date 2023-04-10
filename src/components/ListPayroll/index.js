import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import { Images } from '../../utills/Image';
import styles from './styles';
import moment from "moment"

export default function ListPayroll({item}) {
  const [isvisible, setIsVisible] = useState(false);
  const navigation = useNavigation();
  return (  
    <TouchableOpacity
      style={styles.flatlistContainer}
      onPress={() => {
        return navigation.navigate("PayslipBreakDown",{payroll : item})
      }}>
      <Image
        source={{uri : Images.PayslipIcon2}}
        resizeMode="contain"
        style={styles.fileIcon}
      />
      <View style={styles.titleWrapper}>
        <View style={styles.titleandperiod}>
          {
            item?.pay_date ? <Text style={styles.Titletext}>
              Payslips for {moment(item.pay_date).format("MMM")}
            </Text> : null
          }
          {
            item?.period_start_date && item?.period_end_date ? <Text style={styles.Periodtext}>({moment(item?.period_start_date).format("MMM DD")} - {moment(item?.period_end_date).format("MMM DD")})</Text> : null
          }
          
        </View>
        <View style={styles.createddate}>
          <Text style={styles.dateText}>Date Created : </Text>
          <Text style={styles.dateText}>{item?.payschedule_created_at ? moment(item?.payschedule_created_at).format("DD MMM YYYY") : null}</Text>
        </View>
      </View>
      {/* <TouchableOpacity
        onPress={() => {
          setIsVisible(!isvisible);
        }}>
        <Image
          source={require('../../assets/images/dots.png')}
          resizeMode="contain"
          style={styles.dotIcon}
        />
      </TouchableOpacity> */}
      {isvisible && (
        <TouchableOpacity
          style={styles.downloadWrapper}
          onPress={() => {
            setIsVisible(!isvisible);
          }}>
          <Text style={styles.downloadText}>Download as CSV</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}
