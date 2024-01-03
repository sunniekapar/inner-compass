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
  progress: Animated.SharedValue<number>;
  angle: number;
}> = ({
  index,
  center,
  radius,
  strokeWidth,
  circumference,
  value,
  percent,
  progress,
  angle,
}) => {
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [circumference, circumference * percent -.3]
    );
    const deg = interpolate(progress.value, [0, 1], [0, angle]);
    return {
      // transform: [
      //   { translateX: center },
      //   { translateY: center },
      //   { rotate: `${deg}deg` },
      //   { translateX: -center },
      //   { translateY: -center },
      // ],
      strokeDashoffset,
    };
  });
  return (
      <AnimatedCircle
        originX={center}
        originY={center}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        stroke={colorMapHEX(value)}
        strokeDasharray={circumference}
        fill="transparent"
        animatedProps={animatedProps}
        rotation={angle}
      />
  );
};

export default function StyledPieChart({
  size = 500,
  strokeWidth = 225,
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
    <View className="justify-center flex-1 items center">
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((item, index) => {
          return (
            <ChartSegment
              index={index}
              key={item._id}
              center={center}
              radius={radius}
              strokeWidth={(strokeWidth * item.value) / 10}
              circumference={circumference}
              percent={sectionPercentage}
              value={item.value}
              progress={progress}
              angle={(360 * index) / data.length}
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
    </View>
  );
}
