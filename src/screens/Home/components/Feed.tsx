import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Typography} from '@components/atom';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PostItemProps} from '@utils/props';
import useAuth from '@hooks/useAuth';
import {usePosts} from '@contexts/PostContext';
import SPACING from '@constant/spacing';
import {SkeletonPostItem} from '@components/molecules';
import PostItem from '@components/organism/PostItem';

const Feed = ({sortBy}: {sortBy: string}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {posts, refreshPosts} = usePosts();
  const {loading} = usePosts();
  const [refreshing, setRefreshing] = useState(false);

  const sortedPosts = useMemo(() => {
    if (sortBy === 'trend') {
      return [...posts].sort((a, b) => b.post_upvote - a.post_upvote);
    }
    if (sortBy === 'news') {
      return [...posts].sort(
        (a, b) =>
          Number(new Date(b.created_at)) - Number(new Date(a.created_at)),
      );
    }
    return posts;
  }, [posts, sortBy]);
  const handleDetail = useAuth(
    useCallback(
      (post: PostItemProps) => {
        navigation.navigate('Post', {post});
      },
      [navigation],
    ),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshPosts();
    setRefreshing(false);
  }, [refreshPosts]);

  const Footer = useMemo(
    () => (
      <View style={styles.footerContainer}>
        <Typography type="paragraph" size="small">
          Semua feed sudah kamu lihat 🎉
        </Typography>
      </View>
    ),
    [],
  );

  return (
    <FlatList
      data={sortedPosts}
      renderItem={({item, index}) =>
        loading ? (
          <SkeletonPostItem key={index} />
        ) : (
          <TouchableOpacity onPress={() => handleDetail(item)}>
            <PostItem post={item} />
          </TouchableOpacity>
        )
      }
      keyExtractor={(item, index) => index.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={Footer}
    />
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
    alignItems: 'center',
  },
});

export default Feed;
