import React, { useEffect } from 'react';
import {View, ScrollView, Text} from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import CustomCard from '../../components/CustomCard';
import { useFetchPayslipInfo} from '../../utills/api';
import { useDispatch } from 'react-redux';
import { setLoaderVisible } from '../../Redux/Actions/Config';
import numeral from 'numeral';
import moment from "moment"
import { Capitalize } from '../../utills/Methods';
import { BackHandler, Container, H1 ,P} from '../../utills/components';
import { height, width } from 'react-native-dimension';
export default function PayslipBreakDown({route,navigation}) {
  const dispatch = useDispatch()
  const {payroll} = route.params

  const {
    data : payslip,
    isLoading : loading
  } = useFetchPayslipInfo(payroll?.period_start_date,payroll?.id)
  useEffect(()=>{
   dispatch(setLoaderVisible(loading))
  },[loading])

  const basic_salary = payslip?.data?.salary_breakdown && Array.isArray(payslip?.data?.salary_breakdown) ? 
  payslip?.data?.salary_breakdown.filter(item=>item.name === "Basic salary")?.[0]?.value : 0

  return (
    <ScreenWrapper>
      <View style={styles.container}>
      <View style={styles.header}>
          <BackHandler />
          <H1 textAlign="center" marginLeft={20}>Payslip Breakdown</H1>
      </View>
      <View style={styles.line} />
        <ScrollView showsVerticalScrollIndicator={false}>
        <Container backgroundColor={AppColors.lightestBlue}
            paddingTop={5}
            paddingBottom={5}
        >
            <Container backgroundColor="transparent" width={94} alignSelf="center">
              <P style={{marginBottom : height(0.5)}}>Designation</P>
              <H1 fontSize={3.5}>{payslip?.data?.job?.title ? Capitalize(payslip?.data?.job?.title) : null}</H1>
            </Container>
            <Container 
              direction='row'
              backgroundColor="transparent"
              width={94}
              alignSelf="center"
              horizontalAlignment="space-between"
              marginTop={2.5}
            >
                {
                  [
                    {
                      title : "Date of Joining",
                      value : payslip?.data?.employee?.hire_date ? moment(payslip?.data?.employee.hire_date).format("DD MMMM, YYYY") : null
                    },
                    {
                      title : "Pay Date",
                      value : payslip?.pay_date ? moment(payslip?.pay_date).format("DD MMMM, YYYY") : null
                    },
                    {
                      title : "A/C Number",
                      value : "N/A"
                    }
                  ].map((item,i)=><Container key={i} 
                    backgroundColor="transparent"
                    width={28}
                  >
                        <P style={{marginBottom : height(0.5)}}>{item.title}</P>
                        <H1 fontSize={3.5} marginTop={1}>{item.value}</H1>
                  </Container>)
                }
            </Container>
            <Container marginTop={2.5} backgroundColor="transparent" width={94} alignSelf="center">
              <P style={{marginBottom : height(0.5)}}>Pay Period</P>
              <H1 fontSize={3.5}>{payslip?.period_start_date ? moment(payslip?.period_start_date).format("DD MMM, YYYY") : ""} -  {payslip?.period_end_date ? moment(payslip?.period_end_date).format("DD MMM, YYYY") : ""}</H1>
            </Container>
            {/* <Container marginTop={2.5}>
              <P>UAN Number</P>
              <H1 fontSize={3.5}>17773900078Y08</H1>
            </Container> */}
        </Container>
        {
          [
            {
              title : "Earnings (N)",
              menus : [
                {sub_title : "Basic",sub_value : numeral(basic_salary).format("0,0.00")},
                {sub_title : "Commission",sub_value : payslip?.data?.commission ? numeral(payslip?.data?.commission).format("0,0.00") : "0.00"},
                {sub_title : "Bonus",sub_value : payslip?.data?.bonus ? numeral(payslip?.data?.bonus).format("0,0.00") : "0.00"},
                ...payslip?.data?.salary_breakdown && Array.isArray(payslip?.data?.salary_breakdown) ? 
                payslip?.data?.salary_breakdown.filter(item=>item.name !== "Basic salary").map(item=>{
                  return{sub_title : item.name ? Capitalize(item.name) : "",sub_value : numeral(item.value).format("0,0.00")}
                }) : []
              ]
            },
            // {
            //   title : "Allowances (N)",
            //   menus : payslip?.data?.salary_breakdown && Array.isArray(payslip?.data?.salary_breakdown) ? 
            //     payslip?.data?.salary_breakdown.filter(item=>item.name !== "Basic salary").map(item=>{
            //       return{sub_title : item.name ? Capitalize(item.name) : "",sub_value : numeral(item.value).format("0,0.00")}
            //     }) : []
            // },
            {
              title : "Deductions (N)",
              menus : [
                {sub_title : "Staff Loan",sub_value : payslip?.data?.staff_loan ? numeral(payslip.data.staff_loan).format("0,0.00") : "0.00"},
                {sub_title : "Income Tax",sub_value : payslip?.data?.paye ? numeral(payslip.data.paye).format("0,0.00") : 0},
                {sub_title : "Others",sub_value : payslip?.data?.other_deductions ? numeral(payslip?.data?.other_deductions).format("0,0.00") : "0.00"}
              ]
            }
          ].map((item,index)=><Container key={index} marginTop={2.5} horizontalAlignment="center">
              <Container width={94} marginBottom={1.5} 
                style={{
                  alignSelf : "center"
                }}
              ><H1>{item.title}</H1></Container>
              <CustomCard Cardcontainer={{alignItems : "center",width : width(94)}}>
                  {
                    item.menus.map((menu,i)=><Container key={i} direction="row"
                      style={{
                        justifyContent : "space-between",
                        alignItems : "center"
                      }}
                      paddingHorizontal={3}
                      height={height(5)}
                      width={85}
                      borderBottomWidth={i < (item.menus.length - 1) ? 1 : 0}
                      borderColor={AppColors.grayBorder}
                    >
                        <H1 color={AppColors.black3} fontSize={3.5}>{menu.sub_title}</H1>
                        <H1 color={AppColors.black3} fontSize={3.5}>{menu.sub_value}</H1>
                    </Container>)
                  }
              </CustomCard>
              <Container alignSelf="center" width={94}
                direction="row"
                paddingTop={2}
                paddingLeft={5}
                paddingRight={5}
                paddingBottom={2}
                horizontalAlignment="space-between"
                marginTop={2}
                backgroundColor={AppColors.gray1}
              >
                <H1 fontSize={3.5}>{item.title === "Earnings (N)" ? "Gross" : "Total Deductions"}</H1>
                {
                  item.title === "Earnings (N)" ? <H1 fontSize={3.5}>{payslip?.data?.gross_salary ? numeral(payslip?.data?.gross_salary).format("0,0.00") : "0.00"}</H1> : <H1 fontSize={3.5}>{payslip?.data?.total_deductions ? numeral(payslip?.data?.total_deductions).format("0,0.00") : "0.00"}</H1>
                }
              </Container>
            </Container>)
        }
        
          <Container  marginTop={2.5} 
            borderTopWidth={1} 
            borderColor={AppColors.grayBorder}
            horizontalAlignment='center'
            width={94}
            height={height(10)}
            style={{
              alignSelf : "center",
              justifyContent : "center"
            }}
          >
              <P textAlign="center"
                style={{
                  marginBottom : height(2)
                }}
              >Net Pay (Gross Pay - Total Deductions)</P>
              <H1 marginTop={2} textAlign="center">{payslip?.data?.gross_salary ? numeral(payslip?.data?.gross_salary).format("0,0.00") : "0.00"} - {payslip?.data?.total_deductions ? numeral(payslip?.data?.total_deductions).format("0,0.00") : "0.00"}</H1>
          </Container>
          <Container direction='row' horizontalAlignment='space-between' width={94} 
            backgroundColor={AppColors.lightestBlue}
            style={{
              borderRadius : width(2),
              paddingLeft : width(5),
              paddingRight : width(5),
              paddingTop : height(3),
              paddingBottom : height(3),
              alignSelf : "center",
              justifyContent : "space-between"
            }}
          >
              <H1 fontSize={3.5} color={AppColors.black1}>Total Net Payable</H1>
              <H1>N{payslip?.data?.net_salary ? numeral(payslip?.data?.net_salary).format("0,0.00") : "0.00"}</H1>
          </Container>
          <Container marginTop={2.5}>
            {
              [
                {
                  item1 : "Year to Date",
                  item2 : "Amount (N)",
                  is_menu: true
                },
                {
                  item1 : "Total Deduction",
                  item2 : payslip?.data?.total_deductions ? numeral(payslip?.data?.total_deductions).format("0,0.00") : "0.00"
                },
                {
                  item1 : "Total Gross Pay",
                  item2 : payslip?.data?.gross_salary ? numeral(payslip?.data?.gross_salary).format("0,0.00") : "0.00"
                }
              ].map((tab,i)=><Container key={i} direction='row' 
                style={{
                  justifyContent : "space-between",
                  alignSelf : "center",
                  marginBottom : height(2)
                }}
                width={94} 
              >
                <H1 fontSize={3.5} color={tab.is_menu ? AppColors.black : AppColors.black3}>{tab.item1}</H1>
                <H1 fontSize={3.5} color={tab.is_menu ? AppColors.black : AppColors.black3}>{tab.item2}</H1>
            </Container>)
            }
          </Container>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
