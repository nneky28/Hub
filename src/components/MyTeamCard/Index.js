import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Container, Rounded, H1, ImgPlaceholder } from '../../utills/components'
import AppColors from '../../utills/AppColors'
import { width } from 'react-native-dimension';
import { ColorList } from './../../utills/AppColors';
import Button from '../Button/index';
import { Capitalize } from '../../utills/Methods';
import CommonStyles from '../../utills/CommonStyles';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'
import { useFetchTeams, useFetchTeamStatistics } from '../../utills/api';
import Feather from 'react-native-vector-icons/Feather';



const Index = () => {
    const navigation = useNavigation()
    const [page, setPage] = useState(1)
    const [id, setId] = useState(false)
    const [item, setItem] = useState([])
    const [team, setTeam] = useState(true)

    const {
        data: data,
        loading: loading,
    } = useFetchTeams(page, id)
    const {
        data: counts,
    } = useFetchTeamStatistics()

    let total = counts?.todo_count + counts?.inprogress_count


    const RenderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("profile", { item })}>
                {
                    item.photo ? (
                        <Image source={{ uri: item.photo }} style={styles.avatarStyle} />
                    ) : (

                        <ImgPlaceholder
                            text={`${item.first_name && item.first_name.length > 0 ? Capitalize([...item.first_name][0]) : ''}${item.last_name && item.last_name.length > 0 ? `${Capitalize([...item.last_name][0])}` : ''
                                }`}
                            size={12}
                        />
                    )
                }
            </TouchableOpacity>
        )
    }


    const __flattenArr = () => {
        let flattenedArr = []
        if (data && data?.pages && Array.isArray(data?.pages)) {
            flattenedArr = data?.pages
        }
        let flattenArr = flattenedArr.map((res) => {
            if (!res) return {}
            return res.results
        })
        let arr = flattenArr.flat()

        if (page > 1)
            return setItem([...item, ...arr])
        setItem(arr)

    }

    useEffect(() => {
        __flattenArr()
    }, [data, counts])

    return (
        <Container
            backgroundColor={AppColors.white}
            width={90}
            marginTop={3}
            style={{
                borderWidth: width(0.1),
                borderColor: AppColors.transparent,
                ...AppColors.smallShadow,
                borderRadius: width(3),
                alignSelf: 'center',
            }}>

            <View style={[styles.container, { width: width(90) }]}>
                <View style={styles.row}>
                    <Container width={50} backgroundColor={"transparent"}>
                        <View style={styles.row1}>
                            <Text style={styles.text}>My Team</Text>
                        </View>
                    </Container>
                    <Button
                        title="View all"
                        textStyle={styles.buttonText}
                        containerStyle={styles.button}
                        onPress={() => navigation.navigate('search', { team })}
                        icon={
                            <Feather name='chevron-right' size={15} style={styles.icon} />}
                    />
                </View>


                <View>
                    <Progress.Bar progress={0.2} width={400} style={styles.line} color={'#2898A4'} backgroundColor={AppColors.green1} />
                </View>

                <View style={styles.row}>
                    <Text style={styles.count}> {counts?.completed_count}/{total ? total : 0} </Text>
                    <Text style={styles.task}>tasks</Text>
                </View>

                <Container marginBottom={1.3}>
                    <FlatList
                        data={item}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={RenderItem}
                        horizontal
                        ItemSeparatorComponent={() => <View style={[CommonStyles.marginRight_3]} />}
                        showsHorizontalScrollIndicator={false}
                        nestedScrollEnabled={true}
                    />
                </Container>

            </View>


        </Container>
    )
}

export default Index
