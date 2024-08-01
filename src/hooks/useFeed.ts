import React, {useState, useCallback, useEffect} from 'react';
import {Alert} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Feed from './Feed';
import investlyServices from '@services/investlyServices';
import {FeedItemProps} from '@utils/props';
import COLORS from '@constant/colors';

const TopTab = createMaterialTopTabNavigator();

const useFeedData = (sortBy: string) => {
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<FeedItemProps[]>([]);

  const fetchFeed = useCallback(
    async (pageParams: number) => {
      setLoading(true);
      try {
        const res = await investlyServices.fetchFeed({
          sort: sortBy,
          page: pageParams,
          size: 10,
        });
        if (res?.status === 200) {
          setData(prevData =>
            pageParams === 1
              ? res?.data?.data ?? []
              : [...prevData, ...(res?.data?.data ?? [])],
          );
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

  const onEndReach = useCallback(() => {
    if (data.length && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  }, [data.length, loading]);

  useEffect(() => {
    fetchFeed(page);
  }, [page, fetchFeed]);

  return {data, refreshing, loading, onRefresh, onEndReach};
};

const FeedContainer = () => {
  const trendingFeed = useFeedData('engagement');
  const newsFeed = useFeedData('created_at');

  return (
    <TopTab.Navigator
      screenOptions={{
        lazy: true,
        tabBarStyle: {backgroundColor: 'white'},
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.purple600,
          height: 2,
        },
        tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
        tabBarActiveTintColor: COLORS.purple600,
        tabBarInactiveTintColor: COLORS.neutral700,
      }}>
      <TopTab.Screen
        name="Trending"
        children={() => <Feed {...trendingFeed} />}
      />
      <TopTab.Screen name="News" children={() => <Feed {...newsFeed} />} />
    </TopTab.Navigator>
  );
};

export default FeedContainer;
