import { Text, TextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

const fontWeight = (weight: string | undefined) => {
  switch (weight) {
    case 'bold':
      return 'QuicksandBold';
    case 'semibold':
      return 'QuicksandSemiBold';
    case 'medium':
      return 'QuicksandMedium';
    case 'light':
      return 'QuicksandLight';
    default:
      return 'QuicksandBase';
  }
};
interface StyledTextProps extends TextProps {
  weight?: 'bold' | 'semibold' | 'medium' | 'base' | 'light';
}
export default function StyledText({ weight, ...props }: StyledTextProps) {
  const fontFamily = fontWeight(weight);
  return <Text {...props} style={{ fontFamily: fontFamily }} className={twMerge("text-stone-950", props.className)} />;
}
