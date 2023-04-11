import { useFocusEffect } from '@react-navigation/core';
import moment from 'moment';
import numeral from 'numeral';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, LayoutAnimation, Platform, ScrollView, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { downIcon, leftIcon, settingIcon } from '../../assets/images';
import { Images } from '../../utills/Image';
import Button from '../../components/Button';
import ContactModal from '../../components/ContactModal';
import ScreenWrapper from '../../components/ScreenWrapper';
import { scrollToPosition } from '../../Redux/Actions/Config';
import { APIFunction, getAPIs, useFetchBanking, useFetchEmergency, useFetchKin } from '../../utills/api';
import { ColorList } from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import { BackHandler, Container, CustomRefreshControl, H1, ProfileLoader, Rounded } from '../../utills/components';
import { profileData } from '../../utills/data/profileData';
import { Capitalize, getData, storeData, ToastError } from '../../utills/Methods';
import styles from './styles';


if (Platform.OS === 'android') {
    if(UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

export default function Profile({navigation}) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [about,setAbout] = useState(null)
    const [banking,setBanking] = useState(null);
    const scrollRef = useRef(null);
    const scrollPosition = useSelector(state => state.Config.scrollPosition);
    const [cords,setCords] = React.useState([])
    const queryClient = useQueryClient()
    const [loading,setLoading] = React.useState(false)

    useEffect(()=>{
      if(!scrollRef?.current?.scrollTo) return
      scrollRef?.current?.scrollTo({x:scrollPosition.x, y:scrollPosition.y, animated : true})
    },[scrollPosition])

    useEffect(() => {
      return dispatch(scrollToPosition({x: 0, y: 0}))
    }, []);

    const refreshHandler = async () => {
        setLoading(true)
        queryClient.invalidateQueries("next_of_kins")
        queryClient.invalidateQueries("emergency")
        queryClient.invalidateQueries("banks")
        let res = await APIFunction.about_me()  
        await storeData("about_me",res)
        setLoading(false)
        getUserData()
    } 

    const TopBottomText = ({topText, bottomText, containerStyle}) => {
      return(
      <View style={[{justifyContent: 'flex-start'},containerStyle]}>
        <Text style={styles.insideText1}>{topText}</Text>
        <Text style={styles.insideText2}>{bottomText}</Text>
      </View>
      )
    }
    const {
      data : kinsData,
      isLoading : loadingKin
    } = useFetchKin(about?.id)

    const {
      data : emergData,
      isLoading : loadingEmergency
    } = useFetchEmergency(about?.id)

    const {
      data : bankData,
      isLoading : loadingBank
    } = useFetchBanking()


    useFocusEffect(useCallback(()=>{
      getUserData()
    },[]))

    useEffect(()=>{
      getProfile("kin")
    },[loadingKin])

    useEffect(()=>{
      getProfile("emergency")
    },[loadingEmergency])

    useEffect(()=>{
      getProfile("banking")
    },[loadingBank])

    const getUserData = async () => {
      let about = await getData("about_me")
      setAbout(about)
    }

    const getProfile = async (type) => {
      try{
        if(type === "banking" && bankData) setBanking(bankData);
      }catch(err){
       let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : "Something went wrong. Please retry"
       ToastError(msg)
      }
    }

    const RenderList = ({item, index}) => {
        const handleClick = (index) => {
          if (selectedIndex == index) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            setSelectedIndex(-1);
            dispatch(scrollToPosition(cords[index]))
          } else {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            setSelectedIndex(index);
            dispatch(scrollToPosition(cords[index]))
          }
        };

        let isExpanded = false;
        if (index == selectedIndex)
          isExpanded = true;

        
        const {data} = item;
        return (
          <View style={styles.profileListContainer} 
            onLayout={(event)=>{
              const layout = event.nativeEvent.layout;
              cords[index] = layout
              setCords(cords);
            }}
          >
            <TouchableOpacity onPress={() => handleClick(index)} 
            style={[styles.row]}
            >
                <View style={CommonStyles.rowAlignItemCenter}>
                    <Image resizeMode="contain" source={item.iconLeft} style={styles.leftIcon} />
                    <Text style={[styles.listCompTitle, CommonStyles.marginLeft_2]}>{item.title}</Text>
                </View>
                <Image
                resizeMode={'contain'}
                source={downIcon}
                style={[styles.downIcon]}
                />
            </TouchableOpacity>
            {isExpanded && 
                <>
                <View style={[styles.line, CommonStyles.marginTop_2]} />
                {item.title.includes('Person') &&
                  <View style={CommonStyles.marginBottom_3}>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_2]}>
                      <TopBottomText topText={data[0]} bottomText={`${about && about.address && about.address.country_display ? 
                        Capitalize(about.address.country_display):  ""}`}/>
                      <TopBottomText topText={data[2]} bottomText={`${about && about.gender_display ? Capitalize(about.gender_display):  ""}`}/>
                      <TopBottomText topText={data[4]} bottomText={`${about && about.marital_status ? Capitalize(about.marital_status) :  ""}`}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[6]} bottomText={`${about && about.birth_date ? moment(about.birth_date).format("DD MMM YYYY") :  ""}`}/>
                    </View>
                  </View> 
                }
                {item.title.includes('Job') &&
                  <View style={CommonStyles.marginBottom_3}>
                  <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_2]}>
                    <TopBottomText topText={data[0]} bottomText={about && about.hire_date ? moment(about.hire_date).format("DD,MMM YYYY") : ""} containerStyle={styles.halfWidthContainer}/>
                    <TopBottomText topText={data[2]} bottomText={about && about.type_display ? Capitalize(about.type_display) : ""} containerStyle={styles.halfWidthContainer}/>
                  </View>
                  <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4 ]}>
                    <TopBottomText topText={data[4]} bottomText={about && about.job && about.job.title ? Capitalize(about.job.title) : ""} containerStyle={styles.halfWidthContainer}/>
                    {/* <TopBottomText topText={data[6]} bottomText={data[7]} containerStyle={styles.halfWidthContainer}/> */}
                  </View>
                  <View style={styles.line}/>
                  <Text style={styles.subHeading}>Compensation</Text>
                  <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_1]}>
                    <TextWithButton topText={data[8]} bottomText={about && about.compensation && about.compensation.amount ? numeral(about.compensation.amount).format("0,0.00") : ""} onPressHandle={() => navigation.navigate('Compensation')}/>
                  </View>
                  
                </View> 
                }

                { item.title.includes('Kin') ? 
                  <View style={CommonStyles.marginBottom_3}>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_2]}>
                      <TopBottomText topText={data[0]} 
                      bottomText={kinsData && kinsData.first_name ? Capitalize(kinsData.first_name) : null} 
                      containerStyle={styles.halfWidthContainer}/>
                      <TopBottomText topText={data[2]} bottomText={kinsData && kinsData.last_name ? Capitalize(kinsData.last_name) : null} containerStyle={styles.halfWidthContainer}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[4]} bottomText={kinsData && kinsData.relationship ? Capitalize(kinsData.relationship) : null} containerStyle={styles.halfWidthContainer}/>
                      <TopBottomText topText={data[6]} bottomText={kinsData && kinsData.phone_number ? kinsData.phone_number : null} containerStyle={styles.halfWidthContainer}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[8]} bottomText={kinsData && kinsData.address1 ? kinsData.address1 : null}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[10]} bottomText={kinsData && kinsData.email ? kinsData.email : null}/>
                    </View>
                  
                  </View> : null
                }

                { item.title.includes('Emergency') ? 
                  <View style={CommonStyles.marginBottom_3}>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_2]}>
                      <TopBottomText topText={data[0]} 
                      bottomText={emergData && emergData.first_name ? Capitalize(emergData.first_name) : null} 
                      containerStyle={styles.halfWidthContainer}/>
                      <TopBottomText topText={data[2]} bottomText={emergData && emergData.last_name ? Capitalize(emergData.last_name) : null} containerStyle={styles.halfWidthContainer}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[4]} bottomText={emergData && emergData.relationship ? Capitalize(emergData.relationship) : null} containerStyle={styles.halfWidthContainer}/>
                      <TopBottomText topText={data[6]} bottomText={emergData && emergData.phone_number ? emergData.phone_number : null} containerStyle={styles.halfWidthContainer}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[8]} bottomText={emergData && emergData.address1 ? emergData.address1 : null}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[10]} bottomText={emergData && emergData.email ? emergData.email : null}/>
                    </View>
                  
                  </View> : null
                }

                {item.title.includes('Bank') &&

                  <View style={[CommonStyles.marginTop_2, CommonStyles.marginBottom_3]}>
                    <TopBottomText topText={data[0]} bottomText={
                      about && about.bank_account && about.bank_account.bank && about.bank_account.bank.name ? Capitalize(about.bank_account.bank.name) : null
                    }/>
                    <TopBottomText topText={data[2]} bottomText={
                      about && about.bank_account && about.bank_account.account_number ? about.bank_account.account_number : null
                    } containerStyle={{marginTop: height(2)}}/>
                    <View style={styles.line}/>
                    <Text style={styles.subHeading}>Pension</Text>
                    <TopBottomText topText={data[4]} bottomText={
                      about && about.pension && about.pension.provider && about.pension.provider.name ? 
                      Capitalize(about.pension.provider.name) : null
                    } containerStyle={{marginTop: height(2)}}/>
                    <TopBottomText topText={data[6]} bottomText={
                      about && about.pension && about.pension.pension_number ? 
                      Capitalize(about.pension.pension_number) : null
                    } containerStyle={{marginTop: height(2)}}/>
                  </View>
                }
                </>
                }
          </View>
        );
      };

    const TextWithButton = ({topText, bottomText, onPressHandle}) => {
      return (
        <View style={styles.smallerContainer}>
          <View>
            <Text style={styles.insideText4}>{topText}</Text>
            <Text style={styles.insideText3}>{bottomText}</Text>
          </View>
          {/* <TouchableOpacity 
          style={styles.saveBtnStyle} 
          onPress={onPressHandle}
          >
            <Text style={styles.saveBtnText}>View History</Text>
          </TouchableOpacity> */}
        </View>
      );
    }


    return (
        <ScreenWrapper allowScrollToPosition={true}>
            <View style={styles.header}>
                <BackHandler />
                <Text numberOfLines={1} style={styles.screenTitle}>
                  Profile
                </Text>
                <TouchableOpacity
                  onPress={()=>navigation.navigate("Settings")}
                >
                  <Image resizeMode="contain" source={{uri : Images.Settings}} style={styles.leftIcon} />
                </TouchableOpacity>
            </View>

            {
              loadingBank || loadingKin || loadingEmergency || loading ? (
                <Container flex={1} horizontalAlignment="center" verticalAlignment="center">
                  <ProfileLoader />
                </Container>
              ) : (
                <ScrollView ref={scrollRef} refreshControl={<CustomRefreshControl 
                  loading={loading}
                  onRefresh={refreshHandler}
                />}>
                  <React.Fragment>
                    <View style={styles.line} />
                    <View style={styles.mainViewContainer}>
                        <View style={styles.userInfoContainer}>
                          {
                            about && about.photo ? (
                              <Image source={{uri : about.photo}} style={styles.avatarStyle} />   
                            ) : (
                              <Rounded backgroundColor={ColorList[Math.floor(Math.random()*4)]}
                              size={20}
                            >
                              <H1>
                                {about && about.first_name && about.first_name.length > 0 ? 
                                  Capitalize([...about.first_name][0]) : ""}
                                {about && about.last_name && about.last_name.length > 1 ? 
                                `${Capitalize([...about.last_name][0])}` : ""}
                              </H1>
                            </Rounded>
                            )
                          }
                            
                            <Text numberOfLines={1} style={[styles.nameText, CommonStyles.marginTop_1]}>
                              {`${about && about.first_name ? Capitalize(about.first_name):  ""}`} {" "}
                              {`${about && about.last_name ? Capitalize(about.last_name):  ""}`}
                            </Text>
                            <Text numberOfLines={1} style={[styles.designationText, CommonStyles.marginTop_05]}>
                            {`${about && about.title ? Capitalize(about.title):  ""}`}
                            </Text>
                            {
                              about?.title_display && about?.level ? <View style={[CommonStyles.rowAlignItemCenter, CommonStyles.marginTop_05]}>
                                  <Text numberOfLines={1} style={styles.designationText}>{`${about && about.title_display ? Capitalize(about.title_display):  ""}`} | </Text>
                                  <Text numberOfLines={1} style={[styles.designationText, {fontWeight: 'bold'}]}>
                                  {`${about && about.level ? about.level :  ""}`}
                                  </Text>
                              </View> : null
                            }
                            
                        </View>
                        <View style={[CommonStyles.rowJustifySpaceBtw, {width: width(90)}, CommonStyles.marginBottom_2]}>
                            <Button 
                            title="Edit Profile" 
                            containerStyle={styles.buttonStyle} 
                            textStyle={styles.buttonText}
                            onPress={async () => {
                              await storeData("profile",{
                                banking,
                                about,
                                kin : kinsData,
                                emergency : emergData,
                              });
                              navigation.navigate('EditProfile')
                            }}
                            />
                            <Button 
                            title="Contact" 
                            containerStyle={styles.buttonStyle} 
                            textStyle={styles.buttonText} 
                            onPress={() => setModal(true)}
                            />
                        </View>
                        {
                          <Container>
                            {
                              profileData.map((item,index)=><RenderList item={item} index={index} key={index} />)
                            }
                          </Container>
                        }
                          {/* {profileData.map((item, index) => <RenderList title="Personal Information" item={item} index={index}/>) } */}
                        
                    </View>
                  </React.Fragment>
                </ScrollView>
              )
            }
            
            <ContactModal isVisible={modal} onHide={() => setModal(false)} data={about}/>
        </ScreenWrapper>  
    );
}
