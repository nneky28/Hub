import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppColors from '../../utills/AppColors';
import CommonStyles from '../../utills/CommonStyles';
import { H1, P, Rounded } from '../../utills/components';
import { Capitalize } from '../../utills/Methods';
import styles from './styles';
import moment from 'moment';

const Index = ({ item, index }) => {
    return (
        <View
            style={[styles.listContainer1]} >
            <View style={CommonStyles.rowJustifySpaceBtw}>
                {
                    item.logged_by?.photo ? (
                        <Image source={{ uri: item.logged_byphoto }} style={styles.avatarStyle} />
                    ) : (
                        <Rounded backgroundColor={AppColors.lightPink} size={12}>
                            <H1>
                                {item.logged_by?.first_name[0]}
                                {item.logged_by?.last_name[0]}
                            </H1>
                        </Rounded>
                    )
                }

                <View style={styles.textContainer1}>
                    <P numberOfLines={1} style={styles.titleText}>
                        {item && item?.description}
                    </P>
                </View>
            </View>
        </View>
    )
}

export default Index

