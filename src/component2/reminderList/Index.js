/* eslint-disable react-native/no-inline-styles */

import React, {Component} from 'react';
import {Text, StyleSheet, Dimensions} from 'react-native';
import UserAvatar from 'react-native-user-avatar';

import {observer} from 'mobx-react';
import {ReturnFirstChar} from '../../dependency/UtilityFunctions';
import {TouchableRipple, withTheme} from 'react-native-paper';
import CustomText from '../customText/CustomText';
import {View} from 'react-native-animatable';
import CustomAvatar from '../imageAvatar/Avatar';
let deviceHeight = Dimensions.get('window').height;

const ReminderListIndex = (props) => {
  // let UpcaseName = ReturnFirstChar(name);
  let vehicle_make = props.data.vehicle_make;
  let vehicle_model = props.data.vehicle_model;
  let VehicleName = `${vehicle_make.name} ${vehicle_model.name} `;
  let vehicledetails = props.data.vehicledetails;
  let UpcaseName = ReturnFirstChar(VehicleName);
  const {theme} = props;
  return (
    <TouchableRipple style={[styles.listTouchNewSty, theme.BoxStyle]}>
      <View>
        <View
          style={[
            styles.listViewNewSty,
            {
              alignItems: 'flex-start',
              borderBottomWidth: 0.5,
              borderBottomColor: '#ccc',
              paddingBottom: 10,
              marginBottom: 10,
            },
          ]}>
          <View>
            <CustomText
              textSize={12}
              textWeight={'bold'}
              textcolor={'#2898A4'}
              displayText={props.data.description}
              // textStyle={{
              //   marginTop: 18,
              // }}
            />
            <CustomText
              textSize={10}
              textWeight={'normal'}
              textcolor={'#FF3132'}
              // displayText={`Due in ${props.data.reminder_days_display}`}
              displayText={` ${props.data.due_in}`}
              textStyle={{
                marginTop: 3,
              }}
            />
          </View>
          {/* <View>
      <CustomText
          textSize={11}
          textWeight={'900'}
          textcolor={'#A8A8A8'}
          displayText={`Registered ${props.data.service_date}`}
          // textStyle={{
          //   marginLeft: 8,
          // }}
        />
      </View> */}
          <TouchableRipple
            rippleColor="#fff"
            underlayColor="#fff"
            style={styles.btnWrap}>
            <CustomText
              textSize={10}
              textWeight={'normal'}
              textcolor={'#2898A4'}
              displayText={'Renew'}
            />
          </TouchableRipple>
        </View>
        <View style={styles.listViewNewSty}>
          <View style={styles.flexRowSty}>
            <View style={[styles.ImageHolder, {marginRight: 15}]}>
              {/* <Image
              ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1618416698/mobile/Vector_3_lyvxle.png"
              imageStyle={{width: 18, height: 12}}
            /> */}
              {/* <UserAvatar size={40} name={UpcaseName} /> */}
              <CustomAvatar name={UpcaseName} />
            </View>
            <View>
              <CustomText
                textSize={12}
                textWeight={'bold'}
                textcolor={'#737373'}
                displayText={VehicleName}
                textStyle={
                  {
                    //   marginTop: 10,
                  }
                }
              />
              <CustomText
                textSize={11}
                textWeight={'normal'}
                textcolor={'#737373'}
                displayText={vehicledetails.plate_no}
                textStyle={
                  {
                    //   marginTop: 10,
                  }
                }
              />
            </View>
          </View>
          <View>
            <CustomText
              textSize={10}
              textWeight={'bold'}
              textcolor={'#747474'}
              displayText={'Registered'}
              textStyle={
                {
                  //   marginTop: 10,
                }
              }
            />
            <CustomText
              textSize={10}
              textWeight={'normal'}
              textcolor={'#747474'}
              displayText={props.data.service_date}
              textStyle={
                {
                  //   marginTop: 10,
                }
              }
            />
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  Container: {
    // height: deviceHeight - 30,
    flex: 1,
  },
  Image1Sty: {
    width: 160.97,
    height: 102,
    marginTop: -30,
    marginBottom: 20,
  },
  inner: {
    minHeight: deviceHeight,
    backgroundColor: '#eee',
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  listTouchNewSty: {
    display: 'flex',
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 10,
    elevation: 1,
    borderRadius: 6,
  },
  listViewNewSty: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  bodyWrap: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    paddingTop: 30,
    display: 'flex',
    alignItems: 'center',
  },
  tabView: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#ccc',
    borderBottomColor: '#ccc',
    padding: 20,
    paddingBottom: 0,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  tabItems: {
    flex: 1,
    // flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIndicator: {
    width: '100%',
    height: 5,
    backgroundColor: '#2898A4',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  signUpWrap: {
    display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
    width: '100%',
    padding: 20,
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 65,
    alignItems: 'center',
  },
  quickActionBtnWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
    marginBottom: 25,
    alignItems: 'center',
  },
  btnWrap: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: '#fff',
    //  height: 18,
    borderRadius: 2,
    borderColor: '#2898A4',
    borderWidth: 1,
  },
  quickActionBtn: {
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'center',
    width: 100,
    height: 77,
    backgroundColor: '#E0EEF0',
    alignItems: 'center',
    borderRadius: 5,
  },
  linearGradient: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  minCard: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
  },
  flexRowSty: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowSty2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    // paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  ImageHolder: {
    width: 38,
    height: 38,
    borderRadius: 38 / 2,
    backgroundColor: '#DFDFDF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartBoxSty: {
    width: '50%',
    minWidth: '20%',
    minHeight: '50%',
    height: '50%',
    // backgroundColor: 'red',
    backgroundColor: '#FAFAFA',
    display: 'flex',
    borderWidth: 0.558411,
    borderColor: '#ECECEC',
    padding: 10,
    justifyContent: 'center',
    // alignItems:'center'
  },
  colorIdn: {
    width: 11.28,
    height: 11.28,
    borderRadius: 2,
    backgroundColor: '#FF7372',
  },
  flexRowSty2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    // paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  ImageHolder2: {
    width: 38,
    height: 38,
    borderRadius: 38 / 2,
    backgroundColor: '#2898A4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // =============================   modal Style ==============================================
  ModalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    paddingBottom: 0,
  },
});

export default withTheme(ReminderListIndex);
