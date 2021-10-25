import React, { useState, useRef } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import ModalDropdown from 'react-native-modal-dropdown';
import { downIcon, fileIcon, HorDotIcon, leftIcon } from '../../assets/images';
import { DocumentModal } from '../../components/ContactModal';
import ScreenWrapper from '../../components/ScreenWrapper';
import CommonStyles from '../../utills/CommonStyles';
import { Container, LottieIcon } from '../../utills/components';
import { payslips } from '../../utills/data/payslips';
import styles from './styles';
import Emptyjson from '../../assets/lottie/empty.json'


export default function Payslips({navigation}) {
    const [modal, setModal] = useState(false);
    const dropdown1 = useRef(null);
    const dropdown2 = useRef(null);

    const ListComponent = ({item}) => {
        return(
            
            <>
            <TouchableOpacity 
            onPress={() => setModal(!modal)}
            style={[styles.listItemContainer]}
            >
                <View style={CommonStyles.rowJustifySpaceBtw}>
                    <Image source={fileIcon} style={styles.fileIcon} />
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText}>{item.title}</Text>
                        <Text style={styles.subText}>{item.date}</Text>
                    </View>
                </View>
                <Image source={HorDotIcon} style={styles.dotsIcon} />
            </TouchableOpacity>
            <View style={styles.line}/>
        </>
        );
    }
        
    return (
        <ScreenWrapper scrollEnabled={true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon}/>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.screenTitle}>
                Payslips
                </Text>
            </View>
            <View style={styles.line} />

            <View style={styles.mainViewContainer}>
                <View style={[CommonStyles.rowJustifySpaceBtw, {width: width(90), marginTop: height(2)}]}>
                    <TouchableOpacity
                    onPress={() => dropdown1.current.show()}
                    style={CommonStyles.justifyCenter}
                    >
                        <ModalDropdown
                        ref={dropdown1}
                        isFullWidth
                        options={['January', 'February', 'March']} 
                        style={styles.listContainer}
                        dropdownStyle={styles.dropDownContainer1}
                        defaultIndex={-1}
                        defaultValue="Month"
                        textStyle={[styles.text1, {marginLeft: width(3.5)}]}
                        dropdownTextStyle={[styles.text1, {marginLeft: width(3.5)}]}
                        //onSelect={(index,text) => setFieldValue(name, text)}
                        renderRightComponent={() => <Image 
                                    resizeMode="contain" 
                                    source={downIcon} 
                                    style={[styles.downIcon]}
                                    />
                        }
                        />      
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => dropdown2.current.show()}
                    style={CommonStyles.justifyCenter}
                    >
                        <ModalDropdown
                        ref={dropdown2}
                        isFullWidth
                        options={['2019', '2020', '2021']} 
                        style={styles.listContainer}
                        dropdownStyle={styles.dropDownContainer2}
                        defaultIndex={-1}
                        defaultValue="Year"
                        textStyle={[styles.text1, {marginLeft: width(3.5)}]}
                        dropdownTextStyle={[styles.text1, {marginLeft: width(3.5)}]}
                        //onSelect={(index,text) => setFieldValue(name, text)}
                        renderRightComponent={() => <Image 
                                    resizeMode="contain" 
                                    source={downIcon} 
                                    style={[styles.downIcon]}
                                    />
                        }
                        />      
                    </TouchableOpacity>
                </View>                   
            {/* <FlatList
                data={payslips}
                keyExtractor={(item) => item.key}
                renderItem={ListComponent}
                ItemSeparatorComponent={() => <View />}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={CommonStyles.marginTop_2}
                /> */}
                <Container
                    marginTop={10}
                    style={{
                        justifyContent : "center",
                        alignItems : "center"
                    }}
                >
                    <LottieIcon 
                        icon={Emptyjson}
                    />
                </Container>
            </View>
            <DocumentModal isVisible={modal} onHide={() => setModal(false)}/> 
        </ScreenWrapper>  
    );
}
