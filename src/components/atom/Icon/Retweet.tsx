import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
const Retweet = ({fill = '#BABABD', ...props}: SvgProps) => (
  <Svg width={24} height={24} fill={fill} viewBox="0 0  24 14" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="m19.778 9.767-3.18 3.181a.758.758 0 0 1-1.071 0l-3.18-3.18a.758.758 0 0 1 0-1.073l.342-.342a.758.758 0 0 1 1.087.016l1.276 1.352V3.967H9.13a.758.758 0 0 1-.536-.222L8.09 3.24a.758.758 0 0 1 .536-1.294h7.69c.419 0 .758.34.758.758V9.72l1.276-1.352a.758.758 0 0 1 1.087-.016l.342.342a.758.758 0 0 1 0 1.072Zm-8.372.488a.758.758 0 0 0-.536-.222H4.948V4.28L6.224 5.63a.758.758 0 0 0 1.087.016l.341-.342a.758.758 0 0 0 0-1.072l-3.179-3.18a.758.758 0 0 0-1.072 0L.222 4.232a.758.758 0 0 0 0 1.072l.342.342A.758.758 0 0 0 1.65 5.63L2.927 4.28v7.016c0 .42.34.759.758.759h7.69a.758.758 0 0 0 .536-1.295l-.505-.505Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .83h20v12.34H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Retweet;
