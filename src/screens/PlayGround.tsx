import {Typography} from '@components/atom';
import {Button, SkeletonPostItem} from '@components/molecules';
import COLORS from '@constant/colors';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  PanResponder,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
// @ts-nocheck
const PlayGround: React.FC = () => {
  const progressBarWidth = useRef(new Animated.Value(0)).current;
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;

  const progressBarWidthInterpolate = progressBarWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    Animated.timing(progressBarWidth, {
      toValue: (currentStep / totalSteps) * 100,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [currentStep, totalSteps, progressBarWidth]);

  const progressPercentage = (currentStep / totalSteps) * 100;
  console.log(progressBarWidthInterpolate);
  return (
    <View style={styles.container}>
      {/* <Typography size="large" type="heading" style={styles.centerText}>
        {`${currentStep} of ${totalSteps}`}
      </Typography>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, {width: `${progressPercentage}%`}]} />
      </View>
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[styles.progressBar, {width: progressBarWidthInterpolate}]}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          type="text-only"
          variant="primary"
          size="medium"
          onPress={() => setCurrentStep(Math.max(0, currentStep - 1))}>
          mundur
        </Button>
        <Button
          type="text-only"
          variant="primary"
          size="medium"
          onPress={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}>
          {`  maju  `}
        </Button>
      </View> */}
      <SkeletonPostItem />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#fff',
    padding: 20,
  },
  slider: {
    width: 100,
    height: 100,
    backgroundColor: '#FF204E',
    borderRadius: 50,
    marginBottom: 20,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: COLORS.purple200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF204E',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  skeletonContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  skeletonBox: {
    width: 200,
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  centerText: {textAlign: 'center'},
});

export default PlayGround;
