import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
const AngleDoubleLeft = ({fill = '#BABABD', ...props}: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="m11.985 11.147 6.822-6.823a1.199 1.199 0 0 1 1.7 0l1.134 1.134a1.2 1.2 0 0 1 0 1.7L16.811 12l4.835 4.837a1.2 1.2 0 0 1 0 1.7l-1.133 1.14a1.199 1.199 0 0 1-1.701 0l-6.822-6.824a1.2 1.2 0 0 1-.005-1.706Zm-9.632 1.706 6.822 6.823a1.199 1.199 0 0 0 1.701 0l1.134-1.134a1.2 1.2 0 0 0 0-1.7L7.179 12l4.836-4.837a1.2 1.2 0 0 0 0-1.7l-1.134-1.14a1.199 1.199 0 0 0-1.7 0l-6.823 6.824a1.2 1.2 0 0 0-.005 1.706Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2 3.97h20v16.06H2z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default AngleDoubleLeft;
