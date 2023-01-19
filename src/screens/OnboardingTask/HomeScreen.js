import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import OnboardingVideos from '../../components/OnboardingVideos/Index'
import { showFlashMessage } from '../../components/SuccessFlash/index';
import CreateTask from '../CreateTask/Index'
import ScreenWrapper from '../../components/ScreenWrapper'
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { FontFamily } from '../../utills/FontFamily';
import { NotifyHandler } from '../../utills/components';
import AnimatedView from '../../components/AnimatedView/index';


const HomeScreen = () => {
    const [empty, setEmpty] = useState(true)
    const [video, setVideo] = useState(true)
    const [tab, setTab] = useState('Date');
    const [index, setIndex] = useState('Task To-do');
    const [margin, setMargin] = useState(0.1);
    const [visible, setVisible] = useState(false)

    const setButtons = (i) => {
        setIndex(i);
        var margin = i * 45;
        if (margin == 0) margin = 0.1;
        setMargin(width(margin));
    };
    const AddButton = ({ onPress, style }) => (
        <TouchableOpacity
            style={style}
            onPress={onPress}

        >
            <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper scrollEnabled={false}
            footerUnScrollable={() => {
                return (
                    <AddButton
                        style={styles.emptyState}
                        onPress={() => setVisible(true)}
                    />

                )
            }}>
            <View style={styles.mainViewContainer}>
                <View style={styles.header}>
                    <Text numberOfLines={1} style={styles.screenTitle}>
                        Tasks
                    </Text>
                    <NotifyHandler />
                </View>
                <View style={styles.line} />
                <View style={styles.threeButtonCont}>
                    {
                        ['Task To-do', 'Sent Task'].map((item, i) => (
                            <TouchableOpacity
                                onPress={() => setButtons(i)}
                                style={styles.button}
                                activeOpacity={0.8}
                                key={i}
                            >
                                <Text style={[styles.buttonText, index == i && styles.buttonText1]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                    <AnimatedView marginLeft={margin} styles={styles.animatedView} />

                </View>
                <View style={styles.twoButtonCont}>
                    {
                        ['Date', 'Status'].map((item, i) => (
                            <TouchableOpacity
                                onPress={() => setTab(item)}
                                style={styles.button3}
                                activeOpacity={0.8}
                                key={i}
                            >
                                <Text style={[styles.buttonText2, tab == item && styles.buttonText3]}>
                                    {item}
                                </Text>
                                {tab == item && <View style={styles.animatedView3} />}
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <View style={styles.emptyCon}>
                    <Text style={styles.emptyText}>You have no tasks yet. Click the add  (+) icon to create your first task</Text>
                </View>

            </View>

            {video ?
                <OnboardingVideos
                    visible={video}
                    onHide={() => {
                        setVideo(false)
                        showFlashMessage({
                            title: "There are no people in your company.  Adding people will enable you assign tasks directly to people or department",
                            duration: 4600,
                            type: 'info',
                            statusBarHeight: Platform.OS === "android" ? 7 : Platform.OS === "ios" ? 13 : null
                        })
                    }

                    }
                /> : null
            }
            {
                visible &&
                <CreateTask
                    visible={visible}
                    onHide={() => setVisible(false)}
                />
            }

        </ScreenWrapper>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    emptyState: {
        height: height(8),
        width: height(8),
        borderRadius: height(10),
        backgroundColor: '#ADE5EB',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: height(30),
        left: width(40),
        borderWidth: 0.1,
        borderColor: '#ADE5EB'
    },
    mainViewContainer: {
        backgroundColor: AppColors.white,
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: AppColors.gray1,
        marginTop: height(1),
        elevation: 0,
    },
    header: {
        width: width(100),
        paddingHorizontal: width(5),
        marginTop: height(2),
        marginBottom: height(0.5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    screenTitle: {
        fontSize: width(5),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansBold,

    },
    threeButtonCont: {
        width: width(90),
        alignSelf: 'center',
        marginTop: height(4),
        borderWidth: 1,
        borderColor: AppColors.grayBorder,
        borderRadius: 7,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: height(4.5),
        alignItems: 'center',
    },

    animatedView: {
        position: 'absolute',
        width: '49%',
        backgroundColor: AppColors.lightGreen,
        height: '90%',
        borderRadius: 5,
        left: 0,
        zIndex: -1,
        marginLeft: width(0.5)
    },
    button: {
        width: '90%',
        height: height(3.5),
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText1: {
        fontSize: width(3.3),
        color: AppColors.green,
        fontFamily: FontFamily.BlackSansBold
    },
    buttonText2: {
        fontSize: width(3.3),
        color: AppColors.black,
        fontFamily: FontFamily.BlackSansRegular
    },


    buttonText3: {
        fontSize: width(3.3),
        color: AppColors.green,
        fontFamily: FontFamily.BlackSansRegular
    },

    twoButtonCont: {
        width: width(40),
        alignSelf: 'flex-end',
        marginTop: height(3),
        borderWidth: 1,
        borderColor: AppColors.grayBorder,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: height(4),
        alignItems: 'center',
        marginRight: width(4)
    },
    button3: {
        width: '35%',
        height: height(3),
        alignItems: "center",
        justifyContent: "center"
    },
    emptyCon: {
        paddingHorizontal: width(18),
        marginTop: height(15)
    },
    emptyText: {
        textAlign: 'center',
        color: '#545454'
    },
    addButtonText: {
        fontSize: width(10),
        color: '#1E727B',
        fontFamily: FontFamily.BlackSansRegular
    },
})