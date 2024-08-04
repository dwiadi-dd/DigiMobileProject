import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLORS from '@constant/colors';
import {TextField} from '@components/molecules';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import PostItem from '@components/organism/PostItem';
import {Icon, Typography} from '@components/atom';
import {useFeedStore} from '@stores/feedStore';

type DetailPostRouteProp = RouteProp<
  {DetailPost: {postId: string}},
  'DetailPost'
>;

export const DetailPost = () => {
  const navigation = useNavigation();
  const route = useRoute<DetailPostRouteProp>();
  const {postId} = route.params;

  const {getPostById} = useFeedStore();
  const post = getPostById(postId);
  const handleBack = () => {
    navigation.goBack();
  };
  if (!post) {
    return (
      <View>
        <Typography type="heading" size="medium">
          Post not found
        </Typography>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <TouchableOpacity onPress={handleBack}>
            <Icon name="chevron-left" />
          </TouchableOpacity>
        </View>
        <Typography
          type="heading"
          size="large"
          style={{color: COLORS.neutral700}}>
          Post
        </Typography>
      </View>
      <PostItem post={post} />
      <View style={styles.flex} />
      <View style={styles.footerContainer}>
        <View style={styles.textContainer}>
          <TextField
            placeholder="Apa yang ingin kamu tanyakan?"
            type="no-label"
          />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, paddingTop: 200},
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 24,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
  },
  buttonContainer: {
    backgroundColor: COLORS.neutral400,
    width: 48,
    height: 48,
    paddingTop: 8,
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
