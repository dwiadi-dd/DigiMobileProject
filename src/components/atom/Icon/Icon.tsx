import React from 'react';

export type IconName =
  | 'angle-double-left'
  | 'arrow-up'
  | 'arrow-down'
  | 'bell'
  | 'comment'
  | 'eye'
  | 'eye-slash'
  | 'ellipsis'
  | 'home'
  | 'user'
  | 'chevron-left'
  | 'question-mark'
  | 'retweet'
  | 'plus';

const IconMap: Record<
  IconName,
  React.FC<{width?: number; height?: number; fill?: string}>
> = {
  'angle-double-left': require('./AngleDoubleLeft').default,
  'arrow-up': require('./ArrowDown').default,
  'arrow-down': require('./ArrowUp').default,
  bell: require('./Bell').default,
  comment: require('./Comment').default,
  'chevron-left': require('./ChevronLeft').default,
  eye: require('./Eye').default,
  ellipsis: require('./Ellipsis').default,
  plus: require('./Plus').default,
  home: require('./User').default,
  retweet: require('./Retweet').default,
  user: require('./Home').default,
  'eye-slash': require('./EyeSlash').default,
  'question-mark': require('./QuestionMark').default,
};
type IconProps = {
  name: IconName;
  fill?: string;
  width?: number;
  height?: number;
};
const Icon = ({name, ...props}: IconProps) => {
  const IconComponent = IconMap[name];
  return <IconComponent {...props} />;
};

export default Icon;
