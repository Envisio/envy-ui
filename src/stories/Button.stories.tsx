import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button, buttonVariantOptions, ButtonProps } from './Button';

type ButtonStoryArgs = ButtonProps & { surfaceColor?: string };

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<ButtonStoryArgs> = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  render: ({ surfaceColor = '#ffffff', ...buttonArgs }) => (
    <div
      style={{
        backgroundColor: surfaceColor,
        padding: '1.5rem',
        borderRadius: '0.75rem',
      }}
    >
      <Button {...buttonArgs} />
    </div>
  ),
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: buttonVariantOptions,
    },
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'radio' },
      options: ['xsmall', 'small', 'medium', 'large'],
    },
    shape: {
      control: { type: 'radio' },
      options: ['square', 'round', 'circle'],
    },
    surfaceColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: {
    onClick: fn(),
    label: 'Button',
    variant: 'mint-blue',
    size: 'medium',
    shape: 'square',
    backgroundColor: undefined,
    surfaceColor: '#ffffff',
  },
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    variant: 'default',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const AllVariants: Story = {
  render: () => {
    const shapes: ButtonStoryArgs['shape'][] = ['square', 'round', 'circle'];
    const sizes: ButtonStoryArgs['size'][] = ['xsmall', 'small', 'medium', 'large'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {buttonVariantOptions.map((variant) => (
          <section
            key={variant}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              padding: '1rem',
              border: '1px solid #e0e0e0',
              borderRadius: '0.75rem',
            }}
          >
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{variant}</h3>
              <small style={{ color: '#666' }}>sizes × shapes</small>
            </header>
            {shapes.map((shape) => (
              <div key={`${variant}-${shape}`} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {sizes.map((size) => (
                  <Button
                    key={`${variant}-${shape}-${size}`}
                    label={`${size} ${shape}`}
                    variant={variant}
                    size={size}
                    shape={shape}
                  />
                ))}
              </div>
            ))}
          </section>
        ))}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};
