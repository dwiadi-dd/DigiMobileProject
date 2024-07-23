import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import SPACING from '@constant/spacing';
import Avatar from '@components/atom/Avatar';
import {Icon, Typography} from '@components/atom';
import COLORS from '@constant/colors';
import {formatTimeAgo} from '@utils/helper';
import {PostItemProps} from '@utils/props';
import {Label} from '@components/molecules';

export const PostItem = ({post}: {post: PostItemProps}) => {
  if (!post) {
    return null;
  }

  return (
    <View style={styles.postContainer}>
      <View style={styles.headContainer}>
        <Avatar image={post.avatar_url} size="large" />
        <View style={styles.headerPartInfo}>
          <View style={styles.header}>
            <Typography type="heading" size="small">
              {post.name}
            </Typography>
            <View style={styles.touchWrapper}>
              <Icon name="ellipsis" width={14} height={14} />
            </View>
          </View>
          <Typography
            type="paragraph"
            size="medium"
            style={{color: COLORS.neutral600}}>
            {post.headline}
          </Typography>
          <Typography
            type="paragraph"
            size="small"
            style={{color: COLORS.neutral600}}>
            {formatTimeAgo(new Date(post.created_at))}
          </Typography>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Typography type="heading" size="medium">
          {post.post_header}
        </Typography>
        <Typography type="paragraph" size="medium">
          {post.post_content}
        </Typography>
      </View>
      <Label color="green" variant="tertiary">
        {post.post_topic}
      </Label>
      <View style={styles.footer}>
        <View style={styles.voteContainer}>
          <TouchableOpacity style={styles.voteButton}>
            <Icon
              width={16}
              height={16}
              name="arrow-down"
              fill={COLORS.neutral700}
            />
            <Typography type="paragraph" size="small">
              {post.post_upvote}
            </Typography>
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
          <Typography type="paragraph" size="small">
            {post.post_comment}
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon
            width={16}
            height={16}
            name="retweet"
            fill={COLORS.neutral700}
          />
          <Typography type="paragraph" size="small">
            {post.post_retweet}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  headContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
  },
  flex: {
    flex: 1,
  },
  headerPartInfo: {
    flex: 1,
    gap: 3,
  },
  contentContainer: {
    marginTop: 12,
    marginBottom: 8,
    gap: SPACING.xs,
  },
  touchWrapper: {
    width: 100,
    flex: 1,
    alignItems: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
