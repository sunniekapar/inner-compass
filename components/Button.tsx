import { GestureResponderEvent, Pressable, PressableProps, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { VariantProps, cva } from 'class-variance-authority';
import { ReactNode, useState } from 'react';
import cn from '../util/cn';
import { twMerge } from 'tailwind-merge';
import StyledText from './StyledText';

interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  variant?: 'primary' | 'secondary' | 'clear';
}

const buttonVariants = cva('rounded-xl flex items-center justify-center', {
  variants: {
    variant: {
      primary: 'bg-blue-900 shadow-slate-500 shadow-sm',
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
  const textColorClass = variantTextColorMap[variant ? variant : 'primary'];
  const opacity = props.disabled ? 'opacity-25' : '';
  return (
    <TouchableOpacity activeOpacity={0.75}
      {...props}

      className={twMerge(buttonStyles, opacity)}
    >
      <StyledText
        className={twMerge(styles(size ? size : 'md'), textColorClass)}
        weight="bold"
      >
        {children}
      </StyledText>
    </TouchableOpacity>
  );
}
