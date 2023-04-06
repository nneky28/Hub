import { StyleSheet, Text, View, TouchableOpacity, Platform, Image } from 'react-native'
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
import { Images } from '../../component2/image/Image';


const TaskLandingPage = () => {
    const [index, setIndex] = useState(0);
    const [empty, setEmpty] = useState(true)
    const [video, setVideo] = useState(true)
    const [tab, setTab] = useState('Date');
    const [margin, setMargin] = useState(0.1);
    const [visible, setVisible] = useState(false)


    const setButtons = (i) => {
        setIndex(i);
        var margin = i * 30;
        if (margin == 0) margin = 0.1;
        setMargin(width(margin));
    };
    const AddButton = ({ onPress, style }) => (
        <TouchableOpacity
            style={style}
            onPress={onPress} >
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
                    <View style={styles.logoBox}>
                        <Image source={{ uri: Images.TaskLogo }} style={styles.logo} />
                    </View>
                    <Text numberOfLines={1} style={styles.screenTitle}>
                        Tasks
                    </Text>

                </View>
                <View style={styles.line} />
            </View>


            <View style={styles.scroll}>
                <View style={styles.threeButtonCont}>
                    {
                        ['My Tasks', 'Sent Tasks', 'My Team'].map((item, i) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setButtons(i)

                                }}
                                style={styles.button}
                                activeOpacity={0.8}
                                key={i}>
                                <Text style={[styles.buttonText, index === i && styles.buttonText1]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                    <AnimatedView marginLeft={margin} styles={[styles.animatedView]} />
                </View>

                <View style={styles.emptyCon}>
                    <Text style={styles.emptyText}>You have no tasks yet. Click the add  (+) icon to create your first task</Text>
                </View>
            </View>



            {/* {video ?
                <OnboardingVideos
                    visible={video}
                    onHide={() => {
                        setVideo(false)
                        showFlashMessage({
                            title: "There are no people in your company.  Adding people will enable you assign tasks directly to people or department",
                            duration: 7000,
                            type: 'info',
                            statusBarHeight: Platform.OS === "android" ? 7 : Platform.OS === "ios" ? 13 : null
                        })
                    }

                    }
                /> : null
            }  */}
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

export default TaskLandingPage

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
    scroll: {
        backgroundColor: '#F5F5F5',
        paddingBottom: height(50),

    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: AppColors.gray1,
        marginTop: height(1.5),
        elevation: 0,
    },
    header: {
        width: width(100),
        paddingHorizontal: width(5),
        marginTop: height(2),
        marginBottom: height(0.5),
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
    screenTitle: {
        fontSize: width(5),
        color: AppColors.black1,
        fontFamily: FontFamily.BlackSansBold,
        paddingHorizontal: width(2)

    },
    logoBox: { backgroundColor: '#FDEDCE', padding: width(1.5), borderRadius: width(1.5) },
    logo: { width: width(4.5), height: height(2), borderRadius: 50, alignSelf: 'center', },
    threeButtonCont: {
        width: width(90),
        alignSelf: 'center',
        marginTop: height(4),
        borderWidth: 1,
        borderColor: AppColors.grayBorder,
        borderRadius: width(15),
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: height(4.5),
        alignItems: 'center',
        backgroundColor: AppColors.whiteBase
    },

    animatedView: {
        position: 'absolute',
        width: width(27),
        backgroundColor: AppColors.white,
        height: height(3),
        borderRadius: width(15),
        zIndex: -1,

    },

    button: {
        width: '30%',
        height: height(3),
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        fontSize: width(3.3),
        color: AppColors.black,
        fontFamily: FontFamily.BlackSansRegular
    },
    buttonText1: {
        color: AppColors.black,
        fontFamily: FontFamily.BlackSansBold
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