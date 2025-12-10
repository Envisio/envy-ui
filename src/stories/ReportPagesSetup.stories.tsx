import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { ReportPagesSetup } from './ReportPagesSetup';

const meta: Meta<typeof ReportPagesSetup> = {
  title: 'Components/ReportPagesSetup',
  component: ReportPagesSetup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialChecked: {
      control: 'object',
      description: 'Initial checked state for each page option',
    },
    className: {
      control: 'text',
      description: 'Custom class name',
    },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with all options checked
export const Default: Story = {
  args: {
    initialChecked: {
      cover: true,
      overallSummary: true,
      departmentSummary: true,
      details: true,
    },
  },
};

// Story with some options unchecked
export const PartiallyChecked: Story = {
  args: {
    initialChecked: {
      cover: true,
      overallSummary: false,
      departmentSummary: true,
      details: false,
    },
  },
};

// Story with no options checked
export const NoneChecked: Story = {
  args: {
    initialChecked: {
      cover: false,
      overallSummary: false,
      departmentSummary: false,
      details: false,
    },
  },
};

// Interactive story for testing callbacks
export const Interactive: Story = {
  args: {
    onChange: (checkedPages) => {
      console.log('Page selection changed:', checkedPages);
    },
  },
};