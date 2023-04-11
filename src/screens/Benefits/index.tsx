import React, {useState} from 'react';
import {Text, View} from 'react-native';
import BenifitList from '../../components/BenifitList';
import ScreenWrapper from '../../components/ScreenWrapper';
import {useFetchAboutMeProps} from '../../components/TimeoffModal/types';
import {useFetchAboutMe, useFetchBenefits} from '../../utills/api';
import {
  BackHandler,
  Container,
  CustomWebView,
  H1,
  PageLoader,
} from '../../utills/components';
import styles from './styles';


export default function Benefits() {
  const [web, setWeb] = useState<boolean>(false);
  const [web_url, setWebUrl] = useState<string | null>(null);

  const {data: profile} = useFetchAboutMe('main') as useFetchAboutMeProps;

  const {data: benefits = {results: []}, isLoading} = useFetchBenefits(
    profile?.id,
  );

  const goToWeb = (url: string | null) => {
    setWebUrl(url);
    setWeb(true);
  };
  const closeWeb = () => {
    setWeb(false);
  };
  React.useEffect(() => {}, [profile]);

  return (
    <ScreenWrapper scrollEnabled={false}>
      {web ? (
        <CustomWebView setShow={closeWeb} web_url={web_url} />
      ) : (
        <React.Fragment>
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
              <React.Fragment>
                <Container width={90} marginTop={2}>
                  <H1 fontSize={3.4}>Company benefits you are enrolled on</H1>
                </Container>
                {/* <BenifitList data={['#C2D4FF', '#99E6FF']} 
                                horizontal={false}
                                benefits={Array.isArray(benefits.results) ? benefits.results : []}
                                goToWeb={goToWeb}
                            />  */}
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
        </React.Fragment>
      )}
    </ScreenWrapper>
  );
}
