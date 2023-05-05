import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './styles'
import {
    H1,
    KeyboardAwareWrapper,
    P,
    TouchableWrapper,
} from '../../utills/components';
import Feather from 'react-native-vector-icons/Feather';
import AppColors from '../../utills/AppColors';
import CustomInput from '../CustomInput';
import Button from '../Button';
import { ToastSuccess, useAppSelector } from '../../utills/Methods';
import CommonStyles from '../../utills/CommonStyles';

const index = ({ item, handleDecrement, handleIncrement, handleDelete, i }) => {

    return (
        <View>
            <>
                <View style={styles.container} key={i}>
                    <View style={CommonStyles.rowJustifySpaceBtw}>
                        <View style={CommonStyles.row}>
                            <View style={styles.imgContainer}>
                                <Image source={item?.img} style={styles.img} />
                            </View>
                            <View style={CommonStyles.paddingLeft_3}>
                                <H1 fontSize={3}>{item?.title}</H1>
                                <P fontSize={2.5} color={AppColors.black1}>
                                    {`Size ${(item.size.toUpperCase())}`}
                                </P>
                                <P fontSize={3} marginTop={5}>
                                    ${item?.price}
                                </P>
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity onPress={handleDelete}>
                                <Feather
                                    name="trash-2"
                                    size={15}
                                    style={styles.icon}
                                    color={AppColors.red}
                                />
                            </TouchableOpacity>
                            <View style={styles.countCon}>
                                <TouchableWrapper onPress={handleDecrement} style={styles.count}>
                                    <P>-</P>
                                </TouchableWrapper>
                                <P style={styles.num}>{item?.count}</P>
                                <TouchableWrapper onPress={handleIncrement} style={styles.count}>
                                    <P>+</P>
                                </TouchableWrapper>
                            </View>
                        </View>
                    </View>
                </View>
            </>
        </View>
    )
}

export default index