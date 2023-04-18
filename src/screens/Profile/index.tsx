import moment from 'moment';
import numeral from 'numeral';
import React, { useEffect, useRef, useState } from 'react';
import { Image, LayoutAnimation, Platform, ScrollView, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { downIcon } from '../../assets/images';
import { Images } from '../../utills/Image';
import Button from '../../components/Button';
import ContactModal from '../../components/ContactModal';
import ScreenWrapper from '../../components/ScreenWrapper';
import { scrollToPosition } from '../../Redux/Actions/Config';
import { useFetchAboutMe,useFetchEmergency, useFetchKin } from '../../utills/api';
import AppColors from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import { Container,ImgPlaceholder, ProfileLoader } from '../../utills/components';
import { profileData, ProfileDataType } from '../../utills/data/profileData';
import { Capitalize, useAppSelector } from '../../utills/Methods';
import styles from './styles';
import { RootScreenProps } from '../../Routes/types';
import { HomePageHeader } from '../../components/Headers/CustomHeader';
import { useFetchAboutMeProps } from '../../components/TimeoffModal/types';
import { Coordinates, TextWithButtonProps, TopBottomText, useFetchEmergencyProps, useFetchKinProps } from './types';
import { BANKS, EMERGENCY, NEXT_OF_KINS } from '../../utills/payload';
import { CustomRefreshControl } from '../../components/CustomRefreshControl';


if (Platform.OS === 'android') {
    if(UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

export default function Profile({navigation} : RootScreenProps) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const scrollRef = useRef<ScrollView>(null);
    const scrollPosition = useAppSelector(state => state.Config.scrollPosition);
    const [cords,setCords] = React.useState<Coordinates>({})
    const queryClient = useQueryClient()

    const {
      data : about,
      isLoading : loading
    } = useFetchAboutMe("main") as useFetchAboutMeProps

    useEffect(()=>{
      if(!scrollRef?.current?.scrollTo) return
      scrollRef?.current?.scrollTo({x:scrollPosition.x, y:scrollPosition.y, animated : true})
    },[scrollPosition])

    useEffect(() => {
      return () => {
        dispatch(scrollToPosition({x: 0, y: 0}))
      }
    }, []);

    const refreshHandler = async () => {
        queryClient.invalidateQueries(NEXT_OF_KINS)
        queryClient.invalidateQueries(EMERGENCY)
        queryClient.invalidateQueries(BANKS)
    } 

    const TopBottomText = ({topText, bottomText, containerStyle}: TopBottomText) => {
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
    } = useFetchKin(about?.id) as useFetchKinProps

    const {
      data : emergData,
      isLoading : loadingEmergency
    } = useFetchEmergency(about?.id) as useFetchEmergencyProps

    const navigationHandler = () => {
      navigation.navigate("Profile",{screen : "EditProfile"})
    }

    const TextWithButton = ({topText, bottomText} : TextWithButtonProps) => {
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

    const RenderList = ({item, index} : {item : ProfileDataType,index : number}) => {
        const handleClick = (index : number) => {
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

        
        const data = item?.data || [];
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
                    <TextWithButton 
                      topText={data[8]} bottomText={about && about.compensation && about.compensation.amount ? numeral(about.compensation.amount).format("0,0.00") : ""} onPressHandler={() => navigation.navigate("Profile",{screen : "Compensation"})}
                    />
                  </View>
                  
                </View> 
                }

                { item.title.includes('Kin') ? 
                  <View style={CommonStyles.marginBottom_3}>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_2]}>
                      <TopBottomText topText={data[0]} 
                      bottomText={kinsData?.first_name ? Capitalize(kinsData.first_name) : ""} 
                      containerStyle={styles.halfWidthContainer}/>
                      <TopBottomText topText={data[2]} bottomText={kinsData?.last_name ? Capitalize(kinsData.last_name) : ""} containerStyle={styles.halfWidthContainer}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[4]} bottomText={kinsData?.relationship ? Capitalize(kinsData.relationship) : ""} containerStyle={styles.halfWidthContainer}/>
                      <TopBottomText topText={data[6]} bottomText={kinsData?.phone_number ? kinsData.phone_number : ""} containerStyle={styles.halfWidthContainer}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[8]} bottomText={kinsData?.address1 ? kinsData.address1 : ""}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[10]} bottomText={kinsData?.email ? kinsData.email : ""}/>
                    </View>
                  
                  </View> : null
                }

                { item.title.includes('Emergency') ? 
                  <View style={CommonStyles.marginBottom_3}>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_2]}>
                      <TopBottomText topText={data[0]} 
                      bottomText={emergData?.first_name ? Capitalize(emergData.first_name) : ""} 
                      containerStyle={styles.halfWidthContainer}/>
                      <TopBottomText topText={data[2]} bottomText={emergData?.last_name ? Capitalize(emergData.last_name) : ""} containerStyle={styles.halfWidthContainer}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[4]} bottomText={emergData?.relationship ? Capitalize(emergData.relationship) : ""} containerStyle={styles.halfWidthContainer}/>
                      <TopBottomText topText={data[6]} bottomText={emergData?.phone_number ? emergData.phone_number : ""} containerStyle={styles.halfWidthContainer}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[8]} bottomText={emergData?.address1 ? emergData.address1 : ""}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[10]} bottomText={emergData?.email ? emergData.email : ""}/>
                    </View>
                  
                  </View> : null
                }

                {item.title.includes('Bank') &&

                  <View style={[CommonStyles.marginTop_2, CommonStyles.marginBottom_3]}>
                    <TopBottomText topText={data[0]} bottomText={
                      about?.bank_account?.bank?.name ? Capitalize(about.bank_account.bank.name) : ""
                    }/>
                    <TopBottomText topText={data[2]} bottomText={
                      about?.bank_account?.account_number ? about.bank_account.account_number : ""
                    } containerStyle={{marginTop: height(2)}}/>
                    <View style={styles.line}/>
                    <Text style={styles.subHeading}>Pension</Text>
                    <TopBottomText topText={data[4]} bottomText={
                      about?.pension?.provider?.name ? 
                      Capitalize(about.pension.provider.name) : ""
                    } containerStyle={{marginTop: height(2)}}/>
                    <TopBottomText topText={data[6]} bottomText={
                      about && about.pension && about.pension.pension_number ? 
                      Capitalize(about.pension.pension_number) : ""
                    } containerStyle={{marginTop: height(2)}}/>
                  </View>
                }
                </>
                }
          </View>
        );
      };


    return (
        <ScreenWrapper>
            <HomePageHeader 
              header={"Profile"}
              image={Images.people}
              rightIcon={{uri : Images.Settings}}
              onPressHandler={()=>navigation.navigate("Settings")}
              rightIconColor={AppColors.black3}
            />

            {
              loadingKin || loadingEmergency || loading ? (
                <Container flex={1} horizontalAlignment="center" verticalAlignment="center">
                  <ProfileLoader />
                </Container>
              ) : (
                <ScrollView ref={scrollRef} refreshControl={<CustomRefreshControl 
                  loading={loading}
                  onRefresh={refreshHandler}
                />}>
                  <React.Fragment>
                    <View style={styles.mainViewContainer}>
                        <View style={styles.userInfoContainer}>
                          {
                            about?.photo ? (
                              <Image source={{uri : about.photo}} style={styles.avatarStyle} />   
                            ) : (
                              <ImgPlaceholder 
                                size={28}
                                text={`${about?.first_name?.[0] ? 
                                  Capitalize(about?.first_name?.[0]) : ""}${about?.last_name?.[0] ? 
                                    Capitalize(about?.last_name?.[0]) : ""}`}
                                radius={50}
                                fontSize={6}
                              />
                            )
                          }
                            
                            <Text numberOfLines={1} style={styles.nameText}>
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
                            onPress={navigationHandler}
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
                    </View>
                  </React.Fragment>
                </ScrollView>
              )
            }
            
           {modal ?  <ContactModal isVisible={modal} onHide={() => setModal(false)} data={about}/> : null}
        </ScreenWrapper>  
    );
}
