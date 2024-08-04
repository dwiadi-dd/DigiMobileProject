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
import investlyServices from '@services/investlyServices';
import {FeedItemProps} from '@utils/props';

interface FeedData {
  type: string;
  feeds: FeedItemProps[];
}

const Feed = ({sortBy}: {sortBy: string}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<FeedData[]>([]);

  const handleDetail = useAuth(
    useCallback(
      (post: FeedItemProps) => {
        navigation.navigate('Post', {post});
      },
      [navigation],
    ),
  );

  const fetchFeed = useCallback(
    async (pageParams: number) => {
      setLoading(true);
      try {
        let res;
        if (sortBy === 'engagement') {
          res = await investlyServices.fetchFeed({
            sort: sortBy,
            page: pageParams,
            size: 10,
          });
        } else if (sortBy === 'created_at') {
          res = await investlyServices.fetchFeedDev({
            sort: sortBy,
            page: pageParams,
            size: 10,
          });
        }
        if (res?.status === 200) {
          setData(prevData => {
            const existingDataIndex = prevData.findIndex(
              item => item.type === sortBy,
            );
            const newFeeds = res?.data?.data ?? [];

            if (existingDataIndex !== -1) {
              // Update existing data
              const updatedData = [...prevData];
              updatedData[existingDataIndex] = {
                ...updatedData[existingDataIndex],
                feeds:
                  pageParams === 1
                    ? newFeeds
                    : [...updatedData[existingDataIndex].feeds, ...newFeeds],
              };
              return updatedData;
            } else {
              // Add new data
              return [...prevData, {type: sortBy, feeds: newFeeds}];
            }
          });
        } else {
          Alert.alert(
            'Fetch failed',
            res?.data?.messages || 'An error occurred',
          );
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    },
    [sortBy],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchFeed(1).finally(() => setRefreshing(false));
  }, [fetchFeed]);

  useEffect(() => {
    fetchFeed(page);
  }, [page, fetchFeed]);

  const onEndReach = useCallback(() => {
    const currentFeeds = data.find(item => item.type === sortBy)?.feeds;
    if (currentFeeds && currentFeeds.length > 0) {
      setPage(prevPage => prevPage + 1);
    }
  }, [data, sortBy]);

  const currentFeedData = data.find(item => item.type === sortBy)?.feeds || [];

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
          <TouchableOpacity onPress={() => handleDetail(item)}>
            <PostItem post={item} />
          </TouchableOpacity>
        )
      }
      keyExtractor={(item, index) => index.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
