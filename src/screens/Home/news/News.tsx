import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import PostItem from '@components/molecules/PostItem';
import COLORS from '@constant/colors';
import {Typography} from '@components/atom';

export default function Trending({data}: {data: any}) {
  return (
    <View style={{backgroundColor: COLORS.neutral100}}>
      <FlatList
        data={data}
        renderItem={({item}) => <PostItem post={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
