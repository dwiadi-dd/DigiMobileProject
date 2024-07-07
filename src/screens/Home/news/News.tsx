import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PostItem from '@components/molecules/PostItem';

export default function News() {
  return (
    <View>
      <Text>News</Text>
      <PostItem />
      <PostItem />
      <PostItem />
    </View>
  );
}

const styles = StyleSheet.create({});
