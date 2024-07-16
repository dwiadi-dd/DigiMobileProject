import {StyleSheet, View} from 'react-native';
import React from 'react';
import COLORS from '@constant/colors';
import {TextField} from '@components/molecules';

import {RouteProp, useRoute} from '@react-navigation/native';
import PostItem from '@components/organism/PostItem';
import {PostItemProps} from '@utils/props';
import {Icon} from '@components/atom';

type DetailPostRouteProp = RouteProp<
  {DetailPost: {post: PostItemProps}},
  'DetailPost'
>;

export const DetailPost = () => {
  const route = useRoute<DetailPostRouteProp>();
  const {post} = route.params;

  return (
    <View style={styles.container}>
      <PostItem post={post} />
      <View style={styles.flex} />

      <View style={styles.footerContainer}>
        <View style={styles.textContainer}>
          <TextField placeholder="What`s on your mind?" type="no-label" />
        </View>
        <View style={styles.buttonContainer}>
          <Icon
            name="paper-plane"
            fill={COLORS.neutral100}
            width={24}
            height={24}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
  },
  buttonContainer: {
    backgroundColor: COLORS.neutral400,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  textContainer: {flex: 2, width: 'auto'},
  footerContainer: {
    flexDirection: 'row',
    width: 'auto',
    paddingVertical: 13,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 12,
    borderTopWidth: 1,
    borderColor: COLORS.neutral300,
  },
});
