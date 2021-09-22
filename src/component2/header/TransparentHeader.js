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
class TransparentHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin_userid: '',
      fullname: '',
      Myid: '',
      NotificationCount: 0,
    };
    this.__loadSearchPage = this.__loadSearchPage.bind(this);
  }

  componentDidMount() {
    // this.Getdetails();
  }
  __loadSearchPage = () => {
    this.props.navigation.navigate('SearchPage');
  };

  render() {
    const {NotificationCount} = this.state;
    const {icon2render} = this.props;
    let BgColor = this.props.HeaderBgColor || '#fff';
    let TextCOlor = this.props.textColor || '#333';
    let title = '';
    return (
      // <Header style={{backgroundColor:'#000',borderBottomColor:'#000',borderBottomWidth:2,fontSize:14,zIndex:10,position:'absolute',}}>
      <Header
        style={{
          backgroundColor: BgColor,
          // borderBottomColor: BgColor,
          // borderBottomColor: '#C8C8C8',
          borderBottomColor: 'transparent',
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
        <Left style={{maxWidth: 80, height: '80%'}}>
          {this.props.leftside == 'menu' ? (
            <Button
              transparent
              onPress={() => {
                this.props.navigation.toggleDrawer();
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
          ) : this.props.leftside == 'menu2' ? (
            <Button
              transparent
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}>
              <Image
                imageStyle={{width: 24, height: 24}}
                ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1618398328/mobile/fi_bar-chart-2_ry94ut.png"
              />
            </Button>
          ) : this.props.leftside == 'backWht' ? (
            <Button
              transparent
              // onPress={() => {
              //   this.props.navigation.goBack();
              // }}
              onPress={
                // this.props.handleBackClick == null
                // typeof this.props.handleBackClick === 'function'
                //   ? () => this.props.navigation.goBack()
                //   : this.props.handleBackClick
                // typeof this.props.handleBackClick === 'function'
                //   ? () => this.props.navigation.goBack()
                //   :
                this.props.handleBackClick
              }>
              <SvgUri
                width="20"
                height="10"
                source={{
                  uri:
                    'https://res.cloudinary.com/coolowo/image/upload/v1616034633/mobile/Group_131_aggwah.svg',
                }}
              />
            </Button>
          ) : this.props.leftside == 'backColor' ? (
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
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
          ) : this.props.leftside == 'empty' ? (
            <Fragment />
          ) : (
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                imageStyle={{width: 11.8, height: 11.8}}
                ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1619028606/mobile/Group_131_1_ywkpwo.png"
              />

              {/* <Ionicons name={icon2render ? icon2render:'md-arrow-back'}  size={20} color='#fff' /> */}
            </Button>
          )}
        </Left>
        <Body style={styles.headerBody_2}>
          <Title style={{color: TextCOlor, fontWeight: 'bold', fontSize: 20}}>
            {' '}
            {this.props.title || title}
          </Title>
        </Body>

        {this.props.ShowNotification === true ? (
          <Right style={{maxWidth: 80, height: '80%'}}>
            {this.props.right == 'skip' ? (
              <TouchableOpacity
                style={styles.continueBtn}
                onPress={() => {
                  this.props.navigation.navigate('Home');
                }}>
                <Text style={styles.text1}>Skip</Text>
              </TouchableOpacity>
            ) : this.props.right == 'menu2' ? (
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.toggleDrawer();
                }}>
                <Image
                  imageStyle={{width: 24, height: 24}}
                  ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1618398328/mobile/fi_bar-chart-2_ry94ut.png"
                />
              </Button>
            ) : this.props.right == 'notication' ? (
              <TouchableOpacity>
                <MaterialIcons
                  name="notifications"
                  style={{fontSize: 18, color: TextCOlor}}
                />
              </TouchableOpacity>
            ) : this.props.right == 'question' ? (
              <TouchableOpacity>
                <Image
                  imageStyle={{width: 30, height: 30}}
                  ImageUri="https://res.cloudinary.com/coolowo/image/upload/v1618438867/mobile/Question_keo22r.png"
                />
              </TouchableOpacity>
            ) : this.props.showboth === true ? (
              <React.Fragment>
                <TouchableOpacity onPress={this.props.handleEditClick}>
                  {/* <View style={{flex: 1, marginRight: 20}}> */}
                  <NativeImage
                    source={EditIcon}
                    style={{width: 13, height: 14, marginRight: 10}}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.handleDeleteClick}>
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
            ) : this.props.showdelete === true ? (
              <React.Fragment>
                <TouchableOpacity onPress={this.props.handleDeleteClick}>
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
}

export default TransparentHeader
//withNavigation(TransparentHeader);
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
    alignItems: 'center',
    // backgroundColor: 'red',
    flex: 1,
    textAlign: 'center',
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
