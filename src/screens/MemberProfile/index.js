import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Platform, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { leftIcon } from '../../assets/images';
import Button from '../../components/Button';
import ContactModal from '../../components/ContactModal';
import PersonCard from '../../components/PersonCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import { APIFunction, getAPIs } from '../../utills/api';
import CommonStyles from '../../utills/CommonStyles';
import { Container, H1, ImageWrap, LottieIcon, PageLoader, ProfileLoader, Rounded,P, EmptyStateWrapper, BackHandler } from '../../utills/components';
import { FontFamily } from '../../utills/FontFamily';
import { Capitalize, getData, storeData, ToastError } from '../../utills/Methods';
import styles from './styles';
import AppColors, { ColorList } from '../../utills/AppColors';
import Teamjson from '../../assets/lottie/teams.json'
import { Images } from '../../component2/image/Image';



if (Platform.OS === 'android') {
    if(UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

export default function MemberProfile({route,navigation}) {
    const [modal, setModal] = useState(false);
    const [loading,setLoading] = useState(true)
    const [member,setMember] = useState(null)
    const [members,setMembers] = useState([]);

    const PersonItem = ({item,manager}) => {
      return(
      <View 
      style={[styles.listItemContainer]}
      >
          <View style={CommonStyles.rowJustifySpaceBtw}> 
              {
                item.avatar ? (
                  <Image source={{uri : item.avatar}} style={styles.avatarSmall} />
                ) : (
                <Rounded  size={8} backgroundColor={ColorList[Math.floor(Math.random()*4)]}>
                  <H1 fontSize={3}>
                    {manager && manager.first_name && manager.first_name.length > 0 ? Capitalize([...manager.first_name][0]) : ""}
                    {manager && manager.last_name && manager.first_name.length > 0 ? `${Capitalize([...manager.last_name][0])}` : ""}
                  </H1>
                </Rounded>
              )
              }
              <View style={styles.textContainer}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  {/* <Text style={styles.subText}>{item.designation}</Text> */}
              </View>
          </View>
      </View>
      );
  }
   const getProfile = async () => {
     try{
        const member = await getData("tmember");
        setLoading(true);
        let token = await getData("token");
        let user =  await getData("user");
        let about_me = await getData("about_me")
        let biz = user.employee_user_memberships &&
        Array.isArray(user.employee_user_memberships) && user.employee_user_memberships[0]
        && user.employee_user_memberships[0].business_id ? user.employee_user_memberships[0] : null;
        let url = APIFunction.team_members(biz.business_id,member.id);
        let detail_url = APIFunction.basic_details(biz.business_id,member.id);
        let res = await getAPIs(url,token);
        let detail_res = await getAPIs(detail_url,token);
        let members = res && res.results && Array.isArray(res.results) ? res.results : [];
        setMembers(members)
        setMember({...member,...detail_res});
        setLoading(false);
     }catch(err){
      let msg = err.msg && err.msg.detail && typeof(err.msg.detail) == "string" ? err.msg.detail  : "Something went wrong. Please retry"
      ToastError(msg)
     }
   }
    useEffect(() => {
      getProfile();
    },[])
    
    return (
        <ScreenWrapper scrollEnabled={true}>
            <View style={styles.header}>
                {/* <TouchableOpacity
                  onPress={()=>navigation.goBack()}
                >
                  <H1>Back</H1>
                </TouchableOpacity> */}
                <BackHandler />
                <View style={styles.titleContainer}>
                  <Text numberOfLines={1} style={styles.screenTitle}>
                    {`${member && member.first_name ? Capitalize(member.first_name) : ""} ${member && member.last_name ? Capitalize(member.last_name) : ""}`}
                  </Text>
                </View>
            </View>
            <View style={styles.line} />
            {
              false ? (
                <View style={{alignItems : "center", 
                    justifyContent : "center",flex : 1,
                    marginTop : "20%"  
                  }}>
                  <ProfileLoader />
                </View>
              ) : (
                <View style={styles.mainViewContainer}>
                  <View style={styles.userInfoContainer}>
                    {
                      member && member.photo ? (
                        <Image
                            source={{uri:member.photo}}
                            style={styles.avatarStyle} 
                          />   
                      ) : (
                        <Rounded  size={20} backgroundColor={ColorList[Math.floor(Math.random()*4)]}>
                          <H1>
                            {member && member.first_name && member.first_name.length > 0 ? Capitalize([...member.first_name][0]) : ""}
                            {member && member.last_name && member.first_name.length > 0 ? `${Capitalize([...member.last_name][0])}` : ""}
                          </H1>
                        </Rounded>
                      )
                    }
                      <Text numberOfLines={1} style={[styles.nameText, CommonStyles.marginTop_1]}>
                        {`${member && member.job && member.job.title ? Capitalize(member.job.title) : ""}`}
                      </Text>
                      <Text numberOfLines={1} style={[styles.designationText, {fontFamily: FontFamily.BlackSansBold}]}>
                        {member && member.type ? Capitalize(member.type.replace("_"," ")) : ""} | {member && member.hire_date ? Capitalize(moment(member.hire_date).fromNow().replace("ago","")) : ""}
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
                          title: member && member.email ? member.email : "",
                          iconLeft: Images.MessageIcon
                      },
                      {
                          key: '2',
                          title: member && member.address && member.address.address1 ? member.address.address1 : 
                          member && member.address ? member.address : "",
                          iconLeft: Images.MapPIN
                      },
                      {
                          key: '3',
                          title: member && member.phone_number1 ? member.phone_number1 : "",
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
                    member && member.line_manager ? (
                      <React.Fragment>
                        <View style={styles.headingContainer}>
                          <Text style={styles.headingText}>Report to</Text>
                        </View>
                        <PersonItem manager={member && member.line_manager ? member.line_manager : null} item={
                          {
                            key: '1',
                            title: `${member && member.line_manager && member.line_manager.first_name ? Capitalize(member.line_manager.first_name) : ""} ${member && member.line_manager && member.line_manager.last_name ? Capitalize(member.line_manager.last_name) : ""}`,
                            designation: 'Junior Developer',
                            avatar: member && member.line_manager && member.line_manager.photo ? member.line_manager.photo : null,
                          }
                        }/>
                      </React.Fragment>
                    ) : null
                  }

                  <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Team</Text>
                  </View>
                  {
                    members && Array.isArray(members) && members.length === 0 ? (
                      <EmptyStateWrapper
                        marginTop={0.1}
                        icon={Images.EmptyTeams}
                        header_1={member && member.first_name ? `${Capitalize(member.first_name)} has no team member` :  "No team member"}
                      />
                    ) : null
                  }
                  <FlatList
                  data={members}
                  horizontal
                  keyExtractor={(item) => item.key}
                  renderItem={({item}) => (
                    <PersonCard 
                          item={item} 
                          onPressHandle={ async () => {
                            storeData("tmember",item)
                            getProfile()
                          }}
                          containerStyle={styles.horizontalListContainer}
                          titleStyle={styles.headingText}
                          subtitleStyle={styles.subText}
                    />
                  )
                  }
                  ItemSeparatorComponent={() => <View style={[CommonStyles.marginRight_2]}/>}
                  showsHorizontalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  contentContainerStyle={[CommonStyles.marginLeft_4]}
                  />
              </View>
              )
            }
            <ContactModal isVisible={modal} onHide={() => setModal(false)} data={member} />
        </ScreenWrapper>  
    );
}
