import {StyleSheet, View} from 'react-native';
import React from 'react';
import PostItem from '@components/molecules/PostItem';
import COLORS from '@constant/colors';
import {Button, TextField} from '@components/molecules';

export default function DetailPost() {
  const postdata = {
    avatar_url:
      'https://lwfiles.mycourse.app/656ef73b8e59fa6dfcddbe98-public/3073ed5d42a0e38174e311a1a0cb0800.png',
    name: 'test',
    headline: 'Mobile Engineer Expert',
    created_at: new Date().toISOString(),
    post_header: 'test',
    post_content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex aliquam tempora iusto officiis, porro recusandae itaque tempore velit dignissimos veritatis corrupti sint voluptates exercitationem laudantium maiores! Rerum ab earum eveniet?',
    post_topic: 'test',
    post_upvote: 0,
    post_downvote: 0,
    post_comment: 0,
    post_retweet: 0,
  };
  return (
    <View style={styles.container}>
      <PostItem post={postdata} />
      <View style={{flex: 1}} />

      <View style={styles.footerContainer}>
        <View style={{flex: 2, width: 'auto'}}>
          <TextField placeholder="What`s on your mind?" type="no-label" />
        </View>
        <Button
          type="icon-only"
          iconName="comment"
          variant="tertiary"
          size="small"
          disabled={false}
          children={null}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
  },
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
