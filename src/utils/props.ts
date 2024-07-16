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
  headline: string | null;
  created_at: string;
  post_header: string;
  post_content: string;
  post_topic: string;
  post_upvote: number;
  post_downvote: number;
  post_comment: number;
  post_retweet: number;
};

export type IconProps = {
  focused: boolean;
};

export type IndicatorProps = {
  currentIndex: number;
};
