import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Platform, ScrollView, Text, UIManager, View } from 'react-native';
import Button from '../../components/Button';
import ContactModal from '../../components/ContactModal';
import PersonCard from '../../components/PersonCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useFetchEmployeeBasicDetails, useFetchTeams } from '../../utills/api';
import CommonStyles from '../../utills/CommonStyles';
import { Container, ImageWrap, ProfileLoader, P, EmptyStateWrapper, ImgPlaceholder} from '../../utills/components';
import { FontFamily } from '../../utills/FontFamily';
import { Capitalize } from '../../utills/Methods';
import styles from './styles';
import AppColors from '../../utills/AppColors';
import { Images } from '../../utills/Image';
import { RootScreenProps } from '../../Routes/types';
import { LineManager, MemberProfileParams, useFetchEmployeeBasicInfoProps } from './types';
import { useFetchEmployeesData, useFetchTeamsProps } from '../People/types';
import { HeaderWithBackButton } from '../../components/Headers/CustomHeader';



if (Platform.OS === 'android') {
    if(UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

export default function MemberProfile({route} : RootScreenProps) {
    const {member} = route?.params as MemberProfileParams || {}
    const [member_id,setMemberID] = React.useState<number | undefined>(member?.id)
    const [modal, setModal] = useState(false);
    const [members,setMembers] = useState<useFetchEmployeesData[]>([]);
    const [page] = React.useState(1)
    
    const {
      data : info,
      isLoading
    } = useFetchEmployeeBasicDetails(member_id) as useFetchEmployeeBasicInfoProps

    const {
      data : teamData,
      isLoading : fetchingTeams
  } = useFetchTeams("My Team",page) as useFetchTeamsProps

    useEffect(()=>{
      if(teamData?.pages?.[0]?.results && Array.isArray(teamData?.pages?.[0]?.results)) setMembers(teamData?.pages?.[0]?.results)
    },[teamData])

    const PersonItem = ({manager} : {manager : LineManager}) => {
      return(
      <View 
      style={[styles.listItemContainer]}
      >
          <View style={CommonStyles.rowJustifySpaceBtw}> 
              {
                manager.photo ? (
                  <Image source={{uri : manager.photo}} style={styles.avatarSmall} />
                ) : (
                  <ImgPlaceholder 
                    text={`${manager?.first_name ? Capitalize(manager?.first_name?.[0]) : ""}${manager?.last_name ? Capitalize(manager?.last_name?.[0]) : ""}`}
                  />
                )
              }
              {
                manager?.title ?  <View style={styles.textContainer}>
                  <Text style={styles.titleText}>{manager?.title}</Text>
              </View> : null
              }
             
          </View>
      </View>
      );
  }
  
    const RenderItem = ({item} : {item : useFetchEmployeesData}) => {
      const onPressHandler = () => setMemberID(item?.id)
      return(
        <PersonCard 
              item={item} 
              onPressHandler={onPressHandler}
              containerStyle={styles.horizontalListContainer}
              titleStyle={styles.headingText}
              subtitleStyle={styles.subText}
        />
      )
    }

    const ListItemComponent = () => {
      return(
        <EmptyStateWrapper
          marginTop={0.1}
          icon={Images.EmptyTeams}
          header_1={member && member.first_name ? `${Capitalize(member.first_name)} has no team member` :  "No team member"}
        />
      )
    }
    
    useEffect(() => {
      //getProfile();
    },[])

    const keyExtractor = (item : useFetchEmployeesData,index : number) => `${index}${item}`.toString()
  
    return (
        <ScreenWrapper>
            <HeaderWithBackButton 
              headerText={`${member?.first_name ? Capitalize(member?.first_name) : ""} ${member?.last_name ? Capitalize(member?.last_name) : ""}`}
            />
            {
              isLoading || fetchingTeams? (
                <Container flex={1} verticalAlignment="center" horizontalAlignment="center">
                    <ProfileLoader />
                </Container>
              ) : (
                <View style={styles.mainViewContainer}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                      <View style={styles.userInfoContainer}>
                        {
                          info?.photo ? (
                            <Image
                                source={{uri:info?.photo}}
                                style={styles.avatarStyle} 
                              />   
                          ) : (
                            <ImgPlaceholder 
                              text={`${info?.first_name?.[0] ? Capitalize(info?.first_name?.[0]) : ""}${info?.last_name?.[0] ? Capitalize(info?.last_name?.[0]) : ""}`}
                              size={20}
                              fontSize={5}
                            />
                          )
                        }
                          <Text numberOfLines={1} style={[styles.nameText, CommonStyles.marginTop_1]}>
                            {`${info?.job?.title ? Capitalize(info.job.title) : ""}`}
                          </Text>
                          <Text numberOfLines={1} style={[styles.designationText, {fontFamily: FontFamily.BlackSansBold}]}>
                            {info?.type ? Capitalize(info?.type.replace("_"," ")) : ""} | {info?.hire_date ? Capitalize(moment(info.hire_date).fromNow().replace("ago","")) : ""}
                          </Text>
                      </View>
                      <Button 
                        title="Contact" 
                        containerStyle={styles.buttonStyle} 
                        textStyle={styles.buttonText} 
                        onPress={() => setModal(true)}
                      />

                      <Container 
                        marginTop={5}
                        width={90}
                      >
                        {
                          [
                            {
                              key: '1',
                              title: info?.email ? info.email : "",
                              iconLeft: Images.MessageIcon
                          },
                          {
                              key: '2',
                              title: info?.address?.address1 ? info?.address?.address1 : "",
                              iconLeft: Images.MapPIN
                          },
                          {
                              key: '3',
                              title: info?.phone_number1 ? info.phone_number1 : "",
                              iconLeft: Images.PhoneIcon
                          }
                          ].map((item,key)=>(
                            <Container
                              direction="row" 
                              key={key}
                              paddingVertical={2}
                              marginBottom={2}
                              borderBottomWidth={0.5}
                              borderColor={AppColors.grayBorder}
                              style={{
                                alignItems : 'center'
                              }}
                            >
                              <Container
                                width={20}
                              >
                                <ImageWrap 
                                  fit="contain"
                                  url={item.iconLeft}
                                  height={2}
                                />
                              </Container>
                              <Container
                                width={50}
                              > 
                                <P>{item.title}</P>
                              </Container>
                            </Container>
                          ))
                        }
                      </Container> 
                      {
                        info?.line_manager ? (
                          <React.Fragment>
                            <View style={styles.headingContainer}>
                              <Text style={styles.headingText}>Report to</Text>
                            </View>
                            <PersonItem manager={info?.line_manager}/>
                          </React.Fragment>
                        ) : null
                      }

                      <View style={styles.headingContainer}>
                        <Text style={styles.headingText}>Team</Text>
                      </View>
                      <FlatList
                          data={members}
                          horizontal
                          keyExtractor={keyExtractor}
                          renderItem={RenderItem}
                          ItemSeparatorComponent={() => <View style={[CommonStyles.marginRight_2]}/>}
                          showsHorizontalScrollIndicator={false}
                          ListEmptyComponent={ListItemComponent}
                          //contentContainerStyle={[CommonStyles.marginLeft_4]}
                      />
                  </ScrollView>
                  {
                    modal ? <ContactModal isVisible={modal} onHide={() => setModal(false)} data={member} /> : null
                  }
              </View>
              )
            }
            
        </ScreenWrapper>  
    );
}
