import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import SPACING from '@constant/spacing';
import Typhography from '@components/atom/Typhography';

function PostItem() {
  return (
    <TouchableOpacity style={styles.postContainer}>
      <Image
        source={{
          uri: 'https://images.freeimages.com/images/large-previews/023/geek-avatar-1632962.jpg',
        }}
        style={styles.imageSize}
      />
      <View style={styles.flex}>
        <Typhography type="heading" size="medium">
          test title
        </Typhography>
        <Typhography type="paragraph" size="medium">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod minus
          distinctio dolorum odit possimus aliquid culpa. Cupiditate rerum nobis
          vitae ea eum ratione, aut impedit laudantium, itaque voluptatem cumque
          temporibus.
        </Typhography>
      </View>
    </TouchableOpacity>
  );
}

export default memo(PostItem);

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  flex: {flex: 1},
  imageSize: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: SPACING.lg,
  },
});
