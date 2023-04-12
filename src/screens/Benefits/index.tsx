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
import { useFetchBenefitsProps } from '../Dashboard/types';


export default function Benefits() {
  const [web, setWeb] = useState<boolean>(false);
  const [web_url, setWebUrl] = useState<string | null>(null);

  const {data: profile} = useFetchAboutMe('main') as useFetchAboutMeProps;
  const {
    data: benefits,
    isLoading
  } = useFetchBenefits(profile?.id) as useFetchBenefitsProps

  const goToWeb = (url: string | null) => {
    setWebUrl(url);
    setWeb(true);
  };
  const closeWeb = () => {
    setWeb(false);
  };
  
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
              {
                     benefits?.results && Array.isArray(benefits?.results) && benefits?.results.length > 0 ? (
                      <React.Fragment>
                        <BenifitList
                          data={['#C2D4FF', '#99E6FF']}
                          horizontal={benefits?.results.length === 1 ? false : true}
                          benefits={benefits?.results}
                          goToWeb={goToWeb}
                        />
                      </React.Fragment>
                    ) : null
                  }
              </React.Fragment>
            ) : null}
          </View>
        {web && web_url ? 
          <CustomWebView setShow={closeWeb} web_url={web_url} />
        : null}
      </React.Fragment>
    </ScreenWrapper>
  );
}
