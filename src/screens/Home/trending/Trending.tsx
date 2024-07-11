import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import PostItem from '@components/molecules/PostItem';
import COLORS from '@constant/colors';
import {Typography} from '@components/atom';

export default function Trending({data}: {data: any}) {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => <PostItem post={item} />}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 20,
              alignItems: 'center',
            }}>
            <Typography type="paragraph" size="small">
              Semua feed sudah kamu lihat 🎉
            </Typography>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
