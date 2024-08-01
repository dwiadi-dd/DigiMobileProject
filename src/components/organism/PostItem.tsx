import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo, useState} from 'react';
import SPACING from '@constant/spacing';
import Avatar from '@components/atom/Avatar';
import {Icon, Typography} from '@components/atom';
import COLORS from '@constant/colors';
import {formatTimeAgo} from '@utils/helper';
import {Label} from '@components/molecules';
import {FeedItemProps} from '@utils/props';

export const PostItem = ({post}: {post: FeedItemProps}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const content = post?.content || '';
  const maxChars = 120;

  if (!post) {
    return null;
  }

  return (
    <View style={styles.postContainer}>
      <View style={styles.headContainer}>
        <Avatar image={post?.user?.profile_path} size="large" />
        <View style={styles.headerPartInfo}>
          <View style={styles.header}>
            <Typography type="heading" size="small">
              {post?.user?.name}
            </Typography>
            <View style={styles.touchWrapper}>
              <Icon name="ellipsis" width={14} height={14} />
            </View>
          </View>
          <Typography
            type="paragraph"
            size="medium"
            style={{color: COLORS.neutral600}}>
            {post?.header}
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
          {post?.header}
        </Typography>
        <Typography type="paragraph" size="medium">
          {isExpanded
            ? content
            : `${content.slice(0, maxChars)}${
                content.length > maxChars ? '...' : ''
              }`}
        </Typography>
        {content.length > maxChars && (
          <TouchableOpacity onPress={toggleReadMore}>
            <Typography
              type="paragraph"
              size="small"
              color={{color: COLORS.neutral200}}>
              {isExpanded ? 'Read Less' : 'Read More'}
            </Typography>
          </TouchableOpacity>
        )}
      </View>
      <Label color="green" variant="tertiary">
        {post?.topic?.label}
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
              {post?.upvotes}
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
            {post?.total_comments}
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
            {post?.reposts}
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
