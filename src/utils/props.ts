import {IconName} from '@components/atom/Icon/Icon';

export interface ButtonProps {
  size: 'small' | 'medium' | 'large';
  type: 'text-only' | 'icon-left' | 'icon-right' | 'icon-only';
  variant: 'primary' | 'outline' | 'tertiary' | 'link';
  disabled?: boolean;
  children?: React.ReactNode;
  iconName?: IconName;
  onPress?: () => void;
}

export interface PostItemProps {
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
}

export interface TextFieldProps {
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
}

export interface IconProps {
  focused: boolean;
}

export interface IndicatorProps {
  currentIndex: number;
}

export interface CheckEmailReq {
  email: string;
}
export interface CheckEmailRes {
  status: boolean;
  messages: boolean;
}

export interface LoginRes {
  status: boolean;
  messages: string;
  user: {
    access_token: string;
    refresh_token: string;
    is_verified: boolean;
    expired_at: Date;
  };
}

export interface LoginReq {
  email: string;
  password: string;
}
