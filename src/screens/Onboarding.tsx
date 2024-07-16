import {FlatList, StyleSheet, View, Image} from 'react-native';
import React, {FC, useRef, useState} from 'react';

import {NavigationProp} from '@react-navigation/native';
import COLORS from '@constant/colors';
import {Button} from '@components/molecules';
import {Typography} from '@components/atom';
import {onboardingData} from '@constant/onBoardingData';
import {screenWidth} from '@constant/globalSize';
import SPACING from '@constant/spacing';
import {IndicatorProps} from '@utils/props';

const Indicator: FC<IndicatorProps> = ({currentIndex}) => {
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

const Onboarding = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      navigation.navigate('Login');
    }
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: any[]}) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  ).current;

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
            <View style={styles.textContainer}>
              <Typography type="heading" size="xlarge">
                {item.title}
              </Typography>
              <Typography
                type="paragraph"
                size="medium"
                style={styles.centerText}>
                {item.description}
              </Typography>
            </View>
          </View>
        )}
        keyExtractor={item => item.key}
      />
      <Indicator currentIndex={currentIndex} />
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleNext}
          type="text-only"
          variant="primary"
          size="medium">
          {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SPACING.xl7,
    justifyContent: 'center',
    backgroundColor: COLORS.neutral100,
  },
  flex: {flex: 1},
  itemContainer: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
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
    height: SPACING.sm,
    width: SPACING.sm,
    marginHorizontal: SPACING.xs,
    borderRadius: SPACING.xs,
  },
  activeIndicator: {
    backgroundColor: COLORS.purple600,
    width: SPACING.xl,
    borderRadius: SPACING.xs,
  },
  textContainer: {
    paddingHorizontal: SPACING.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingHorizontal: SPACING.xl,
  },
  inactiveIndicator: {
    backgroundColor: COLORS.purple200,
  },
  centerText: {textAlign: 'center'},
});
