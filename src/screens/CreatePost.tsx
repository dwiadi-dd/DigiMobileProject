import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import COLORS from '@constant/colors';
import {Button, TextField} from '@components/molecules';
import {Typography} from '@components/atom';
import {PostItemProps} from '@components/molecules/PostItem';
import {useNavigation} from '@react-navigation/native';
import {getTypography} from '@components/atom/Typhography';

export default function CreatePost() {
  const navigation = useNavigation();
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handlePost = () => {
    const post: PostItemProps = {
      avatar_url:
        'https://lwfiles.mycourse.app/656ef73b8e59fa6dfcddbe98-public/3073ed5d42a0e38174e311a1a0cb0800.png',
      name: 'test',
      headline: 'Mobile Engineer Expert',
      created_at: new Date().toISOString(),
      post_header: topic,
      post_content: description,
      post_topic: topic,
      post_upvote: 0,
      post_downvote: 0,
      post_comment: 0,
      post_retweet: 0,
    };

    navigation.navigate('Home', post);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 24}}>
          <Button
            variant="outline"
            iconName="chevron-left"
            size="small"
            disabled={false}
            children={null}
            type="icon-only"
            onPress={() => navigation.goBack()}
          />
          <Typography
            type="heading"
            size="medium"
            style={{color: COLORS.neutral700}}>
            Buat
          </Typography>
        </View>
        <Button
          type="text-only"
          variant="primary"
          size="small"
          disabled={topic && title && description ? false : true}
          onPress={handlePost}>
          Post
        </Button>
      </View>
      <View style={styles.contentHolder}>
        <TextField placeholder="Topic" value={topic} onChangeText={setTopic} />
        <TextInput
          placeholder="Judul"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={COLORS.neutral400}
          style={getTypography('heading', 'xlarge')}
        />
        <TextInput
          placeholder="Deskripsi"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor={COLORS.neutral400}
          style={getTypography('paragraph', 'medium')}
          multiline
        />
      </View>
      <View style={styles.postFooter}>
        <Button
          variant="outline"
          size="large"
          iconName="bell"
          type="icon-only"
          children={null}
          disabled={false}
        />
        <Button
          variant="outline"
          size="large"
          iconName="bell"
          type="icon-only"
          children={null}
          disabled={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 24,
  },
  contentHolder: {
    flex: 1,
    gap: 24,
    padding: 16,
  },
  postFooter: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral300,
  },
  iconButton: {
    borderWidth: 0,
    padding: 8,
  },
});
