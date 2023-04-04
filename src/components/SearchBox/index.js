import React, { useEffect, useState } from 'react';
import { Image, Keyboard, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { searchIcon } from '../../assets/images';
import { setBottomTabBarVisible } from '../../Redux/Actions/Config';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';
import { Images } from "../../component2/image/Image"
import styles from './styles';



export default function SearchBox({ title, containerStyle, onSubmitEditing, autoFocus, onKeyPress, ...inputProps }) {
    const [focus, setFocus] = useState(true)

    const dispatch = useDispatch();
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => dispatch(setBottomTabBarVisible(false)));
        Keyboard.addListener('keyboardDidHide', () => dispatch(setBottomTabBarVisible(true)))
    }, []);

    return (
        <View style={[styles.container, containerStyle]}>
            <Image source={{ uri: Images.SearchIcon }} style={styles.searchIcon} />
            <TextInput
                style={styles.inputStyle}
                placeholder={title}
                fontFamily={FontFamily.BlackSansRegular}
                placeholderTextColor={AppColors.black3}
                keyboardType='default'
                onChangeText={onSubmitEditing}
                onSubmitEditing={(value) => {
                    if (typeof (value) === "object") return
                    onSubmitEditing(value)
                }}
                color={AppColors.black}
                {...inputProps}
                autoFocus={autoFocus}
                onKeyPress={onKeyPress}
            />

        </View>
    );
}

export const SearchBoxIOS = ({ title, containerStyle, onSubmitEditing, autoFocus }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => dispatch(setBottomTabBarVisible(false)));
        Keyboard.addListener('keyboardDidHide', () => dispatch(setBottomTabBarVisible(true)))
    }, []);

    return (
        <View style={[styles.container, containerStyle]}>
            <Image source={searchIcon} style={styles.searchIcon} />
            <TextInput
                style={styles.inputStyleIOS}
                placeholder={title}
                fontFamily={FontFamily.BlackSansRegular}
                placeholderTextColor={AppColors.black3}
                keyboardType='default'
                onChangeText={onSubmitEditing}
                onSubmitEditing={(value) => {
                    if (typeof (value) === "object") return
                    onSubmitEditing(value)
                }}
                color={AppColors.black}
                autoFocus={autoFocus}
            />

        </View>
    );
}
export const SearchBoxIOSWithout = ({ title, containerStyle, onSubmitEditing, value }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => dispatch(setBottomTabBarVisible(false)));
        Keyboard.addListener('keyboardDidHide', () => dispatch(setBottomTabBarVisible(true)))
    }, []);

    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                style={styles.inputStyleIOS}
                placeholder={title}
                fontFamily={FontFamily.BlackSansRegular}
                placeholderTextColor={AppColors.black3}
                keyboardType='default'
                onChangeText={onSubmitEditing}
                onSubmitEditing={(value) => {
                    if (typeof (value) === "object") return
                    onSubmitEditing(value)
                }}
                color={AppColors.black}
                value={value}
            />

        </View>
    );
}

export function SearchBoxWithout({ title, containerStyle, onSubmitEditing, value }) {

    const dispatch = useDispatch();
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => dispatch(setBottomTabBarVisible(false)));
        Keyboard.addListener('keyboardDidHide', () => dispatch(setBottomTabBarVisible(true)))
    }, []);

    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                style={styles.inputStyle}
                placeholder={title}
                fontFamily={FontFamily.BlackSansRegular}
                placeholderTextColor={AppColors.black3}
                keyboardType='default'
                onChangeText={onSubmitEditing}
                onSubmitEditing={(value) => {
                    if (typeof (value) === "object") return
                    onSubmitEditing(value)
                }}
                color={AppColors.black}
                value={value}
            />

        </View>
    );
}
