import { ImageBackground, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import styles from './style';
import { width, height } from 'react-native-dimension';
import { ImgBg } from '../../assets/images';
import Button from '../../components/Button';
import AppColors from '../../utills/AppColors';
import { Container } from '../../utills/components';
import Feather from 'react-native-vector-icons/Feather';
import Loader from '../../components/Loader';
import { getData } from '../../utills/Methods';

const index = ({ navigation }) => {
  const [isDataPresent, setIsDataPresent] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigation = () => {
    if (isDataPresent) {
      return navigation.navigate('Dashboard')
    }
    navigation.navigate("Login")
  }

  useEffect(() => {
    const checkDataPresence = async () => {
      try {
        const value = await getData('sign up details');
        if (value !== null) {
          setIsDataPresent(true);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    checkDataPresence();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <ScreenWrapper backgroundColor={AppColors.grayBorder}>
      <Container style={styles.mainViewContainer}>
        <Container>
          <Text style={styles.screenTitle}>Define</Text>
          <Text style={styles.screenTitle}>Yourself in</Text>
          <Text style={styles.screenTitle}>Your</Text>
          <Text style={styles.screenTitle}>Unique</Text>
          <Text style={styles.screenTitle}>Way.</Text>
          <ImageBackground
            source={ImgBg}
            imageStyle={{
              resizeMode: 'cover',
              height: height(71),
              width: width(200),
            }}
            style={styles.bg_img}
          />
        </Container>
      </Container>
      <Button
        title="Get Started"
        onPress={() => handleNavigation({ isDataPresent })}
        icon={<Feather name="arrow-right" size={15} style={styles.icon} />}
      />
    </ScreenWrapper>
  );
};

export default index;
