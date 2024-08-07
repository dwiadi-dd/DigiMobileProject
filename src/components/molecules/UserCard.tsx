import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Typography} from '@components/atom';
import Avatar from '@components/atom/Avatar';
import SPACING from '@constant/spacing';
import COLORS from '@constant/colors';

interface UserCardProps {
  profileImage: string;
  username: string;
  name: string;
  email: string;
}

const UserCard: React.FC<UserCardProps> = ({
  profileImage,
  username,
  name,
  email,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Avatar image={profileImage} size="large" />
      <View style={styles.userInfo}>
        <Typography size="medium" type="heading">
          {username}
        </Typography>
        <Typography
          size="small"
          type="heading"
          color={{color: COLORS.neutral500}}>
          {name} - {email}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: 0,
  },
  userInfo: {
    marginLeft: SPACING.md,
    flex: 1,
  },
});

export default UserCard;
