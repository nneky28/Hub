/* eslint-disable react-native/no-inline-styles */
import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image as NativeImage,
} from 'react-native';
import {StatusBar} from 'react-native';
//import {withNavigation} from 'react-navigation';
import {Left, Right, Icon, Title} from 'native-base';
// import {loggedinUserdetails} from '../dependency/UtilityFunctions';
import {
  Container,
  Header,
  Content,
  Button,
  Thumbnail,
  Form,
  Item,
  Input,
  Label,
  Body,
  CheckBox,
  Badge,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SvgUri from 'react-native-svg-uri';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Image from '../../component/image/Image';
import DeleteIcon from '../../assets/images/profile/deleteN.png';
import EditIcon from '../../assets/images/profile/edit.png';
import { useNavigation } from '@react-navigation/core';
// import cccc from '../../assets/images/profile/'
// import axios from 'axios';
// import qs from 'qs';
const CustomizeHeader = (props) => {
  const navigation = useNavigation()
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loggedin_userid: '',
  //     fullname: '',
  //     Myid: '',
  //     NotificationCount: 0,
  //   };
  //   this.__loadSearchPage = this.__loadSearchPage.bind(this);
  // }

  // componentDidMount() {
  //   // this.Getdetails();
  // }
  const __loadSearchPage = () => {
    //navigation.navigate('SearchPage');
  };

    //const {NotificationCount} = this.state;
   // const {icon2render} = this.props;
    let BgColor = props.HeaderBgColor || '#fff';
    let TextCOlor = props.textColor || '#333';
    let title = '';
    return (
      // <Header style={{backgroundColor:'#000',borderBottomColor:'#000',borderBottomWidth:2,fontSize:14,zIndex:10,position:'absolute',}}>
      <Header
        style={{
          backgroundColor: BgColor,
          // borderBottomColor: BgColor,
          // borderBottomColor: '#C8C8C8',
          borderBottomColor: '#C8C8C8',
          borderBottomWidth: 0.5,
          fontSize: 11,
          width: '100%',
          elevation: 0,
        }}>
        <StatusBar
          backgroundColor="#000000"
          barStyle="light-content"
          animated={true}
          StatusBarAnimation="slide"
        />
        <Left
          style={{
            // maxWidth: 80,
            height: '80%',
            // backgroundColor: 'red',
            width: 10,
          }}>
          {props.leftside == 'menu' ? (
            <Button
              transparent
              onPress={() => {
                props.navigation.toggleDrawer();
              }}>
              <SvgUri
                width="20"
                height="20"
                source={{
                  uri:
                    'https://res.cloudinary.com/vaccinenudge/image/upload/v1594433600/vaccinenudge_mobile/filter_kmyg2a.svg',
                }}
              />
            </Button>
          ) : props.leftside == 'menu2' ? (
            <Button
              transparent
              onPress={() => {
                props.navigation.toggleDrawer();
              }}>
              <Image
                imageStyle={{width: 24, height: 24}}
                ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1618398328/mobile/fi_bar-chart-2_ry94ut.png"
              />
            </Button>
          ) : props.leftside == 'backWht' ? (
            <Button
              transparent
              onPress={() => {
                navigation.goBack();
              }}>
              <SvgUri
                width="16"
                height="16"
                source={{
                  uri:
                    'https://res.cloudinary.com/coolowo/image/upload/v1616034633/mobile/Group_131_aggwah.svg',
                }}
              />
            </Button>
          ) : props.leftside == 'backColor' ? (
            <Button
              transparent
              onPress={() => {
                navigation.goBack();
              }}>
              <SvgUri
                width="16"
                height="16"
                source={{
                  uri:
                    'https://res.cloudinary.com/coolowo/image/upload/v1618165968/mobile/arrow_back_24px_v0uk2r.svg',
                }}
              />
            </Button>
          ) : props.leftside == 'empty' ? (
            <Fragment />
          ) : (
            <Button
              transparent
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                imageStyle={{width: 11.8, height: 11.8}}
                ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1619028606/mobile/Group_131_1_ywkpwo.png"
              />

              {/* <Ionicons name={icon2render ? icon2render:'md-arrow-back'}  size={20} color='#fff' /> */}
            </Button>
          )}
          {/* <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: '#545454',
              marginLeft: 3,
            }}
            numberOfLines={1}>
            {'Welcome'}
          </Text> */}
        </Left>
        <Body style={styles.headerBody_2}>
          <Title style={{color: TextCOlor, fontWeight: 'bold', fontSize: 20}}>
            {' '}
            {props.title || title}
          </Title>
        </Body>

        {props.ShowNotification === true ? (
          <Right style={{maxWidth: 80, height: '80%'}}>
            {props.right == 'skip' ? (
              <TouchableOpacity
                style={styles.continueBtn}
                onPress={() => {
                  props.navigation.navigate('Home');
                }}>
                <Text style={styles.text1}>Skip</Text>
              </TouchableOpacity>
            ) : props.right == 'menu2' ? (
              <Button
                transparent
                onPress={() => {
                  props.navigation.toggleDrawer();
                }}>
                <Image
                  imageStyle={{width: 24, height: 24}}
                  ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1618398328/mobile/fi_bar-chart-2_ry94ut.png"
                />
              </Button>
            ) : props.right == 'notication' ? (
              <TouchableOpacity>
                <MaterialIcons
                  name="notifications"
                  style={{fontSize: 18, color: TextCOlor}}
                />
              </TouchableOpacity>
            ) : props.right == 'question' ? (
              <TouchableOpacity>
                <Image
                  imageStyle={{width: 30, height: 30}}
                  ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1618438867/mobile/Question_keo22r.png"
                />
              </TouchableOpacity>
            ) : props.showboth === true ? (
              <React.Fragment>
                <TouchableOpacity onPress={props.handleEditClick}>
                  {/* <View style={{flex: 1, marginRight: 20}}> */}
                  <NativeImage
                    source={EditIcon}
                    style={{width: 13, height: 14, marginRight: 20}}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={props.handleDeleteClick}>
                  {/* <Image
                    imageStyle={{
                      width: 17,
                      height: 19,
                      marginLeft: 3,
                      marginRight: 3,
                    }}
                    ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1619109196/mobile/Group_299_mqsvud.png"
                  /> */}
                  <NativeImage
                    source={DeleteIcon}
                    style={{width: 13, height: 16}}
                  />
                </TouchableOpacity>
              </React.Fragment>
            ) : props.showdelete === true ? (
              <React.Fragment>
                <TouchableOpacity onPress={props.handleDeleteClick}>
                  {/* <View style={{flex: 1, marginRight: 20}}> */}
                  {/* <Image
                    imageStyle={{
                      width: 17,
                      height: 19,
                      marginLeft: 3,
                      marginRight: 3,
                    }}
                    ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1619109196/mobile/Group_299_mqsvud.png"
                  /> */}
                  <NativeImage
                    source={DeleteIcon}
                    style={{width: 13, height: 16}}
                  />

                  {/* </View> */}
                </TouchableOpacity>
              </React.Fragment>
            ) : (
              <Fragment>
                {/* <Button transparent onPress={this.__loadSearchPage}>
                  <EvilIcons name="search" style={styles.iconsizeNcolour} />
                </Button>
                <Button transparent>
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    style={styles.iconsizeNcolour}
                  />
                </Button> */}
              </Fragment>
            )}
          </Right>
        ) : null}
      </Header>
    );
}

export default CustomizeHeader
//withNavigation(CustomizeHeader);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsizeNcolour: {
    fontSize: 20,
    color: '#fff',
  },
  text1: {
    fontSize: 14,
    color: '#717171',
  },
  headerBody: {
    ...Platform.select({
      ios: {
        marginLeft: -150,
      },
      android: {
        marginLeft: -8,
      },
    }),
    backgroundColor: 'red',
    flex: 1,
    textAlign: 'center',
  },
  headerBody_2: {
    // ...Platform.select({
    //   ios: {
    //     marginLeft: -80,
    //   },
    //   android: {
    //     marginLeft: -80,
    //   },
    // }),
    display: 'flex',
    // alignItems: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'green',
    // flex: 1,
    // textAlign: 'center',
  },
  // continueBtn: {
  //   backgroundColor: "#6ed48f",
  //   borderRadius: 5,
  //   elevation: 0,
  //   borderWidth: 1,
  //   borderColor: "#6ed48f",
  //   display: 'flex',
  //   alignItems: 'center',
  //   paddingTop: 8,
  //   paddingLeft: 15,
  //   paddingRight: 15,
  //   paddingBottom: 8,
  // },
  continueBtn: {
    // backgroundColor: "#001f90",
    backgroundColor: '#fff',
    elevation: 0,
    display: 'flex',
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    // marginTop: 20,
    borderWidth: 0,
    // width: "100%"
  },
});
