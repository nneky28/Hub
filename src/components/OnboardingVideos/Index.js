import { View, Text, Image, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import React, { useState, useRef } from 'react'
import styles from './styles'
import { CloseHandler, Container, P } from '../../utills/components';
import AppColors from '../../utills/AppColors';
import { Images } from '../../utills/Image';


const Index = ({ visible, onHide }) => {

    const items = [
        {
            id: 1,
            icon: Images.player,
            title: 'Create Your First Task'
        },
        {
            id: 2,
            icon: Images.player,
            title: 'Assign task to a department'
        },
        {
            id: 3,
            icon: Images.player,
            title: 'Create Your First Task'
        },
        {
            id: 4,
            icon: Images.player,
            title: 'Add a Subtask'
        },
    ]

    return (
        <Modal
            onBackButtonPress={onHide}
            onModalHide={onHide}
            onBackdropPress={onHide}
            animationInTiming={500}
            animationOutTiming={10}
            backdropOpacity={0.2}
            animationIn="fadeInUp"
            animationOut="fadeInDown"
            swipeThreshold={0.3}
            isVisible={visible}
            style={{ justifyContent: 'center', margin: 0 }}>

            <View style={styles.mainViewContainer}>
                <View style={styles.row}>
                    <CloseHandler position={'center'} onPress={onHide} />
                    <Text style={styles.screenTitle}>Tutorial Videos</Text>
                    <Container size={13} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {items.map((item) => (
                        <View style={styles.background}>
                            <Image source={{ uri: item.icon }} style={styles.icon} />
                            <P color={AppColors.white} >{item.title}</P>
                        </View>
                    ))}
                </ScrollView>

            </View>


        </Modal>

    )
}

export default Index
