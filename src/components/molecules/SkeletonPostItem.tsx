import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import SPACING from '@constant/spacing';
import {Icon} from '@components/atom';
import COLORS from '@constant/colors';

// @ts-nocheck
export const SkeletonPostItem: FC = () => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    );

    pulse.start();

    return () => pulse.stop();
  }, [pulseAnim]);

  const opacityStyle = {
    opacity: pulseAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.4, 1],
    }),
  };

  const SkeletonView = ({style}: any) => (
    <Animated.View style={[style, opacityStyle]} />
  );

  return (
    <View style={styles.postContainer}>
      <View style={styles.headContainer}>
        <SkeletonView style={[styles.imageSize, styles.skeletonAvatar]} />
        <View>
          <View style={styles.header}>
            <SkeletonView style={[styles.skeletonTextFull]} />
          </View>
          <SkeletonView style={styles.skeletonText} />
          <SkeletonView style={styles.skeletonText} />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <TouchableOpacity>
          <SkeletonView style={styles.skeletonText} />
        </TouchableOpacity>
        <TouchableOpacity>
          <SkeletonView style={styles.skeletonText} />
        </TouchableOpacity>
      </View>

      <SkeletonView style={styles.skeletonLabel} />
    </View>
  );
};

export default SkeletonPostItem;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    padding: 10,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 40,
  },
  headContainer: {flexDirection: 'row', alignItems: 'center', gap: 12},
  flex: {flex: 1},
  imageSize: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: SPACING.lg,
  },
  contentContainer: {
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
    paddingTop: 8,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 32,
    backgroundColor: COLORS.neutral200,
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 4,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 32,
    backgroundColor: COLORS.neutral200,
    gap: 4,
  },
  footerButtonText: {
    marginLeft: 5,
    color: COLORS.neutral700,
  },
  divider: {
    height: 20,
    width: 1,
    backgroundColor: '#ddd',
  },
  skeletonAvatar: {
    backgroundColor: '#ddd',
  },
  skeletonText: {
    backgroundColor: '#ddd',
    height: 16,
    marginBottom: 8,
    borderRadius: 4,
  },
  skeletonTextFull: {
    backgroundColor: '#ddd',
    height: 16,
    marginBottom: 8,
    width: 100,
    borderRadius: 4,
  },
  skeletonLabel: {
    backgroundColor: '#ddd',
    width: 60,
    height: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
});
