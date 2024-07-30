import React, {FC, useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {Typography} from '@components/atom';
import COLORS from '@constant/colors';
import SPACING from '@constant/spacing';
import {IndicatorProps} from '@utils/props';

const StepperIndicator: FC<IndicatorProps> = ({currentStep, totalSteps}) => {
  const progressBarWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressBarWidth, {
      toValue: (Number(currentStep) / Number(totalSteps)) * 100,
      duration: 300, // duration of the animation in milliseconds
      useNativeDriver: false,
    }).start();
  }, [currentStep, totalSteps, progressBarWidth]);

  const progressBarWidthInterpolate = progressBarWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[styles.progressBar, {width: progressBarWidthInterpolate}]}
        />
      </View>
      <View style={styles.labelContainer}>
        <Typography type="paragraph" size="small" style={styles.stepText}>
          {`${currentStep} dari ${totalSteps}`}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: COLORS.neutral300,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.purple500,
  },
  labelContainer: {
    alignItems: 'flex-end',
    marginTop: SPACING.xs,
  },
  stepText: {
    color: COLORS.neutral500,
  },
});

export default StepperIndicator;
