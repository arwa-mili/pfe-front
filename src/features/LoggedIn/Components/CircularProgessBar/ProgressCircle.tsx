import React from 'react';
import { Svg, Circle, Text as SvgText } from 'react-native-svg';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';
import { FontFamily } from '../../../../utils/StylingConsts/fontFamily/fontFamily';

interface ProgressCircleProps {
  percent: number; // Percentage of progress (0 to 100)
  radius: number; // Radius of the circle
  strokeWidth: number; // Width of the progress stroke
  color: string; // Color of the progress stroke
  shadowColor?: string; // Optional shadow color
  bgColor?: string; // Optional background color
  textColor?: string; // Optional text color
  fontSize?: number; // Optional font size for the percentage text
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percent,
  radius,
  strokeWidth,
  color,
  shadowColor,
  bgColor = Color.DISABLED_COLOR,
  textColor = Color.colorBlack,
  fontSize = FontSize.size_4xl
}) => {
  // Calculate circumference for progress stroke
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke dasharray and dashoffset based on percentage
  const dasharray = circumference;
  const dashoffset = ((100 - percent) / 100) * dasharray;

  return (
    <Svg width={radius * 2} height={radius * 2}>
      <Circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2} // Adjust radius for stroke width
        fill={bgColor}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dasharray}
        strokeDashoffset={dashoffset}
      />
      {shadowColor && (
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke={shadowColor}
          strokeWidth={strokeWidth}
          strokeOpacity={0.2}
        />
      )}
      <SvgText
        x={radius}
        y={radius}
        alignmentBaseline="text-bottom"
        textAnchor="middle"
        fontFamily={FontFamily.openSansBold}
        fill={textColor}
        fontSize={FontSize.size_7xl}>
        {percent}
      </SvgText>
      <SvgText
        x={radius}
        y={radius + 10}
        alignmentBaseline="text-top"
        textAnchor="middle"
        fontFamily={FontFamily.openSansBold}
        fill={textColor}
        fontSize={fontSize}>
        %
      </SvgText>
    </Svg>
  );
};

export default ProgressCircle;
