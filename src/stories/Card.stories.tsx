import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from './Card';

const meta = {
  title: 'Example/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['neutral', 'info', 'success', 'warning'],
    },
    children: { control: false },
    footer: { control: false },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const ActionFooter = () => (
  <>
    <button type="button" className="storybook-button storybook-button--small">
      View brief
    </button>
    <button
      type="button"
      className="storybook-button storybook-button--small storybook-button--primary"
    >
      Share
    </button>
  </>
);

export const Basic: Story = {
  args: {
    title: 'Strategy review',
    description: 'Walkthrough of FY26 objectives, KPIs, and team guardrails.',
    tone: 'neutral',
    badge: 'Draft',
  },
  render: (args) => <Card {...args} footer={<ActionFooter />} />,
};

export const WithDetails: Story = {
  args: {
    title: 'Customer research',
    description:
      'Insights from Q4 agency interviews. Includes sentiment analysis and opportunity map.',
    tone: 'info',
    badge: 'New',
  },
  render: (args) => (
    <Card
      {...args}
      footer={<span style={{ fontSize: 13, color: '#475467' }}>Updated 45 minutes ago by Jane</span>}
    >
      <ul style={{ paddingLeft: 18, margin: '8px 0 0' }}>
        <li>12 moderated interviews complete</li>
        <li>Top 3 friction points identified</li>
        <li>Playbook updates next week</li>
      </ul>
    </Card>
  ),
};

export const SuccessState: Story = {
  args: {
    title: 'OKR alignment',
    description: 'All teams reviewed and approved the FY26 OKRs.',
    tone: 'success',
  },
  render: (args) => (
    <Card
      {...args}
      footer={<span style={{ fontSize: 13, color: '#027a48' }}>Locked in for FY26</span>}
    />
  ),
};
