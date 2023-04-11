import React, {useState} from 'react';
import {View} from 'react-native';
import BenifitList from '../../components/BenifitList';
import { HomePageHeader } from '../../components/Headers/CustomHeader';
import ScreenWrapper from '../../components/ScreenWrapper';
import {useFetchAboutMeProps} from '../../components/TimeoffModal/types';
import {useFetchAboutMe, useFetchBenefits} from '../../utills/api';
import {Images} from "../../utills/Image"
import {
  Container,
  CustomWebView,
  H1,
  PageLoader,
} from '../../utills/components';
import styles from './styles';





  export default function Benefits() {

  return (
    <ScreenWrapper>
      <React.Fragment>
          <HomePageHeader header='Benefits' 
            image={Images.people}
          />
          <View style={styles.mainViewContainer}>
            {isLoading ? <PageLoader /> : null}
            {!isLoading ? (
              <React.Fragment>
                <Container width={90} marginTop={2}>
                  <H1 fontSize={3.4}>Company benefits you are enrolled on</H1>
                </Container>
                <BenifitList
                  data={['#C2D4FF', '#99E6FF']}
                  horizontal={false}
                  benefits={
                    Array.isArray((benefits as {results: Array<any>}).results)
                      ? (benefits as {results: Array<any>}).results
                      : []
                  }
                  goToWeb={goToWeb}
                />
              </React.Fragment>
            ) : null}
          </View>
        {web ? 
          <CustomWebView setShow={closeWeb} web_url={web_url} />
        : null}
      </React.Fragment>
    </ScreenWrapper>
  );
}
