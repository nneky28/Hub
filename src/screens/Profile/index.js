import React, { useEffect, useState } from 'react';
import { FlatList, Image, LayoutAnimation, Platform, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import { useDispatch } from 'react-redux';
import { downIcon, leftIcon, settingIcon } from '../../assets/images';
import Button from '../../components/Button';
import ContactModal from '../../components/ContactModal';
import ScreenWrapper from '../../components/ScreenWrapper';
import { scrollToPosition } from '../../Redux/Actions/Config';
import CommonStyles from '../../utills/CommonStyles';
import { profileData } from '../../utills/data/profileData';
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

   

    const RenderList = ({item, index}) => {
        
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
                      <TopBottomText topText={data[0]} bottomText={data[1]}/>
                      <TopBottomText topText={data[2]} bottomText={data[3]}/>
                      <TopBottomText topText={data[4]} bottomText={data[5]}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[6]} bottomText={data[7]}/>
                    </View>
                  </View> 
                }
                {item.title.includes('Job') &&
                  <View style={CommonStyles.marginBottom_3}>
                  <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_2]}>
                    <TopBottomText topText={data[0]} bottomText={data[1]} containerStyle={styles.halfWidthContainer}/>
                    <TopBottomText topText={data[2]} bottomText={data[3]} containerStyle={styles.halfWidthContainer}/>
                  </View>
                  <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4 ]}>
                    <TopBottomText topText={data[4]} bottomText={data[5]} containerStyle={styles.halfWidthContainer}/>
                    <TopBottomText topText={data[6]} bottomText={data[7]} containerStyle={styles.halfWidthContainer}/>
                  </View>
                  <View style={styles.line}/>
                  <Text style={styles.subHeading}>Compensation</Text>
                  <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_1]}>
                    <TextWithButton topText={data[8]} bottomText={data[9]} onPressHandle={() => navigation.navigate('Compensation')}/>
                  </View>
                  
                </View> 
                }


                {data.length === 12 &&
                  <View style={CommonStyles.marginBottom_3}>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_2]}>
                      <TopBottomText topText={data[0]} bottomText={data[1]} containerStyle={styles.halfWidthContainer}/>
                      <TopBottomText topText={data[2]} bottomText={data[3]} containerStyle={styles.halfWidthContainer}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[4]} bottomText={data[5]} containerStyle={styles.halfWidthContainer}/>
                      <TopBottomText topText={data[6]} bottomText={data[7]} containerStyle={styles.halfWidthContainer}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[8]} bottomText={data[9]}/>
                    </View>
                    <View style={[CommonStyles.rowJustifySpaceBtw, CommonStyles.marginTop_4]}>
                      <TopBottomText topText={data[10]} bottomText={data[11]}/>
                    </View>
                  
                  </View> 
                }

                {item.title.includes('Bank') &&
              
                  <View style={[CommonStyles.marginTop_2, CommonStyles.marginBottom_3]}>
                    <TopBottomText topText={data[0]} bottomText={data[1]}/>
                    <TopBottomText topText={data[2]} bottomText={data[3]} containerStyle={{marginTop: height(2)}}/>
                    <View style={styles.line}/>
                    <Text style={styles.subHeading}>Pension</Text>
                    <TopBottomText topText={data[4]} bottomText={data[5]} containerStyle={{marginTop: height(2)}}/>
                    <TopBottomText topText={data[6]} bottomText={data[7]} containerStyle={{marginTop: height(2)}}/>
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
          <TouchableOpacity 
          style={styles.saveBtnStyle} 
          onPress={onPressHandle}
          >
            <Text style={styles.saveBtnText}>View History</Text>
          </TouchableOpacity>
        </View>
      );
    }


    return (
        <ScreenWrapper scrollEnabled={true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.screenTitle}>
                Profile
                </Text>
                <Image resizeMode="contain" source={settingIcon} style={styles.leftIcon} />
            </View>
            <View style={styles.line} />

            <View style={styles.mainViewContainer}>
                <View style={styles.userInfoContainer}>
                    <Image source={require('../../assets/images/dummy/placeholder.png')} style={styles.avatarStyle} />   
                    <Text numberOfLines={1} style={[styles.nameText, CommonStyles.marginTop_1]}>Jessica Stones</Text>
                    <Text numberOfLines={1} style={[styles.designationText, CommonStyles.marginTop_05]}>Senior Developer</Text>
                    <View style={[CommonStyles.rowAlignItemCenter, CommonStyles.marginTop_05]}>
                        <Text numberOfLines={1} style={styles.designationText}>Tech and Design | </Text>
                        <Text numberOfLines={1} style={[styles.designationText, {fontWeight: 'bold'}]}>ED001</Text>
                    </View>
                </View>
                <View style={[CommonStyles.rowJustifySpaceBtw, {width: width(90)}, CommonStyles.marginBottom_2]}>
                    <Button 
                    title="Edit Profile" 
                    containerStyle={styles.buttonStyle} 
                    textStyle={styles.buttonText}
                    onPress={() => navigation.navigate('EditProfile')}
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
                renderItem={RenderList}
                ItemSeparatorComponent={() => <View />}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={CommonStyles.marginTop_2}
                keyExtractor={(item) => item.key}

                />
                  {/* {profileData.map((item, index) => <RenderList title="Personal Information" item={item} index={index}/>) } */}
                
            </View>
            <ContactModal isVisible={modal} onHide={() => setModal(false)}/>
        </ScreenWrapper>  
    );
}
