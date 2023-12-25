import { Pressable, PressableProps } from 'react-native';
import { VariantProps, cva } from 'class-variance-authority';
import { ReactNode } from 'react';
import cn from '../util/cn';
import { twMerge } from 'tailwind-merge';
import StyledText from './StyledText';

interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  size: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  variant: 'primary' | 'secondary' | 'clear';
}

const buttonVariants = cva('rounded-lg flex items-center justify-center', {
  variants: {
    variant: {
      primary: 'bg-blue-900 ',
      secondary: 'bg-transparent border-neutral-400 border-2',
      clear: 'bg-transparent',
    },
    size: {
      sm: 'px-4 py-1',
      md: 'px-6 py-3',
      lg: 'px-16 py-4',
      xl: 'px-24 py-4',
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
});

const variantTextColorMap = {
  primary: 'text-stone-200',
  clear: 'text-neutral-400',
  secondary: 'text-neutral-400',
};

const styles = (size: string) => {
  switch (size) {
    case 'sm':
      return 'text-sm';
    case 'lg':
      return 'text-lg';
    case 'xl':
      return 'text-xl';
    default:
      return 'text-md';
  }
};

export default function Button({
  children,
  className,
  variant,
  size,
  color = 'text-stone-200',
  ...props
}: ButtonProps) {
  const buttonStyles = twMerge(
    cn(buttonVariants({ variant, size, className }), className)
  );
  const textColorClass = variantTextColorMap[variant];
  return (
    <Pressable {...props} className={buttonStyles}>
      <StyledText
        className={twMerge(styles(size), textColorClass)}
        weight="bold"
      >
        {children}
      </StyledText>
    </Pressable>
  );
}
