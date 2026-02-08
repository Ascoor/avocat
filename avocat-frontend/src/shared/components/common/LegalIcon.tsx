import * as React from "react";

import { getIconDesign, type IconKey } from "@config/iconography";

export interface LegalIconProps extends React.SVGProps<SVGSVGElement> {
  iconKey: IconKey;
  title?: string;
}

const LegalIcon = React.forwardRef<SVGSVGElement, LegalIconProps>(
  ({ iconKey, width = 32, height = 32, ...rest }, ref) => {
    const { icon: IconComponent } = getIconDesign(iconKey);
    return <IconComponent ref={ref as never} width={width} height={height} {...rest} />;
  },
);

LegalIcon.displayName = "LegalIcon";

export default LegalIcon;
