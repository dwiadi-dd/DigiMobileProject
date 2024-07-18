import {IconName} from '@components/atom/Icon/Icon';

export type ButtonProps = {
  size: 'small' | 'medium' | 'large';
  type: 'text-only' | 'icon-left' | 'icon-right' | 'icon-only';
  variant: 'primary' | 'outline' | 'tertiary' | 'link';
  disabled?: boolean;
  children?: React.ReactNode;
  iconName?: IconName;
  onPress?: () => void;
};

export type PostItemProps = {
  avatar_url: string;
  name: string;
  headline: string;
  created_at: string;
  post_header: string;
  post_content: string;
  post_topic: string;
  post_upvote: number;
  post_downvote: number;
  post_comment: number;
  post_retweet: number;
};

export type TextFieldProps = {
  state?: 'default' | 'positive' | 'negative' | 'disabled';
  type?: 'text' | 'password' | 'email' | 'number' | 'no-label';
  visible?: boolean;
  label?: string;
  placeholder?: string;
  message?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  onSubmitEditing?: ({nativeEvent}: {nativeEvent: any}) => void;
  isProtected?: boolean;
};

export type IconProps = {
  focused: boolean;
};

export type IndicatorProps = {
  currentIndex: number;
};
