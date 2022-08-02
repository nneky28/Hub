import React, { useEffect } from 'react';
import { Image, Keyboard, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { searchIcon } from '../../assets/images';
import { setBottomTabBarVisible } from '../../Redux/Actions/Config';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';
import {Images} from "../../component2/image/Image"
import styles from './styles';



export default function SearchBox({title, containerStyle, onSubmitEditing}) {
    const dispatch = useDispatch();

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => dispatch(setBottomTabBarVisible(false)));
        Keyboard.addListener('keyboardDidHide', () => dispatch(setBottomTabBarVisible(true)))
    }, []);
    
    return (
        <View style={[styles.container, containerStyle]}>
            <Image source={{uri:Images.SearchIcon}} style={styles.searchIcon}/>
            <TextInput 
                style={styles.inputStyle}
                placeholder={title}
                fontFamily={FontFamily.BlackSansRegular}
                placeholderTextColor={AppColors.black3}
                keyboardType='default'
                onChangeText={onSubmitEditing}
                onSubmitEditing={onSubmitEditing}
                color={AppColors.black}
            />
            
        </View>
    );
}

export const SearchBoxIOS = ({title, containerStyle, onSubmitEditing}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => dispatch(setBottomTabBarVisible(false)));
        Keyboard.addListener('keyboardDidHide', () => dispatch(setBottomTabBarVisible(true)))

    }, []);
    return (
        <View style={[styles.container, containerStyle]}>
            <Image source={searchIcon} style={styles.searchIcon}/>
            <TextInput 
            style={styles.inputStyleIOS}
            placeholder={title}
            fontFamily={FontFamily.BlackSansRegular}
            placeholderTextColor={AppColors.black3}
            keyboardType='default'
            onChangeText={onSubmitEditing}
            onSubmitEditing={onSubmitEditing}
            color={AppColors.black}
            />
            
        </View>
    );
}
