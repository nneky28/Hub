import React, { useEffect } from 'react';
import {FlatList, View,TouchableOpacity, ScrollView} from 'react-native';
import ListPayroll from '../../components/ListPayroll';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useFetchPayrollHistory, useFetchPayrollYears } from '../../utills/api';
import styles from './styles';
import { Container, EmptyStateWrapper, H1, P, PageLoader } from '../../utills/components';
import { Images } from '../../utills/Image';
import { HomePageHeader } from '../../components/Headers/CustomHeader';
import { useFetchPayrollHistoryData, useFetchPayrollHistoryProps, useFetchPayrollYearsProps } from './types';

export default function PayslipHistory() {
  const [year,setYear] = React.useState<number>()
  const {
    data : history,
    isLoading : loading
  } = useFetchPayrollHistory(year || "") as useFetchPayrollHistoryProps

  const {
    data : years,
    isLoading : loadingYears
  } = useFetchPayrollYears() as useFetchPayrollYearsProps


  useEffect(()=>{
    if(!years || !Array.isArray(years)) return
    setYear(years?.[0])
  },[years])

  const renderItem = ({item} : {item : useFetchPayrollHistoryData}) => {
    return <ListPayroll item={item} />;
  };
  const KeyExtractor = (item : useFetchPayrollHistoryData, index : number) => `${item}${index}`.toString()
  const ListEmptyComponent = ()=><EmptyStateWrapper 
  icon={Images.EmptyPayslip}
  header_1={"You have no"}
  header_2={"generated payslip"}
  sub_text={"They will show up here when you do."}
/>


  return (
    <ScreenWrapper>
      <HomePageHeader 
        image={Images.payroll}
        header='Payslip History'
      />

      {
        loading || loadingYears ? <PageLoader /> : <React.Fragment>
            <Container width={90} alignSelf="center" marginTop={3}>
              {
                years && Array.isArray(years) ? <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
            </Container>
            <View style={styles.container}>
                <FlatList
                  data={history?.data && Array.isArray(history?.data) ? history?.data : []}
                  keyExtractor={KeyExtractor}
                  renderItem={renderItem}
                  removeClippedSubviews={true}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={ListEmptyComponent}
                />
            </View>
            </React.Fragment>
      }
    </ScreenWrapper>
  );
}
