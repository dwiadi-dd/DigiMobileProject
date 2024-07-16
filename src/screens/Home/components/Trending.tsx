import React, {useMemo} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Typography} from '@components/atom';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import PostItem from '@components/organism/PostItem';
import {PostItemProps} from '@utils/props';
import useAuth from '@hooks/useAuth';
import SkeletonPostItem from '@components/organism/SkeletonPostItem';
import {usePosts} from '@contexts/PostContext';

const Trending = ({data}: {data: any}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {loading} = usePosts();

  const handleDetail = useAuth((post: PostItemProps) => {
    console.log(post);

    navigation.navigate('Post', {post});
  });
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
      data={data}
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
      ListFooterComponent={Footer}
    />
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default Trending;
