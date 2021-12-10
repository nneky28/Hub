import { useFocusEffect } from '@react-navigation/core';
import moment from 'moment';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, LayoutAnimation, Platform, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import { useDispatch } from 'react-redux';
import { downIcon, leftIcon, settingIcon } from '../../assets/images';
import Button from '../../components/Button';
import ContactModal from '../../components/ContactModal';
import ScreenWrapper from '../../components/ScreenWrapper';
import { scrollToPosition } from '../../Redux/Actions/Config';
import { APIFunction, getAPIs } from '../../utills/api';
import { ColorList } from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import { H1, ProfileLoader, Rounded } from '../../utills/components';
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
    const [kin,setKin] = useState(null)
    const [loading,setLoading] = useState(false);
    const [banking,setBanking] = useState(null);
    const [pension,setPension] = useState(null);
    const [emergency,setEmergency] = useState(null);
    useEffect(() => {
      return dispatch(scrollToPosition({x: 0, y: 0}))
    }, []);
    const TopBottomText = ({topText, bottomText, containerStyle}) => {
      return(
      <View style={[{justifyContent: 'flex-start'},containerStyle]}>
        <Text style={styles.insideText1}>{topText}</Text>
        <Text style={styles.insideText2}>{bottomText}</Text>
      </View>
      )
    }

    const getProfile = async () => {
      try{
         
         setLoading(true);
         let about = await getData("about_me")
        let res = await APIFunction.next_of_kins(about.id);
        setKin(res);
        let emg_res = await APIFunction.emergency(about.id);
        let bank_res = await APIFunction.banks(about.id);
        let pen_res = await APIFunction.pension_providers(about.id);
        setEmergency(emg_res);
        setAbout(about);
        setPension(pen_res);
        setBanking(bank_res);
        setLoading(false);
      }catch(err){
       let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : "Something went wrong. Please retry"
       ToastError(msg)
      }
    }
     useFocusEffect(
       React.useCallback(()=>{
        getProfile();
       },[])
     )
    const RenderList = ({item, index,about}) => {
        const handleClick = (index) => {
          if (selectedIndex == index) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            setSelectedIndex(-1);
            dispatch(scrollToPosition({x: 0, y: (index + 1)*120}))
          } else {
            setSelectedIndex(index);
            dispatch(scrollToPosition({x: 0, y: (index + 1)*120}))
          }
        };

        let isExpanded = false;
        if (index == selectedIndex)
          isExpanded = true;

        
        const {data} = item;
        return (
          <View style={styles.profileListContainer}>
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
                    <TextWithButton topText={data[8]} bottomText={about && about.compensation ? numeral(about.compensation).format("0,0.00") : ""} onPressHandle={() => navigation.navigate('Compensation')}/>
                  </View>
                  
                </View> 
                }

                { item.title.includes('Kin') ? 
                  <View style={CommonStyles.marginBottom_3}>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_2]}>
                      <TopBottomText topText={data[0]} 
                      bottomText={kin && kin.first_name ? Capitalize(kin.first_name) : null} 
                      containerStyle={styles.halfWidthContainer}/>
                      <TopBottomText topText={data[2]} bottomText={kin && kin.last_name ? Capitalize(kin.last_name) : null} containerStyle={styles.halfWidthContainer}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[4]} bottomText={kin && kin.relationship ? Capitalize(kin.relationship) : null} containerStyle={styles.halfWidthContainer}/>
                      <TopBottomText topText={data[6]} bottomText={kin && kin.phone_number ? kin.phone_number : null} containerStyle={styles.halfWidthContainer}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[8]} bottomText={kin && kin.address1 ? kin.address1 : null}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[10]} bottomText={kin && kin.email ? kin.email : null}/>
                    </View>
                  
                  </View> : null
                }

                { item.title.includes('Emergency') ? 
                  <View style={CommonStyles.marginBottom_3}>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_2]}>
                      <TopBottomText topText={data[0]} 
                      bottomText={emergency && emergency.first_name ? Capitalize(emergency.first_name) : null} 
                      containerStyle={styles.halfWidthContainer}/>
                      <TopBottomText topText={data[2]} bottomText={emergency && emergency.last_name ? Capitalize(emergency.last_name) : null} containerStyle={styles.halfWidthContainer}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[4]} bottomText={emergency && emergency.relationship ? Capitalize(emergency.relationship) : null} containerStyle={styles.halfWidthContainer}/>
                      <TopBottomText topText={data[6]} bottomText={emergency && emergency.phone_number ? emergency.phone_number : null} containerStyle={styles.halfWidthContainer}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[8]} bottomText={emergency && emergency.address1 ? emergency.address1 : null}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[10]} bottomText={emergency && emergency.email ? kin.email : null}/>
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
        <ScreenWrapper scrollEnabled={true} allowScrollToPosition={true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.screenTitle}>
                Profile
                </Text>
                <TouchableOpacity
                  onPress={()=>navigation.navigate("Settings")}
                >
                  <Image resizeMode="contain" source={settingIcon} style={styles.leftIcon} />
                </TouchableOpacity>
            </View>

            {
              loading ? (
                <View style={{alignItems : "center", 
                    justifyContent : "center",flex : 1,
                    marginTop : "20%"  
                  }}>
                  <ProfileLoader />
                </View>
              ) : (
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
                          <View style={[CommonStyles.rowAlignItemCenter, CommonStyles.marginTop_05]}>
                              <Text numberOfLines={1} style={styles.designationText}>{`${about && about.title_display ? Capitalize(about.title_display):  ""}`} | </Text>
                              <Text numberOfLines={1} style={[styles.designationText, {fontWeight: 'bold'}]}>
                              {`${about && about.level ? about.level :  ""}`}
                              </Text>
                          </View>
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
                              kin,
                              emergency,
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
                      <FlatList
                        data={profileData}
                        renderItem={({item,index})=><RenderList about={about} item={item} index={index}/>}
                        ItemSeparatorComponent={() => <View />}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        contentContainerStyle={CommonStyles.marginTop_2}
                        keyExtractor={(item) => item.key}
                      />
                        {/* {profileData.map((item, index) => <RenderList title="Personal Information" item={item} index={index}/>) } */}
                      
                  </View>
                </React.Fragment>
              )
            }
            
            <ContactModal isVisible={modal} onHide={() => setModal(false)} data={about}/>
        </ScreenWrapper>  
    );
}
