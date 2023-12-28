import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { Question } from '../data/types';
import { COLORS } from '../constants';
import { colorMapHEX } from '../util/colorMapping';
import { View } from 'react-native';
import { FC } from 'react';
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
type PieChartProps = {
  size?: number;
  strokeWidth?: number;
  data: Question[];
};

export type PieChartDataItem = Question;

export type PieChartData = PieChartDataItem[];

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ChartSegment: FC<{
  index: number;
  center: number;
  radius: number;
  strokeWidth: number;
  circumference: number;
  value: number;
  percent: number;
  data: Question[];
  progress: Animated.SharedValue<number>;
}> = ({
  index,
  center,
  radius,
  strokeWidth,
  circumference,
  value,
  percent,
  data,
  progress,
}) => {
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [circumference, circumference * percent]
    );
    const deg = interpolate(
      progress.value,
      [0,1],
      [0, (360 * index) / data.length]
    )
    return {
      strokeDashoffset,
      // transform: [
      //   { translateX: center },
      //   { translateY: center },
      //   { rotate: `${(360 * index) / data.length}deg` },
      //   { translateX: center },
      //   { translateY: center },
      // ],
    };
  });
  return (
    <AnimatedCircle
      cx={center}
      cy={center}
      r={radius}
      strokeWidth={strokeWidth}
      stroke={colorMapHEX(value)}
      strokeDasharray={circumference}
      animatedProps={animatedProps}
      fill="transparent"
      rotation={(360 * index) / data.length}
      originX={center}
      originY={center}
    />
  );
};

export default function StyledPieChart({
  size = 750,
  strokeWidth = 250,
  data,
}: PieChartProps) {
  const progress = useSharedValue(0);
  const center = size / 2;
  const radius = (size - strokeWidth - 150) / 2;
  const circumference = 2 * Math.PI * radius;
  const sectionPercentage = 1 - 360 / data.length / 360;
  progress.value = 0;
  progress.value = withTiming(1, {
    duration: 1000,
  });
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${size} ${size}`}
      preserveAspectRatio="xMinYMin slice"
      shape-renderer="crispEdges"
    >
      {data.map((item, index) => {
        return (
          <ChartSegment
            progress={progress}
            index={index}
            key={index}
            center={center}
            radius={radius}
            strokeWidth={(strokeWidth * item.value) / 10}
            data={data}
            circumference={circumference}
            percent={sectionPercentage}
            value={item.value}
          />
        );
      })}
      <Circle
        cx={center}
        cy={center}
        r={radius - strokeWidth / 20}
        fill={COLORS.stone_200}
        stroke="rgba(229, 232, 235, 0.95)"
      />
      <Circle
        cx={center}
        cy={center}
        r={radius + strokeWidth / 2}
        fill="transparent"
        stroke="rgba(0, 0, 0, 0.1)"
        strokeWidth={4}
      />
    </Svg>
  );
}
