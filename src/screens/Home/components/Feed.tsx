import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Typography} from '@components/atom';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import PostItem from '@components/organism/PostItem';
import useAuth from '@hooks/useAuth';
import SPACING from '@constant/spacing';
import {SkeletonPostItem} from '@components/molecules';
import {useFeedStore} from '@stores/feedStore';

const Feed = ({sortBy}: {sortBy: string}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [page, setPage] = useState<number>(1);

  const {feedData, loading, error, fetchFeed} = useFeedStore();

  const handleDetail = useAuth(
    useCallback(
      (postId: string) => {
        navigation.navigate('Post', {postId});
      },
      [navigation],
    ),
  );

  const onRefresh = useCallback(() => {
    setPage(1);
    fetchFeed(sortBy, 1);
  }, [fetchFeed, sortBy]);

  useEffect(() => {
    fetchFeed(sortBy, page);
  }, [page, sortBy, fetchFeed]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const onEndReach = useCallback(() => {
    const currentFeeds = feedData[sortBy] || [];
    if (currentFeeds.length > 0 && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  }, [feedData, sortBy, loading]);

  const currentFeedData = feedData[sortBy] || [];

  const Footer = (
    <View style={styles.footerContainer}>
      <Typography type="paragraph" size="small">
        Semua feed sudah kamu lihat 🎉
      </Typography>
    </View>
  );

  return (
    <FlatList
      data={currentFeedData}
      renderItem={({item, index}) =>
        loading && index >= currentFeedData.length - 10 ? (
          <SkeletonPostItem key={index} />
        ) : (
          <TouchableOpacity onPress={() => handleDetail(item.id)}>
            <PostItem post={item} />
          </TouchableOpacity>
        )
      }
      keyExtractor={(item, index) => index.toString()}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
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
