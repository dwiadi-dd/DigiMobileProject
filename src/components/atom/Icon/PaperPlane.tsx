import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
const PaperPlane = ({fill = '#BABABD', ...props}: SvgProps) => (
  <Svg width={24} height={24} fill={fill} viewBox="0 0 24 24" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={fill}
        d="M19.604 9.001a1.042 1.042 0 0 0-.615-.95L2.065.421 2.062.418A1.042 1.042 0 0 0 .707 1.835l.009.017L3.13 7.865a.695.695 0 0 0 .587.366l13.065.462a.307.307 0 1 1 0 .614L3.72 9.764a.694.694 0 0 0-.587.367L.717 16.148a1.02 1.02 0 0 0 .137 1.17l.03.03a1.07 1.07 0 0 0 1.18.23l16.92-7.627a1.042 1.042 0 0 0 .62-.95Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .11h20v17.778H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default PaperPlane;
