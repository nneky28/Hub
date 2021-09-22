import React, { useState } from 'react';
import { FlatList, Image, Platform, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { leftIcon } from '../../assets/images';
import Button from '../../components/Button';
import ContactModal from '../../components/ContactModal';
import PersonCard from '../../components/PersonCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import CommonStyles from '../../utills/CommonStyles';
import { persons } from '../../utills/data/persons';
import { FontFamily } from '../../utills/FontFamily';
import styles from './styles';



if (Platform.OS === 'android') {
    if(UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

export default function MemberProfile({navigation}) {
    const [modal, setModal] = useState(false);

    const PersonItem = ({item}) => {
      return(
      <View 
      style={[styles.listItemContainer]}
      >
          <View style={CommonStyles.rowJustifySpaceBtw}>
              <Image source={item.avatar} style={styles.avatarSmall} />
              <View style={styles.textContainer}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Text style={styles.subText}>{item.designation}</Text>
              </View>
          </View>
      </View>
      );
  }
    
    
    return (
        <ScreenWrapper scrollEnabled={true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                  <Text numberOfLines={1} style={styles.screenTitle}>
                  Jessica Stones
                  </Text>
                </View>
            </View>
            <View style={styles.line} />

            <View style={styles.mainViewContainer}>
                <View style={styles.userInfoContainer}>
                    <Image source={require('../../assets/images/dummy/placeholder.png')} style={styles.avatarStyle} />   
                    <Text numberOfLines={1} style={[styles.nameText, CommonStyles.marginTop_1]}>Senior Developer</Text>
                    <Text numberOfLines={1} style={[styles.designationText]}>Tech and Design</Text>
                    <Text numberOfLines={1} style={[styles.designationText, {fontFamily: FontFamily.BlackSansBold}]}>Full Time | 2yrs</Text>
                </View>
                <Button 
                title="Contact" 
                containerStyle={styles.buttonStyle} 
                textStyle={styles.buttonText} 
                onPress={() => setModal(true)}
                />
                <View style={styles.headingContainer}>
                  <Text style={styles.headingText}>Report to</Text>
                </View>
                <PersonItem item={persons[0]}/>

                <View style={styles.headingContainer}>
                  <Text style={styles.headingText}>Team</Text>
                </View>
                <FlatList
                data={persons}
                horizontal
                keyExtractor={(item) => item.key}
                renderItem={({item}) => <PersonCard 
                                        item={item} 
                                        onPressHandle={() => navigation.navigate('MemberProfile')}
                                        containerStyle={styles.horizontalListContainer}
                                        titleStyle={styles.headingText}
                                        subtitleStyle={styles.subText}
                                        />
                }
                ItemSeparatorComponent={() => <View style={[CommonStyles.marginRight_2]}/>}
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={[CommonStyles.marginLeft_4]}
                />
            </View>
            <ContactModal isVisible={modal} onHide={() => setModal(false)}/>
        </ScreenWrapper>  
    );
}
