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
  currentStep: Number;
  totalSteps: Number;
}

export interface OnboardIndicatorProps {
  currentIndex: Number;
}

export interface CheckEmailReq {
  email: string;
}

export interface CheckUsernameReq {
  username: string;
}

export interface CheckValidRes {
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

//post Props
export interface FeedItemProps {
  id: string;
  header: string;
  content: string;
  attachments: string[];
  attachment_properties: AttachmentProperty[];
  repost_post_id: string | null;
  created_at: string;
  is_upvoted: boolean;
  is_downvoted: boolean;
  is_reposted: boolean;
  is_question_post: boolean;
  is_owned: boolean;
  total_comments: number;
  upvotes: number;
  reposts: number;
  post_type: string;
  time: string;
  topic: Topic;
  analysis: any;
  parent_post: any;
  user: User;
  poll_question: any;
}

export interface AttachmentProperty {
  name_display: string;
  full_path: string;
  size: number;
  mime_type: string;
}

export interface Topic {
  id: string;
  label: string;
}

export interface User {
  user_id: string;
  name: string;
  username: string;
  profile_path: string;
  profile_image_properties: any;
  bio: string;
  is_pro: boolean;
  is_premium: boolean;
  is_verified: boolean;
  created_at: string;
  total_followers: number;
  total_following: number;
  is_followed: boolean;
  pro_profile: any;
  calendly_url: any;
  favorite_topics: any;
  referral_code: any;
  headline: string;
  favorite_instruments: any;
}

export interface PostPropsRes {
  status: boolean;
  messages: string;
  meta: Meta;
  data?: FeedItemProps[];
}

export interface Meta {
  per_page: number;
  current_page: number;
  last_page: number;
  is_load_more: boolean;
}

export interface FeedsReq {
  sort: string;
  page: number;
  size: number;
}

export interface TopicsMasterPropsRes {
  status: boolean;
  messages: string;
  data: TopicMaster[];
}

export interface TopicMaster {
  id: string;
  file: AttachmentProperty;
  label: string;
}

export interface AttachmentProperty {
  name_display: string;
  full_path: string;
  size: number;
  mime_type: string;
}

export interface PostDetailReq {
  post_id: string;
}

export interface RegisterReq {
  email: string;
  password: string;
  favorite_topic_ids: string[];
  username: string;
  name: string;
}

export interface RegisterRes {
  status: boolean;
  messages: string;
  data: {
    access_token: string;
    refresh_token: string;
    is_verified: boolean;
    expired_at: string;
  };
}
