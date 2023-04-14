import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import TrainingList from '../../components/TrainingList';
import {
  useFetchAboutMe,
  useFetchTrainings,
  useFetchTrainingsHist,
} from '../../utills/api';
import {
  Container,
  EmptyStateWrapper,
  PageLoader,
} from '../../utills/components';
import {Images} from '../../utills/Image';
import {useFetchAboutMeProps} from '../../components/TimeoffModal/types';
import {TrainingType, useFetchTrainingsProps} from './types';
import {HomePageHeader} from '../../components/Headers/CustomHeader';
import styles from './styles';

export default function Training() {
  var [selected, setSelected] = useState('Upcoming');
  const [histories, setHistories] = useState<TrainingType[]>([]);
  const [trainings, setTrainings] = useState<TrainingType[]>([]);

  const {data: profile} = useFetchAboutMe('main') as useFetchAboutMeProps;

  const {data: training, isLoading: loading} = useFetchTrainings(
    profile?.id,
  ) as useFetchTrainingsProps;

  const {data: history, isLoading: loadingHistory} = useFetchTrainingsHist(
    profile?.id,
  ) as useFetchTrainingsProps;

  const getData = () => {
    let allTrainings = training?.results;
    if (allTrainings && Array.isArray(allTrainings)) {
      setTrainings(allTrainings);
    }
    let allHistories = history?.results;
    if (allHistories && Array.isArray(allHistories)) {
      setHistories(allHistories);
    }
  };

  useEffect(() => {
    getData();
  }, [training, history]);

  return (
    <ScreenWrapper
      scrollEnabled={
        selected === 'Available' &&
        trainings &&
        Array.isArray(trainings) &&
        trainings?.length === 0
          ? false
          : true
      }>
      <HomePageHeader header="Training" image={Images.people} />

      <View style={styles.mainViewContainer}>
        <Container
          style={{
            flexDirection: 'row',
          }}
          paddingTop={2}
          paddingHorizontal={5}
          width={90}>
          {['Upcoming', 'History'].map((item, index) => (
            <TouchableOpacity onPress={() => setSelected(item)} key={index}>
              <Text
                style={[
                  styles.heading,
                  selected == item && styles.selectedHeading,
                ]}>
                {item}
              </Text>
              {selected == item && <View style={styles.animated} />}
            </TouchableOpacity>
          ))}
        </Container>
        <View style={styles.line2} />

        {loading || loadingHistory ? (
          <PageLoader />
        ) : (
          <React.Fragment>
            {selected === 'Upcoming' && (
              <>
                {trainings &&
                Array.isArray(trainings) &&
                trainings.length > 0 ? (
                  <TrainingList data={trainings} />
                ) : (
                  <EmptyStateWrapper
                    icon={Images.EmptyTraining}
                    header_1={'You have no upcoming'}
                    header_2={'training.'}
                    sub_text={'When you do, they will show up here.'}
                  />
                )}
              </>
            )}
          </React.Fragment>
        )}

        {selected === 'History' ? (
          <React.Fragment>
            {histories && Array.isArray(histories) && histories.length > 0 ? (
              <TrainingList data={histories} opacity={0.5} />
            ) : (
              <EmptyStateWrapper
                icon={Images.EmptyTraining}
                header_1={' You have not taken'}
                header_2={' any training yet.'}
                sub_text={'When you do, they will show up here.'}
              />
            )}
          </React.Fragment>
        ) : null}
      </View>
    </ScreenWrapper>
  );
}
