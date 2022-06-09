import React, { useEffect, useRef } from 'react';
import {FlatList, View,Image, TouchableOpacity, Text,ScrollView} from 'react-native';
import ListPayroll from '../../components/ListPayroll';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useFetchPayrollHistory, useFetchPayrollYears } from '../../utills/api';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { setLoaderVisible } from '../../Redux/Actions/Config';
import { BackHandler, Container, EmptyStateWrapper, H1, P } from '../../utills/components';
import { Images } from '../../component2/image/Image';
import ModalDropdown from 'react-native-modal-dropdown';
import CommonStyles from '../../utills/CommonStyles';
import { height, width } from 'react-native-dimension';
//import { PayrollHistoryList } from '../../utills/dummydata';

export default function PayslipHistory({tab_name}) {
  const dispatch = useDispatch()
  const [year,setYear] = React.useState("")
  const {
    data : history,
    isLoading : loading
  } = useFetchPayrollHistory(year)

  const {
    data : years,
    isLoading : loadingYears
  } = useFetchPayrollYears()


  useEffect(()=>{
    if(!years || !Array.isArray(years)) return
    setYear(years?.[0])
  },[years])

  useEffect(()=>{
    dispatch(setLoaderVisible(loading))
  },[loading])

  const renderItem = ({item}) => {
    return <ListPayroll item={item} screen={tab_name} />;
  };
  const dropdown1 = useRef(null);
  return (
    <ScreenWrapper>
      <View style={styles.header}>
          <BackHandler />
          <Text numberOfLines={1} style={styles.screenTitle}>
            Payslip History
          </Text>
      </View>
      <View style={styles.line} />
      <View style={styles.container}>
            {
              years && Array.isArray(years) ? <ScrollView horizontal>
                  {
                    years.map((item,i)=><TouchableOpacity  onPress={() => setYear(item)}
                      key={i}
                    >
                      <Container width={15} padding={2} marginRight={1}>
                        {
                          year === item ?  <H1 textAlign="center">{item}</H1> :  <P textAlign="center">{item}</P>
                        }
                      </Container>
                    </TouchableOpacity>)
                  }
              </ScrollView> : null
            }

            <Container marginTop={3} width={90}>
              <FlatList
                data={history?.data && Array.isArray(history?.data) ? history?.data : []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={()=>{
                  return tab_name === 'history' ? <EmptyStateWrapper 
                  icon={Images.EmptyPayslip}
                  header_1={"You have no"}
                  header_2={"payroll history"}
                  sub_text={"They will show up here when you do."}
                /> :  <EmptyStateWrapper 
                icon={Images.EmptyPayslip}
                header_1={"You have no"}
                header_2={"generated payslip"}
                sub_text={"They will show up here when you do."}
              />}
                }
              />
            </Container>
      </View>
    </ScreenWrapper>
  );
}
