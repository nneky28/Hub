import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image as NativeImage} from 'react-native';
import {View} from 'native-base';
import Image from '../image/Image';
import {observer} from 'mobx-react';
//import {StackActions, withNavigation} from 'react-navigation';
import DashboardIcon from '../../assets/images/bottomTab/dashboard.png';
import ModulesIcon from '../../assets/images/bottomTab/modules.png';
import NotificationIcon from '../../assets/images/bottomTab/notification.png';
import ProfileIcon from '../../assets/images/bottomTab/profile.png';

import {Dimensions} from 'react-native';
import CustomText from '../customText/CustomText';
import {Fragment} from 'react';
import { useNavigation } from '@react-navigation/core';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

//@observer
const CustomBottomTab = () => {
  const navigation = useNavigation()
  const [payload,setPayload] = React.useState({
    date: '2016-05-15',
    ActiveView: 'All',
    isModalVisible: false,
    isModalVaccinationChange: false,
    yaerView: 'Jan',
    ApprouteName: 'Dashboard',
  });

  const gotoPage = (route) => {
    // alert('pooppoo');
    navigation.navigate(route);
  };
  
  // componentDidMount = () => {
  //   this.setState({
  //     //ApprouteName: this.props.navigation.state.routeName,
  //   });
  // };

  // render() {
    const {ApprouteName} = payload;
    let currentHome = ApprouteName;
    let colorActive = '#717171';
    let coloDeActive = '#717171';

    // console.warn(userType + " who")
    return (
      <Fragment>
        <View style={styles.bottomTabWrap}>
          {/* <TouchableOpacity
            style={styles.bottomTabItem}
            onPress={() => this.gotoPage('MainDashboard')}>
            <View style={styles.IconBrace}>
              {currentHome === 'MainDashboard' ? (
                <View style={styles.ActiveTab}>
                  <NativeImage source={DashboardIcon} style={styles.BTI1} />
                </View>
              ) : (
                <NativeImage source={DashboardIcon} style={styles.BTI1} />
              )}
            </View>

            <CustomText
              textSize={11}
              textWeight={'600'}
              textcolor={
                currentHome === 'MainDashboard' ? colorActive : coloDeActive
              }
              displayText={'Dashboard'}
            />
          </TouchableOpacity>
       */}
          <TouchableOpacity
            style={styles.bottomTabItem}
            // onPress={() => {
            //   this.props.navigation.dispatch(StackActions.popToTop());
            // }}>
            onPress={() => gotoPage('Dashboard')}>
            {/* // onPress={() => this.gotoPage('Gallery')}> */}
            <View style={styles.IconBrace}>
              {currentHome === 'ModuleList' ? (
                <View style={styles.ActiveTab}>
                  <NativeImage source={ModulesIcon} style={styles.BTI2} />
                </View>
              ) : (
                <NativeImage source={ModulesIcon} style={styles.BTI2} />
              )}
            </View>

            <CustomText
              textSize={11}
              textWeight={'600'}
              textcolor={
                currentHome === 'ModuleList' ? colorActive : coloDeActive
              }
              displayText={'Modules'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTabItem}
            onPress={() => gotoPage('Notification')}>
            {/* onPress={() => this.gotoPage('Contribution')}> */}
            <View style={styles.IconBrace}>
              {currentHome === 'Notification' ? (
                <View style={styles.ActiveTab}>
                  <NativeImage source={NotificationIcon} style={styles.BTI3} />
                </View>
              ) : (
                <NativeImage source={NotificationIcon} style={styles.BTI3} />
              )}
            </View>
            <CustomText
              textSize={11}
              textWeight={'600'}
              textcolor={
                currentHome === 'Notification' ? colorActive : coloDeActive
              }
              displayText={'Notification'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTabItem}
            onPress={() => gotoPage('Profile')}>
            {/* // onPress={() => this.gotoPage('ChartRoom')}> */}
            <View style={styles.IconBrace}>
              {currentHome === 'Profile' ? (
                <View style={styles.ActiveTab}>
                  <NativeImage source={ProfileIcon} style={styles.BTI1} />
                </View>
              ) : (
                <NativeImage source={ProfileIcon} style={styles.BTI1} />
              )}
            </View>
            <CustomText
              textSize={11}
              textWeight={'600'}
              textcolor={currentHome === 'Profile' ? colorActive : coloDeActive}
              displayText={'Profile'}
            />
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  }
export default CustomBottomTab
//withNavigation(CustomBottomTab);

const styles = StyleSheet.create({
  // =================================== tab style ====================================
  bottomTabWrap: {
    width: deviceWidth,
    height: 52,
    backgroundColor: '#fff',
    // backgroundColor: '#7F171E',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 0,
    // borderTopWidth: 0.5,
    // borderTopColor: '#ccc',
    // borderWidth: 0.5,
    // elevation: 10,

    elevation: 6,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  ActiveTab: {
    // width: 43,
    // height: 43,
    // borderRadius: 43 / 2,
    // backgroundColor: '#fff',
    // borderColor: '#7F171E',
    // borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabItem: {
    width: '21%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor: "black"
  },
  IconBrace: {
    minHeight: 23,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BTI1: {
    width: 17.7,
    height: 18.8,
  },
  BTI2: {
    width: 18.31,
    height: 18.31,
  },
  BTI3: {
    width: 17.34,
    height: 18.8,
  },
  BTI4: {
    width: 14.4,
    height: 18.8,
  },
  // =================================== tab style ====================================
});
