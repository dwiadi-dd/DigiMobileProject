import {Image, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Typography} from '@components/atom';
import {Button} from '@components/molecules';
import COLORS from '@constant/colors';
import {useNavigation} from '@react-navigation/native';
import SPACING from '@constant/spacing';

const LoginAlert: FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.loginBanner}>
      <Image
        source={require('../../../assets/img/kambing.png')}
        style={styles.logo}
      />
      <View style={styles.bannerTextContainer}>
        <Typography type="paragraph" size="small">
          Temukan inspirasi investasi,
        </Typography>
        <Button
          variant="link"
          size="small"
          type="text-only"
          onPress={() => {
            navigation.navigate('Login' as never);
          }}>
          Masuk Yuk!
        </Button>
      </View>
    </View>
  );
};

export default LoginAlert;

const styles = StyleSheet.create({
  loginBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    gap: SPACING.xs,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.purple100,
  },
  bannerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 39,
    height: 24,
  },
});
