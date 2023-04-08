import React, { useEffect } from 'react';
import { View, BackHandler, Linking } from 'react-native';
import AppColors from '../../utills/AppColors';
import { Container, EmptyStateWrapper, H1, OnboardModal, SizedBox } from '../../utills/components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BASE_URL } from '../../utills/Constants';
import { Images } from '../../component2/image/Image';
import { useAppSelector } from '../../utills/Methods';
import styles from "./styles"
import { RootAuthScreenProps } from '../../Routes/types';
import ScreenWrapper from '../../components/ScreenWrapper';
import Button from '../../components/Button';


export default function Welcome(props : RootAuthScreenProps) {
  const [data, setData] = React.useState({
    email: "",
    password: ""
  })
  const auth = useAppSelector((state) => state.Auth);

  useEffect(() => {
    if (auth && auth.user && auth.user.email) {
      setData({ ...data, email: auth.user.email })
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  return (
    <ScreenWrapper backgroundColor={AppColors.welcome_green}>
            <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop: "30%",
          backgroundColor: AppColors.welcome_green
        }}
      >
        <Container
          backgroundColor={AppColors.welcome_green}
          paddingLeft={5}
          paddingRight={5}
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <H1 fontSize={8} color={AppColors.green}
            textAlign="center"
          >An employee</H1>
          <H1 fontSize={8} color={AppColors.green}
            textAlign="center"
          >Self-service app</H1>
          <Container width={80}
            backgroundColor={AppColors.welcome_green}
          >
            <H1 fontSize={5} color={AppColors.welcomePink} textAlign="center"
            >to manage all your information and more.</H1>
          </Container>
        </Container>
        <EmptyStateWrapper
          marginTop={2}
          icon={Images.Welcome}
          height={35}
          backgroundColor={AppColors.welcome_green}
        />
        <Container marginTop={3} width={90}
          backgroundColor={AppColors.welcome_green}
        >
          <Button
            title={'Sign In'}
            onPress={() => props.navigation.navigate("Login")}
            containerStyle={styles.button}
          />
          <SizedBox size={3} backgroundColor={AppColors.welcome_green} />
          <TouchableOpacity
            style={{
              backgroundColor: AppColors.welcome_green
            }}
            onPress={() => {
              Linking.openURL(`${BASE_URL}mobile-app-redirect`)
            }}
          >
            <Container
              backgroundColor={AppColors.welcome_green}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <H1 fontSize={3.5} textAlign="center" color={AppColors.black2}>Invited to myedge?</H1>
              <H1 fontSize={3.5} textAlign="center" color={AppColors.black2}
                underline={"underline"}
                lineColor={AppColors.black}
              >Accept Invitation</H1>
            </Container>
          </TouchableOpacity>
        </Container>
        {
          auth.onboard && auth.url ? <OnboardModal visible={auth.onboard} url={auth.url} /> : null
        }
      </View>
    </ScreenWrapper>
  );
}

