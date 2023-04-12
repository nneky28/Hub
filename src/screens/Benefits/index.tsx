import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import BenifitList from '../../components/BenifitList';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useFetchAboutMe, useFetchBenefits } from '../../utills/api';
import { BackHandler, Container, CustomWebView, H1, PageLoader } from '../../utills/components';
import styles from './styles';
import { useFetchAboutMeProps } from '../../components/TimeoffModal/types';



export default function Benefits() {
  const [web, setWeb] = useState(false);
  const [web_url, setWebUrl] = useState<string | null>(null);


  const {
    data : about,
  } = useFetchAboutMe("main") as useFetchAboutMeProps

  const {
    data: benefits,
    isLoading,
  } = useFetchBenefits(about?.id);



  const goToWeb = (url: string) => {
    setWebUrl(url);
    setWeb(true);
  };
  const closeWeb = () => {
    setWeb(false);
  };

  useEffect(() => {
  }, [about]);

  return (
    <ScreenWrapper scrollEnabled={false}>
      {web && web_url ? (
        <CustomWebView setShow={closeWeb} web_url={web_url} />
      ) : (
        <>
          <View style={styles.header}>
            <BackHandler />
            <Text numberOfLines={1} style={styles.screenTitle}>
              Benefits
            </Text>
          </View>
          <View style={styles.line} />

          <View style={styles.mainViewContainer}>
            {isLoading ? <PageLoader /> : null}
            {!isLoading ? (
              <>
                <Container width={90} marginTop={2}>
                  <H1 fontSize={3.4}>Company benefits you are enrolled on</H1>
                </Container>
                <BenifitList
                  data={['#C2D4FF', '#99E6FF']}
                  horizontal={false}
                  benefits={
                    benefits?.results &&
                    Array.isArray(benefits?.results) &&
                    benefits?.results.length > 0
                      ? benefits?.results
                      : []
                  }
                  goToWeb={goToWeb}
                />
              </>
            ) : null}
          </View>
        </>
      )}
    </ScreenWrapper>
  );
}
