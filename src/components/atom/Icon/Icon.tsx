import React from 'react';

type IconName = 'angle-double-left';

const IconMap: Record<
  IconName,
  React.FC<{width?: number; height?: number; fill?: string}>
> = {
  'angle-double-left': require('./AngleDoubleLeft').default,
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
