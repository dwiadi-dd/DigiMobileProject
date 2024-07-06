import React from 'react';

export type IconName = 'angle-double-left' | 'eye' | 'eye-slash';

const IconMap: Record<
  IconName,
  React.FC<{width?: number; height?: number; fill?: string}>
> = {
  'angle-double-left': require('./AngleDoubleLeft').default,
  eye: require('./Eye').default,
  'eye-slash': require('./EyeSlash').default,
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
