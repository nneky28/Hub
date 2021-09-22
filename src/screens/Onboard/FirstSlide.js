import React from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';

import {
  StyleSheet,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CustomText from '../../component2/customText/CustomText';
import CustomButton from '../../component2/button/Button';
import Image from '../../component2/image/Image';
import {withTheme} from 'react-native-paper';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
const FirstSlide = (props) => {
  const {colors} = props.theme;
  const {navigation} = props;

  const blackC0lor = colors.fadeDarkColor;
  const primaryColor = colors.primaryButton;

  return (
    <View
      style={[
        {
          backgroundColor: '#fff',
          width: deviceWidth,
          height: deviceHeight,
          // minHeight: "100%",
          display: 'flex',
        },
      ]}>
      <ScrollView
        contentContainerStyle={[
          {
            backgroundColor: '#fff',
            width: '100%',
            flex: 1,
            // height: deviceHeight,
            // paddingTop: 10,
            paddingBottom: 54,
            paddingRight: 13.7,
            paddingLeft: 13.7,
          },
        ]}>
        <View style={styles.imageWrap}>
          <View style={styles.likeHeaderSTy}>
            <View></View>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <CustomText
                textSize={14}
                textWeight={'600'}
                textcolor={blackC0lor}
                displayText={'Skip'}
              />
            </TouchableOpacity> */}
          </View>
          <Image
            ImageUri={
              'https://res.cloudinary.com/coolowo/image/upload/v1626097672/Illustrations/onbording/all_in_one_platform_hraosg.png'
            }
            imageStyle={styles.Image1Sty}
          />
          <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
            <CustomText
              textSize={22}
              textWeight={'bold'}
              textcolor={primaryColor}
              displayText={'Your all in one platform'}
              textStyle={{marginTop: 10, color: '#2898A4'}}
            />

            <View style={{display: 'flex', alignItems: 'center'}}>
              <CustomText
                textSize={14}
                textWeight={'400'}
                textcolor={blackC0lor}
                displayText={'  The only platform you will ever'}
                textStyle={{
                  marginTop: 7,
                }}
              />
              <CustomText
                textSize={14}
                textWeight={'400'}
                textcolor={blackC0lor}
                displayText={'need to help run your business - '}
                // textStyle={{marginBottom: 10}}
              />
              <CustomText
                textSize={14}
                textWeight={'400'}
                textcolor={blackC0lor}
                displayText={' The future is simple! '}
                textStyle={{marginBottom: 10}}
              />
            </View>
          </View>

          <View
            style={{
              width: '100%',
              marginBottom: 10,
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <CustomButton
              btnText={'Sign In'}
              //handelButtonPress={() => console.log("---|||Testing")}
              //navigation.navigate('Login')
            />
            <CustomButton
              btnStyle={{
                ...styles.GeneralBtnSty2,
                ...{backgroundColor: colors.whiteColor},
              }}
              textStyle={{
                ...styles.GeneralTextSty2,
                ...{color: colors.primaryButton},
              }}
              btnText={'Get Started'}
              handelButtonPress={() => navigation.navigate("Login")}
            />
          </View>
          {/* <View style={{width: '100%', paddingLeft: 20, paddingRight: 20}}>
            
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  conatainer: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  imageWrap: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
  },
  likeHeaderSTy: {
    display: 'flex',
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Image1Sty: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    // ...StyleSheet.absoluteFillObject,

    // alignItems: 'center',
  },
  GeneralBtnSty2: {
    // backgroundColor: '#fff',
    borderRadius: 5,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 30,
    paddingLeft: 30,
    height: 40,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#396c54',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    textAlign: 'center',
    marginTop: 16,
  },
  GeneralTextSty2: {
    // color: '#2898A4',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default withTheme(FirstSlide);
