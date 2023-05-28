import type { Meta, StoryObj } from '@storybook/react';
import Percentage from '@pintu/technical-test/app/component/percentage';

const meta: Meta<typeof Percentage> = {
  title: 'Component/Percentage',
  component: Percentage,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Percentage>;

export const Default: Story = {
  args: {
    value: '0.55',
  },
};
