import * as React from 'react';
import Svg, {SvgProps, Path, Rect, G, Defs, ClipPath} from 'react-native-svg';
const QuestionMark = ({fill = '#BABABD', ...props}: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={fill} d="M0 0h24v24H0z" />
    <Path fill="#fff" d="M-328-328h1440V750H-328z" />
    <Rect
      width={231}
      height={63}
      x={-187.5}
      y={-19.5}
      stroke="#7B61FF"
      strokeDasharray="10 5"
      rx={7.5}
    />
    <G clipPath="url(#a)">
      <Path
        fill="#BABABD"
        d="M22 12c0 5.524-4.477 10-10 10-5.522 0-10-4.476-10-10C2 6.48 6.478 2 12 2c5.523 0 10 4.48 10 10Zm-9.732-6.694c-2.197 0-3.599.926-4.7 2.571a.485.485 0 0 0 .11.656l1.4 1.06c.21.16.508.122.671-.085.72-.913 1.215-1.443 2.311-1.443.824 0 1.843.53 1.843 1.329 0 .604-.499.914-1.312 1.37-.949.532-2.204 1.193-2.204 2.849v.161c0 .267.217.484.484.484h2.258a.484.484 0 0 0 .484-.484v-.054c0-1.147 3.354-1.195 3.354-4.3 0-2.34-2.426-4.114-4.699-4.114Zm-.268 10a1.857 1.857 0 0 0-1.855 1.855c0 1.023.832 1.855 1.855 1.855a1.857 1.857 0 0 0 1.855-1.855A1.857 1.857 0 0 0 12 15.306Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M2 2h20v20H2z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default QuestionMark;
