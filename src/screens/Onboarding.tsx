import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Button} from '@components/molecules';
import {Image} from 'react-native';
import {Typography} from '@components/atom';
import COLORS from '@constant/colors';

const Onboarding = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      navigation.navigate('Login');
    }
  };

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;
  const Indicator = ({currentIndex}) => {
    return (
      <View style={styles.indicatorContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentIndex
                ? styles.activeIndicator
                : styles.inactiveIndicator,
            ]}
          />
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.image} />
            <Typography type="heading" size="xlarge">
              {item.title}
            </Typography>
            <Typography
              type="paragraph"
              size="medium"
              style={{textAlign: 'center'}}>
              {item.description}
            </Typography>
          </View>
        )}
        keyExtractor={item => item.key}
      />
      <Indicator currentIndex={currentIndex} />

      <Button
        onPress={handleNext}
        disabled={false}
        type="text-only"
        variant="primary"
        size="medium">
        {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
      </Button>
    </View>
  );
};
const {width} = Dimensions.get('window');

export default Onboarding;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 44,
    justifyContent: 'center',
  },
  flex: {flex: 1},
  itemContainer: {
    width: width - 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
  },
  indicatorContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: COLORS.purple600,
  },
  inactiveIndicator: {
    backgroundColor: COLORS.purple200,
  },
});

const onboardingData = [
  {
    key: '1',
    title: 'Connect',
    description:
      'Dapatkan akses ke investor profesional terpercaya dan mulai investasi bareng teman dan komunitas',
    image: require('../../assets/img/connect.png'),
  },
  {
    key: '2',
    title: 'Learn',
    description:
      'Dapatkan ide investasi dan informasi terpercaya langsung dari ahlinya biar kamu makin jago dan makin cuan!',
    image: require('../../assets/img/learn.png'),
  },
  {
    key: '3',
    title: 'Invest',
    description:
      'Atur portfolio kamu dan langsung berinvestasi dengan mudah dengan beragam pilihan aset',
    image: require('../../assets/img/invest.png'),
  },
];
