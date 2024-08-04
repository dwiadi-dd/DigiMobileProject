import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import COLORS from '@constant/colors';
import {Button} from '@components/molecules';
import {Icon, Typography} from '@components/atom';
import {useNavigation} from '@react-navigation/native';
import {getTypography} from '@components/atom/Typhography';
import {TopicsMasterPropsRes} from '@utils/props';
import investlyServices from '@services/investlyServices';
import {Picker} from '@react-native-picker/picker';
import SPACING from '@constant/spacing';
import FONT_SIZE from '@constant/fontSize';

const CreatePost: FC = () => {
  const navigation = useNavigation();
  const [topics, setTopics] = useState<
    TopicsMasterPropsRes | [] | {loading: boolean}
  >({
    data: [],
    loading: false,
  });
  const [formData, setFormData] = useState({
    content: '',
    header: '',
    topic_id: '',
    is_anonim: false,
  });

  const [loading, setLoading] = useState(false);
  const handleBack = () => {
    navigation.goBack();
  };
  const fetcMasterTopics = useCallback(async () => {
    setTopics({data: [], loading: true});
    const res = await investlyServices.fetchTopics();
    if (res?.status === 200) {
      setTopics({data: res?.data?.data, loading: false});
    } else {
      setTopics({data: [], loading: false});
      Alert.alert('Login failed', res?.data?.messages || 'An error occurred');
    }
  }, []);
  const handlePost = useCallback(async () => {
    setLoading(true);
    // console.log(formData);
    const res = await investlyServices.createPost(formData);
    if (res?.status === 200) {
      ToastAndroid.show('Post berhasil', ToastAndroid.SHORT);
      setLoading(false);
      navigation.goBack();
    } else {
      setLoading(false);
      Alert.alert(
        'Post data failded',
        res?.data?.messages || 'An error occurred',
      );
    }
  }, [formData]);

  useEffect(() => {
    fetcMasterTopics();
  }, [fetcMasterTopics]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.formContainer}>
          <View>
            <TouchableOpacity onPress={handleBack}>
              <Icon name="chevron-left" />
            </TouchableOpacity>
          </View>
          <Typography
            type="heading"
            size="large"
            style={{color: COLORS.neutral700}}>
            Buat
          </Typography>
        </View>
        <Button
          type="text-only"
          variant="primary"
          size="medium"
          disabled={
            formData.content === '' ||
            formData.header === '' ||
            formData.topic_id === '' ||
            loading
          }
          onPress={handlePost}>
          Post
        </Button>
      </View>
      <View style={styles.contentHolder}>
        {topics?.loading ? (
          <Typography type="paragraph" size="medium">
            Loading topics...
          </Typography>
        ) : (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.topic_id}
              style={styles.picker}
              onValueChange={itemValue =>
                setFormData({...formData, topic_id: itemValue})
              }>
              <Picker.Item label="Topic" value="" />
              {topics?.data?.map(topic => (
                <Picker.Item
                  key={topic?.id}
                  label={topic?.label}
                  value={topic?.id}
                />
              ))}
            </Picker>
          </View>
        )}
        <TextInput
          placeholder="Judul"
          value={formData?.header}
          onChangeText={e => setFormData({...formData, header: e})}
          placeholderTextColor={COLORS.neutral400}
          style={getTypography('heading', 'xlarge')}
        />
        <TextInput
          placeholder="Deskripsi"
          value={formData?.content}
          onChangeText={e => setFormData({...formData, content: e})}
          placeholderTextColor={COLORS.neutral400}
          style={getTypography('paragraph', 'medium')}
          multiline
        />
      </View>
      <View style={styles.postFooter}>
        <Icon
          name="paper-clip"
          fill={COLORS.neutral600}
          width={24}
          height={24}
        />
        <Icon
          name="image-regular"
          fill={COLORS.neutral600}
          width={24}
          height={24}
        />
      </View>
    </SafeAreaView>
  );
};
export default memo(CreatePost);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
  },
  formContainer: {flexDirection: 'row', alignItems: 'center', gap: 24},
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
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.neutral300,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.neutral200,
    overflow: 'hidden', // This ensures the Picker doesn't overflow the rounded corners
  },
  picker: {
    width: '100%',
    color: COLORS.neutral700,
    fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
    fontSize: FONT_SIZE.md,
  },
});
