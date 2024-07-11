import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import SPACING from '@constant/spacing';
import Typhography from '@components/atom/Typhography';
import Avatar from '@components/atom/Avatar';
import {Icon, Typography} from '@components/atom';
import Label from './Label';
import COLORS from '@constant/colors';
import {formatTimeAgo} from '@utils/helper';

function PostItem({post}: {post: any}) {
  handleDetailPost = () => {
    navigation.navigate('DetailPost');
  };
  return (
    <View style={styles.postContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
        <Avatar image={post?.avatar_url} size="large" />
        <View>
          <View style={styles.header}>
            <Typography type="heading" size="medium">
              {post?.name}
            </Typography>
            <Icon name="ellipsis" width={14} height={14} />
          </View>
          <Typography type="paragraph" size="medium">
            {post?.headline}
          </Typography>
          <Typography type="paragraph" size="small">
            {formatTimeAgo(new Date(post?.created_at))}
          </Typography>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Typhography type="heading" size="medium">
          {post?.post_header}
        </Typhography>
        <Typhography type="paragraph" size="medium">
          {post?.post_content}
        </Typhography>
      </View>
      <Label color="green" variant="tertiary">
        Promo
      </Label>
      <View style={styles.footer}>
        <View style={styles.voteContainer}>
          <TouchableOpacity style={styles.voteButton}>
            <Icon
              width={16}
              height={16}
              name="arrow-up"
              fill={COLORS.neutral700}
            />
            <Typhography type="paragraph" size="small">
              {post?.post_upvote}
            </Typhography>
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity style={styles.voteButton}>
            <Icon
              width={16}
              height={16}
              name="arrow-down"
              fill={COLORS.neutral700}
            />
            <Typhography type="paragraph" size="small">
              {post?.post_downvote}
            </Typhography>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.footerButton}>
          <Icon
            width={16}
            height={16}
            name="comment"
            fill={COLORS.neutral700}
          />
          <Typhography type="paragraph" size="small">
            {post?.post_comment}
          </Typhography>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon
            width={16}
            height={16}
            name="retweet"
            fill={COLORS.neutral700}
          />
          <Typhography type="paragraph" size="small">
            {post?.post_retweet}
          </Typhography>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default memo(PostItem);

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    padding: 10,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
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
});
