import {create} from 'zustand';
import {FeedItemProps} from '@utils/props';
import investlyServices from '@services/investlyServices';
import analytics from '@react-native-firebase/analytics';

interface FeedState {
  feedData: {[key: string]: FeedItemProps[]};
  loading: boolean;
  error: string | null;
  fetchFeed: (sortBy: string, page: number) => Promise<void>;
  setFeedData: (sortBy: string, feeds: FeedItemProps[]) => void;
  appendFeedData: (sortBy: string, feeds: FeedItemProps[]) => void;
  onPressUpvote: (postId: string) => void;
  getPostById: (id: string) => FeedItemProps | undefined;
}

export const useFeedStore = create<FeedState>()((set, get) => ({
  feedData: {},
  loading: false,
  error: null,
  fetchFeed: async (sortBy, page) => {
    set({loading: true, error: null});
    try {
      let res;
      if (sortBy === 'engagement') {
        res = await investlyServices.fetchFeed({
          sort: sortBy,
          page,
          size: 10,
        });
      } else if (sortBy === 'created_at') {
        res = await investlyServices.fetchFeedDev({
          sort: sortBy,
          page,
          size: 10,
        });
      }
      if (res?.status === 200) {
        const newFeeds = res?.data?.data ?? [];
        if (page === 1) {
          get().setFeedData(sortBy, newFeeds);
        } else {
          get().appendFeedData(sortBy, newFeeds);
        }
      } else {
        set({error: res?.data?.messages || 'An error occurred'});
      }
    } catch (error) {
      set({error: 'An error occurred while fetching data'});
    } finally {
      set({loading: false});
    }
  },
  setFeedData: (sortBy, feeds) =>
    set(state => ({
      feedData: {...state.feedData, [sortBy]: feeds},
    })),
  appendFeedData: (sortBy, feeds) =>
    set(state => ({
      feedData: {
        ...state.feedData,
        [sortBy]: [...(state.feedData[sortBy] || []), ...feeds],
      },
    })),
  // onPressUpvote: async (postId: string) => {
  //   try {
  //     const res = await investlyServices.upvotePost({post_id: postId});
  //     console.log(res);
  //     if (res?.status === 200) {
  //       const updatedFeeds = get().feedData.engagement?.map(feed =>
  //         feed.id === postId
  //           ? {...feed, total_upvotes: feed.upvotes + 1}
  //           : feed,
  //       );
  //       set({feedData: {engagement: updatedFeeds}});
  //     } else {
  //       ToastAndroid.show(
  //         res?.data?.messages || 'an error ocurred',
  //         ToastAndroid.SHORT,
  //       );
  //       set({error: res?.data?.messages || 'An error occurred'});
  //     }
  //   } catch (error) {
  //     set({error: 'An error occurred while upvoting post'});
  //   } finally {
  //     set({loading: false});
  //   }
  // },
  onPressUpvote: async (postId: string) => {
    try {
      const res = await investlyServices.upvotePost({post_id: postId});
      if (res.status === 200) {
        set(state => {
          const newFeedData = {...state.feedData};
          analytics().logEvent('click_upvote', {
            username: newFeedData.username,
            postId,
          });
          for (const key in newFeedData) {
            newFeedData[key] = newFeedData[key].map(post =>
              post.id === postId
                ? {...post, upvotes: post.upvotes + 1, is_upvoted: true}
                : post,
            );
          }
          return {feedData: newFeedData};
        });
      } else {
        throw new Error(res.data?.messages || 'Failed to upvote post');
      }
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  },
  getPostById: id => {
    const allPosts = Object.values(get().feedData).flat();
    return allPosts.find(post => post.id === id);
  },
}));
