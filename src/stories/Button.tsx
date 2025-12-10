import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { ui, uiButton } from 'envy-ui';

const variantModifiers = {
  'clean': uiButton`--clean`,
  'secondary': uiButton`--default`,
  'primary': uiButton`--mint-blue`,
  'accent': uiButton`--light-blue`,
  'green': uiButton`--green`,
  'red': uiButton`--red`,
  'warning': uiButton`--warning`,
  'complete': uiButton`--complete`,
  'map': uiButton`--map`,
  'default-dont': uiButton`--default-dont`,
  'content-link': uiButton`--content-link`,
  'content-gray': uiButton`--content-gray`,
  'content-inverse': uiButton`--content-inverse`,
} as const;

export type ButtonVariant = keyof typeof variantModifiers;
export const buttonVariantOptions = Object.keys(
  variantModifiers
) as ButtonVariant[];

export interface ButtonProps {
  /** Which envy-ui modifier to apply */
  variant?: ButtonVariant;
  /** Override the button background color (dev tooling only) */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  /** Apply a shape modifier */
  shape?: 'default' | 'round' | 'circle';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

const sizeVariant = {
  xsmall: uiButton`--xsmall`,
  small: uiButton`--small`,
  medium: uiButton``,
  large: uiButton`--large`,
};

const shapeVariant = {
  default: uiButton``,
  round: uiButton`--round`,
  circle: uiButton`--circle`,
};

/** Primary UI component for user interaction */
export const Button = ({
  variant = 'primary',
  size = 'medium',
  shape = 'default',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const colorModifiers = variantModifiers[variant] ?? variantModifiers['primary'];
  const sizeModifiers = sizeVariant[size] ?? sizeVariant['medium'];
  const shapeModifiers = shapeVariant[shape] ?? shapeVariant['default'];

  const buttonProps = ui([
    uiButton``,
    colorModifiers,
    sizeModifiers,
    shapeModifiers,
    backgroundColor ? { style: { backgroundColor } } : null,
  ]);

  const { className, ...restButtonProps } = buttonProps;
  const contentLabel =
    shape === 'circle' ? (label?.trim().charAt(0) || 'A') : label;

  return (
    <AriaButton className={className} {...restButtonProps} {...props}>
      <span {...ui([uiButton`__content`])}>{contentLabel}</span>
    </AriaButton>
  );
};
