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
import BarBlack from '../../assets/images/profile/barBlack.png';
import HelpIcon from '../../assets/images/profile/help.png';
import CloseIcon from '../../assets/images/profile/close.png';
import {getLodgedInDetailsProfile} from '../../dependency/UtilityFunctions';
import { useNavigation } from '@react-navigation/core';

// import axios from 'axios';
// import qs from 'qs';
// class CustomizeHeader extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       loggedin_userid: '',
//       fullname: '',
//       Myid: '',
//       NotificationCount: 0,
//       displayName: '',
//     };
//     this.__loadSearchPage = this.__loadSearchPage.bind(this);
//   }

//   async componentDidMount() {
//     let LoginProfile = await getLodgedInDetailsProfile();
//     this.setState({
//       displayName: LoginProfile.firstName,
//     });
//   }
//   __loadSearchPage = () => {
//     props.navigation.navigate('SearchPage');
//   };

//   render() {
//     const {NotificationCount} = this.state;
//     const {icon2render} = this.props;
//     let BgColor = this.props.HeaderBgColor || '#fff';
//     let TextCOlor = this.props.textColor || '#333';

//     let bbW = this.props.setBBW || 1;
//     console.warn(bbW);
//     let title = '';
//     return (
//       // <Header style={{backgroundColor:'#000',borderBottomColor:'#000',borderBottomWidth:2,fontSize:14,zIndex:10,position:'absolute',}}>
//       <Header
//         style={{
//           backgroundColor: BgColor,
//           borderBottomColor: '#F2F2F2',
//           borderBottomWidth: bbW,
//           fontSize: 11,
//           width: '100%',
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           height: 50,
//           elevation: 6,
//           // marginBottom: 10,
//         }}>
//         <StatusBar
//           backgroundColor="#000000"
//           barStyle="light-content"
//           animated={true}
//           StatusBarAnimation="slide"
//         />
//         <Left style={styles.leftSty}>
//           {this.props.leftside == 'menu' ? (
//             <Button
//               transparent
//               onPress={() => {
//                 this.props.navigation.toggleDrawer();
//               }}>
//               <SvgUri
//                 width="20"
//                 height="20"
//                 source={{
//                   uri:
//                     'https://res.cloudinary.com/vaccinenudge/image/upload/v1594433600/vaccinenudge_mobile/filter_kmyg2a.svg',
//                 }}
//               />
//             </Button>
//           ) : this.props.leftside == 'menu2' ? (
//             <Button
//               transparent
//               onPress={() => {
//                 this.props.navigation.toggleDrawer();
//               }}>
//               <Image
//                 imageStyle={{width: 24, height: 24}}
//                 ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1618398328/mobile/fi_bar-chart-2_ry94ut.png"
//               />
//             </Button>
//           ) : this.props.leftside == 'userPin' ? (
//             <TouchableOpacity
//               transparent
//               onPress={() => {
//                 this.props.navigation.toggleDrawer();
//               }}
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}>
//               <Image
//                 imageStyle={{width: 26, height: 26, borderRadius: 26 / 2}}
//                 ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1615824556/samples/bike.jpg"
//               />
//               {/* <Text
//                 style={{
//                   fontSize: 12,
//                   fontWeight: 'bold',
//                   color: '#545454',
//                   marginLeft: 3,
//                 }}
//                 numberOfLines={1}>
//                 {this.state.displayName || 'Welcome'}
//               </Text> */}
//             </TouchableOpacity>
//           ) : this.props.leftside == 'blackBar' ? (
//             <Button
//               transparent
//               onPress={() => {
//                 this.props.navigation.toggleDrawer();
//               }}>
//               <NativeImage style={{width: 24, height: 24}} source={BarBlack} />
//             </Button>
//           ) : this.props.leftside == 'blackClose' ? (
//             <Button
//               transparent
//               onPress={
//                 this.props.closeHandler
//                   ? this.props.closeHandler
//                   : () => {
//                       this.props.navigation.goBack();
//                     }
//               }>
//               <NativeImage style={{width: 24, height: 24}} source={CloseIcon} />
//             </Button>
//           ) : this.props.leftside == 'backWht' ? (
//             <Button
//               transparent
//               onPress={() => {
//                 this.props.navigation.goBack();
//               }}>
//               <SvgUri
//                 width="20"
//                 height="10"
//                 source={{
//                   uri:
//                     'https://res.cloudinary.com/coolowo/image/upload/v1616034633/mobile/Group_131_aggwah.svg',
//                 }}
//               />
//             </Button>
//           ) : this.props.leftside == 'backColor' ? (
//             <Button
//               transparent
//               onPress={() => {
//                 this.props.navigation.goBack();
//               }}>
//               <SvgUri
//                 width="16"
//                 height="16"
//                 source={{
//                   uri:
//                     'https://res.cloudinary.com/coolowo/image/upload/v1618165968/mobile/arrow_back_24px_v0uk2r.svg',
//                 }}
//               />
//             </Button>
//           ) : this.props.leftside == 'backBlack' ? (
//             <Button
//               transparent
//               onPress={() => {
//                 this.props.navigation.goBack();
//               }}>
//               <Image
//                 imageStyle={{width: 20, height: 14}}
//                 ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1623517667/mobile/Vector_r3zixa.png"
//               />
//             </Button>
//           ) : this.props.leftside == 'BackSearch' ? (
//             <Button transparent onPress={this.props.closeHandler}>
//               <SvgUri
//                 width="16"
//                 height="16"
//                 source={{
//                   uri:
//                     'https://res.cloudinary.com/coolowo/image/upload/v1618165968/mobile/arrow_back_24px_v0uk2r.svg',
//                 }}
//               />
//             </Button>
//           ) : this.props.leftside == 'empty' ? (
//             <Fragment />
//           ) : (
//             <Button
//               transparent
//               onPress={() => {
//                 this.props.navigation.goBack();
//               }}>
//               <SvgUri
//                 width="20"
//                 height="10"
//                 source={{
//                   uri:
//                     'https://res.cloudinary.com/vaccinenudge/image/upload/v1594433599/vaccinenudge_mobile/arrbackBlc_jacci9.svg',
//                 }}
//               />
//             </Button>
//           )}
//         </Left>

//         <Body style={[styles.headerBody]}>
//           <View>
//             <Title style={{color: TextCOlor, fontWeight: 'bold', fontSize: 18}}>
//               {' '}
//               {this.props.title || title}
//             </Title>
//           </View>
//         </Body>
//         {this.props.ShowNotification === true ? (
//           <Right style={styles.rightSty}>
//             {this.props.right == 'skip' ? (
//               <TouchableOpacity
//                 style={styles.continueBtn}
//                 onPress={() => {
//                   this.props.navigation.navigate('Home');
//                 }}>
//                 <Text style={styles.text1}>Skip</Text>
//               </TouchableOpacity>
//             ) : this.props.right == 'menu2' ? (
//               <Button
//                 transparent
//                 onPress={() => {
//                   this.props.navigation.toggleDrawer();
//                 }}>
//                 <Image
//                   imageStyle={{width: 24, height: 24}}
//                   ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1618398328/mobile/fi_bar-chart-2_ry94ut.png"
//                 />
//               </Button>
//             ) : this.props.right == 'menuBar' ? (
//               <Button
//                 transparent
//                 onPress={() => {
//                   this.props.navigation.toggleDrawer();
//                 }}>
//                 <Image
//                   imageStyle={{width: 21, height: 16}}
//                   ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1624939705/mobile/bar2_ucoezo.png"
//                 />
//               </Button>
//             ) : this.props.right == 'notication' ? (
//               <TouchableOpacity>
//                 <MaterialIcons
//                   name="notifications"
//                   style={{fontSize: 18, color: TextCOlor}}
//                 />
//               </TouchableOpacity>
//             ) : this.props.right == 'question' ? (
//               <TouchableOpacity>
//                 <Image
//                   imageStyle={{width: 30, height: 30}}
//                   ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1618438867/mobile/Question_keo22r.png"
//                 />
//               </TouchableOpacity>
//             ) : this.props.right == 'help' ? (
//               <TouchableOpacity>
//                 <NativeImage
//                   style={{width: 20, height: 20}}
//                   source={HelpIcon}
//                 />
//               </TouchableOpacity>
//             ) : this.props.right == 'empty' ? (
//               <Fragment />
//             ) : (
//               <Fragment>
//                 <Button transparent onPress={this.__loadSearchPage}>
//                   <EvilIcons name="search" style={styles.iconsizeNcolour} />
//                 </Button>
//                 <Button transparent>
//                   <MaterialCommunityIcons
//                     name="dots-vertical"
//                     style={styles.iconsizeNcolour}
//                   />
//                 </Button>
//               </Fragment>
//             )}
//           </Right>
//         ) : null}
//       </Header>
//     );
//   }
// }


const CustomizeHeader  = (props) => {
  const navigation = useNavigation()
  // constructor(props) {
  //   super(props);
  //    state = {
  //     loggedin_userid: '',
  //     fullname: '',
  //     Myid: '',
  //     NotificationCount: 0,
  //   };
  //    __loadSearchPage =  __loadSearchPage.bind(this);
  // }

  // componentDidMount() {
  //   //  Getdetails();
  // }
  const __loadSearchPage = () => {
    navigation.navigate('SearchPage');
  };

  // const {NotificationCount} =  state;
  // const {icon2render} =  props;
  let BgColor = props && props.HeaderBgColor  ? props.HeaderBgColor : '#fff';
  let TextCOlor = props && props.textColor ? props.textColor : '#333';
  let title = 'Happy Reading...';
  return(
    <Header
    style={{
      backgroundColor: BgColor,
      borderBottomColor: BgColor,
      borderBottomWidth: 0,
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
    <Left>
      {
      props && props.leftside && props.leftside == 'menu' ? (
        <Button
          transparent
          onPress={() => {
            navigation.toggleDrawer();
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
      ) : 
      props && props.leftside && props.leftside == 'menu2' ? (
        <Button
          transparent
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <Image
            imageStyle={{width: 24, height: 24}}
            ImageUri= 'https://res.cloudinary.com/coolowo/image/upload/v1618398328/mobile/fi_bar-chart-2_ry94ut.png'
          />
        </Button>
      ) : props.leftside == 'userPin' ? (
                    <TouchableOpacity
                      transparent
                      onPress={() => {
                        props.navigation.toggleDrawer();
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        imageStyle={{width: 26, height: 26, borderRadius: 26 / 2}}
                        ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1615824556/samples/bike.jpg"
                      />
                      {/* <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 'bold',
                          color: '#545454',
                          marginLeft: 3,
                        }}
                        numberOfLines={1}>
                        {this.state.displayName || 'Welcome'}
                      </Text> */}
                    </TouchableOpacity>
                  ) : 
        props.leftside == 'blackBar' ? (
                    <Button
                      transparent
                      onPress={() => {
                        props.navigation.toggleDrawer();
                      }}>
                      <NativeImage style={{width: 24, height: 24}} source={BarBlack} />
                    </Button>
                  ) : props.leftside == 'blackClose' ? (
                    <Button
                      transparent
                      onPress={
                        props.closeHandler
                          ? props.closeHandler
                          : () => {
                              navigation.goBack();
                            }
                      }>
                      <NativeImage style={{width: 24, height: 24}} source={CloseIcon} />
                    </Button>
                  ) : 
      props && props.leftside && props.leftside == 'backWht' ? (
        <Button
          transparent
          onPress={() => {
            navigation.goBack();
          }}>
          <SvgUri
            width="20"
            height="10"
            source={{
              uri:
                'https://res.cloudinary.com/coolowo/image/upload/v1616034633/mobile/Group_131_aggwah.svg',
            }}
          />
        </Button>
      ) : props && props.leftside && props.leftside == 'backColor' ? (
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
      ) : props.leftside == 'backBlack' ? (
                    <Button
                      transparent
                      onPress={() => {
                        navigation.goBack();
                      }}>
                      <Image
                        imageStyle={{width: 20, height: 14}}
                        ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1623517667/mobile/Vector_r3zixa.png"
                      />
                    </Button>
                  ) : props.leftside == 'BackSearch' ? (
                    <Button transparent onPress={
                      props.closeHandler
                        ? props.closeHandler
                        : () => {
                            navigation.goBack();
                          }
                    }>
                      <SvgUri
                        width="16"
                        height="16"
                        source={{
                          uri:
                            'https://res.cloudinary.com/coolowo/image/upload/v1618165968/mobile/arrow_back_24px_v0uk2r.svg',
                        }}
                      />
                    </Button>
                  ) : props && props.leftside && props.leftside == 'empty' ? (
        <Fragment />
      ) : (
        <Button
          transparent
          onPress={() => {
            navigation.goBack();
          }}>
          <SvgUri
            width="20"
            height="10"
            source={{
              uri:
                'https://res.cloudinary.com/vaccinenudge/image/upload/v1594433599/vaccinenudge_mobile/arrbackBlc_jacci9.svg',
            }}
          />

          {/* <Ionicons name={icon2render ? icon2render:'md-arrow-back'}  size={20} color='#fff' /> */}
        </Button>
      )}
    </Left>
    <Body
      style={
        props.ShowNotification
          ? styles.headerBody
          : styles.headerBody_2
      }>
      <Title style={{color: TextCOlor, fontWeight: 'bold', fontSize: 20}}>
        {' '}
        { props.title || title}
      </Title>
    </Body>

    {props.ShowNotification === true ? (
          <Right style={styles.rightSty}>
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
            ) : props.right == 'menuBar' ? (
              <Button
                transparent
                onPress={() => {
                  props.navigation.toggleDrawer();
                }}>
                <Image
                  imageStyle={{width: 21, height: 16}}
                  ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1624939705/mobile/bar2_ucoezo.png"
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
            ) : props.right == 'help' ? (
              <TouchableOpacity>
                <NativeImage
                  style={{width: 20, height: 20}}
                  source={HelpIcon}
                />
              </TouchableOpacity>
            ) : props.right == 'empty' ? (
              <Fragment />
            ) : (
              <Fragment>
                <Button transparent onPress={this.__loadSearchPage}>
                  <EvilIcons name="search" style={styles.iconsizeNcolour} />
                </Button>
                <Button transparent>
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    style={styles.iconsizeNcolour}
                  />
                </Button>
              </Fragment>
            )}
          </Right>
        ) : null}
  </Header>
  )
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
  rightSty: {
    maxWidth: '30%',
  },
  leftSty: {
    maxWidth: '30%',
  },

  headerBody: {
    // textAlign: 'center',
    // flex: 1,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'green',
    // display: 'flex',
    // alignItems: 'flex-start',
    alignItems: 'center',
    // alignItems: 'flex-end',
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
