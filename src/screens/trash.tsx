import {Button} from '@components/molecules';
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
  const pan = useRef(new Animated.ValueXY()).current;
  const progressBarWidth = useRef(new Animated.Value(0)).current;
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {dx: pan.x}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: {x: 0, y: 0},
        useNativeDriver: false,
      }).start();
    },
  });

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
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Animated.View
          {...panResponder.panHandlers}
          style={[pan.getLayout(), styles.slider]}
        />
      </View>
      <ActivityIndicator size="large" color="#00ff00" />

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
          Sebelumnya
        </Button>
        <Button
          type="text-only"
          variant="primary"
          size="medium"
          onPress={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}>
          Selanjutnya
        </Button>
      </View>
      <View style={styles.skeletonContainer}>
        <Animated.View style={[styles.skeletonBox, {opacity}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#00224D',
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
    height: 20,
    backgroundColor: '#0B2F9F',
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
});

export default PlayGround;
