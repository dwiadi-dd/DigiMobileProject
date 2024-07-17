import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, memo} from 'react';
import SPACING from '@constant/spacing';
import {Icon} from '@components/atom';
import COLORS from '@constant/colors';

export const SkeletonPostItem: FC = () => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.headContainer}>
        <View style={[styles.imageSize, styles.skeletonAvatar]} />
        <View>
          <View style={styles.header}>
            <View style={[styles.skeletonTextFull]} />
            <Icon name="ellipsis" width={14} height={14} />
          </View>
          <View style={styles.skeletonText} />
          <View style={styles.skeletonText} />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <TouchableOpacity>
          <View style={styles.skeletonText} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.skeletonText} />
        </TouchableOpacity>
      </View>

      <View style={styles.skeletonLabel} />

      <View style={styles.footer}>
        <View style={styles.voteContainer}>
          <TouchableOpacity style={styles.voteButton}>
            <Icon
              width={16}
              height={16}
              name="arrow-down"
              fill={COLORS.neutral700}
            />
            <View style={styles.skeletonText} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.voteButton}>
            <Icon
              width={16}
              height={16}
              name="arrow-up"
              fill={COLORS.neutral700}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.footerButton}>
          <Icon
            width={16}
            height={16}
            name="comment"
            fill={COLORS.neutral700}
          />
          <View style={styles.skeletonText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon
            width={16}
            height={16}
            name="retweet"
            fill={COLORS.neutral700}
          />
          <View style={styles.skeletonText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(SkeletonPostItem);

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    padding: 10,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  },
  skeletonTextFull: {
    backgroundColor: '#ddd',
    height: 16,
    marginBottom: 8,
    width: 100,
  },
  skeletonLabel: {
    backgroundColor: '#ddd',
    width: 60,
    height: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
});
